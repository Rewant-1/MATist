from .base_agent import BaseAgent
import re

class LaTeXGeneratorAgent(BaseAgent):
    """Agent specialized in generating LaTeX reports for ECE practicals."""
    
    def __init__(self):
        instructions = """LaTeX report generator for ECE lab reports.
Create complete, compilable LaTeX with proper structure and code formatting.
NO markdown fences. Output only LaTeX."""
        super().__init__("LaTeXGeneratorAgent", instructions)
    
    @staticmethod
    def clean_latex(latex_code: str) -> str:
        """
        Remove markdown code fences from generated LaTeX.
        
        Args:
            latex_code: Raw LaTeX string that may contain markdown formatting
            
        Returns:
            Cleaned LaTeX string
        """
        # Remove markdown code fences
        cleaned = re.sub(r'^```[a-zA-Z]*\n?', '', latex_code.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r'\n?```$', '', cleaned.strip(), flags=re.MULTILINE)
        
        # Remove any remaining backticks at start/end
        cleaned = cleaned.strip('`').strip()
        
        return cleaned
    
    def generate_report(self, 
                       topic: str,
                       theory: str,
                       matlab_code: str,
                       theory_explanation: str = "",
                       code_explanation: str = "",
                       optimization_notes: str = "") -> str:
        """
        Generate a complete LaTeX report for the ECE practical.
        
        Args:
            topic: The practical topic
            theory: Theoretical explanation
            matlab_code: Final MATLAB code (efficient if available, else brute-force)
            theory_explanation: Additional theory context
            code_explanation: Code explanation
            optimization_notes: Notes about optimizations (if applicable)
            
        Returns:
            Complete LaTeX document as string
        """
        prompt = f"""
Generate complete LaTeX lab report for: {topic}

Theory: {theory}
Code: {matlab_code}
Explanation: {code_explanation if code_explanation else "In comments"}
Optimizations: {optimization_notes if optimization_notes else "N/A"}

Include standard sections: Aim, Theory, Code, Results, Conclusion.
NO markdown fences. Output compilable LaTeX only.
"""
        raw_latex = self.respond(prompt)
        return self.clean_latex(raw_latex)
    
    def create_aim_and_objective(self, topic: str) -> dict:
        """
        Generate concise Aim and Objective statements for the practical.
        
        Args:
            topic: The practical topic
            
        Returns:
            Dictionary with 'aim' and 'objective' keys
        """
        prompt = f"""
For the ECE practical topic "{topic}", generate:

1. **Aim**: A brief, single-sentence statement (max 20 words) describing the main goal
2. **Objective**: 2-3 specific bullet points outlining what will be achieved

Format as:
AIM: [your aim here]

OBJECTIVES:
- [objective 1]
- [objective 2]
- [objective 3]

Keep it professional and suitable for an academic lab report.
"""
        response = self.respond(prompt)
        
        # Parse the response
        lines = response.strip().split('\n')
        aim = ""
        objectives = []
        
        for line in lines:
            if line.startswith("AIM:"):
                aim = line.replace("AIM:", "").strip()
            elif line.strip().startswith("-"):
                objectives.append(line.strip())
        
        return {
            "aim": aim if aim else f"To study and implement {topic} using MATLAB",
            "objectives": objectives if objectives else [
                f"To understand the theoretical concepts of {topic}",
                f"To implement {topic} in MATLAB",
                "To analyze the results and verify the implementation"
            ]
        }
