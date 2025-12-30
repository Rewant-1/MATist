from .base_agent import BaseAgent
from .latex_examples import LATEX_EXAMPLE_1, LATEX_EXAMPLE_2, LATEX_STRUCTURE_GUIDELINES
import re

class LaTeXGeneratorAgent(BaseAgent):
    # LaTeX report banata hai - Overleaf ready format
    
    
    def __init__(self):
        from .latex_examples import LATEX_PREAMBLE, LATEX_EXAMPLE_1, LATEX_STRUCTURE_GUIDELINES
        
        instructions = f"""You are a LaTeX report generator for ECE laboratory reports. 
Your role is to create professional, compilable LaTeX documents that STRICTLY follow the user's "Gold Standard" format.

{LATEX_STRUCTURE_GUIDELINES}

REFERENCE PREAMBLE (Use this EXACTLY):
{LATEX_PREAMBLE}

REFERENCE EXAMPLES (Follow this content style):
{LATEX_EXAMPLE_1}

KEY REQUIREMENTS:
1. GENERATE A COMPLETE COMPILABLE DOCUMENT: Start with \\documentclass..., include all packages from the preamble, \\begin{{document}}, then the practical content, then \\end{{document}}.
2. USE THE EXACT PREAMBLE provided in the reference. Do not skip packages or custom color definitions.
3. MATCH THE CHAPTER STYLE: Use \\chapter{{Title}} and \\label{{ch:expX}}.
4. CODE LISTINGS: Use the custom \\lstset and colors defined in the preamble.
5. FIGURES: Use \\begin{{figure}}[H] ... \\end{{figure}}.
6. HEADER/FOOTER: Ensure \\pagestyle{{fancy}} and proper header settings are included.

Output ONLY valid LaTeX code. No markdown fences."""
        super().__init__("LaTeXGeneratorAgent", instructions)
    
    @staticmethod
    def clean_latex(latex_code: str) -> str:
        # Markdown formatting hatata hai
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
        # Full LaTeX document generate karta hai - aim, theory, code, results sab
        from .latex_examples import LATEX_PREAMBLE
        
        prompt = f"""
Generate a COMPLETE, REFERENCE-QUALITY LaTeX practical report for the topic: "{topic}"

CONTENT TO INCLUDE:

THEORY SECTION:
{theory}
{theory_explanation if theory_explanation else ""}

MATLAB CODE SECTION:
{matlab_code}

CODE EXPLANATION:
{code_explanation if code_explanation else "Code is self-explanatory with inline comments"}

OPTIMIZATION NOTES:
{optimization_notes if optimization_notes else "Standard implementation utilized."}

INSTRUCTIONS:
1. **START WITH THE PREAMBLE**: You MUST output the full \\documentclass... and all packages/settings exactly as defined in the Reference Preamble.
2. **DOCUMENT BODY**:
   - \\begin{{document}}
   - \\chapter{{ {topic} }}
   - \\label{{ch:{topic.lower().replace(' ', '_')}}}
   - \\section{{Aim}}
   - \\section{{Apparatus / Software Required}} (List MATLAB)
   - \\section{{Theory}} (Introduction, Definitions, Mathematical Formulas)
   - \\section{{MATLAB Code}} (Use lstlisting with caption)
   - \\section{{Result}} (Sample verbatim output, Placeholders for figures)
   - \\section{{Conclusion}} (Bullet points)
   - \\end{{document}}
3. **STRICT FORMATTING**:
   - Use the specific \\definecolor and \\lstset provided in the preamble.
   - Use \\pagestyle{{fancy}} instructions.
   - Use \\titleformat{{\\chapter}} styles.

OUTPUT ONLY THE LATEX CODE. NO MARKDOWN FENCES.
"""
        raw_latex = self.respond(prompt)
        return self.clean_latex(raw_latex)
    
    def create_aim_and_objective(self, topic: str) -> dict:
        # Aim aur objectives generate karta hai practical ke liye
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
