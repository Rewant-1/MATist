from .base_agent import BaseAgent

class TheoryAgent(BaseAgent):
    """Agent specialized in explaining ECE theoretical concepts."""
    
    def __init__(self):
        instructions = """You are an ECE professor. Explain concepts clearly for MATLAB practicals.
Focus on: definitions, math formulas, applications. Keep it concise and student-friendly."""
        super().__init__("TheoryAgent", instructions)
    
    def explain_concept(self, topic: str) -> str:
        """
        Generate a detailed theoretical explanation for the given ECE topic.
        
        Args:
            topic: The ECE practical topic to explain
            
        Returns:
            Detailed theoretical explanation
        """
        prompt = f"""
Explain the ECE topic: {topic}

Include: Definition, key formulas, applications, and relevance to MATLAB implementation.
Keep it concise and structured.
"""
        return self.respond(prompt)
