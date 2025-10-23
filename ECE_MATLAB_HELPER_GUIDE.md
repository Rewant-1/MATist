# ECE MATLAB Practical Helper - Setup & Usage Guide

## Overview

The AI-Tutor project now includes a specialized **ECE MATLAB Practical Helper** that provides:

1. **Theory Explanation**: Detailed ECE concept explanations
2. **Brute-Force Code**: Simple, educational MATLAB implementations
3. **Code Explanation**: Step-by-step code breakdowns
4. **Optimized Code**: Efficient implementations (when applicable)
5. **Optimization Analysis**: Detailed comparison and improvements
6. **LaTeX Report**: Complete academic report ready for Overleaf

## Architecture

### Backend Agents

- **`TheoryAgent`**: Explains ECE theoretical concepts
- **`CodeGeneratorAgent`**: Generates both brute-force and optimized MATLAB code
- **`CodeExplainerAgent`**: Provides detailed code explanations
- **`LaTeXGeneratorAgent`**: Creates complete academic reports
- **`ECEMatlabAgent`**: Orchestrates the entire workflow

### Workflow

```
User Input (Topic)
       ↓
1. Theory Explanation
       ↓
2. Brute-Force Code Generation
       ↓
3. Brute-Force Code Explanation
       ↓
4. Optimization Check
       ↓
   [If applicable]
5. Efficient Code Generation
       ↓
6. Optimization Explanation
       ↓
7. LaTeX Report Generation
       ↓
   Complete Response
```

## Installation & Setup

### Backend

1. **Install dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Set up environment variables**:
Create a `.env` file in the `backend` directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. **Run the backend**:
```bash
python app.py
```
Server starts at `http://localhost:5000`

### Frontend

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Set up environment variables**:
Create `.env.local` in the `frontend` directory:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

3. **Run the frontend**:
```bash
npm run dev
```
Frontend starts at `http://localhost:3000`

## Usage

### Web Interface

1. Navigate to `http://localhost:3000/ece-practical`
2. Enter your ECE practical topic (e.g., "Convolution of two signals")
3. Click "Generate"
4. View results in tabs:
   - **Theory**: Detailed theoretical explanation
   - **Basic Code**: Brute-force MATLAB implementation
   - **Optimized Code**: Efficient version (if applicable)
   - **Explanation**: Code breakdowns and optimization notes
   - **LaTeX Report**: Complete academic report
5. Download the LaTeX report as a `.tex` file

### API Endpoint

**POST** `/api/ece-practical`

**Request Body**:
```json
{
  "topic": "Convolution of two signals"
}
```

**Response**:
```json
{
  "status": "success",
  "topic": "Convolution of two signals",
  "theory": "...",
  "brute_force_code": "...",
  "brute_force_explanation": "...",
  "efficient_code": "..." or null,
  "efficient_explanation": "..." or null,
  "optimization_applicable": true/false,
  "latex_report": "..."
}
```

## Example Topics

- Convolution of two signals
- Fast Fourier Transform (FFT)
- FIR Filter Design (using windowing method)
- IIR Filter Design
- Amplitude Modulation and Demodulation
- Sampling and Aliasing demonstration
- Discrete Fourier Transform (DFT)
- Digital Signal Processing operations
- Communication system simulations

## Features

### 1. Comprehensive Theory Explanations
- Fundamental concepts and definitions
- Mathematical foundations
- Real-world applications
- Relevance to practical implementation

### 2. Dual Code Generation
- **Brute-Force**: Simple, educational, easy-to-understand
- **Optimized**: Vectorized, efficient, production-ready

### 3. Detailed Explanations
- Step-by-step code breakdowns
- MATLAB function explanations
- Algorithmic analysis
- Performance comparisons

### 4. Academic LaTeX Reports
Complete reports with:
- Aim
- Objective
- Theory
- MATLAB Code
- Results (with placeholders)
- Observation (with initial points)
- Conclusion

## File Structure

```
backend/
├── agents/
│   ├── base_agent.py              # Base agent class
│   ├── ece_matlab_agent.py        # Main orchestrator
│   ├── theory_agent.py            # Theory explanations
│   ├── code_generator_agent.py    # MATLAB code generation
│   ├── code_explainer_agent.py    # Code explanations
│   └── latex_generator_agent.py   # LaTeX report generation
├── app.py                         # Flask application
└── requirements.txt               # Python dependencies

frontend/
├── app/
│   ├── page.tsx                   # Main chat interface
│   └── ece-practical/
│       └── page.tsx               # ECE practical interface
├── components/
│   ├── ece-practical-interface.tsx # ECE UI component
│   └── ui/                        # Reusable UI components
├── types/
│   └── chat.ts                    # TypeScript types
└── utils/
    └── api.ts                     # API client functions
```

## Customization

### Adding New Agent Capabilities

1. Extend existing agents in `backend/agents/`
2. Modify prompts in agent `__init__` methods
3. Add new methods for specific functionality

### Modifying the Workflow

Edit `ECEMatlabAgent.process_practical()` in `backend/agents/ece_matlab_agent.py`

### Customizing LaTeX Templates

Modify prompts in `LaTeXGeneratorAgent.generate_report()`

## Troubleshooting

### Backend Issues

- **Import errors**: Ensure all dependencies are installed: `pip install -r requirements.txt`
- **API key errors**: Verify `GEMINI_API_KEY` is set in `.env`
- **Port conflicts**: Change port in `app.py` if 5000 is in use

### Frontend Issues

- **Module not found**: Run `npm install` in the frontend directory
- **API connection**: Verify `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
- **Build errors**: Clear `.next` folder and rebuild

### Agent Issues

- **Timeout errors**: Increase request timeout in agent calls
- **Quality issues**: Refine prompts in agent instruction strings
- **Format errors**: Add validation and error handling in agent methods

## Future Enhancements

- [ ] Streaming responses for real-time updates
- [ ] Code execution and validation
- [ ] Plot generation and preview
- [ ] Multiple export formats (PDF, Word)
- [ ] Template customization UI
- [ ] Code comparison tools
- [ ] Performance benchmarking

## Contributing

When adding new features:
1. Follow existing agent patterns
2. Update type definitions
3. Add error handling
4. Update documentation
5. Test thoroughly with various topics

## License

Same as the main AI-Tutor project.
