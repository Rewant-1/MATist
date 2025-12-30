from .base_agent import BaseAgent

class CodeExplainerAgent(BaseAgent):
    # Code line-by-line samjhayega aur theory se connect karega
    
    def __init__(self):
        instructions = """You are a MATLAB code explanation expert for ECE students.
Your role is to make code understandable by explaining the logic, connecting it to theory, 
and highlighting important implementation details.

YOUR EXPLANATION APPROACH:

1. **High-Level Overview** (2-3 sentences):
   - What does this code accomplish?
   - What algorithm/method does it implement?
   - How does it relate to the theory?

2. **Section-by-Section Breakdown**:
   - Divide code into logical sections
   - Explain the purpose of each section
   - Connect to the algorithm being implemented

3. **Line-by-Line Details** (for complex parts):
   - Explain what the code does
   - Explain WHY it's done this way
   - Mention the mathematical operation being performed

4. **Theory Connections**:
   - Reference formulas being implemented
   - Explain how code maps to mathematical expressions
   - Highlight where theory becomes practice

5. **MATLAB-Specific Notes**:
   - Explain MATLAB-specific syntax or functions
   - Mention built-in functions used and what they do
   - Point out MATLAB best practices demonstrated

6. **Expected Behavior**:
   - What outputs to expect
   - How to interpret results
   - What visualizations show

EXPLANATION STRUCTURE:

**Overview**
[2-3 sentence summary of the code's purpose and approach]

**Algorithm Implementation**
[Explain the overall algorithm/method being used]

**Code Breakdown**

**Section 1: [Name]**
Purpose: [What this section does]
Theory: [Mathematical operation or concept]
Details:
- Line X-Y: [Explanation]
- Line Z: [Explanation with theory connection]

**Section 2: [Name]**
[Continue pattern...]

**Key MATLAB Functions Used**
- `function_name()`: [What it does, why it's used]

**Expected Output**
[Describe what results the code produces]

**Connection to Theory**
[Explicitly show how code implements the mathematical formulas]

Be pedagogical: Assume student knows MATLAB basics but needs guidance on implementation strategy."""
        super().__init__("CodeExplainerAgent", instructions)
    
    def explain_code(self, topic: str, code: str, code_type: str = "brute-force") -> str:
        # Code ka breakdown dega
        if code_type == "brute-force":
            focus = "Focus on explaining the educational approach, why each step is shown explicitly, and how it helps understand the theory."
        else:
            focus = "Focus on explaining the optimization techniques, performance benefits, and professional MATLAB practices used."
            
        prompt = f"""
Explain this {code_type} MATLAB implementation for the topic: {topic}

CODE TO EXPLAIN:
{code}

EXPLANATION REQUIREMENTS:

1. **Overview** (2-3 sentences):
   - What algorithm/method is implemented
   - How it relates to the theory of {topic}
   - Overall approach taken

2. **Detailed Code Breakdown**:
   - Divide into logical sections (initialization, main algorithm, verification, visualization)
   - For each section:
     * Purpose and role in the algorithm
     * Mathematical formula or concept being implemented
     * Line-by-line explanation for complex parts
   
3. **Theory-Code Connection**:
   - Show how code implements mathematical formulas
   - Explain variable mappings (e.g., "x[n] in formula → x array in code")
   - Reference the theoretical concept being realized

4. **MATLAB Functions Explained**:
   - List key MATLAB functions used
   - Explain what each does and why it's chosen
   - Note any MATLAB-specific syntax or conventions

5. **Expected Behavior**:
   - What outputs/plots will be generated
   - How to interpret the results
   - What values/patterns to expect

6. **Learning Points**:
   - Key takeaways from this implementation
   - Common mistakes this approach helps avoid
   - How this prepares for understanding optimized versions (if brute-force)

{focus}

Provide a comprehensive, educational explanation that helps students understand both 
the code AND the underlying concepts.
"""
        return self.respond(prompt)
    
    def explain_optimizations(self, brute_force_code: str, efficient_code: str, topic: str) -> str:
        # Basic vs optimized comparison - kya optimize hua, ye explain karega
        prompt = f"""
Compare and explain the optimizations between two MATLAB implementations for: {topic}

BASIC/BRUTE-FORCE IMPLEMENTATION:
{brute_force_code}

OPTIMIZED/EFFICIENT IMPLEMENTATION:
{efficient_code}

COMPARATIVE ANALYSIS REQUIREMENTS:

1. **Optimization Summary**:
   - List 3-5 key optimizations made
   - Categorize them (algorithmic, vectorization, built-in functions, memory)

2. **Detailed Comparison**:
   For each major optimization:
   
   **Optimization #[N]: [Name]**
   - **What Changed**: [Specific code transformation]
   - **Why It Matters**: [Performance/readability benefit]
   - **How It Works**: [Technical explanation]
   - **Example**: [Show specific before/after code snippets]

3. **Performance Impact**:
   - **Computational Complexity**:
     * Basic: O([complexity])
     * Optimized: O([complexity])
     * Improvement: [analysis]
   
   - **Memory Usage**:
     * Differences in memory footprint
     * Pre-allocation benefits
   
   - **Speed Estimation**:
     * Rough speedup factor for typical inputs
     * When optimization matters most (large N, real-time, etc.)

4. **MATLAB-Specific Optimizations**:
   - Vectorization examples and benefits
   - Built-in function advantages (fft vs manual DFT)
   - Matrix operation optimizations (BLAS/LAPACK usage)

5. **Trade-offs**:
   - **Gained**: [Performance, memory, etc.]
   - **Lost**: [Readability, educational clarity, etc.]
   - **Best Use Cases**: When to use each version

6. **Key Takeaways**:
   - What students should learn from this comparison
   - General MATLAB optimization principles demonstrated
   - How to recognize optimization opportunities

7. **Educational Value**:
   - Why learning both versions is important
   - What the brute-force teaches (algorithm understanding)
   - What the optimized version teaches (professional practices)

Provide a thorough comparison that teaches optimization thinking, not just code differences.
"""
        return self.respond(prompt)
