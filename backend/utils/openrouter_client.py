
import os
import requests
import time
import datetime
from typing import Optional, Generator, List

class OpenRouterClient:
    """
    OpenRouter API client - Gemini ka fallback hai.
    Multiple models support karta hai via OpenRouter with automatic failover.
    """
    
    BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
    
    def __init__(self):
        self.api_key = os.environ.get("OPENROUTER_API_KEY")
        # Parse comma-separated models for fallback chain
        models_str = os.environ.get("OPENROUTER_MODEL", "google/gemini-2.0-flash-001")
        self.models = [m.strip() for m in models_str.split(",") if m.strip()]
        
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": os.environ.get("SITE_URL", "https://localhost:3000"),
            "X-Title": "MATist"
        }
    
    def is_configured(self) -> bool:
        """Check karta hai ki OpenRouter API key set hai ya nahi."""
        return bool(self.api_key) and len(self.models) > 0
    
    def generate_content(self, system_prompt: str, user_query: str, 
                         max_tokens: int = 4096, temperature: float = 0.7,
                         timeout: int = 30) -> str:
        """
        OpenRouter API se content generate karta hai.
        Models ko sequence mein try karega jab tak success na mile.
        """
        if not self.is_configured():
            raise ValueError("OPENROUTER_API_KEY not configured")
        
        last_exception = None
        
        for i, model in enumerate(self.models):
            try:
                timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print(f"[{timestamp}] [OpenRouter] Attempt {i+1}/{len(self.models)} with model: {model}")
                
                payload = {
                    "model": model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_query}
                    ],
                    "max_tokens": max_tokens,
                    "temperature": temperature
                }
                
                response = requests.post(
                    self.BASE_URL,
                    headers=self.headers,
                    json=payload,
                    timeout=timeout
                )
                
                if response.status_code != 200:
                    error_data = response.json() if response.text else {}
                    error_msg = error_data.get("error", {}).get("message", response.text[:200])
                    print(f"[{timestamp}] [OpenRouter] Model {model} failed: {error_msg}")
                    raise Exception(f"Model {model} error ({response.status_code}): {error_msg}")
                
                data = response.json()
                content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                
                if not content:
                    raise Exception(f"Model {model} returned empty response")
                
                print(f"[{timestamp}] [OpenRouter] Success with model: {model}")
                return content
                
            except Exception as e:
                last_exception = e
                # Next model try karte hain
                continue
        
        # Agar saare models fail ho jayein
        raise last_exception or Exception("All OpenRouter models failed")
    
    def generate_content_stream(self, system_prompt: str, user_query: str,
                                 max_tokens: int = 4096, temperature: float = 0.7,
                                 timeout: int = 60) -> Generator[str, None, None]:
        """
        OpenRouter API se content stream karta hai.
        Models ko sequence mein try karega jab tak success na mile.
        """
        if not self.is_configured():
            raise ValueError("OPENROUTER_API_KEY not configured")
        
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        for i, model in enumerate(self.models):
            try:
                print(f"[{timestamp}] [OpenRouter] Streaming attempt {i+1}/{len(self.models)} with model: {model}")
                
                payload = {
                    "model": model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_query}
                    ],
                    "max_tokens": max_tokens,
                    "temperature": temperature,
                    "stream": True
                }
                
                response = requests.post(
                    self.BASE_URL,
                    headers=self.headers,
                    json=payload,
                    timeout=timeout,
                    stream=True
                )
                
                if response.status_code != 200:
                    error_msg = response.text[:200] if response.text else "Unknown error"
                    print(f"[{timestamp}] [OpenRouter] Model {model} stream failed: {error_msg}")
                    continue  # Next model try karte hain
                
                # Check karte hain ki koi data mila ya nahi
                params = {'yielded_any': False}
                
                def stream_iterator():
                    for line in response.iter_lines():
                        if line:
                            line_text = line.decode('utf-8')
                            if line_text.startswith("data: "):
                                data_str = line_text[6:]
                                if data_str.strip() == "[DONE]":
                                    break
                                try:
                                    import json
                                    data = json.loads(data_str)
                                    delta = data.get("choices", [{}])[0].get("delta", {})
                                    content = delta.get("content", "")
                                    if content:
                                        params['yielded_any'] = True
                                        yield content
                                except:
                                    continue
                
                # Iterator se yield karo
                yield from stream_iterator()
                
                # Agar data yield ho gaya, toh baaki models try mat karo
                if params['yielded_any']:
                    print(f"[{timestamp}] [OpenRouter] Stream finished successfully with {model}")
                    return
                else:
                     print(f"[{timestamp}] [OpenRouter] Model {model} yielded no data, trying next...")
            
            except Exception as e:
                print(f"[{timestamp}] [OpenRouter] Error streaming {model}: {e}")
                continue

        # Agar loop bina return ke khatam ho gaya, matlab saare models fail
        raise Exception("All OpenRouter models failed to stream")


# Global instance - baad mein initialize hoga
_openrouter_client: Optional[OpenRouterClient] = None

def get_openrouter_client() -> OpenRouterClient:
    """OpenRouter client instance lo ya create karo."""
    global _openrouter_client
    if _openrouter_client is None:
        _openrouter_client = OpenRouterClient()
    return _openrouter_client

