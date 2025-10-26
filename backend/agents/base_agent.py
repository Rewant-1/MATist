import os
import time
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
            'gemini-2.5-flash',  # Stable model with lower latency for production
            generation_config=generation_config
        )
    
    def respond(self, query: str) -> str:
        """Non-streaming response with retry logic and timeout"""
        max_retries = 3
        retry_delay = 2  # seconds
        
        for attempt in range(max_retries):
            try:
                # Add timeout to prevent hanging
                response = self.model.generate_content(
                    f"{self.instructions}\nUser: {query}",
                    request_options={'timeout': 60}  # 60 second timeout
                )
                return response.text
            except Exception as e:
                error_msg = str(e)
                
                # Check if it's a quota error
                if "429" in error_msg or "quota" in error_msg.lower():
                    if attempt < max_retries - 1:
                        print(f"⏳ Quota exceeded, retrying in {retry_delay}s... (Attempt {attempt + 1}/{max_retries})")
                        time.sleep(retry_delay)
                        retry_delay *= 2  # Exponential backoff
                        continue
                    else:
                        return f"⚠️ API Quota Exceeded. Please try again in a few minutes. Free tier limit: 50 requests/day per model."
                
                # Check for timeout
                if "timeout" in error_msg.lower() or "deadline" in error_msg.lower():
                    return f"⚠️ Request timed out. The topic might be too complex. Please try a simpler query or try again later."
                
                # Other errors
                return f"Agent {self.name} failed: {error_msg}"
        
        return f"Agent {self.name} failed after {max_retries} retries."
    
    def respond_stream(self, query: str):
        """Streaming response with error handling"""
        try:
            response = self.model.generate_content(
                f"{self.instructions}\nUser: {query}",
                stream=True
            )
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg or "quota" in error_msg.lower():
                yield "⚠️ API Quota Exceeded. Please try again later. Free tier limit: 50 requests/day per model."
            else:
                yield f"Agent {self.name} failed: {error_msg}"