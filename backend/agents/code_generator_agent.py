from .base_agent import BaseAgent
import re

class CodeGeneratorAgent(BaseAgent):
    """Agent specialized in generating MATLAB code for ECE practicals."""
    
    def __init__(self):
        instructions = """MATLAB code generator for ECE practicals.
Generate clean, well-commented code. Use simple logic. NO markdown fences.
Output only MATLAB code, nothing else."""
        super().__init__("CodeGeneratorAgent", instructions)
    
    @staticmethod
    def clean_code(code: str) -> str:
        """
        Remove markdown code fences and other formatting from generated code.
        
        Args:
            code: Raw code string that may contain markdown formatting
            
        Returns:
            Cleaned code string ready for direct use
        """
        # Remove markdown code fences (```matlab, ```python, ```)
        cleaned = re.sub(r'^```[a-zA-Z]*\n?', '', code.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r'\n?```$', '', cleaned.strip(), flags=re.MULTILINE)
        
        # Remove any remaining backticks at start/end
        cleaned = cleaned.strip('`').strip()
        
        return cleaned
    
    def generate_brute_force_code(self, topic: str, theory_context: str = "") -> str:
        """
        Generate brute-force MATLAB code for the given topic.
        
        Args:
            topic: The ECE practical topic
            theory_context: Optional theoretical context to inform code generation
            
        Returns:
            MATLAB code as a string
        """
        context_str = f"\n\nTheoretical Context:\n{theory_context}" if theory_context else ""
        
        prompt = f"""
Generate simple MATLAB code for: {topic}
{context_str}

Requirements: Well-commented, brute-force approach, beginner-friendly.
NO markdown fences. Output only code.
"""
        raw_code = self.respond(prompt)
        return self.clean_code(raw_code)
    
    def generate_efficient_code(self, topic: str, brute_force_code: str) -> str:
        """
        Generate optimized MATLAB code based on the brute-force version.
        
        Args:
            topic: The ECE practical topic
            brute_force_code: The brute-force version to optimize
            
        Returns:
            Optimized MATLAB code or message if no optimization needed
        """
        prompt = f"""
Optimize this MATLAB code for: {topic}

{brute_force_code}

If optimization possible: generate optimized version (vectorization, built-ins).
If not: reply "No significant optimization possible"
NO markdown fences. Output only code or message.
"""
        raw_code = self.respond(prompt)
        return self.clean_code(raw_code)
