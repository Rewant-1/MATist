from .base_agent import BaseAgent
import re

class CodeGeneratorAgent(BaseAgent):
    """Agent specialized in generating MATLAB code for ECE practicals."""
    
    def __init__(self):
        instructions = """You are a MATLAB code generation expert for ECE practicals.

You generate TWO types of code depending on the request:

=== BASIC/BRUTE-FORCE CODE (Beginner-Friendly) ===

**Purpose**: Educational implementation for students learning concepts

**Characteristics**:
1. **Explicit Logic**: Use loops and step-by-step operations instead of vectorization
2. **Extensive Comments**: 
   - Explain WHAT each section does
   - Explain WHY it's needed
   - Explain HOW it relates to the theory
3. **Clear Variable Names**: Descriptive names (e.g., `input_signal` not `x`)
4. **One Operation Per Line**: Avoid complex combined operations
5. **Detailed Output**: Print intermediate results to show progression
6. **Educational Structure**:
   - Clearly defined sections with comment headers
   - Show mathematical formulas in comments
   - Display computation steps

**Example - Basic Convolution**:
```matlab
% Linear Convolution - Brute Force Method
% This implements the mathematical definition directly
% Formula: y[n] = sum(x[k] * h[n-k]) for all k

% Define input sequences
x = [1, 2, 3, 4];        % Input signal
h = [1, 1, 1];           % Impulse response (moving average filter)

% Get lengths
Nx = length(x);           % Length of input signal
Nh = length(h);           % Length of impulse response
Ny = Nx + Nh - 1;        % Output length formula

% Initialize output array
y = zeros(1, Ny);         % Pre-allocate for efficiency

% Perform convolution using definition
% For each output sample n
for n = 1:Ny
    % Initialize sum for this output sample
    sum_value = 0;
    
    % For each possible k value in the summation
    for k = 1:Nx
        % Calculate the index for h (n-k+1 in MATLAB indexing)
        h_index = n - k + 1;
        
        % Check if index is valid for h array
        if h_index >= 1 && h_index <= Nh
            % Accumulate: x[k] * h[n-k]
            sum_value = sum_value + x(k) * h(h_index);
            
            % Display this multiplication (for understanding)
            fprintf('n=%d: x(%d) * h(%d) = %.2f * %.2f = %.2f\\n', ...
                    n-1, k-1, h_index-1, x(k), h(h_index), x(k)*h(h_index));
        end
    end
    
    % Store the computed output sample
    y(n) = sum_value;
    fprintf('Output y[%d] = %.2f\\n\\n', n-1, sum_value);
end

% Display final result
disp('Final convolution result:');
disp(y);

% Verify with MATLAB's built-in function
y_builtin = conv(x, h);
disp('MATLAB conv() result for verification:');
disp(y_builtin);

% Plot results for visualization
figure;
subplot(3,1,1);
stem(0:Nx-1, x, 'filled');
title('Input Signal x[n]');
xlabel('Sample index n');
ylabel('Amplitude');
grid on;

subplot(3,1,2);
stem(0:Nh-1, h, 'filled');
title('Impulse Response h[n]');
xlabel('Sample index n');
ylabel('Amplitude');
grid on;

subplot(3,1,3);
stem(0:Ny-1, y, 'filled');
title('Convolution Result y[n] = x[n] * h[n]');
xlabel('Sample index n');
ylabel('Amplitude');
grid on;
```

=== OPTIMIZED/EFFICIENT CODE (Production-Quality) ===

**Purpose**: Professional implementation using MATLAB's strengths

**Characteristics**:
1. **Vectorization**: Eliminate loops where possible using array operations
2. **Built-in Functions**: Leverage MATLAB's optimized functions
3. **Memory Efficiency**: Pre-allocation, minimal intermediate variables
4. **Computational Efficiency**: O(N log N) algorithms over O(N²) when applicable
5. **Professional Practices**:
   - Input validation
   - Error handling
   - Function encapsulation
   - Concise, efficient comments
6. **Performance-Oriented**: Optimized for speed and memory

**Example - Optimized Convolution**:
```matlab
% Optimized Linear Convolution using FFT
% Utilizes FFT for O(N log N) complexity vs O(N²) for direct method

function y = fast_convolution(x, h)
    % Validate inputs
    validateattributes(x, {'numeric'}, {'vector'});
    validateattributes(h, {'numeric'}, {'vector'});
    
    % Ensure row vectors for consistent operations
    x = x(:).';
    h = h(:).';
    
    % Determine FFT length (next power of 2 for efficiency)
    N = length(x) + length(h) - 1;
    nfft = 2^nextpow2(N);
    
    % Perform convolution via frequency domain multiplication
    % Convolution theorem: conv(x,h) = ifft(fft(x) .* fft(h))
    X = fft(x, nfft);           % FFT of input
    H = fft(h, nfft);           % FFT of impulse response
    Y = X .* H;                 % Frequency domain multiplication
    y = ifft(Y);                % Inverse FFT to time domain
    
    % Trim to correct length and keep only real part
    y = real(y(1:N));
end

% Example usage
x = [1, 2, 3, 4];
h = [1, 1, 1];
y = fast_convolution(x, h);

% Vectorized plotting
figure('Position', [100, 100, 1000, 400]);
signals = {x, h, y};
titles = {'Input Signal x[n]', 'Impulse Response h[n]', 'Output y[n]'};
xlabels = arrayfun(@(i) 0:length(signals{i})-1, 1:3, 'UniformOutput', false);

for i = 1:3
    subplot(1, 3, i);
    stem(xlabels{i}, signals{i}, 'filled', 'LineWidth', 1.5);
    title(titles{i}, 'FontSize', 12, 'FontWeight', 'bold');
    xlabel('n'); ylabel('Amplitude');
    grid on; axis tight;
end
```

**KEY DIFFERENCES**:
- Basic: Educational, verbose, shows every step
- Optimized: Professional, efficient, production-ready

**CRITICAL**: Generate ONLY MATLAB code. NO markdown fences. NO explanatory text outside comments.
"""
        super().__init__("CodeGeneratorAgent", instructions)
    
    @staticmethod
    def clean_code(code: str) -> str:
        """
        Remove markdown code fences and other formatting from generated code.
        
        Args:
            code: Raw code string that may contain markdown formatting
            
        Returns:
            Cleaned code string ready for direct use
        """
        # Remove markdown code fences (```matlab, ```python, ```)
        cleaned = re.sub(r'^```[a-zA-Z]*\n?', '', code.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r'\n?```$', '', cleaned.strip(), flags=re.MULTILINE)
        
        # Remove any remaining backticks at start/end
        cleaned = cleaned.strip('`').strip()
        
        return cleaned
    
    def generate_brute_force_code(self, topic: str, theory_context: str = "") -> str:
        """
        Generate brute-force MATLAB code for the given topic.
        
        Args:
            topic: The ECE practical topic
            theory_context: Optional theoretical context to inform code generation
            
        Returns:
            MATLAB code as a string
        """
        context_str = f"\n\nTheoretical Context:\n{theory_context}" if theory_context else ""
        
        prompt = f"""
Generate BASIC/BRUTE-FORCE MATLAB code for: {topic}
{context_str}

REQUIREMENTS FOR BASIC CODE:
1. **Educational Focus**: Write code that teaches concepts, not just solves problems
2. **Explicit Loops**: Use for/while loops to show the algorithm step-by-step
3. **Verbose Comments**: 
   - Comment header explaining the overall approach
   - Inline comments for EVERY significant line
   - Explain the mathematical formula being implemented
   - Reference the theory (e.g., "% Implements: y[n] = sum(x[k]*h[n-k])")
4. **Descriptive Variables**: Use clear, full names (not single letters)
5. **Intermediate Results**: Print/display steps to show progression
6. **Section Headers**: Use comment blocks to separate major sections
7. **One Step at a Time**: Avoid combining operations; show each step
8. **Include Verification**: Compare with MATLAB built-in functions
9. **Visualization**: Generate clear plots with labels and titles
10. **Error Explanations**: Add comments about common mistakes

EXAMPLE STRUCTURE:
```
%% [Topic Name] - Brute Force Implementation
% This code implements [concept] using the direct mathematical definition
% Formula: [mathematical formula]
% Author: ECE MATLAB Helper
% Purpose: Educational - Shows every computation step

%% Section 1: Initialize Inputs
% [Explain what inputs represent]
variable_name = [values];    % [Description of this variable]

%% Section 2: Setup and Pre-computation
% [Explain preparation steps]

%% Section 3: Main Algorithm
% [Detailed explanation of algorithm]
for i = 1:N
    % [Explain what this iteration does]
    % [Show formula being computed]
end

%% Section 4: Verification
% Compare with MATLAB's optimized function

%% Section 5: Visualization
% Create plots to understand results
```

CRITICAL: Output ONLY the MATLAB code. NO markdown code fences (```). NO explanatory text.
The code itself should be self-documenting through extensive comments.
"""
        raw_code = self.respond(prompt)
        return self.clean_code(raw_code)
    
    def generate_efficient_code(self, topic: str, brute_force_code: str) -> str:
        """
        Generate optimized MATLAB code based on the brute-force version.
        
        Args:
            topic: The ECE practical topic
            brute_force_code: The brute-force version to optimize
            
        Returns:
            Optimized MATLAB code or message if no optimization needed
        """
        prompt = f"""
Generate OPTIMIZED/EFFICIENT MATLAB code for: {topic}

Reference Basic Implementation:
{brute_force_code}

REQUIREMENTS FOR OPTIMIZED CODE:
1. **Vectorization**: Replace loops with vectorized operations where possible
2. **Built-in Functions**: Use MATLAB's optimized functions (fft, conv, filter, etc.)
3. **Algorithm Choice**: Use better algorithmic complexity (O(N log N) vs O(N²))
4. **Memory Efficiency**: 
   - Pre-allocate arrays
   - Minimize intermediate variables
   - Use in-place operations when safe
5. **Professional Structure**:
   - Function encapsulation with proper input validation
   - Error handling
   - Concise but meaningful comments
   - Performance-oriented
6. **MATLAB Best Practices**:
   - Avoid growing arrays in loops
   - Use column-major order
   - Leverage BLAS/LAPACK functions
   - Utilize GPU acceleration if applicable (mention in comments)
7. **Production Quality**:
   - Input validation with validateattributes
   - Handle edge cases
   - Return useful error messages
   - Include usage examples

OPTIMIZATION STRATEGIES BY TOPIC TYPE:

**For Convolution/Correlation**:
- Use FFT-based methods (conv vs fft+ifft comparison)
- Implement frequency domain multiplication
- Consider overlap-add/overlap-save for long sequences

**For Matrix Operations**:
- Use MATLAB's optimized matrix functions
- Avoid element-wise loops
- Utilize \ operator instead of inv()

**For Signal Processing**:
- Use filter() instead of manual difference equations
- Vectorize across time dimension
- Pre-compute coefficients

**For Transforms (FFT, DFT)**:
- Use built-in fft with optimal length (power of 2)
- Avoid manual summations
- Utilize symmetry properties

CRITICAL DECISION:
If the brute-force implementation is already optimal (e.g., already uses built-in functions effectively),
respond with ONLY this text: "No significant optimization possible - the basic implementation already uses MATLAB's optimized functions effectively."

Otherwise, output ONLY the optimized MATLAB code. NO markdown fences. NO explanations outside comments.
"""
        raw_code = self.respond(prompt)
        return self.clean_code(raw_code)
