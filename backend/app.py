from flask import Flask, jsonify, request, Response, stream_with_context
from dotenv import load_dotenv
from agents.tutor_agent import TutorAgent
from agents.ece_matlab_agent import ECEMatlabAgent
from flask_cors import CORS
import json
import os
import atexit

# Database import - Prisma use karta hai
try:
    from db import get_db, close_db
    DB_ENABLED = True
except Exception as e:
    print(f"[DB] Database not available: {e}")
    DB_ENABLED = False

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Rate limiting - abuse se bachao
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

tutor_agent = TutorAgent()
ece_matlab_agent = ECEMatlabAgent()

# Cleanup on shutdown
if DB_ENABLED:
    atexit.register(close_db)


@app.route("/",methods=["GET"])
def hello():
    return {"message":"hello world"}

@app.route("/api/chat", methods=["POST"])
def chat():
    # Chat endpoint - backward compatible
    try:
        data = request.get_json()
        messages = data.get("messages",[])

        if not messages:
            return jsonify({"error": "Missing messages"}), 400

        response = tutor_agent.route(messages)
        messages.append({
            "role": "assistant",
            "content": response.get("response", "")
        })
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route("/api/chat/stream", methods=["POST"])
def chat_stream():
    # Streaming chat - real-time response
    try:
        data = request.get_json()
        messages = data.get("messages", [])
        
        if not messages:
            return jsonify({"error": "Missing messages"}), 400
        
        def generate():
            try:
                for chunk in tutor_agent.route_stream(messages):
                    # Send Server-Sent Events format
                    yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                yield f"data: {json.dumps({'done': True})}\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
        
        return Response(
            stream_with_context(generate()),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'X-Accel-Buffering': 'no'
            }
        )
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500
    
# @app.route("/ask", methods=["GET"])
# def ask_question():
#     data = request.args
#     question = data.get("question")
#     return jsonify(TutorAgent().route(question))

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "Tutor system is healthy."}), 200

@app.route("/api/agents", methods=["GET"])
def agent_status():
    return jsonify({
        "available_agents": ["MATist"],
        "status": "MATist agent loaded",
        "description": "Expert assistant for ECE practicals, MATLAB programming, and electronics concepts"
    })

@app.route("/api/ece-practical", methods=["POST"])
@limiter.limit("10 per hour")  # Expensive endpoint - Gemini API calls
def ece_practical():
    """
    Endpoint for processing ECE MATLAB practical topics.
    
    Request body:
    {
        "topic": "Convolution of two signals"
    }
    
    Response:
    {
        "status": "success",
        "topic": "...",
        "theory": "...",
        "brute_force_code": "...",
        "brute_force_explanation": "...",
        "efficient_code": "..." or null,
        "efficient_explanation": "..." or null,
        "optimization_applicable": true/false,
        "latex_report": "..."
    }
    """
    try:
        data = request.get_json()
        topic = data.get("topic", "")
        
        if not topic:
            return jsonify({"error": "Missing topic parameter"}), 400
        
        print(f"[API] Processing ECE practical request for topic: {topic}")
        
        # Process the practical using the ECE MATLAB agent with timeout handling
        try:
            result = ece_matlab_agent.process_practical(topic)
            print(f"[API] Processing completed with status: {result.get('status', 'unknown')}")
            
            # Database mein save karo agar enabled hai
            if DB_ENABLED and result.get('status') == 'success':
                try:
                    db = get_db()
                    db.practical.create(
                        data={
                            'topic': result.get('topic', topic),
                            'theory': result.get('theory'),
                            'bruteForceCode': result.get('brute_force_code'),
                            'bruteForceExplanation': result.get('brute_force_explanation'),
                            'efficientCode': result.get('efficient_code'),
                            'efficientExplanation': result.get('efficient_explanation'),
                            'optimizationApplicable': result.get('optimization_applicable', False),
                            'latexReport': result.get('latex_report'),
                            'status': 'success'
                        }
                    )
                    print(f"[DB] Practical saved for topic: {topic}")
                except Exception as db_error:
                    print(f"[DB] Failed to save: {db_error}")
            
            return jsonify(result)
        except Exception as agent_error:
            print(f"[API] Agent processing error: {str(agent_error)}")
            # Return user-friendly error
            return jsonify({
                "status": "error",
                "error_message": "⚠️ Service temporarily unavailable. Please try again in a moment.",
                "topic": topic,
                "theory": None,
                "brute_force_code": None,
                "brute_force_explanation": None,
                "efficient_code": None,
                "efficient_explanation": None,
                "optimization_applicable": False,
                "latex_report": None
            }), 200  # Return 200 to avoid frontend error handling issues
    
    except Exception as e:
        print(f"[API] Request handling error: {str(e)}")
        return jsonify({
            "status": "error",
            "error": f"Invalid request: {str(e)}"
        }), 400

@app.route("/api/history", methods=["GET"])
def get_history():
    # Past practicals return karta hai
    if not DB_ENABLED:
        return jsonify({"error": "Database not configured"}), 503
    
    try:
        db = get_db()
        limit = request.args.get('limit', 20, type=int)
        practicals = db.practical.find_many(
            take=limit,
            order={'createdAt': 'desc'}
        )
        
        # Convert to JSON-serializable format
        result = []
        for p in practicals:
            result.append({
                'id': p.id,
                'topic': p.topic,
                'status': p.status,
                'createdAt': p.createdAt.isoformat() if p.createdAt else None,
                'hasOptimization': p.optimizationApplicable
            })
        
        return jsonify({'practicals': result, 'count': len(result)})
    except Exception as e:
        print(f"[API] History fetch error: {e}")
        return jsonify({"error": "Failed to fetch history"}), 500

@app.route("/api/history/<practical_id>", methods=["GET"])
def get_practical_detail(practical_id: str):
    # Single practical ka full detail
    if not DB_ENABLED:
        return jsonify({"error": "Database not configured"}), 503
    
    try:
        db = get_db()
        practical = db.practical.find_unique(where={'id': practical_id})
        
        if not practical:
            return jsonify({"error": "Practical not found"}), 404
        
        return jsonify({
            'id': practical.id,
            'topic': practical.topic,
            'theory': practical.theory,
            'brute_force_code': practical.bruteForceCode,
            'brute_force_explanation': practical.bruteForceExplanation,
            'efficient_code': practical.efficientCode,
            'efficient_explanation': practical.efficientExplanation,
            'optimization_applicable': practical.optimizationApplicable,
            'latex_report': practical.latexReport,
            'status': practical.status,
            'created_at': practical.createdAt.isoformat() if practical.createdAt else None
        })
    except Exception as e:
        print(f"[API] Detail fetch error: {e}")
        return jsonify({"error": "Failed to fetch practical"}), 500

# ECE Syllabus Topics - common practicals jo students karte hain
ECE_TOPICS = [
    "Convolution of two signals",
    "Discrete Fourier Transform (DFT)",
    "Fast Fourier Transform (FFT)",
    "Sampling theorem verification",
    "Z-Transform and Inverse Z-Transform",
    "FIR Filter Design (Window Method)",
    "IIR Filter Design (Butterworth)",
    "AM Modulation and Demodulation",
    "FM Modulation and Demodulation",
    "PCM (Pulse Code Modulation)",
    "Delta Modulation",
    "BPSK Modulation and Demodulation",
    "QPSK Modulation and Demodulation",
    "Linear Convolution using DFT",
    "Circular Convolution",
    "Autocorrelation and Cross-correlation",
    "Power Spectral Density",
    "Noise analysis in communication systems",
    "Image processing basics",
    "Edge detection using MATLAB"
]

@app.route("/api/topics", methods=["GET"])
def get_topics():
    # Syllabus ke common topics return karta hai
    return jsonify({"topics": ECE_TOPICS, "count": len(ECE_TOPICS)})

@app.route("/api/generate-pdf", methods=["POST"])
@limiter.limit("5 per hour")  # PDF generation bhi costly hai
def generate_pdf():
    # LaTeX se PDF banata hai - LaTeX.Online API use karta hai
    import requests
    from urllib.parse import quote
    
    try:
        data = request.get_json()
        latex_code = data.get("latex", "")
        
        if not latex_code:
            return jsonify({"error": "Missing LaTeX code"}), 400
        
        print("[PDF] Generating PDF from LaTeX...")
        
        # LaTeX.Online API - GET request with URL-encoded text
        encoded_latex = quote(latex_code, safe='')
        api_url = f"https://latexonline.cc/compile?text={encoded_latex}"
        
        response = requests.get(api_url, timeout=90)
        
        if response.status_code == 200 and 'application/pdf' in response.headers.get('content-type', ''):
            print("[PDF] PDF generated successfully")
            return Response(
                response.content,
                mimetype='application/pdf',
                headers={
                    'Content-Disposition': 'attachment; filename=practical_report.pdf'
                }
            )
        else:
            # Compilation error - return the error message
            print(f"[PDF] Compilation failed: {response.text[:200]}")
            return jsonify({
                "error": "LaTeX compilation failed",
                "details": response.text[:500] if response.text else "Unknown error"
            }), 400
            
    except requests.Timeout:
        return jsonify({"error": "PDF generation timed out"}), 504
    except Exception as e:
        print(f"[PDF] Error: {e}")
        return jsonify({"error": f"PDF generation failed: {str(e)}"}), 500

if __name__ == "__main__":
    # Use environment variable for debug mode, default to False for production
    debug_mode = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    port = int(os.getenv("PORT", 5000))
    
    app.run(
        host="0.0.0.0",  # Allow external connections (required for production)
        port=port,
        debug=debug_mode
    )