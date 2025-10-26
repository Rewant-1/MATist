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
        # Configure for faster responses with lower token limits
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 4096,  # Reduced for faster responses
        }
        self.model = genai.GenerativeModel(
            'gemini-2.0-flash-exp',  # Faster experimental model
            generation_config=generation_config
        )
    
    def respond(self, query: str) -> str:
        """Non-streaming response with retry logic and timeout"""
        max_retries = 2  # Reduce retries for faster failure
        retry_delay = 1  # seconds
        
        for attempt in range(max_retries):
            try:
                # Reduced timeout for production environment
                response = self.model.generate_content(
                    f"{self.instructions}\nUser: {query}",
                    request_options={'timeout': 25}  # 25 second timeout to avoid worker timeout
                )
                return response.text
            except Exception as e:
                error_msg = str(e)
                
                # Check if it's a quota error
                if "429" in error_msg or "quota" in error_msg.lower():
                    if attempt < max_retries - 1:
                        print(f"⏳ Quota exceeded, retrying in {retry_delay}s... (Attempt {attempt + 1}/{max_retries})")
                        time.sleep(retry_delay)
                        continue
                    else:
                        return f"⚠️ API Quota Exceeded. Please try again in a few minutes."
                
                # Check for timeout or deadline
                if "timeout" in error_msg.lower() or "deadline" in error_msg.lower() or "DEADLINE_EXCEEDED" in error_msg:
                    if attempt < max_retries - 1:
                        print(f"⏳ Timeout occurred, retrying... (Attempt {attempt + 1}/{max_retries})")
                        time.sleep(retry_delay)
                        continue
                    else:
                        return f"⚠️ Request timed out. Please try again with a simpler topic."
                
                # Worker killed or system exit
                if "SIGKILL" in error_msg or "SystemExit" in error_msg:
                    return f"⚠️ Server resource limit reached. Please try again."
                
                # Other errors - retry once
                if attempt < max_retries - 1:
                    print(f"⏳ Error occurred, retrying... (Attempt {attempt + 1}/{max_retries}): {error_msg}")
                    time.sleep(retry_delay)
                    continue
                else:
                    return f"⚠️ Service temporarily unavailable. Please try again later."
        
        return f"⚠️ Service temporarily unavailable after {max_retries} attempts."
    
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