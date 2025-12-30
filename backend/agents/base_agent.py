import os
import time
import datetime
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# Lazy import to avoid circular dependencies
_openrouter_client = None

def get_openrouter():
    """Lazy load OpenRouter client."""
    global _openrouter_client
    if _openrouter_client is None:
        try:
            from utils.openrouter_client import get_openrouter_client
            _openrouter_client = get_openrouter_client()
        except Exception as e:
            print(f"[OpenRouter] Failed to load client: {e}")
            _openrouter_client = None
    return _openrouter_client


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
            'gemini-2.5-flash',  # Faster experimental model
            generation_config=generation_config
        )
    
    def respond(self, query: str) -> str:
        """
        Generate response with Gemini -> OpenRouter fallback.
        Tries Gemini first, falls back to OpenRouter on failure.
        """
        max_retries = 2
        retry_delay = 1
        last_error = None
        
        # --- STEP 1: Try Gemini ---
        for attempt in range(max_retries):
            try:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print(f"[{timestamp}] [Gemini] Attempt {attempt + 1}/{max_retries}")
                
                response = self.model.generate_content(
                    f"{self.instructions}\nUser: {query}",
                    request_options={'timeout': 25}
                )
                return response.text
                
            except Exception as e:
                error_msg = str(e)
                last_error = error_msg
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                
                # Check if it's a retriable error
                is_quota_error = "429" in error_msg or "quota" in error_msg.lower()
                is_timeout = "timeout" in error_msg.lower() or "deadline" in error_msg.lower()
                is_server_error = "500" in error_msg or "503" in error_msg
                
                if is_quota_error or is_timeout or is_server_error:
                    if attempt < max_retries - 1:
                        print(f"[{timestamp}] [Gemini] Retrying in {retry_delay}s... Error: {error_msg[:100]}")
                        time.sleep(retry_delay)
                        continue
                    else:
                        print(f"[{timestamp}] [Gemini] Max retries reached, attempting OpenRouter fallback...")
                        break
                else:
                    # Non-retriable error, go to fallback immediately
                    print(f"[{timestamp}] [Gemini] Non-retriable error, attempting OpenRouter fallback: {error_msg[:100]}")
                    break
        
        # --- STEP 2: Fallback to OpenRouter ---
        openrouter = get_openrouter()
        if openrouter and openrouter.is_configured():
            try:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print(f"[{timestamp}] [Fallback] Using OpenRouter...")
                
                result = openrouter.generate_content(
                    system_prompt=self.instructions,
                    user_query=query,
                    max_tokens=4096,
                    temperature=0.7,
                    timeout=30
                )
                print(f"[{timestamp}] [Fallback] OpenRouter success!")
                return result
                
            except Exception as fallback_error:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print(f"[{timestamp}] [Fallback] OpenRouter also failed: {str(fallback_error)[:100]}")
                # Both failed, return user-friendly error
                return f"⚠️ Service temporarily unavailable. Please try again later."
        else:
            # OpenRouter not configured, return Gemini error
            if "quota" in str(last_error).lower() or "429" in str(last_error):
                return "⚠️ API Quota Exceeded. Please try again in a few minutes."
            elif "timeout" in str(last_error).lower():
                return "⚠️ Request timed out. Please try again with a simpler topic."
            else:
                return "⚠️ Service temporarily unavailable. Please try again later."
    
    def respond_stream(self, query: str):
        """
        Stream response with Gemini -> OpenRouter fallback.
        Tries Gemini streaming first, falls back to OpenRouter on failure.
        """
        gemini_failed = False
        
        # --- STEP 1: Try Gemini Streaming ---
        try:
            response = self.model.generate_content(
                f"{self.instructions}\nUser: {query}",
                stream=True
            )
            for chunk in response:
                if chunk.text:
                    yield chunk.text
            return  # Success, exit
            
        except Exception as e:
            error_msg = str(e)
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"[{timestamp}] [Gemini Stream] Failed: {error_msg[:100]}")
            gemini_failed = True
        
        # --- STEP 2: Fallback to OpenRouter Streaming ---
        if gemini_failed:
            openrouter = get_openrouter()
            if openrouter and openrouter.is_configured():
                try:
                    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    print(f"[{timestamp}] [Fallback Stream] Using OpenRouter...")
                    
                    for chunk in openrouter.generate_content_stream(
                        system_prompt=self.instructions,
                        user_query=query,
                        max_tokens=4096,
                        temperature=0.7,
                        timeout=60
                    ):
                        yield chunk
                    return
                    
                except Exception as fallback_error:
                    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    print(f"[{timestamp}] [Fallback Stream] OpenRouter also failed: {str(fallback_error)[:100]}")
                    yield "⚠️ Streaming failed. Please try again."
            else:
                yield "⚠️ API quota exceeded or service unavailable. Please try again later."