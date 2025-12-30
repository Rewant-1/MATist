"""
Few-shot examples for LaTeX report generation.
These examples demonstrate the expected format and structure for ECE MATLAB practical reports,
based on the "Gold Standard" reference provided by the user.
"""

LATEX_PREAMBLE = r"""\documentclass[12pt,a4paper]{report}

\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{textcomp} % For Unicode minus sign
\usepackage{graphicx}    % For including graphics
\usepackage{amsmath}     % For math environments
\usepackage{amssymb}     % For math symbols
\usepackage{setspace}    % For line spacing
\usepackage{hyperref}    % For hyperlinks in the PDF
\usepackage{geometry}    % For page layout
\usepackage{mdframed}    % For framing the title page
\usepackage{listings}    % For code listings
\usepackage{xcolor}      % For color in code
\usepackage{titlesec}    % For custom section/chapter headings
\usepackage{ragged2e}
\usepackage{fancyhdr}
\usepackage{booktabs}
\usepackage{float}
\tolerance=1
\emergencystretch=\maxdimen
\hyphenpenalty=10000
\hbadness=10000

\geometry{
    left=1in,
    right=1in,
    top=1in,
    bottom=1in
}

%------------------------------------------------
% CUSTOM COLORS FOR CODE LISTINGS
%------------------------------------------------
\definecolor{mCodeBackground}{rgb}{0.95,0.95,0.95}
\definecolor{mCodeComment}{rgb}{0,0.5,0}
\definecolor{mCodeString}{rgb}{0.6,0.1,0.1}
\definecolor{mCodeKeywords}{rgb}{0,0,1}

%------------------------------------------------
% GLOBAL LISTINGS CONFIGURATION
%------------------------------------------------
\lstset{%
    language=Matlab,
    backgroundcolor=\color{mCodeBackground},
    basicstyle=\ttfamily\footnotesize,
    keywordstyle=\color{mCodeKeywords}\bfseries,
    stringstyle=\color{mCodeString},
    commentstyle=\color{mCodeComment},
    numbers=left,
    numberstyle=\tiny,
    stepnumber=1,
    showspaces=false,
    showstringspaces=false,
    breaklines=true,
    frame=single,                % Draw a box around the code
    framerule=0.5pt,            % Thickness of the frame
    rulecolor=\color{black}     % Frame color
}

\makeatletter
\renewcommand{\@chapapp}{Experiment}
\makeatother

%------------------------------------------------
% CENTER AND UNDERLINE "Experiment X" HEADINGS
% REMOVE EXTRA SPACE ABOVE
%------------------------------------------------
\titleformat{\chapter}[display]
  {\normalfont\huge\bfseries\centering}
  {\underline{Experiment \thechapter}}
  {0pt}{\LARGE}

\titlespacing*{\chapter}{0pt}{-1em}{2em}  

%------------------------------------------------
% CUSTOM HEADER AND FOOTER STYLE WITH LINES
%------------------------------------------------
\pagestyle{fancy}
\fancyhf{}  % Clear all header and footer fields
% NOTE: You can update the Roll No. and Name here or make them generic placeholders
\fancyhead[L]{\textit{Roll No.: [ROLL_NO] | B. Tech. ECE}}  % Left header text
\fancyhead[R]{\textit{Experiment \thechapter}}              % Right header
\fancyfoot[C]{\thepage}                                     % Centered footer
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0.4pt}

%------------------------------------------------
% BEGIN DOCUMENT
%------------------------------------------------
"""

LATEX_EXAMPLE_1 = r"""
%-----------------------------------------------
% EXPERIMENT 4
%-----------------------------------------------
\chapter{DC Motor Speed: Simulink Modeling}
\label{ch:exp4}

\section{Aim}
To model and simulate the dynamics of a DC motor using Simulink and Simscape, and to analyze the motor’s speed response.

\section{Apparatus / Software Required}
\begin{itemize}
    \item MATLAB with Simulink and Simscape libraries
    \item Computer system
\end{itemize}

\section{Theory}
A DC motor converts electrical energy into mechanical rotational energy.  
For an armature-controlled DC motor, the governing equations are derived using Newton’s Law for rotation and Kirchhoff’s Law for the electrical circuit.

\subsection{Motor Torque and Back EMF}
The torque developed is proportional to the armature current:
\begin{equation}
T = K_{t} i
\end{equation}

The back electromotive force (emf) is proportional to the angular velocity:
\begin{equation}
e = K_{e} \dot{\theta}
\end{equation}
For SI units, we assume $K_t = K_e = K$.

\subsection{Mechanical Dynamics}
Applying Newton’s second law to the rotor:
\begin{equation}
J \frac{d^2 \theta}{dt^2} = K i - b \frac{d\theta}{dt}
\end{equation}
where
\begin{itemize}
    \item $J$ = moment of inertia of the rotor
    \item $b$ = viscous friction constant
\end{itemize}

\subsection{Electrical Dynamics}
Applying Kirchhoff’s voltage law to the armature:
\begin{equation}
L \frac{di}{dt} = -Ri + V - K \frac{d\theta}{dt}
\end{equation}
where
\begin{itemize}
    \item $R$ = resistance of armature
    \item $L$ = inductance of armature
    \item $V$ = applied voltage
\end{itemize}

\section{Result}
The motor’s speed response was simulated for a step input voltage.
\begin{itemize}
    \item The speed rises gradually due to inertia and inductance.
    \item Steady-state speed is determined by the balance of voltage, back emf, and damping.
    \item Transient response depends on $J$, $L$, and $b$.
\end{itemize}

\begin{figure}[H]
    \centering
    \includegraphics[width=0.8\textwidth]{cs_04_03.png}
    \caption{Angular speed response of the DC Motor}
\end{figure}

\section{Conclusion}
\begin{itemize}
    \item The DC motor was modeled successfully using both mathematical and physical Simulink approaches.
    \item The speed response shows first-order lag characteristics.
    \item This model forms the basis for future controller design.
\end{itemize}
"""

LATEX_EXAMPLE_2 = r"""
%-----------------------------------------------
% EXPERIMENT 6
%-----------------------------------------------
\chapter{Routh–Hurwitz Stability Analysis and Root Locus Plot}
\label{ch:exp6}

\section{Aim}
To determine the stability of a system using the Routh–Hurwitz criterion and to plot the Root Locus of the given characteristic equation using MATLAB.

\section{Apparatus / Software Required}
\begin{itemize}
    \item MATLAB (Control System Toolbox)
    \item Computer system
\end{itemize}

\section{Theory}
The Routh–Hurwitz criterion determines the number of roots of a characteristic equation lying in the right half of the $s$-plane without solving for them explicitly.

For the polynomial
\[
a_0 s^n + a_1 s^{n-1} + \dots + a_n = 0,
\]
the system is stable if and only if all elements of the first column of the Routh array are positive.

The \textbf{Root Locus} plot shows how closed-loop poles move as gain $K$ varies.

\section{MATLAB Code}
\begin{lstlisting}[caption={Routh–Hurwitz Criterion and Root Locus}]
e = input("Enter characteristic equation coefficients: ");
l = length(e);
% ... (Code omitted for brevity)
if all(c(:,1) > 0)
    disp('System is Stable');
else
    disp('System is Unstable');
end

% Root Locus for sample transfer function
num = [1];
den = [1 8 17 0];
figure;
rlocus(num, den);
grid on;
title('Root Locus of the Given System');
\end{lstlisting}

\section{Result}
\noindent\textbf{Sample Console Output:}
\begin{verbatim}
Enter characteristic equation coefficients: [2 0 0 0]
The Routh matrix:
     2
     0
System is Unstable
\end{verbatim}

\section{Observation}
\begin{itemize}
    \item Routh array successfully formed.
    \item Sign changes in first column indicate instability.
    \item Root Locus confirms poles in right half-plane.
\end{itemize}

\begin{figure}[H]
    \centering
    \includegraphics[width=0.8\textwidth]{rlocus_plot.png}
    \caption{Root Locus of the Given System}
\end{figure}

\section{Conclusion}
\begin{itemize}
    \item Routh–Hurwitz method verified system stability mathematically.
    \item Sign change in the first column implies instability.
    \item Root Locus visualization supports analytical results.
\end{itemize}
"""

# Template structure for LaTeX reports
LATEX_STRUCTURE_GUIDELINES = """
REQUIRED SECTIONS:
1. \\chapter{} - The experiment title
2. \\section{Aim} - Use itemized list for objectives
3. \\section{Apparatus / Software Required}
4. \\section{Theory} - Detailed theoretical background with formulas
5. \\section{MATLAB Code} - Code in lstlisting environment with caption
6. \\section{Result} - Output tables, verbatim results, figures
7. \\section{Conclusion} - Bullet points summarizing findings

FORMATTING RULES (Based on Gold Standard):
- Preamble: Must use the specific \\documentclass{report}, \\usepackage{titlesec}, \\usepackage{fancyhdr}, etc. as defined in LATEX_PREAMBLE.
- Fonts/Style: \\chapter with underline, \\fancyhdr for headers/footers with lines.
- Code: Use \\definecolor for custom code highlighting (mCodeBackground, mCodeKeywords, etc.) and \\lstset with frame=single.
- Figures: Use figure[H] environment.
- Formatting: Use \\section{} but check indentation and spacing.
"""
