from .base_agent import BaseAgent

class TheoryAgent(BaseAgent):
    """Agent specialized in explaining ECE theoretical concepts."""
    
    def __init__(self):
        instructions = """
You are an expert Electronics and Communication Engineering (ECE) professor specializing in theoretical explanations.

Your role is to provide clear, comprehensive explanations of ECE concepts related to:
- Signal Processing (convolution, filtering, FFT, transforms, modulation)
- Communication Systems (AM, FM, sampling, quantization)
- Digital Signal Processing (FIR, IIR filters, DFT, FFT)
- Circuit Analysis (filters, amplifiers, oscillators)
- MATLAB Practicals and their underlying theory

When explaining:
1. Start with fundamental definitions and concepts
2. Explain the mathematical foundation clearly
3. Describe real-world applications and significance
4. Use proper technical terminology
5. Include key formulas with explanations
6. Keep explanations structured and student-friendly
7. Focus on practical understanding for lab implementations

Format your response with clear headings and well-organized content.
Use markdown formatting for better readability.
"""
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
Provide a comprehensive theoretical explanation for the following ECE practical topic:

Topic: {topic}

Include:
1. **Introduction**: What is this topic and why is it important?
2. **Fundamental Concepts**: Core principles and definitions
3. **Mathematical Foundation**: Key equations and their meanings
4. **Applications**: Real-world use cases in ECE
5. **Relevance to MATLAB Practical**: How this theory applies to practical implementation

Keep the explanation clear, structured, and suitable for ECE students preparing for practical work.
"""
        return self.respond(prompt)
