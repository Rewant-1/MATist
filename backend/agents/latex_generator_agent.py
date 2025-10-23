from .base_agent import BaseAgent

class LaTeXGeneratorAgent(BaseAgent):
    """Agent specialized in generating LaTeX reports for ECE practicals."""
    
    def __init__(self):
        instructions = """
You are an expert in creating professional LaTeX documents for academic ECE lab reports.

Your role is to generate complete, well-formatted LaTeX code that:
1. Follows standard academic report structure
2. Uses appropriate LaTeX packages (listings for code, amsmath for equations)
3. Formats MATLAB code properly with syntax highlighting
4. Creates clear sections with proper headings
5. Is ready to compile in Overleaf without modifications

Output ONLY valid LaTeX code that can be directly copied to a .tex file.
"""
        super().__init__("LaTeXGeneratorAgent", instructions)
    
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
Generate a complete LaTeX document for an ECE practical lab report on: {topic}

Content to include:

**Theory:**
{theory}

**MATLAB Code (Final Version):**
```matlab
{matlab_code}
```

**Additional Context:**
- Code Explanation: {code_explanation if code_explanation else "Available in comments"}
- Optimization Notes: {optimization_notes if optimization_notes else "N/A"}

**Required LaTeX Structure:**

\\documentclass[12pt]{{article}}
\\usepackage{{amsmath, amssymb, graphicx, listings, xcolor, geometry}}
\\geometry{{a4paper, margin=1in}}

% MATLAB code formatting
\\lstset{{
    language=Matlab,
    basicstyle=\\ttfamily\\small,
    keywordstyle=\\color{{blue}},
    commentstyle=\\color{{green!50!black}},
    stringstyle=\\color{{red}},
    numbers=left,
    numberstyle=\\tiny\\color{{gray}},
    stepnumber=1,
    frame=single,
    breaklines=true,
    captionpos=b
}}

\\begin{{document}}

\\title{{ECE Practical: {topic}}}
\\author{{Student Name}}
\\date{{\\today}}
\\maketitle

\\section{{Aim}}
% Brief 1-2 sentence aim derived from the topic

\\section{{Objective}}
% Specific objectives of this practical (2-3 bullet points)

\\section{{Theory}}
% Insert the theoretical explanation here, formatted properly with LaTeX

\\section{{MATLAB Code}}
% Insert the MATLAB code in a listings environment

\\section{{Results}}
% Add placeholder text:
% Results will be displayed here after running the MATLAB code.
% Include:
% - Output values/data
% - Plots/graphs (if applicable)
% - Observations from the output

\\section{{Observation}}
% Add placeholder text:
% Key observations from the practical:
% 1. [Observation point 1]
% 2. [Observation point 2]
% 3. [Observation point 3]

\\section{{Conclusion}}
% Brief conclusion about what was learned/achieved

\\end{{document}}

**CRITICAL REQUIREMENTS:**
1. Generate ONLY the LaTeX code, nothing else
2. Properly format mathematical equations using amsmath
3. Use the listings package for MATLAB code
4. Create professional-looking sections
5. Include placeholders for Results and Observations that students can fill
6. Make it ready to compile in Overleaf
7. Ensure all LaTeX syntax is correct

Generate the complete LaTeX document now:
"""
        return self.respond(prompt)
    
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
