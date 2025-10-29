# ECE Multi-Agent Tutor System# ECE Multi-Agent Tutor System



An AI-powered educational platform that helps Electronics & Communication Engineering (ECE) students master MATLAB practicals. The system combines a modern Next.js interface with a multi-agent Flask backend powered by Google's Gemini AI to deliver theory, code, explanations, and publication-ready LaTeX reports in one place.An AI-first learning platform that helps Electronics & Communication Engineering (ECE) students master MATLAB practicals. The system combines a modern Next.js interface with a multi-agent Flask backend powered by Google's Gemini AI to deliver theory, code, explanations, and print-ready lab reports in one place.



## 🚀 Live Deployments## 🚀 Live Deployments



- **Frontend**: [https://multi-ai-tutor.vercel.app/](https://multi-ai-tutor.vercel.app/)- **Frontend**: [https://multi-ai-tutor.vercel.app/](https://multi-ai-tutor.vercel.app/)

- **Backend API**: [https://ai-tutor-multi-agent.onrender.com](https://ai-tutor-multi-agent.onrender.com)- **Backend API**: [https://ai-tutor-multi-agent.onrender.com](https://ai-tutor-multi-agent.onrender.com)



## 📋 Table of Contents## 📋 Table of Contents



- [Overview](#overview)- [Overview](#overview)

- [Architecture](#architecture)- [Architecture](#architecture)

- [Features](#features)- [Features](#features)

- [Tech Stack](#tech-stack)- [Tech Stack](#tech-stack)

- [Installation](#installation)- [Installation](#installation)

- [Usage](#usage)- [Usage](#usage)

- [API Documentation](#api-documentation)- [API Documentation](#api-documentation)

- [Agent System](#agent-system)- [Agent System](#agent-system)

- [Deployment](#deployment)- [Tooling Layer](#tooling-layer)

- [Project Structure](#project-structure)- [Deployment](#deployment)

- [Contributing](#contributing)- [Project Structure](#project-structure)

- [License](#license)- [Contributing](#contributing)

- [License](#license)

## Overview- [Support](#support)



ECE lab practicals demand comprehensive deliverables: theory, MATLAB code, explanations, optimizations, and a polished report. This project automates that entire workflow:## 🎯 Overview



- Generates rigorous theory with mathematical formulations and ECE contextECE lab practicals expect students to deliver theory, MATLAB code, explanations, optimizations, and a polished report. This project automates that workflow:

- Produces two MATLAB implementations: a commented educational version and an optimized production version

- Provides line-by-line code explanations mapping implementation to theory- Classifies a topic and generates rigorous theory with mathematical formulation.

- Creates publication-ready LaTeX reports formatted for academic submission- Produces two MATLAB programs: a commented brute-force version for teaching and an optimized version for production-grade use.

- Offers a professor-style Q&A assistant for conceptual ECE questions- Breaks down each implementation line-by-line for conceptual clarity.

- Crafts professional LaTeX reports ready for Overleaf compilation.

Gemini AI powers the domain knowledge while the multi-agent architecture ensures academic structure, consistency, and quality.- Provides a professor-style Q&A assistant for open-ended ECE questions.



## ArchitectureGemini AI powers the domain knowledge while the application logic guarantees academic structure, tooling, and guardrails.



```text## 🏗 Architecture

┌────────────────────────────────────────────────────────────────────────┐

│                         Next.js Frontend (React 19)                    │```

│  • Landing page with feature showcase                                  │┌────────────────────────────────────────────────────────────────────────┐

│  • /chat - conversational AI assistant                                 ││                              Next.js Frontend                          │

│  • /ece-practical - multi-step practical generator                     ││  • Landing page with ECE focus                                         │

│  • shadcn/ui components + Tailwind CSS                                 ││  • /chat conversational assistant                                      │

└───────────────────────────▲───────────────────────────────────────────┘│  • /ece-practical multi-step generator                                 │

                            │ HTTPS REST API│  • Tailwind + shadcn/ui component system                               │

                            ▼└───────────────▲───────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐                │ HTTPS (REST)

│                        Flask Backend (Python)                          │                # ECE Multi-Agent Tutor System

│                                                                        │

│  TutorAgent              → Query routing & pedagogical persona         │                An AI-first learning platform that helps Electronics & Communication Engineering (ECE) students master MATLAB practicals. The system combines a modern Next.js interface with a multi-agent Flask backend powered by Google's Gemini AI to deliver theory, code, explanations, and print-ready lab reports in one place.

│  TheoryAgent             → Academic explanations with math             │                ▼

│  CodeGeneratorAgent      → Brute-force & optimized MATLAB              │┌────────────────────────────────────────────────────────────────────────┐

│  CodeExplainerAgent      → Structured code breakdowns                  ││                                Flask API                               │

│  LatexGeneratorAgent     → Report assembly with few-shot examples      ││  app.py                                                                │

│                                                                        ││  ├── TutorAgent           → request router & persona                   │

│  • Multi-threaded orchestration for parallel processing                ││  ├── TheoryAgent          → concept deep dives                         │

│  • Retry logic and timeout handling                                    ││  ├── CodeGeneratorAgent   → brute-force & optimized MATLAB             │

│  • Few-shot learning with curated examples                             ││  ├── CodeExplainerAgent   → structured breakdowns                      │

└───────────────────────────▲───────────────────────────────────────────┘│  └── LatexGeneratorAgent  → report orchestration with few-shot guides  │

                            │ Gemini AI API│                                                                      │

                            ▼│  • Multi-threaded orchestration                                       │

┌────────────────────────────────────────────────────────────────────────┐│  • Retry & timeout handling                                           │

│                       Google Gemini AI Service                         ││  • Shared prompt libraries & few-shot exemplars                       │

│  • Natural language understanding and generation                       │└───────────────▲───────────────────────────────────────────────────────┘

│  • Mathematical reasoning and formulation                              │                │ Gemini Generative AI API calls

│  • Domain knowledge (Signal Processing, Control, Communications)       │                ▼

└────────────────────────────────────────────────────────────────────────┘┌────────────────────────────────────────────────────────────────────────┐

```│                           Google Gemini AI                             │

│  • Domain knowledge & reasoning                                        │

## Features│  • Mathematical computation assist                                     │

│  • Natural language generation                                         │

### Frontend Experience└────────────────────────────────────────────────────────────────────────┘

```

- **ECE Practical Generator (`/ece-practical`)**: Input a topic, receive theory, dual code implementations, and LaTeX report in organized tabs

- **AI Chat Assistant (`/chat`)**: Professor-like responses with structured teaching approach## ✨ Features

- **Modern UI**: Responsive design, dark mode, smooth animations via Framer Motion```text

- **Visual Feedback**: Typing indicators, loading states, toast notifications### Frontend Experience (Next.js 16 + React 19)

- **Code Management**: Syntax highlighting, copy-to-clipboard functionality

- `/ece-practical` workflow that reveals results in structured tabs (Theory, Brute Code, Optimized Code, LaTeX Report).

### Backend Intelligence- `/chat` interface with professor-like responses, typing indicators, and helpful callouts.

- Responsive layout, dark mode, and shadcn/ui component styling across pages.

- **Multi-Agent System**: Specialized agents for theory, code generation, explanation, and report creation- Tailwind-driven gradients, animated typing shimmer, testimonials, and glowing card effects for a polished landing page.

- **Dual Code Generation**: Educational brute-force implementation + optimized production code- Centralized API client (`frontend/utils/api.ts`) with error handling and toasts.

- **Academic Rigor**: Theory explanations with mathematical formulations and ECE context

- **LaTeX Reports**: Publication-ready reports with proper academic structure (Aim, Theory, Code, Results)### Backend Intelligence (Flask 3 + Gemini)

- **Intelligent Routing**: Context-aware query delegation to appropriate specialist agents

- `TutorAgent` routes questions to the correct specialist and enforces a pedagogical persona.

### Quality Assurance- `TheoryAgent` returns structured academic write-ups with formulas, context, and MATLAB relevance.

- `CodeGeneratorAgent` emits two MATLAB variants (educational brute-force + production-grade optimized) along with optimization heuristics.

- Comprehensive test suites (`test_ece_agent.py`, `test_complete_practical.py`)- `CodeExplainerAgent` maps code to theory, highlights learning points, and calls out MATLAB best practices.

- Environment templates (`.env.example`) for secure configuration- `LatexGeneratorAgent` assembles full lab reports using few-shot exemplars in `latex_examples.py`.

- Error handling and graceful degradation- Threaded execution, retry logic, and caching hooks (pending) keep long-running tasks stable.

- CORS support for cross-origin requests

### Quality & Operations

## Tech Stack

- End-to-end tests in `backend/test_ece_agent.py` and `backend/test_complete_practical.py` validate orchestration paths.

### Frontend- `.env.example` files document secrets for both services.

- Procfiles make Render and other PaaS deployments straightforward.

- **Framework**: Next.js 16 with React 19 + TypeScript

- **Styling**: Tailwind CSS 4 + shadcn/ui component library## 🛠 Tech Stack

- **Animations**: Framer Motion for smooth transitions

- **Icons**: Lucide React icon set### Frontend

- **State Management**: React hooks (useState, useEffect, useRef)### Frontend Experience (Next.js 16 + React 19)

- **HTTP Client**: Fetch API with centralized error handling- Next.js 16 with React 19 + TypeScript

- Tailwind CSS 4 with shadcn/ui component primitives

### Backend- Framer Motion for animations and motion primitives

- Lucide icons, Sonner toasts, and Radix UI foundations

- **Framework**: Flask 3.1 (Python)

- **AI Integration**: Google Generative AI (Gemini) SDK### Backend

- **Validation**: Pydantic 2 for request/response schemas

- **CORS**: Flask-CORS for cross-origin support- Flask 3.1 with Gunicorn for production serving

- **Environment**: python-dotenv for configuration- Google `google-generativeai` SDK and supporting Google Cloud libraries

- **Production Server**: Gunicorn WSGI server- Pydantic 2 for structured payload validation

- Flask-CORS and python-dotenv for environment management

### Deployment

### Deployment

- **Frontend**: Vercel (global CDN, automatic deployments)

- **Backend**: Render (containerized Python deployment)- Vercel for the frontend (PNPM, Next.js build pipeline)

- **CI/CD**: GitHub-based continuous deployment- Render for the Flask API (Procfile + Gunicorn)

- GitHub Actions ready repo (CI hooks can be added easily)

## Installation

## � Installation

### Prerequisites

### Prerequisites

- Node.js 18+ with pnpm (or npm/yarn)

- Python 3.8 or newer- Node.js 18+ with pnpm (or npm/yarn)

- Google Gemini API key ([Get one here](https://ai.google.dev))- Python 3.8 or newer

- Google Gemini API key – request one at [ai.google.dev](https://ai.google.dev)

### Backend Setup

### Backend Setup (`backend/`)

```bash

git clone https://github.com/Rewant-1/ECE-helper.git```bash

cd ECE-helper/backendgit clone https://github.com/Rewant-1/ECE-helper.git

cd ECE-helper/backend

# Create and activate virtual environment

python -m venv .venvpython -m venv .venv

.venv\Scripts\activate  # On macOS/Linux: source .venv/bin/activate.venv\Scripts\activate  # macOS/Linux: source .venv/bin/activate



# Install dependenciespip install -r requirements.txt

pip install -r requirements.txt

copy .env.example .env  # macOS/Linux: cp .env.example .env

# Configure environment# edit .env → GEMINI_API_KEY=your_api_key

copy .env.example .env  # On macOS/Linux: cp .env.example .env

# Edit .env and add: GEMINI_API_KEY=your_api_key_herepython app.py

# API available at http://localhost:5000

# Run development server```

python app.py

# Backend available at http://localhost:5000### Frontend Setup (`frontend/`)

```

```bash

### Frontend Setupcd ../frontend



```bashpnpm install  # npm install / yarn install also work

cd ../frontend

copy .env.example .env.local  # create file if template unavailable

# Install dependencies# set NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

pnpm install  # Or: npm install / yarn install

pnpm dev

# Configure environment# Frontend available at http://localhost:3000

copy .env.example .env.local  # On macOS/Linux: cp .env.example .env.local```

# Add: NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

## 💡 Usage

# Run development server

pnpm dev### ECE Practical Generator

# Frontend available at http://localhost:3000

```1. Visit `/ece-practical`.

2. Enter a practical topic (e.g., "Linear convolution of two signals").

## Usage3. Observe four synchronized tabs: Theory, MATLAB brute-force code, MATLAB optimized code, and LaTeX report.

4. Copy code snippets, download theory, or paste LaTeX into Overleaf.

### ECE Practical Generator

### Professor-Style Chat

1. Navigate to `/ece-practical`

2. Enter a topic (e.g., "Linear convolution of two discrete signals")1. Navigate to `/chat`.

3. Click "Generate Practical"2. Ask questions across signal processing, communication systems, control theory, or MATLAB syntax.

4. View results in organized tabs:3. Receive structured responses (Concept → Theory → Implementation → Verification) with follow-up prompts.

   - **Theory**: Comprehensive explanation with mathematics

   - **Brute Force Code**: Educational MATLAB implementation## 📚 API Documentation

   - **Optimized Code**: Production-ready efficient version

   - **LaTeX Report**: Complete academic report ready for compilationBase URLs: `http://localhost:5000` (local) • `https://ai-tutor-multi-agent.onrender.com` (production)



### Professor-Style Chat### `POST /api/chat`



1. Go to `/chat````json

2. Ask ECE-related questions (signal processing, control systems, MATLAB, etc.){

3. Receive structured responses with:  "messages": [{ "role": "user", "content": "Explain FFT in MATLAB" }]

   - Conceptual overview}

   - Mathematical formulation```

   - MATLAB implementation guidance

   - Best practices and tipsResponse



## API Documentation```json

{

**Base URLs:**  "response": "Fast Fourier Transform (FFT) converts...",

  "message": "Fast Fourier Transform (FFT) converts..."

- Development: `http://localhost:5000`}

- Production: `https://ai-tutor-multi-agent.onrender.com````



### Endpoints### `POST /api/ece-practical`



#### `POST /api/chat````json

{

Interactive chat with the ECE tutor agent.  "topic": "Convolution of two signals"

}

**Request:**```



```jsonResponse (abridged)

{

  "messages": [```json

    { "role": "user", "content": "Explain FFT in MATLAB" }{

  ]  "status": "success",

}  "topic": "Convolution of two signals",

```  "theory": "...",

  "brute_force_code": "...",

**Response:**  "efficient_code": "...",

  "latex_report": "..."

```json}

{```

  "response": "The Fast Fourier Transform (FFT) is...",

  "message": "The Fast Fourier Transform (FFT) is..."### `GET /api/agents`

}

```Lists available agent personas and capabilities.



#### `POST /api/ece-practical`### `GET /api/health`



Generate complete ECE practical with theory, code, and report.Simple heartbeat for monitoring.



**Request:**## 🧠 Agent System



```json- **TutorAgent (`tutor_agent.py`)** – Primary orchestrator that routes tasks, enforces response structure, and injects teaching persona cues.

{- **TheoryAgent (`theory_agent.py`)** – Produces layered explanations: historical context, definitions, math, MATLAB relevance, applications.

  "topic": "Convolution of two signals"- **CodeGeneratorAgent (`code_generator_agent.py`)** – Generates brute-force MATLAB code with step commentary and a separate optimized version with vectorization, built-ins, and validation.

}- **CodeExplainerAgent (`code_explainer_agent.py`)** – Walks through code top-down and line-by-line, highlighting learning outcomes and pitfalls.

```- **LatexGeneratorAgent (`latex_generator_agent.py`)** – Compiles theory, code, and observations into academic LaTeX using structured few-shot prompts (`latex_examples.py`).



**Response:**Each agent inherits from `BaseAgent`, ensuring consistent logging, error handling, and Gemini prompt assembly.



```json## 🧰 Tooling Layer

{

  "status": "success",- **LaTeX Few-Shot Library** – Curated exemplars that teach Gemini the report structure expected by universities.

  "topic": "Convolution of two signals",- **Prompt Templates** – Shared macros for intros, math formatting, and MATLAB guidance keep responses consistent.

  "theory": "Detailed explanation...",- **Testing Utilities** – `test_complete_practical.py` simulates end-to-end practical generation; `test_ece_agent.py` checks conversational flows.

  "brute_force_code": "% MATLAB code...",

  "brute_force_explanation": "Step-by-step breakdown...",## 🌐 Deployment

  "efficient_code": "% Optimized MATLAB code...",

  "efficient_explanation": "Optimization details...",### Frontend (Vercel)

  "optimization_applicable": true,

  "latex_report": "\\documentclass{article}..."1. Connect the GitHub repo to Vercel.

}2. Set `NEXT_PUBLIC_BACKEND_URL` in the project environment settings.

```3. Deploy – Vercel handles builds via pnpm and Next.js.



#### `GET /api/health`If pnpm lock and `package.json` drift, rerun `pnpm install` locally before pushing (Vercel uses `pnpm install --frozen-lockfile`).



Health check endpoint.### Backend (Render)



**Response:**1. Create a new Web Service, link the repo, and point to `backend/`.

2. Set environment variables: `GEMINI_API_KEY`, optional `FLASK_DEBUG`, `PORT=5000`.

```json3. Render reads `backend/Procfile` to start Gunicorn (`web: gunicorn app:app`).

{

  "status": "ok",## 🗂 Project Structure

  "message": "Tutor system is healthy."

}```

```ECE-helper/

├── backend/

#### `GET /api/agents`│   ├── agents/

│   │   ├── base_agent.py

Get information about available agents.│   │   ├── code_explainer_agent.py

│   │   ├── code_generator_agent.py

**Response:**│   │   ├── ece_matlab_agent.py

│   │   ├── latex_examples.py

```json│   │   ├── latex_generator_agent.py

{│   │   ├── theory_agent.py

  "available_agents": ["ECE MATLAB Helper"],│   │   └── tutor_agent.py

  "status": "ECE MATLAB agent loaded",│   ├── tools/

  "description": "Expert assistant for ECE practicals..."│   ├── app.py

}│   ├── requirements.txt

```│   └── Procfile

├── frontend/

## Agent System│   ├── app/

│   │   ├── chat/page.tsx

### Base Architecture│   │   ├── ece-practical/page.tsx

│   │   ├── layout.tsx

All agents inherit from `BaseAgent`, providing:│   │   └── globals.css

│   ├── components/

- Consistent Gemini AI interface│   │   ├── chat-interface.tsx

- Error handling and retry logic│   │   ├── chat-sidebar.tsx

- Response formatting│   │   ├── ece-practical-interface.tsx

- Logging and debugging support│   │   ├── practical-tabs.tsx

│   │   └── ui/

### Specialized Agents│   ├── utils/api.ts

│   ├── package.json

**TutorAgent** (`tutor_agent.py`)│   ├── pnpm-lock.yaml

│   └── tailwind.config.ts

- Routes queries to appropriate specialist agents├── docs/

- Enforces pedagogical persona and teaching style│   ├── IMPLEMENTATION_SUMMARY.md

- Handles general ECE questions with professor-like responses│   ├── TASK2_IMPLEMENTATION_SUMMARY.md

│   ├── task2.md

**TheoryAgent** (`theory_agent.py`)│   └── tasks.md

├── LICENSE

- Generates comprehensive theoretical explanations└── README.md

- Includes mathematical formulations and derivations```

- Connects concepts to MATLAB implementation

- Provides real-world ECE applications## 🤝 Contributing



**CodeGeneratorAgent** (`code_generator_agent.py`)1. Fork the repository.

2. Create a feature branch: `git checkout -b feature/amazing-feature`.

- Creates two MATLAB implementations:3. Commit with context: `git commit -m "Add MATLAB plotting walkthrough"`.

  - **Brute-force**: Educational with extensive comments4. Push and open a pull request.

  - **Optimized**: Production-ready with vectorization

- Includes algorithm complexity analysisPlease add or update tests when altering agent behaviour, and keep prompts in sync with README expectations.

- Follows MATLAB best practices

## � License

**CodeExplainerAgent** (`code_explainer_agent.py`)

Released under the MIT License. See [`LICENSE`](LICENSE) for details.

- Provides line-by-line code breakdowns

- Maps implementation to theoretical concepts## � Support & Feedback

- Highlights learning outcomes

- Points out common pitfalls and MATLAB idiomsOpen an issue on [GitHub](https://github.com/Rewant-1/ECE-helper/issues) with reproduction steps, topic prompts, and console/network traces if possible. Feature ideas and pull requests are always welcome.



**LatexGeneratorAgent** (`latex_generator_agent.py`)---



- Assembles complete LaTeX reports**Built with ❤️ for the ECE community – theory to report in minutes.**

- Uses few-shot learning from `latex_examples.py`
- Formats code, equations, and figures properly
- Creates academic-standard structure (Aim, Theory, Code, Results)

## Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Configure environment variables:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
   ```
3. Deploy automatically on push to main branch

**Note:** If you encounter pnpm lockfile issues, run `pnpm install` locally and commit the updated `pnpm-lock.yaml`.

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Configure environment variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   PORT=5000
   ```
6. Deploy automatically on push to main branch

## Project Structure

```text
ECE-helper/
├── backend/
│   ├── agents/
│   │   ├── base_agent.py              # Base agent class
│   │   ├── code_explainer_agent.py    # Code explanation agent
│   │   ├── code_generator_agent.py    # Code generation agent
│   │   ├── ece_matlab_agent.py        # Main ECE agent orchestrator
│   │   ├── latex_examples.py          # Few-shot LaTeX examples
│   │   ├── latex_generator_agent.py   # LaTeX report generator
│   │   ├── theory_agent.py            # Theory explanation agent
│   │   └── tutor_agent.py             # Main routing agent
│   ├── tools/                         # Utility tools
│   ├── app.py                         # Flask application entry point
│   ├── requirements.txt               # Python dependencies
│   ├── Procfile                       # Deployment configuration
│   └── .env.example                   # Environment template
├── frontend/
│   ├── app/
│   │   ├── chat/page.tsx              # Chat interface page
│   │   ├── ece-practical/page.tsx     # Practical generator page
│   │   ├── page.tsx                   # Landing page
│   │   ├── layout.tsx                 # Root layout
│   │   └── globals.css                # Global styles
│   ├── components/
│   │   ├── chat-interface.tsx         # Chat UI component
│   │   ├── chat-sidebar.tsx           # Chat history sidebar
│   │   ├── ece-practical-interface.tsx # Practical generator UI
│   │   ├── practical-tabs.tsx         # Results tabs component
│   │   ├── theme-provider.tsx         # Dark mode provider
│   │   ├── theme-toggle.tsx           # Theme switcher
│   │   └── ui/                        # shadcn/ui components
│   ├── utils/
│   │   └── api.ts                     # API client utilities
│   ├── types/
│   │   └── chat.ts                    # TypeScript type definitions
│   ├── package.json                   # Node dependencies
│   ├── pnpm-lock.yaml                 # Lockfile
│   └── tailwind.config.ts             # Tailwind configuration
├── docs/
│   ├── IMPLEMENTATION_SUMMARY.md      # Implementation details
│   ├── TASK2_IMPLEMENTATION_SUMMARY.md
│   └── task2.md                       # Feature requirements
├── LICENSE                            # MIT License
└── README.md                          # This file
```

## Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with clear commit messages
4. Test thoroughly (both frontend and backend)
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request with detailed description

### Development Guidelines

- Follow existing code style and architecture patterns
- Add comprehensive comments for complex logic
- Update tests when modifying agent behavior
- Ensure responsive design for UI changes
- Update documentation for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or feature requests:

1. Check existing [Issues](https://github.com/Rewant-1/ECE-helper/issues)
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots/logs if applicable

---

**Built with ❤️ for the ECE community**

*Transforming MATLAB practicals from hours of work to minutes of automation*
