import os
import requests
import time
import datetime
from typing import Optional, Generator

class OpenRouterClient:
    """
    OpenRouter API client - Gemini ka fallback hai.
    Multiple models support karta hai via OpenRouter.
    """
    
    BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
    
    def __init__(self):
        self.api_key = os.environ.get("OPENROUTER_API_KEY")
        # Default model - fast and efficient
        self.model = os.environ.get("OPENROUTER_MODEL", "google/gemini-2.0-flash-001")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": os.environ.get("SITE_URL", "https://localhost:3000"),
            "X-Title": "MATist"
        }
    
    def is_configured(self) -> bool:
        """Check if OpenRouter API key is set."""
        return bool(self.api_key)
    
    def generate_content(self, system_prompt: str, user_query: str, 
                         max_tokens: int = 4096, temperature: float = 0.7,
                         timeout: int = 30) -> str:
        """
        Generate content using OpenRouter API.
        Returns text response or raises exception.
        """
        if not self.is_configured():
            raise ValueError("OPENROUTER_API_KEY not configured")
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_query}
            ],
            "max_tokens": max_tokens,
            "temperature": temperature
        }
        
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [OpenRouter] Calling model: {self.model}")
        
        response = requests.post(
            self.BASE_URL,
            headers=self.headers,
            json=payload,
            timeout=timeout
        )
        
        if response.status_code != 200:
            error_data = response.json() if response.text else {}
            error_msg = error_data.get("error", {}).get("message", response.text[:200])
            raise Exception(f"OpenRouter API error ({response.status_code}): {error_msg}")
        
        data = response.json()
        content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        
        if not content:
            raise Exception("OpenRouter returned empty response")
        
        print(f"[{timestamp}] [OpenRouter] Response received successfully")
        return content
    
    def generate_content_stream(self, system_prompt: str, user_query: str,
                                 max_tokens: int = 4096, temperature: float = 0.7,
                                 timeout: int = 60) -> Generator[str, None, None]:
        """
        Stream content from OpenRouter API.
        Yields text chunks.
        """
        if not self.is_configured():
            raise ValueError("OPENROUTER_API_KEY not configured")
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_query}
            ],
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": True
        }
        
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [OpenRouter] Streaming from model: {self.model}")
        
        response = requests.post(
            self.BASE_URL,
            headers=self.headers,
            json=payload,
            timeout=timeout,
            stream=True
        )
        
        if response.status_code != 200:
            error_msg = response.text[:200] if response.text else "Unknown error"
            raise Exception(f"OpenRouter stream error ({response.status_code}): {error_msg}")
        
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
                            yield content
                    except:
                        continue


# Global instance - lazy initialization
_openrouter_client: Optional[OpenRouterClient] = None

def get_openrouter_client() -> OpenRouterClient:
    """Get or create OpenRouter client instance."""
    global _openrouter_client
    if _openrouter_client is None:
        _openrouter_client = OpenRouterClient()
    return _openrouter_client
