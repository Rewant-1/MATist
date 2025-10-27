from flask import Flask, jsonify, request, Response, stream_with_context
from dotenv import load_dotenv
from agents.tutor_agent import TutorAgent
from agents.ece_matlab_agent import ECEMatlabAgent
from flask_cors import CORS
import json
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
tutor_agent = TutorAgent()
ece_matlab_agent = ECEMatlabAgent()


@app.route("/",methods=["GET"])
def hello():
    return {"message":"hello world"}

@app.route("/api/chat", methods=["POST"])
def chat():
    """Non-streaming chat endpoint for backward compatibility"""
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
    """Streaming chat endpoint for real-time responses"""
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
        "available_agents": ["ECE MATLAB Helper"],
        "status": "ECE MATLAB agent loaded",
        "description": "Expert assistant for ECE practicals, MATLAB programming, and electronics concepts"
    })

@app.route("/api/ece-practical", methods=["POST"])
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

if __name__ == "__main__":
    # Use environment variable for debug mode, default to False for production
    debug_mode = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    port = int(os.getenv("PORT", 5000))
    
    app.run(
        host="0.0.0.0",  # Allow external connections (required for production)
        port=port,
        debug=debug_mode
    )