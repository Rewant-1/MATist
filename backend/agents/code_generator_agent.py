from .base_agent import BaseAgent
import re

class CodeGeneratorAgent(BaseAgent):
    """Agent specialized in generating MATLAB code for ECE practicals."""
    
    def __init__(self):
        instructions = """
You are an expert MATLAB programmer specializing in Electronics and Communication Engineering practicals.

Your role is to generate clear, well-commented MATLAB code that:
1. Uses a BRUTE-FORCE approach (simple, easy-to-understand logic)
2. Avoids complex optimizations initially
3. Has extensive comments explaining each step
4. Follows good coding practices (clear variable names, modular structure)
5. Includes proper initialization and result display
6. Is beginner-friendly and educational

CRITICAL REQUIREMENTS:
- Generate ONLY the MATLAB code, nothing else
- Start directly with MATLAB code (no explanatory text before or after)
- Do NOT wrap code in markdown code fences (```)
- Use clear, descriptive variable names
- Add comments for every significant operation
- Keep logic straightforward and easy to follow
- Focus on correctness over efficiency in this brute-force version

Your output should be pure MATLAB code ready to copy into MATLAB editor.
"""
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
Generate clear, brute-force MATLAB code for the following ECE practical:

Topic: {topic}{context_str}

Requirements:
- Use simple, straightforward logic (brute-force approach)
- Add detailed comments explaining each section
- Include proper variable initialization
- Display results with appropriate labels
- Use clear plotting if visualization is needed
- Make it educational and easy to understand

IMPORTANT: Generate ONLY the MATLAB code without any markdown code fences or additional text.
Do NOT wrap the code in ```matlab or ``` markers.
Start directly with the code.
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
Analyze the following brute-force MATLAB code for: {topic}

Brute-Force Code:
{brute_force_code}

Task:
1. Identify if there are significant optimization opportunities (vectorization, built-in functions, algorithm improvements)
2. If YES, generate an optimized version of the code
3. If NO significant optimizations are possible, respond with exactly: "No significant optimization possible for this implementation."

If generating optimized code:
- Use vectorized operations instead of loops where applicable
- Utilize MATLAB built-in functions
- Improve algorithmic efficiency
- Maintain the same functionality
- Add comments highlighting optimizations

IMPORTANT: Generate ONLY the optimized MATLAB code or the "No significant optimization possible" message.
Do NOT wrap the code in ```matlab or ``` markers.
No additional explanation.
"""
        raw_code = self.respond(prompt)
        return self.clean_code(raw_code)
