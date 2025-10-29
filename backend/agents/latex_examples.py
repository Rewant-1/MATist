"""
Few-shot examples for LaTeX report generation.
These examples demonstrate the expected format and structure for ECE MATLAB practical reports.
"""

LATEX_EXAMPLE_1 = r"""
%-----------------------------------------------
% EXPERIMENT 4
%-----------------------------------------------
\chapter{Linear Convolution of two sequence using
matrix multiplication method}
\label{ch:exp2}

\section{Aim}
\begin{itemize}
    \item To perform linear convolution of two discrete sequences using the matrix (Toeplitz) method in MATLAB.
    \item To verify the result by comparing with MATLAB's built-in \texttt{conv} function and using frequency domain multiplication.
\end{itemize}

\section{Theory}
Convolution is essential for analyzing Linear Time-Invariant (LTI) systems in signal processing. It describes how an input signal $x[n]$ interacts with a system's impulse response $h[n]$, with the output:
\[
y[n] = (x * h)[n] = \sum_{k=0}^{N_x-1} x[k] \cdot h[n-k]
\]
where $N_x$ and $N_h$ are the lengths of $x[n]$ and $h[n]$, respectively, and $N = N_x + N_h - 1$.

\textbf{Matrix/Toeplitz Method:}
\begin{itemize}
    \item The Toeplitz approach rewrites the convolution as a matrix operation: representing $x[n]$ by a Toeplitz matrix whose columns are shifted versions of $x[n]$ with zero padding.
    \item The vector $h[n]$ is padded as needed and treated as a column vector. Multiplying this matrix by $h[n]$ yields the convolution result.
    \item This method is computationally instructive and aligns with digital hardware implementations.
\end{itemize}
Besides the direct matrix method, convolution can also be examined in the frequency domain, where multiplication of DTFTs of sequences followed by inverse transform gives the same output.

\section{Structure for Plots}
For demonstration and verification, we display:
\begin{enumerate}
    \item \textbf{Input Sequence} ($x[n]$): The original signal.
    \item \textbf{Impulse Response} ($h[n]$): System characteristic.
    \item \textbf{Convolved Output} ($y[n]$): Resulting signal after convolution.
\end{enumerate}

Each is depicted as a stem plot for discrete-time clarity.

\section{MATLAB Code}

\begin{lstlisting}[caption={Linear Convolution via Matrix/Toeplitz Method}]
x = [6 4 5 7];
h = [3 2 1];

nx = length(x);
nh = length(h);
N = nx + nh - 1;

% Convolution by explicit convolution matrix 
H = [h, zeros(1, nx-1)];              
X = zeros(nx+nh-1, nx+nh-1);          

for i = 1:(nx+nh-1)
    for j = 1:(nx+nh-1)
        idx = i - j + 1;
        if (idx > 0) && (idx <= nx)
            X(i,j) = x(idx);
        end
    end
end

y_mat = X * H.';        % result from matrix multiplication 

% DTFT multiplication
w = linspace(-pi, pi, 2001);
Xw = zeros(size(w));
Hw = zeros(size(w));

for k = 1:length(w)
    Xw(k) = sum(x .* exp(-1j * w(k) * (0:(nx-1))));
    Hw(k) = sum(h .* exp(-1j * w(k) * (0:(nh-1))));
end

Yw = Xw .* Hw;

y_dtft = zeros(1, N);
for n = 0:(N-1)
    integrand = Yw .* exp(1j * w * n);
    y_dtft(n+1) = (1/(2*pi)) * trapz(w, integrand);
end

y_conv = conv(x, h);

subplot(3,1,1);
stem(0:nx-1, x, 'filled');
title('Signal x[n]');
xlabel('n'); ylabel('x[n]');
grid on;

subplot(3,1,2);
stem(0:nh-1, h, 'filled');
title('Impulse Response h[n]');
xlabel('n'); ylabel('h[n]');
grid on;

subplot(3,1,3);
stem(0:N-1, y_mat, 'filled');
title('Output y[n] = x[n] * h[n] (matrix method)');
xlabel('n'); ylabel('y[n]');
grid on;

disp('Convolution using DTFT (numerical, real part rounded):');
disp(round(real(y_dtft), 5));

disp('Using matrix multiplication:');
disp(y_mat.');

disp('Using inbuilt conv():');
disp(y_conv);

disp('Using DTFT property (complex values):');
disp(y_dtft);
\end{lstlisting}

\section{Result}

\begin{verbatim}
Using matrix multiplication:
    18    24    29    35    19     7

Using inbuilt conv():
    18    24    29    35    19     7

Using DTFT property (complex values):
  18.0000 + 0.0000i  24.0000 - 0.0000i  29.0000 - 0.0000i
  
  35.0000 + 0.0000i  19.0000 + 0.0000i   7.0000 + 0.0000i
\end{verbatim}
\noindent \textbf{Figures from MATLAB Output:}\\
\begin{figure}[H]
    \centering
    \includegraphics[width=1\textwidth]{Screenshot 2025-08-25 012955.png}
    \caption{Linear Convolution of two discrete time sequences}
    \label{fig:conv_input}
\end{figure}

\section{Conclusion}
\begin{itemize}
    \item This experiment confirms that matrix-based convolution matches the result from both the built-in MATLAB function and frequency-domain multiplication.
    \item The identical outputs from all three methods reinforce the accuracy and flexibility of the Toeplitz approach.
    \item Visual plots highlight each step of the convolution process, providing deeper understanding of signal manipulation in digital processing.
\end{itemize}
"""

LATEX_EXAMPLE_2 = r"""
%-----------------------------------------------
% EXPERIMENT 3
%-----------------------------------------------
\chapter{Impulse and Step Response for Type 0, Type 1 and Type 2 Systems}
\label{ch:exp3}

\section{Aim}
\begin{itemize}
    \item To study and compare impulse and step responses of Type 0, Type 1 and Type 2 systems.
\end{itemize}

\section{Apparatus}
\begin{itemize}
\item Matlab Software
\end{itemize}

\section{Theory}
\section*{Introduction}
In control systems, the dynamic behavior of a system can be studied using its \textbf{impulse response} and \textbf{step response}.
\begin{itemize}
    \item The \textbf{impulse response} represents how the system reacts to a very short input (Dirac delta), highlighting the natural dynamics of the system.
    \item The \textbf{step response} shows how the system responds to a sudden and sustained input, which is commonly used to analyze stability, steady-state error, and transient performance.
\end{itemize}

\section*{System Type Definition}
The type of a control system is defined by the number of pure integrators present in the open-loop transfer function. For a unity feedback system, if the open-loop transfer function is

\[
G(s) = \frac{K}{s^N P(s)},
\]

where $N$ is the number of poles at the origin, then the system is called \textbf{Type-$N$}.
\begin{itemize}
    \item \textbf{Type-0 System:} No pole at the origin ($N = 0$).
    \item \textbf{Type-1 System:} One pole at the origin ($N = 1$).
    \item \textbf{Type-2 System:} Two poles at the origin ($N = 2$).
\end{itemize}


\section{MATLAB Code}
\begin{lstlisting}[caption={Impulse and Step Response for Type 0, 1 and 2 Systems}]
% Made by - Rewant Bhriguvanshi, ECE A
t = 0:0.1:20;

num1 = [1]; den1 = [1 1 4];        
num2 = [1]; den2 = [1 1 4 0];     
num3 = [1]; den3 = [1 1 4 1 0];    

sys1 = tf(num1, den1);
sys2 = tf(num2, den2);
sys3 = tf(num3, den3);

[y1, t1] = step(sys1, t);
[y2, t2] = step(sys2, t);
[y3, t3] = step(sys3, t);

plot(t1, y1, 'r-', 'LineWidth', 1.5); hold on;
plot(t2, y2, 'b--', 'LineWidth', 1.5);
plot(t3, y3, 'g:', 'LineWidth', 2);
hold off;

xlabel('Time (s)');
ylabel('Step Response');
title('Step Response Comparison of Different Systems');
legend('System 1: 1/(s^2+s+4)', ...
       'System 2: 1/(s^3+s^2+4s)', ...
       'System 3: 1/(s^4+s^3+4s^2+s)', ...
       'Location','best');
grid on;

info1 = stepinfo(sys1);
info2 = stepinfo(sys2);
info3 = stepinfo(sys3);

disp('--- Step Response Characteristics ---');
disp('System 1: 1/(s^2+s+4)');
disp(info1);

disp('System 2: 1/(s^3+s^2+4s)');
disp(info2);

disp('System 3: 1/(s^4+s^3+4s^2+s)');
disp(info3);
\end{lstlisting}

\section{Result}

\begin{table}[h!]
\centering
\begin{tabular}{|l|c|c|c|}
\hline
\textbf{Characteristic} & \textbf{Type-0} & \textbf{Type-1} & \textbf{Type-2} \\
\hline
Rise Time (s)        & 0.6343 & NaN & NaN \\
Transient Time (s)   & 7.0579 & NaN & NaN \\
Settling Time (s)    & 7.0579 & NaN & NaN \\
Settling Min         & 0.2007 & NaN & NaN \\
Settling Max         & 0.3608 & NaN & NaN \\
Overshoot (\%)       & 44.3235 & NaN & NaN \\
Undershoot (\%)      & 0 & NaN & NaN \\
Peak                 & 0.3608 & Inf & Inf \\
Peak Time (s)        & 1.6579 & Inf & Inf \\
\hline
\end{tabular}
\caption{Step Response Characteristics of Type-0, Type-1, and Type-2 Systems}
\label{tab:step_response}
\end{table}

\begin{figure}[H]
    \centering
    \includegraphics[width=1.1\textwidth]{step_response.png}
    \caption{Step response for type 0, type 1 and type 2 function}
\end{figure}

\section{Conclusion}
\begin{itemize}
\item \textbf{Type 0 system:} Settles to a finite steady value for a step input, showing a finite steady-state error. Its impulse response decays stably.
\item \textbf{Type 1 system:} Produces an unbounded ramp in response to a step input (does not settle), but tracks a ramp input with finite error. Its impulse response decays, but the step never reaches steady state.
\item \textbf{Type 2 system:} Diverges even faster for a step input (parabolic growth), meaning it cannot handle step inputs without infinite error.
\item Thus, only the Type-0 system produces a stable and meaningful step response. Higher order types are useful for tracking higher-order inputs (ramp, parabolic), but they lose stability when subjected to simple step inputs.
\end{itemize}
"""

# Template structure for LaTeX reports
LATEX_STRUCTURE_GUIDELINES = """
REQUIRED SECTIONS:
1. \\chapter{} - The experiment title
2. \\section{Aim} - Use itemized list for objectives
3. \\section{Apparatus} - List required hardware/software
4. \\section{Theory} - Detailed theoretical background with formulas
5. \\section{MATLAB Code} - Code in lstlisting environment
6. \\section{Result} - Output tables, verbatim results, figures
7. \\section{Conclusion} - Bullet points summarizing findings

FORMATTING RULES:
- Use \\textbf{} for bold text
- Mathematical equations: inline with $...$ or display with \\[...\\]
- Code: \\begin{lstlisting}[caption={...}] ... \\end{lstlisting}
- Tables: Use tabular environment with proper formatting
- Figures: Use figure[H] environment with centering
- Lists: Use itemize or enumerate as appropriate
- Always include proper labels (\\label{}) for cross-referencing

STYLE GUIDELINES:
- Professional academic tone
- Clear, concise explanations
- Well-commented code
- Proper mathematical notation
- Comprehensive conclusion linking theory to results
"""
