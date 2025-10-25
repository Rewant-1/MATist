import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))


class BaseAgent:
    def __init__(self, name: str, instructions: str):
        self.name = name
        self.instructions = instructions
        # Configure for faster responses
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
        }
        self.model = genai.GenerativeModel(
            'gemini-2.0-flash-exp',
            generation_config=generation_config
        )
    
    def respond(self, query: str) -> str:
        """Non-streaming response for backward compatibility"""
        try:
            response = self.model.generate_content(f"{self.instructions}\nUser: {query}")
            return response.text
        except Exception as e:
            return f"Agent {self.name} failed: {str(e)}"
    
    def respond_stream(self, query: str):
        """Streaming response for real-time output"""
        try:
            response = self.model.generate_content(
                f"{self.instructions}\nUser: {query}",
                stream=True
            )
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            yield f"Agent {self.name} failed: {str(e)}"