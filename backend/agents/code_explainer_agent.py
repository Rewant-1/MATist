from .base_agent import BaseAgent

class CodeExplainerAgent(BaseAgent):
    """Agent specialized in explaining MATLAB code step-by-step."""
    
    def __init__(self):
        instructions = """MATLAB code explainer for ECE students.
Explain code step-by-step clearly. Connect to theory. Use simple language."""
        super().__init__("CodeExplainerAgent", instructions)
    
    def explain_code(self, topic: str, code: str, code_type: str = "brute-force") -> str:
        """
        Generate a detailed explanation of the MATLAB code.
        
        Args:
            topic: The ECE practical topic
            code: The MATLAB code to explain
            code_type: Type of code ("brute-force" or "efficient")
            
        Returns:
            Step-by-step code explanation
        """
        prompt = f"""
Explain this {code_type} MATLAB code for: {topic}

{code}

Include: Overview, step-by-step breakdown, key concepts, expected output.
Keep it clear and educational.
"""
        return self.respond(prompt)
    
    def explain_optimizations(self, brute_force_code: str, efficient_code: str, topic: str) -> str:
        """
        Explain the optimizations made from brute-force to efficient code.
        
        Args:
            brute_force_code: Original brute-force implementation
            efficient_code: Optimized implementation
            topic: The ECE practical topic
            
        Returns:
            Explanation of optimizations and improvements
        """
        prompt = f"""
Compare MATLAB codes for: {topic}

Brute-force: {brute_force_code}
Optimized: {efficient_code}

Explain: Key optimizations, why they matter, performance impact.
"""
        return self.respond(prompt)
