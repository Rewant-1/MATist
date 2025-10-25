from flask import Flask, jsonify, request, Response, stream_with_context
from dotenv import load_dotenv
from agents.tutor_agent import TutorAgent
from agents.ece_matlab_agent import ECEMatlabAgent
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
tutor_agent = TutorAgent()
ece_matlab_agent = ECEMatlabAgent()

load_dotenv()


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
        
        # Process the practical using the ECE MATLAB agent
        result = ece_matlab_agent.process_practical(topic)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            "status": "error",
            "error": f"Server error: {str(e)}"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)