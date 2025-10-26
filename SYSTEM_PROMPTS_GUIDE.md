# System Prompts Customization Guide

This guide shows you where all the system prompts are located in the ECE MATLAB Helper project and how to customize them to get better output.

## 📍 Location of All System Prompts

All agent prompts are in the `backend/agents/` directory:

### 1. **Theory Agent** - `backend/agents/theory_agent.py`
**Purpose**: Generates theoretical explanations for ECE topics

**Where to edit**: Line 6-28 (the `instructions` variable in `__init__`)

**Current behavior**: 
- Explains ECE concepts
- Includes mathematical foundations
- Describes real-world applications

**How to customize**:
```python
instructions = """
You are an expert ECE professor...

When explaining:
1. Start with fundamental definitions
2. Explain the mathematical foundation
3. [ADD YOUR OWN RULES HERE]
4. Include key formulas
5. Use proper technical terminology

Format your response with clear headings.
"""
```

**Pro tip**: Add few-shot examples after line 45 in the `explain_concept` method to show the model exactly what output format you want.

---

### 2. **Code Generator Agent** - `backend/agents/code_generator_agent.py`
**Purpose**: Generates brute-force and optimized MATLAB code

**Where to edit**: 
- **Brute-force code**: Lines 6-26 (instructions in `__init__`)
- **Brute-force prompt**: Lines 37-58 (`generate_brute_force_code` method)
- **Optimized code prompt**: Lines 73-94 (`generate_efficient_code` method)

**Current behavior**:
- Generates simple, well-commented code
- Avoids complex optimizations initially
- Focuses on educational value

**How to customize**:
```python
# In __init__ method:
instructions = """
Your role is to generate MATLAB code that:
1. Uses brute-force approach
2. Has extensive comments
3. [ADD: Always include plotting code]
4. [ADD: Use specific variable naming conventions]
5. Includes proper initialization

Your output should be pure MATLAB code.
"""

# In generate_brute_force_code method:
prompt = f"""
Generate MATLAB code for: {topic}

Requirements:
- [ADD: Always include input validation]
- [ADD: Add performance timing with tic/toc]
- [ADD: Include example test cases]
- Add detailed comments
"""
```

**Pro tip**: Add example MATLAB code snippets in the prompt to enforce your preferred style.

---

### 3. **Code Explainer Agent** - `backend/agents/code_explainer_agent.py`
**Purpose**: Explains how the MATLAB code works

**Where to edit**:
- **Instructions**: Lines 6-25
- **Brute-force explanation**: Lines 36-55 (`explain_code` method)
- **Optimization explanation**: Lines 57-85 (`explain_optimizations` method)

**Current behavior**:
- Breaks down code line-by-line
- Explains logic and algorithms
- Student-friendly language

**How to customize**:
```python
instructions = """
You explain MATLAB code with:
1. Line-by-line breakdown
2. Algorithm analysis
3. [ADD: Include time complexity analysis]
4. [ADD: Add memory usage discussion]
5. Clear, student-friendly language

Use markdown formatting.
"""
```

---

### 4. **LaTeX Generator Agent** - `backend/agents/latex_generator_agent.py`
**Purpose**: Creates complete LaTeX lab reports

**Where to edit**:
- **Instructions**: Lines 6-18
- **Report structure**: Lines 38-118 (the massive prompt in `generate_report` method)

**Current behavior**:
- Creates standard academic report
- Includes Aim, Theory, Code, Results, Conclusion
- Ready for Overleaf

**How to customize - THIS IS IMPORTANT**:

```python
# Around line 50-60, modify the LaTeX structure:
**Required LaTeX Structure:**

\\documentclass[12pt]{{article}}
\\usepackage{{amsmath, amssymb, graphicx, listings, xcolor, geometry}}
\\geometry{{a4paper, margin=1in}}

[ADD YOUR CUSTOM PACKAGES HERE]
\\usepackage{{circuitikz}}  % For circuit diagrams
\\usepackage{{pgfplots}}    % For plots

% MATLAB code formatting
\\lstset{{
    language=Matlab,
    basicstyle=\\ttfamily\\small,
    [CUSTOMIZE THESE SETTINGS]
}}

\\begin{{document}}

\\title{{ECE Practical: {topic}}}
\\author{{[CHANGE: Your University Name]}}
\\date{{\\today}}
\\maketitle

[ADD CUSTOM SECTIONS:]
\\section{{Hardware/Software Requirements}}
% Your custom section

\\section{{Theory}}
[SPECIFY EXACTLY HOW THEORY SHOULD BE FORMATTED]

[Continue customizing...]
```

**Pro tip for better LaTeX reports**:
Add few-shot examples around line 115:

```python
**Example of desired output:**

\\section{{Theory}}
\\subsection{{Introduction}}
The concept of {topic} is fundamental in ECE because...

\\subsection{{Mathematical Foundation}}
The governing equation is:
\\begin{{equation}}
y(t) = x(t) * h(t)
\\end{{equation}}

[This tells the AI exactly what format you want!]
```

---

## 🎯 Adding Few-Shot Examples (Most Powerful Technique)

Few-shot examples are the BEST way to get consistent, high-quality output. Here's how:

### Example 1: Better Theory Output

In `backend/agents/theory_agent.py`, modify the `explain_concept` method (around line 30):

```python
def explain_concept(self, topic: str) -> str:
    prompt = f"""
Provide a theoretical explanation for: {topic}

**EXAMPLE OUTPUT FORMAT** (follow this exactly):

## Introduction
Convolution is a mathematical operation that combines two signals...

## Fundamental Concepts
### Definition
Convolution is defined as: y(t) = x(t) * h(t) = ∫ x(τ)h(t-τ) dτ

### Physical Interpretation
In the time domain, convolution represents...

### Key Properties
1. **Commutative**: x*h = h*x
2. **Associative**: (x*h)*g = x*(h*g)

## Mathematical Foundation
[Include step-by-step derivation]

## Applications in ECE
1. **Filtering**: Used in FIR/IIR filters
2. **System Analysis**: LTI system response

## MATLAB Implementation Notes
To implement convolution in MATLAB, we use the conv() function...

---

**NOW GENERATE FOR TOPIC**: {topic}

Follow the exact structure shown above.
"""
    return self.respond(prompt)
```

### Example 2: Better MATLAB Code

In `backend/agents/code_generator_agent.py`, around line 45:

```python
prompt = f"""
Generate brute-force MATLAB code for: {topic}

**EXAMPLE OUTPUT** (your code should follow this style):

```matlab
% ========================================
% Practical: Convolution of Two Signals
% Author: Student Name
% Date: [Auto-generated]
% ========================================

% Clear workspace and command window
clear all;
close all;
clc;

% Define input signals
t = 0:0.01:10;  % Time vector
x = sin(2*pi*t);  % Signal 1: Sinusoid
h = exp(-t);     % Signal 2: Exponential decay

% Perform convolution (brute-force method)
N = length(x);
y = zeros(1, 2*N-1);  % Pre-allocate output

for n = 1:length(y)
    % Convolution formula implementation
    for k = 1:N
        if (n-k+1 > 0) && (n-k+1 <= N)
            y(n) = y(n) + x(k) * h(n-k+1);
        end
    end
end

% Display results
figure;
subplot(3,1,1); plot(t, x); title('Signal x(t)');
subplot(3,1,2); plot(t, h); title('Signal h(t)');
subplot(3,1,3); plot(y); title('Convolution y(t)');
```

**NOW GENERATE FOR**: {topic}

Use the same commenting style, structure, and clarity.
"""
```

---

## 🚀 Quick Customization Checklist

To improve output quality quickly:

1. **For better theory** → Edit `backend/agents/theory_agent.py`:
   - [ ] Add specific section requirements (lines 45-60)
   - [ ] Add example output format
   - [ ] Specify depth of mathematical detail

2. **For better MATLAB code** → Edit `backend/agents/code_generator_agent.py`:
   - [ ] Add code style example (lines 45-58)
   - [ ] Require specific commenting format
   - [ ] Add must-include features (plotting, validation, etc.)

3. **For better explanations** → Edit `backend/agents/code_explainer_agent.py`:
   - [ ] Request specific analysis depth
   - [ ] Add example explanation format
   - [ ] Specify technical detail level

4. **For better LaTeX** → Edit `backend/agents/latex_generator_agent.py`:
   - [ ] Customize document structure (lines 50-110)
   - [ ] Add university-specific formatting
   - [ ] Include example sections
   - [ ] Add custom packages

---

## 📝 Template for Adding Few-Shot Examples

Use this template in any agent's prompt:

```python
prompt = f"""
Your task: [describe task]

**EXAMPLE INPUT:**
[Show example input]

**DESIRED OUTPUT:**
[Show EXACTLY what you want the output to look like]

**EXPLANATION OF EXAMPLE:**
[Explain why this is the ideal format]

---

**NOW DO THIS FOR:**
{topic}

Follow the example format precisely.
"""
```

---

## 🎨 Testing Your Changes

After editing any prompt:

1. **Restart backend**: 
   ```powershell
   cd backend
   python app.py
   ```

2. **Test in UI**: Go to http://localhost:3000/ece-practical

3. **Check output**: See if it matches your expectations

4. **Iterate**: Refine prompts based on results

---

## 💡 Pro Tips

1. **Be specific**: "Generate well-commented code" is vague. "Add a comment above every loop explaining what it does" is specific.

2. **Use examples**: One good example is worth 100 words of instructions.

3. **Enforce structure**: Use markdown headings in prompts to force consistent output structure.

4. **Set constraints**: "Keep theory under 500 words", "Use exactly 5 sections", etc.

5. **Test incrementally**: Change one thing at a time, test, then move to the next.

---

## 🔧 Common Customizations

### Make code more detailed:
```python
# In code_generator_agent.py, add to instructions:
- Add at least 2 comments per 5 lines of code
- Include input validation for all user inputs
- Always add performance timing with tic/toc
- Include at least one plot per practical
```

### Make theory more concise:
```python
# In theory_agent.py, add:
- Keep each section under 200 words
- Use bullet points for key concepts
- Limit mathematical derivations to 2-3 steps
```

### Customize LaTeX for your university:
```python
# In latex_generator_agent.py, modify:
\\author{{Student Name \\\\ Roll No: _______ \\\\ Your University Name \\\\ Department of ECE}}
\\date{{Academic Year: 2024-25}}
```

---

## 📍 Quick Reference Table

| What to Change | File | Line Numbers |
|---------------|------|--------------|
| Theory format | `backend/agents/theory_agent.py` | 6-28, 45-60 |
| Code style | `backend/agents/code_generator_agent.py` | 6-26, 45-58 |
| Code explanation depth | `backend/agents/code_explainer_agent.py` | 36-55 |
| LaTeX structure | `backend/agents/latex_generator_agent.py` | 50-110 |
| All agent base behavior | `backend/agents/base_agent.py` | 6-20 |

---

## ✅ Final Notes

- **All prompts use the Gemini API** - changes take effect immediately after backend restart
- **No model retraining needed** - just edit the text prompts
- **Version control friendly** - all prompts are in Python files, easy to track changes
- **Safe to experiment** - you can always revert to original prompts

Happy customizing! 🚀
