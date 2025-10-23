from .base_agent import BaseAgent

class CodeExplainerAgent(BaseAgent):
    """Agent specialized in explaining MATLAB code step-by-step."""
    
    def __init__(self):
        instructions = """
You are an expert MATLAB instructor specializing in ECE practicals.

Your role is to provide clear, step-by-step explanations of MATLAB code that:
1. Break down the code line-by-line or section-by-section
2. Explain what each part does and why
3. Clarify the purpose of variables and operations
4. Connect code operations to the underlying theory
5. Help students understand the flow and logic

Explanation style:
- Use clear, numbered sections
- Explain in simple, student-friendly language
- Highlight key MATLAB functions and their purposes
- Connect code to the practical objective
- Use markdown formatting for readability
"""
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
Provide a detailed, step-by-step explanation of the following {code_type} MATLAB code for: {topic}

MATLAB Code:
```matlab
{code}
```

Your explanation should:
1. **Overview**: Briefly describe what the code accomplishes
2. **Step-by-Step Breakdown**: Explain each significant section or line
   - What it does
   - Why it's needed
   - Any important MATLAB functions used
3. **Key Concepts**: Highlight important programming concepts or algorithms used
4. **Output/Results**: Explain what output to expect

Use clear markdown formatting with numbered sections.
Make it educational and easy for ECE students to understand.
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
Compare and explain the optimizations made in the following MATLAB code for: {topic}

Original Brute-Force Code:
```matlab
{brute_force_code}
```

Optimized Efficient Code:
```matlab
{efficient_code}
```

Explain:
1. **Key Optimizations**: What specific improvements were made?
2. **Why Each Optimization Matters**: How does it improve performance or readability?
3. **Technical Details**: Explain vectorization, built-in functions, or algorithmic changes
4. **Performance Impact**: Estimated improvement in speed or memory usage
5. **When to Use Each Version**: Scenarios where brute-force vs efficient is preferred

Use clear markdown formatting and make it educational.
"""
        return self.respond(prompt)
