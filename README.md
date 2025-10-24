# ECE MATLAB Helper# ECE MATLAB Helper



A sophisticated educational platform powered by Google's Gemini AI, designed specifically for **Electronics & Communication Engineering (ECE)** students working with MATLAB practicals.A sophisticated educational platform powered by Google's Gemini AI, designed specifically for **Electronics & Communication Engineering (ECE)** students working with MATLAB practicals. Features automated theory explanations, code generation, and LaTeX report generation.



## 🚀 Features## 🚀 Live Demo



### Chat Interface- **Frontend**: [https://multi-ai-tutor.vercel.app/](https://multi-ai-tutor.vercel.app/)

- Real-time chat with ECE-focused AI assistant- **Backend API**: [Render Deployment](https://ai-tutor-multi-agent.onrender.com)

- Help with ECE concepts and theory

- MATLAB programming assistance## 📋 Table of Contents

- Code explanations and debugging

- Signal processing guidance- [Overview](#overview)

- Communication systems help- [Architecture](#architecture)

- [Features](#features)

### ECE MATLAB Practical Helper (`/ece-practical` page)- [Tech Stack](#tech-stack)

- [Installation](#installation)

Complete workflow for ECE practicals:- [Usage](#usage)

- [API Documentation](#api-documentation)

1. **Theory Explanation**: Comprehensive ECE concept explanations- [ECE MATLAB Agent](#ece-matlab-agent)

   - Signal Processing (convolution, FFT, filtering)- [Deployment](#deployment)

   - Communication Systems (modulation, sampling)- [Contributing](#contributing)

   - Circuit Analysis and more

## 🎯 Overview

2. **Brute-Force Code Generation**: Simple, educational MATLAB implementations

   - Clear comments explaining each stepThis ECE MATLAB Helper leverages Google's Gemini AI to provide personalized educational assistance for **Electronics & Communication Engineering (ECE)** students. The system helps with MATLAB practicals, signal processing, communication systems, and circuit analysis.

   - Beginner-friendly logic

   - Easy to understand and modify### Key Capabilities



3. **Code Explanation**: Step-by-step breakdowns- **ECE-Focused Assistance**: Specialized help for ECE concepts and MATLAB programming

   - Line-by-line explanations- **🆕 ECE MATLAB Practical Helper**: Complete practical workflow from theory to LaTeX report

   - MATLAB function descriptions  - Theory explanations for ECE concepts

   - Algorithmic insights  - Brute-force MATLAB code generation

  - Optimized code implementations

4. **Optimization (Conditional)**: Efficient implementations  - Step-by-step code explanations

   - Vectorized operations  - Complete LaTeX academic reports

   - Built-in MATLAB functions- **Computational Tools**: Built-in calculator and physics constants database

   - Performance improvements- **Real-time Interaction**: Smooth, responsive chat interface with typing indicators

- **Modern UI/UX**: Dark mode, animations, and mobile-responsive design

5. **LaTeX Report Generation**: Academic-ready reports

   - Aim, Objective, Theory sections## 🏗 Architecture

   - Formatted MATLAB code

   - Results and Observation placeholdersThe system follows a clean multi-agent architecture with clear separation of concerns:

   - Ready for Overleaf compilation

```

**Example Topics:**                    ┌─────────────────────────────────────┐

- Convolution of two signals                    │            USER INTERFACE           │

- Fast Fourier Transform (FFT)                    │         (Next.js Frontend)          │

- FIR/IIR Filter Design                    │                                     │

- Amplitude/Frequency Modulation                    │  ┌─────────────────────────────┐    │

- DFT implementation                    │  │      Chat Interface         │    │

- And many more ECE practicals!                    │  │   • Message Input/Output    │    │

                    │  │   • Agent Response Display  │    │

## 🛠 Tech Stack                    │  │   • Real-time Updates       │    │

                    │  └─────────────────────────────┘    │

### Frontend                    └─────────────────┬───────────────────┘

- **Framework**: Next.js 15 with TypeScript                                      │ HTTP/REST API

- **UI Library**: React 19                                      ▼

- **Styling**: Tailwind CSS + shadcn/ui components                    ┌─────────────────────────────────────┐

- **Animations**: Framer Motion                    │         FLASK API GATEWAY           │

- **Icons**: Lucide React                    │                                     │

                    │  ┌─────────────────────────────┐    │

### Backend                    │  │       Tutor Agent           │    │

- **Framework**: Flask (Python)                    │  │    (Request Router)         │    │

- **AI Integration**: Google Generative AI (Gemini)                    │  │                             │    │

- **CORS**: Flask-CORS                    │  │  • Query Analysis           │    │

- **Environment**: python-dotenv                    │  │  • Agent Selection Logic    │    │

                    │  │  • Response Coordination    │    │

### Deployment                    │  └─────────────┬───────────────┘    │

- **Frontend**: Vercel                    │                │                    │

- **Backend**: Render                    │       ┌────────┴────────┐           │

                    │       ▼                 ▼           │

## 🚀 Installation                    │  ┌──────────┐      ┌──────────┐     │

                    │  │   MATH   │      │ PHYSICS  │     │

### Prerequisites                    │  │  AGENT   │      │  AGENT   │     │

- Node.js 18+ and npm/yarn/pnpm                    │  │          │      │          │     │

- Python 3.8+                    │  │ • Algebra│      │ • Mechanics    │

- Google AI API key ([Get it here](https://ai.google.dev))                    │  │ • Calculus│     │ • Thermodynamics│

                    │  │ • Geometry│     │ • Electromagnetism│

### Backend Setup                    │  └────┬─────┘      └─────┬────┘     │

                    │       │                  │          │

1. **Clone the repository**                    │       └────────┬─────────┘          │

   ```bash                    │                ▼                    │

   git clone https://github.com/Paulie-Aditya/ai-tutor-multi-agent.git                    │  ┌─────────────────────────────┐    │

   cd ai-tutor-multi-agent/backend                    │  │         TOOL LAYER          │    │

   ```                    │  │                             │    │

                    │  │  ┌─────────┐ ┌─────────────┐│    │

2. **Create virtual environment**                    │  │  │Calculator│ │Physics      ││    │

   ```bash                    │  │  │Tool     │ │Constants    ││    │

   python -m venv venv                    │  │  │         │ │Database     ││    │

   source venv/bin/activate  # On Windows: venv\Scripts\activate                    │  │  └─────────┘ └─────────────┘│    │

   ```                    │  └─────────────────────────────┘    │

                    └─────────────────┬───────────────────┘

3. **Install dependencies**                                      │

   ```bash                                      ▼

   pip install -r requirements.txt                    ┌─────────────────────────────────────┐

   ```                    │          GEMINI AI SERVICE          │

                    │                                     │

4. **Environment setup**                    │    • Natural Language Processing    │

   ```bash                    │    • Mathematical Reasoning         │

   # Create .env file and add:                    │    • Physics Knowledge Base         │

   GEMINI_API_KEY=your_gemini_api_key_here                    │    • Contextual Understanding       │

   ```                    └─────────────────────────────────────┘

```

5. **Run the backend**

   ```bash### Component Interactions:

   python app.py

   ```1. **User Query Flow**: User inputs question → Frontend sends to Flask API

   Backend will start on `http://localhost:5000`2. **Agent Routing**: Tutor Agent analyzes query and selects appropriate specialist agent

3. **Tool Integration**: Specialist agents utilize computational tools when needed

### Frontend Setup4. **AI Processing**: Agents leverage Gemini AI for intelligent responses

5. **Response Delivery**: Formatted response sent back through the chain to user

1. **Navigate to frontend directory**

   ```bash## ✨ Features

   cd ../frontend

   ```### 🆕 ECE MATLAB Practical Helper



2. **Install dependencies****Access via**: `/ece-practical` page

   ```bash

   npm installComplete workflow for ECE practicals:

   # or

   yarn install1. **Theory Explanation**: Comprehensive ECE concept explanations

   # or   - Signal Processing (convolution, FFT, filtering)

   pnpm install   - Communication Systems (modulation, sampling)

   ```   - Circuit Analysis and more



3. **Environment setup**2. **Brute-Force Code Generation**: Simple, educational MATLAB implementations

   ```bash   - Clear comments explaining each step

   # Create .env.local and add:   - Beginner-friendly logic

   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000   - Easy to understand and modify

   ```

3. **Code Explanation**: Step-by-step breakdowns

4. **Run the frontend**   - Line-by-line explanations

   ```bash   - MATLAB function descriptions

   npm run dev   - Algorithmic insights

   ```

   Frontend will start on `http://localhost:3000`4. **Optimization (Conditional)**: Efficient implementations

   - Vectorized operations

## 📖 Usage   - Built-in MATLAB functions

   - Performance improvements

### Chat Interface

1. Open `http://localhost:3000`5. **LaTeX Report Generation**: Academic-ready reports

2. Ask questions about ECE concepts, MATLAB programming, signal processing, etc.   - Aim, Objective, Theory sections

3. Get instant AI-powered responses   - Formatted MATLAB code

   - Results and Observation placeholders

**Example Questions:**   - Ready for Overleaf compilation

- "Explain convolution of two signals with MATLAB code"

- "How do I implement FFT in MATLAB?"**Example Topics:**

- "What is amplitude modulation?"- Convolution of two signals

- "Help me design an FIR filter"- Fast Fourier Transform (FFT)

- FIR/IIR Filter Design

### ECE Practical Helper- Amplitude/Frequency Modulation

1. Navigate to `/ece-practical` page- DFT implementation

2. Enter your practical topic (e.g., "Convolution of two signals")- And many more ECE practicals!

3. Get complete practical package:

   - Theory explanation### Frontend Features

   - Brute-force MATLAB code

   - Optimized code (if applicable)- **Interactive Chat Interface**: Real-time messaging with message history

   - Code explanations- **Agent Identification**: Visual badges showing which agent responded

   - LaTeX report- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

- **Dark Mode**: Eye-friendly interface with theme persistence

## 📚 API Documentation- **Typing Indicators**: Visual feedback during AI processing

- **Smooth Animations**: Framer Motion powered transitions

### Base URL- **Copy to Clipboard**: Easy sharing of responses

- **Development**: `http://localhost:5000`- **Error Handling**: Graceful error display and recovery

- **Production**: `https://ai-tutor-multi-agent.onrender.com`

### Backend Features

### Endpoints

- **Multi-Agent Architecture**: Specialized agents for different domains

#### `POST /api/chat`- **Intelligent Routing**: Context-aware query delegation

Send a message to the ECE MATLAB helper.- **Tool Integration**: Seamless access to computational tools

- **Error Recovery**: Robust error handling and fallback mechanisms

**Request Body:**- **CORS Support**: Secure cross-origin resource sharing

```json- **Environment Management**: Secure API key handling

{

  "messages": [## 🛠 Tech Stack

    { "role": "user", "content": "Explain FFT in MATLAB" }

  ]### Frontend

}

```- **Framework**: Next.js 14 with TypeScript

- **Styling**: Tailwind CSS + shadcn/ui components

**Response:**- **Animations**: Framer Motion

```json- **State Management**: React hooks (useState, useEffect)

{- **HTTP Client**: Axios with interceptors

  "response": "FFT (Fast Fourier Transform) is...",- **Icons**: Lucide React

  "agent": "ECE MATLAB Helper",

  "reason": "ECE MATLAB educational assistant"### Backend

}

```- **Framework**: Flask (Python)

- **AI Integration**: Google Generative AI (Gemini)

#### `POST /api/ece-practical`- **CORS**: Flask-CORS

Process an ECE MATLAB practical topic.- **Environment**: python-dotenv

- **Error Handling**: Custom middleware

**Request Body:**

```json### Deployment

{

  "topic": "Convolution of two signals"- **Frontend**: Vercel (Global CDN)

}- **Backend**: Render (Containerized deployment)

```- **Environment**: Secure environment variable management



**Response:**## 🚀 Installation

```json

{### Prerequisites

  "status": "success",

  "topic": "Convolution of two signals",- Node.js 18+ and npm/yarn

  "theory": "...",- Python 3.8+

  "brute_force_code": "...",- Google AI API key ([Get it here](https://ai.google.dev))

  "brute_force_explanation": "...",

  "efficient_code": "..." or null,### Backend Setup

  "efficient_explanation": "..." or null,

  "optimization_applicable": true/false,1. **Clone the repository**

  "latex_report": "..."

}   ```bash

```   git clone https://github.com/Paulie-Aditya/ai-tutor-multi-agent.git

   cd ai-tutor-multi-agent/backend

#### `GET /api/health`   ```

Check API health status.

2. **Create virtual environment**

**Response:**

```json   ```bash

{   python -m venv venv

  "status": "ok",   source venv/bin/activate  # On Windows: venv\Scripts\activate

  "message": "Tutor system is healthy."   ```

}

```3. **Install dependencies**



#### `GET /api/agents`   ```bash

Get information about available agents.   pip install -r requirements.txt

   ```

**Response:**

```json4. **Environment setup**

{

  "available_agents": ["ECE MATLAB Helper"],   ```bash

  "status": "ECE MATLAB agent loaded",   cp .env.example .env

  "description": "Expert assistant for ECE practicals, MATLAB programming, and electronics concepts"   # Add your GEMINI_API_KEY to .env

}   ```

```

5. **Run the backend**

## 🏗 Project Structure   ```bash

   python app.py

```   ```

ece-matlab-helper/   Backend will start on `http://localhost:5000`

├── backend/

│   ├── agents/### Frontend Setup

│   │   ├── base_agent.py           # Base agent class

│   │   ├── ece_matlab_agent.py     # ECE MATLAB specialist1. **Navigate to frontend directory**

│   │   ├── code_generator_agent.py # MATLAB code generator

│   │   ├── code_explainer_agent.py # Code explanation agent   ```bash

│   │   ├── latex_generator_agent.py# LaTeX report generator   cd ../frontend

│   │   └── tutor_agent.py          # Main routing agent   ```

│   ├── tools/                      # (Empty - no tools needed)

│   ├── app.py                      # Flask application2. **Install dependencies**

│   └── requirements.txt            # Python dependencies

├── frontend/   ```bash

│   ├── app/   npm install

│   │   ├── page.tsx                # Main chat page   # or

│   │   ├── layout.tsx              # Root layout   yarn install

│   │   ├── globals.css             # Global styles   ```

│   │   └── ece-practical/

│   │       └── page.tsx            # ECE practical page3. **Environment setup**

│   ├── components/

│   │   ├── chat-interface.tsx      # Chat UI component   ```bash

│   │   ├── ece-practical-interface.tsx # Practical UI   cp .env.example .env.local

│   │   └── ui/                     # shadcn/ui components   # Add NEXT_PUBLIC_API_URL=http://localhost:5000

│   ├── types/   ```

│   │   └── chat.ts                 # TypeScript types

│   ├── utils/4. **Run the frontend**

│   │   └── api.ts                  # API client   ```bash

│   └── package.json   npm run dev

└── README.md   # or

```   yarn dev

   ```

## 🚀 Deployment   Frontend will start on `http://localhost:3000`



### Frontend (Vercel)## 📖 Usage

1. Connect GitHub repository to Vercel

2. Set environment variable: `NEXT_PUBLIC_BACKEND_URL`### Basic Usage

3. Deploy automatically on push

1. **Open the application** at `http://localhost:3000`

### Backend (Render)2. **Type your question** in the chat input

1. Connect GitHub repository to Render3. **Send your message** - the system will automatically route it to the appropriate agent

2. Set environment variable: `GEMINI_API_KEY`4. **View the response** with agent identification badges

3. Deploy automatically on push

### Example Queries

## 🤝 Contributing

**Math Questions:**

1. Fork the repository

2. Create a feature branch: `git checkout -b feature/amazing-feature`- "Solve the quadratic equation x² + 5x + 6 = 0"

3. Commit your changes: `git commit -m 'Add amazing feature'`- "Calculate the integral of sin(x) from 0 to π"

4. Push to the branch: `git push origin feature/amazing-feature`- "What is the derivative of e^(2x)?"

5. Open a Pull Request

**Physics Questions:**

## 📝 License

- "Explain Newton's second law of motion"

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.- "What is the speed of light in vacuum?"

- "Calculate the kinetic energy of a 2kg object moving at 10 m/s"

## 🙏 Acknowledgments

**Calculation Requests:**

- **Google AI** for providing the Gemini API

- **Vercel** for frontend hosting- "Calculate 15 \* 23 + 47"

- **Render** for backend deployment- "What is the square root of 144?"

- **shadcn/ui** for beautiful UI components- "Evaluate (5 + 3) \* 2 - 4"

- **Next.js** and **Flask** communities

## 📚 API Documentation

## 📞 Support

### Base URL

If you encounter any issues:

1. Check the [Issues](https://github.com/Paulie-Aditya/ai-tutor-multi-agent/issues) page- **Development**: `http://localhost:5000`

2. Create a new issue with detailed description- **Production**: `https://ai-tutor-multi-agent.onrender.com`



---### Endpoints



Built with ❤️ for ECE students#### `POST /api/chat`


Send a message to the tutor system.

**Request Body:**

```json
{
  "messages": [{ "role": "user", "content": "What is the derivative of x²?" }]
}
```

**Response:**

```json
{
  "response": "The derivative of x² is 2x.",
  "agent": "MathAgent",
  "reason": "The user is asking for the derivative of x² which falls under mathematics."
}
```

#### `GET /api/health`

Check API health status.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00Z"
}
```

#### `GET /api/agents`

Get information about available agents.

**Response:**

```json
{
  "agents": [
    {
      "name": "math",
      "description": "Specialized in mathematical problems and calculations",
      "tools": ["calculator"]
    },
    {
      "name": "physics",
      "description": "Expert in physics concepts and calculations",
      "tools": ["physics_constants", "calculator"]
    }
  ]
}
```

## 🤖 Agent System

### Base Agent Architecture

All agents inherit from the `BaseAgent` class, providing:

- Consistent API interface
- Error handling mechanisms
- Response formatting
- Tool integration capabilities

### Math Agent

- **Specialization**: Algebra, calculus, geometry, statistics
- **Tools**: Calculator, equation solver
- **Capabilities**:
  - Solve equations and inequalities
  - Perform complex calculations
  - Explain mathematical concepts
  - Step-by-step problem solving

### Physics Agent

- **Specialization**: Mechanics, thermodynamics, electromagnetism, optics
- **Tools**: Physics constants database, calculator
- **Capabilities**:
  - Explain physical phenomena
  - Perform physics calculations
  - Provide relevant constants and formulas
  - Solve physics problems

### Tutor Agent (Main Router)

- **Function**: Intelligent query routing and orchestration
- **Logic**: Keyword analysis and context understanding
- **Fallback**: Direct Gemini consultation for ambiguous queries

## 🛠 Tools

### Calculator Tool

- **Purpose**: Perform mathematical calculations safely
- **Features**:
  - Basic arithmetic operations
  - Trigonometric functions
  - Logarithmic functions
  - Expression evaluation with safety checks

### Physics Constants Tool

- **Purpose**: Provide accurate physical constants
- **Database**: 20+ fundamental constants including:
  - Speed of light (c)
  - Planck's constant (h)
  - Gravitational constant (G)
  - Electron mass and charge
  - And more...

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**

   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Environment Variables**
   - `NEXT_PUBLIC_API_URL`: Your backend URL

### Backend Deployment (Render)

1. **Connect to Render**

   - Connect your GitHub repository
   - Add environment variables: `GEMINI_API_KEY`
   - Deploy automatically on push

2. **Environment Variables**
   - `GEMINI_API_KEY`: Your Google AI API key
   - `PORT`: Automatically set by Render

### Environment Variables Summary

**Frontend (.env.local):**

```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

**Backend (.env):**

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🔧 Development

### Project Structure

```
ai-tutor-multi-agent/
├── backend/
│   ├── agents/
│   │   ├── base_agent.py      # Base agent class
│   │   ├── math_agent.py      # Math-specialized agent
│   │   ├── physics_agent.py   # Physics-specialized agent
│   │   └── tutor_agent.py     # Main routing agent
│   ├── tools/
│   │   ├── calculator.py      # Mathematical calculator
│   │   └── physics_constants.py # Physics constants database
│   ├── app.py                 # Flask application
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Chat/             # Chat-related components
│   │   └── Layout/           # Layout components
│   ├── pages/
│   │   ├── api/              # API routes (if needed)
│   │   └── index.tsx         # Main page
│   ├── styles/               # Global styles
│   ├── utils/                # Utility functions
│   └── types/                # TypeScript type definitions
└── README.md
```

### Available Scripts

**Backend:**

```bash
# Run development server
python app.py

# Install dependencies
pip install -r requirements.txt
```

**Frontend:**

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and structure
- Add comprehensive comments for complex logic
- Test all agent interactions thoroughly
- Ensure responsive design for new UI components
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for providing the Gemini API
- **Vercel** for frontend hosting
- **Render** for backend deployment
- **shadcn/ui** for beautiful UI components
- **Next.js** and **Flask** communities for excellent documentation

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Paulie-Aditya/ai-tutor-multi-agent/issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Built with ❤️ using modern web technologies and AI**
