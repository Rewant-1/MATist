from .base_agent import BaseAgent
from .latex_examples import LATEX_EXAMPLE_1, LATEX_EXAMPLE_2, LATEX_STRUCTURE_GUIDELINES
import re

class LaTeXGeneratorAgent(BaseAgent):
    """Agent specialized in generating LaTeX reports for ECE practicals."""
    
    def __init__(self):
        instructions = f"""You are a LaTeX report generator for ECE laboratory reports. 
Your role is to create professional, compilable LaTeX documents following academic standards.

{LATEX_STRUCTURE_GUIDELINES}

REFERENCE EXAMPLES:
Here are two complete examples of well-formatted ECE practical reports to guide your output:

EXAMPLE 1 - Linear Convolution:
{LATEX_EXAMPLE_1}

EXAMPLE 2 - System Response Analysis:
{LATEX_EXAMPLE_2}

KEY REQUIREMENTS:
1. Output ONLY LaTeX code - NO markdown fences, NO explanations
2. Follow the exact structure shown in examples
3. Use proper mathematical notation with $ and \\[ \\]
4. Include well-formatted code in lstlisting environment
5. Add comprehensive theory with formulas
6. Create professional tables and figures
7. Write clear, academic-style conclusions
8. Ensure all LaTeX is compilable

Match the professional quality and structure of the provided examples."""
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
Generate a complete, professional LaTeX lab report for the ECE practical topic: "{topic}"

CONTENT TO INCLUDE:

THEORY SECTION:
{theory}
{theory_explanation if theory_explanation else ""}

MATLAB CODE SECTION:
{matlab_code}

CODE EXPLANATION (to be incorporated as comments or in description):
{code_explanation if code_explanation else "Code is self-explanatory with inline comments"}

OPTIMIZATION NOTES (if applicable):
{optimization_notes if optimization_notes else "Standard implementation approach used"}

INSTRUCTIONS:
1. Follow the EXACT structure from the reference examples
2. Create a proper \\chapter{{}} with the topic as title
3. Write a clear Aim section with itemized objectives
4. Include Apparatus section (MATLAB software)
5. Develop comprehensive Theory section with:
   - Clear introduction and definitions
   - Mathematical formulas using proper LaTeX notation
   - Explanation of methodology
   - Any relevant theoretical background
6. Present MATLAB code in lstlisting environment with descriptive caption
7. Create Results section with:
   - Sample output in verbatim environment
   - Placeholder for figures (e.g., \\includegraphics)
   - Tables if applicable
8. Write detailed Conclusion with bullet points linking theory to implementation
9. Use professional academic language throughout
10. Ensure all LaTeX is properly formatted and compilable

OUTPUT ONLY THE LATEX CODE - NO MARKDOWN FENCES, NO EXPLANATIONS.
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
