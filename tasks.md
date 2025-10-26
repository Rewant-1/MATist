This is specially for ece-practical-interface and practical-tabs.tsx.

Currently this is the scene: User inputs and the output is generated 

4 tabs-> theory basic advanced and latex :
Currently the tab names are all in same teal/cyan color : I want them in different colours the colors with which they are associated below the names in which content comes for eg advanced has that orangish color something so tab name should also be in that color {only the name tab one okay}
Secondly
Okay, here's a comprehensive theoretical explanation of the Discrete Fourier Transform (DFT), suitable for ECE students preparing for practical work, especially in MATLAB:

Discrete Fourier Transform (DFT): A Comprehensive Theoretical Explanation
1. Introduction
The Discrete Fourier Transform (DFT) is a fundamental tool in digital signal processing (DSP) that transforms a finite-length sequence of discrete-time samples into a discrete-frequency representation. In essence, it decomposes a digital signal into its constituent frequencies, revealing the amplitudes and phases of these frequencies.

Why is it Important?

Frequency Domain Analysis: The DFT allows us to analyze signals in the frequency domain, providing insights that are not readily apparent in the time domain. This is crucial for understanding signal characteristics, identifying noise, and designing filters.
Digital Signal Processing: Many DSP algorithms, such as digital filtering, spectral analysis, and data compression, rely heavily on the DFT.
Communication Systems: The DFT is used in modulation/demodulation schemes, channel equalization, and other essential communication system components.
Practical Implementation: The DFT is easily implemented in software (e.g., MATLAB) or hardware, making it a versatile tool for real-world applications.
2. Fundamental Concepts
Before diving into the mathematics, let's define some core concepts:

Discrete-Time Signal: A sequence of values representing a signal sampled at discrete points in time. We denote it as x[n], where n is an integer representing the sample number. Consider x[n] to have N samples: n = 0, 1, 2, ..., N-1.
Frequency Domain: A representation of a signal in terms of its frequency components, rather than its amplitude over time.
Complex Exponential: A key building block of the DFT. It's a sinusoidal function with both magnitude and phase. In the DFT, we use a complex exponential with a specific frequency and phase shift.
Frequency Resolution: The spacing between adjacent frequency samples in the DFT output. A larger number of samples (N) in the input signal leads to finer frequency resolution.
Nyquist Frequency: The highest frequency that can be accurately represented by a discrete-time signal. It is equal to half the sampling rate (fs/2). Frequencies above the Nyquist frequency will be aliased.
DFT Output: The DFT output, X[k], is a sequence of N complex numbers, where k represents the frequency index (k = 0, 1, 2, ..., N-1). Each X[k] represents the magnitude and phase of the signal at a specific frequency.
3. Mathematical Foundation
The DFT equation is the heart of the transformation:

DFT (Analysis Equation):

X[k] = Σ (x[n] * e^(-j2πkn/N)),  for k = 0, 1, 2, ..., N-1
       n=0 to N-1
Where:

X[k] is the k-th frequency component of the DFT.
x[n] is the n-th sample of the input signal.
N is the total number of samples in the input signal.
k is the frequency index (0 to N-1).
n is the time index (0 to N-1).
j is the imaginary unit (√-1).
e^(-j2πkn/N) is the complex exponential (also called the twiddle factor). This represents a complex sinusoid with a frequency proportional to k.
Explanation of the Equation:

The DFT equation calculates each frequency component X[k] by summing the product of each input sample x[n] with a complex exponential. The complex exponential rotates in the complex plane as n varies from 0 to N-1. The frequency of this rotation is proportional to k. The summation effectively correlates the input signal with these complex sinusoids. If the input signal contains a frequency component close to the frequency of the complex exponential, the correlation will be high, resulting in a large magnitude for X[k].

Inverse DFT (Synthesis Equation):

To reconstruct the original signal from its DFT representation, we use the Inverse DFT (IDFT):

x[n] = (1/N) * Σ (X[k] * e^(j2πkn/N)),  for n = 0, 1, 2, ..., N-1
               k=0 to N-1
The IDFT equation is very similar to the DFT equation, except for the sign of the exponent and the scaling factor (1/N). It sums up the frequency components, each weighted by its corresponding complex exponential, to reconstruct the original time-domain signal.

Important Properties:

Linearity: The DFT is a linear transform. This means that the DFT of a linear combination of signals is equal to the linear combination of their individual DFTs.

Periodicity: The DFT output X[k] is periodic with a period of N. This means that X[k] = X[k + N]. This is important to consider when interpreting the frequency spectrum.

Symmetry: If the input signal x[n] is real-valued, the DFT output X[k] exhibits conjugate symmetry: X[k] = X[N-k]*, where X denotes the complex conjugate. This means that we only need to compute and store half of the DFT output for real-valued signals.

Parseval's Theorem: This theorem relates the energy of the signal in the time domain to the energy of the signal in the frequency domain:

Σ |x[n]|^2 = (1/N) * Σ |X[k]|^2
n=0 to N-1      k=0 to N-1
Parseval's theorem is valuable in signal analysis, allowing the calculation of energy or power in either the time or frequency domain.

Frequency Mapping:

The frequency index k in X[k] corresponds to a physical frequency, f. The relationship is:

f = k * (fs / N)
Where:

f is the frequency in Hz.
k is the frequency index (0 to N-1).
fs is the sampling frequency in Hz.
N is the number of samples.
Therefore:

k = 0 corresponds to DC (0 Hz).
k = N/2 corresponds to the Nyquist frequency (fs/2).
k > N/2 corresponds to frequencies above the Nyquist frequency (aliased frequencies).
4. Applications
The DFT has a wide range of applications in ECE:

Spectral Analysis: Identifying the frequency components present in a signal, such as identifying the fundamental frequency of a periodic signal or detecting the presence of noise.
Digital Filtering: Designing and implementing digital filters by manipulating the frequency components of a signal. For example, a low-pass filter can be implemented by setting the DFT coefficients corresponding to high frequencies to zero.
Communication Systems:
Modulation/Demodulation: The DFT is used in orthogonal frequency-division multiplexing (OFDM), a widely used modulation technique in wireless communication systems.
Channel Equalization: Compensating for the effects of the communication channel by estimating the channel's frequency response using the DFT.
Image Processing: The DFT can be extended to two dimensions (2D-DFT) and used for image analysis, filtering, and compression.
Audio Processing: Analyzing and manipulating audio signals, such as equalizing sound, removing noise, and compressing audio data.
Radar Signal Processing: Analyzing radar signals to detect and track objects.
5. Relevance to MATLAB Practical
In MATLAB, the fft() function implements the DFT. The ifft() function implements the IDFT. Understanding the theoretical concepts of the DFT is crucial for using these functions effectively and interpreting their results.

Practical Considerations in MATLAB:

Input Signal: When using fft(), the input signal must be a discrete-time sequence represented as a vector in MATLAB.
Sampling Rate: Knowing the sampling rate (fs) of your signal is essential for correctly interpreting the frequency axis in the DFT output. You'll need the sampling rate and the number of samples to calculate the frequency vector corresponding to the DFT output.
Frequency Axis: MATLAB's fft() returns a complex-valued array. To plot the magnitude spectrum, you typically use abs(fft(x)). The frequency axis should be scaled properly using the formula f = (0:N-1)*(fs/N);.
Symmetry: Remember that for real-valued input signals, the DFT output is conjugate symmetric. Therefore, you only need to plot the first half of the spectrum (up to the Nyquist frequency).
Magnitude and Phase: The DFT output X[k] is a complex number. Its magnitude, abs(X[k]), represents the amplitude of the frequency component, and its angle, angle(X[k]), represents the phase of the frequency component.
Zero-Padding: You can increase the frequency resolution of the DFT by zero-padding the input signal. This involves adding zeros to the end of the signal before performing the DFT. This effectively increases the number of samples, N, without changing the original signal content.
Windowing: To reduce spectral leakage (artifacts in the frequency spectrum caused by the finite length of the input signal), you can apply a window function (e.g., Hamming window, Hanning window) to the input signal before performing the DFT. MATLAB has functions like hamming() and hann() to generate these windows.
Fast Fourier Transform (FFT): The fft() function in MATLAB actually implements the Fast Fourier Transform (FFT) algorithm, which is an efficient algorithm for computing the DFT. The FFT significantly reduces the computational complexity of the DFT, making it practical for real-time applications.
Example MATLAB Code Snippet:

% Generate a sample signal (e.g., a sine wave)
fs = 1000;          % Sampling frequency (Hz)
T = 1;              % Signal duration (seconds)
t = 0:1/fs:T-1/fs;  % Time vector
f1 = 50;            % Frequency of the sine wave (Hz)
x = sin(2*pi*f1*t);   % Sine wave signal

% Compute the DFT
N = length(x);      % Number of samples
X = fft(x);         % DFT of the signal

% Create the frequency axis
f = (0:N-1)*(fs/N); % Frequency vector

% Plot the magnitude spectrum
figure;
plot(f, abs(X));
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Magnitude Spectrum of a Sine Wave');

% Limit the frequency axis to the Nyquist frequency
f_nyquist = fs/2;
X_nyquist = X(1:N/2+1);
f_axis_nyquist = f(1:N/2+1);

figure;
plot(f_axis_nyquist, abs(X_nyquist));
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Magnitude Spectrum of a Sine Wave (Nyquist)');

In summary, the DFT is a powerful tool for analyzing and manipulating signals in the frequency domain. Understanding its theoretical foundation and practical considerations in MATLAB is essential for ECE students and engineers. By mastering the DFT, you'll be well-equipped to tackle a wide range of signal processing challenges. Remember to experiment with different signals, windowing techniques, and zero-padding to gain a deeper understanding of the DFT's capabilities and limitations.

This is how the output came in theory explanation, now while the code is unnecessary here even when mathematical concepts are explained I want the mathematical terms and explanation writeen  to be in a canvas like thing which has the copy button right there only to copy that exact particular thing not copy whole at once.

Same thing for all tabs they have 2 options to copy one on top of box other on top of code and let me tell you the issues since the code is not on a canvas
```matlab
% Define the input signal (example: a sum of two sine waves)
% Sampling frequency
fs = 1000; % Hz
% Signal duration
T = 1; % second
% Time vector
t = 0:1/fs:T-1/fs;
% Frequencies of the sine waves
f1 = 50; % Hz
f2 = 120; % Hz
% Amplitudes of the sine waves
A1 = 0.7;
A2 = 0.3;
% Generate the signal
x = A1*sin(2*pi*f1*t) + A2*sin(2*pi*f2*t);

% Determine the length of the input signal
N = length(x);

% Optimized DFT using matrix multiplication (vectorization)
% Create the frequency vector
k = 0:N-1;
% Create the time vector
n = 0:N-1;
% Create the matrix of complex exponentials using meshgrid for vectorization
[kn, nn] = meshgrid(k, n);
W = exp(-1j * 2 * pi / N * kn .* nn); % Vectorized complex exponential calculation

% Calculate the DFT using matrix multiplication (highly optimized)
X = x * W; % Vectorized DFT calculation

% Calculate the magnitude spectrum
magnitude_spectrum = abs(X);

% Calculate the frequency axis
f = (0:N-1)*(fs/N);

% Plot the magnitude spectrum
figure;
plot(f, magnitude_spectrum);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Magnitude Spectrum of the Signal (Optimized DFT)');
grid on;

% Display some results in the command window
fprintf('DFT calculated using optimized matrix multiplication.\n');
fprintf('Number of samples: %d\n', N);
fprintf('Sampling frequency: %d Hz\n', fs);

% Find the peak frequencies (optional)
[peak_magnitude, peak_index] = max(magnitude_spectrum(1:N/2+1)); % Look at only positive frequencies
peak_frequency = f(peak_index);
fprintf('Peak frequency: %.2f Hz\n', peak_frequency);

% Verify using built-in FFT (for comparison)
X_fft = fft(x);
magnitude_spectrum_fft = abs(X_fft);

figure;
plot(f, magnitude_spectrum_fft);
xlabel('Frequency (Hz)');
ylabel('Magnitude');
title('Magnitude Spectrum of the Signal (Built-in FFT)');
grid on;

% Display a message indicating completion
disp('DFT calculation and plotting complete.');
```
This ``` comes whch ofc no one will want to paste in matlab code. Same for basic code advanced code latex code everything has this ``` thing which is never pasted in proper apps.

 If you need packages or imports to accomplish any of these things do it no issues at all. 

