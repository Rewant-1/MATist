# ECE MATLAB Helper

A sophisticated educational platform powered by Google's Gemini AI, designed specifically for **Electronics & Communication Engineering (ECE)** students working with MATLAB practicals.

## 🚀 Live Demo

- **Frontend**: [https://multi-ai-tutor.vercel.app/](https://multi-ai-tutor.vercel.app/)
- **Backend API**: [https://ai-tutor-multi-agent.onrender.com](https://ai-tutor-multi-agent.onrender.com)

## ✨ Features

### 🆕 ECE MATLAB Practical Helper (`/ece-practical`)

Complete automated workflow for ECE practicals:

1. **Theory Explanation** - Comprehensive ECE concept explanations
   - Signal Processing (convolution, FFT, filtering)
   - Communication Systems (modulation, sampling)
   - Circuit Analysis and more

2. **Brute-Force Code Generation** - Simple, educational MATLAB implementations
   - Clear comments explaining each step
   - Beginner-friendly logic
   - Easy to understand and modify

3. **Code Explanation** - Step-by-step breakdowns
   - Line-by-line explanations
   - MATLAB function descriptions
   - Algorithmic insights

4. **Optimization (Conditional)** - Efficient implementations
   - Vectorized operations
   - Built-in MATLAB functions
   - Performance improvements

5. **LaTeX Report Generation** - Academic-ready reports
   - Aim, Objective, Theory sections
   - Formatted MATLAB code
   - Results and Observation placeholders
   - Ready for Overleaf compilation

### 💬 Chat Interface (`/chat`)

- Real-time chat with ECE-focused AI assistant
- MATLAB programming assistance
- Code explanations and debugging
- Signal processing guidance
- Communication systems help

### 🎨 UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode** - Eye-friendly interface with theme persistence
- **Typing Indicators** - Visual feedback during AI processing
- **Smooth Animations** - Framer Motion powered transitions
- **Copy to Clipboard** - Easy sharing of code and responses

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 with TypeScript
- **UI**: React 19 + Tailwind CSS 4
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: Flask (Python)
- **AI**: Google Generative AI (Gemini)
- **CORS**: Flask-CORS
- **Environment**: python-dotenv

### Deployment
- **Frontend**: Vercel (CDN + Edge Network)
- **Backend**: Render (Containerized)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Python 3.8+
- Google AI API key ([Get it here](https://ai.google.dev))

### Backend Setup

1. **Clone and navigate**
   ```bash
   git clone https://github.com/Rewant-1/ECE-helper.git
   cd ECE-helper/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env and add:
   # GEMINI_API_KEY=your_api_key_here
   # FLASK_DEBUG=False  # Set to False for production
   ```

5. **Run the backend**
   ```bash
   python app.py
   ```
   Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or: yarn install / pnpm install
   ```

3. **Environment configuration**
   ```bash
   # Create .env.local
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. **Run the frontend**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000`
- Production: `https://ai-tutor-multi-agent.onrender.com`

### Endpoints

#### `POST /api/chat`
Chat with the ECE MATLAB assistant.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Explain FFT in MATLAB" }
  ]
}
```

**Response:**
```json
{
  "response": "FFT (Fast Fourier Transform) is...",
  "message": "FFT (Fast Fourier Transform) is..."
}
```

#### `POST /api/ece-practical`
Generate complete ECE MATLAB practical.

**Request:**
```json
{
  "topic": "Convolution of two signals"
}
```

**Response:**
```json
{
  "status": "success",
  "topic": "Convolution of two signals",
  "theory": "...",
  "brute_force_code": "...",
  "brute_force_explanation": "...",
  "efficient_code": "..." | null,
  "efficient_explanation": "..." | null,
  "optimization_applicable": true | false,
  "latex_report": "..."
}
```

#### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Tutor system is healthy."
}
```

#### `GET /api/agents`
Get available agents information.

**Response:**
```json
{
  "available_agents": ["ECE MATLAB Helper"],
  "status": "ECE MATLAB agent loaded",
  "description": "Expert assistant for ECE practicals..."
}
```

## 🚀 Deployment

### Frontend (Vercel)

1. **Connect GitHub repository** to Vercel
2. **Set environment variable**: 
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
   ```
3. **Deploy** - Automatic on push to main branch

### Backend (Render)

1. **Connect GitHub repository** to Render
2. **Set environment variables**:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   FLASK_DEBUG=False
   PORT=5000
   ```
3. **Deploy** - Automatic on push to main branch

## 🏗 Project Structure

```
ECE-helper/
├── backend/
│   ├── agents/
│   │   ├── base_agent.py           # Base agent class
│   │   ├── ece_matlab_agent.py     # ECE MATLAB specialist
│   │   ├── code_generator_agent.py # Code generator
│   │   ├── code_explainer_agent.py # Code explainer
│   │   ├── latex_generator_agent.py# LaTeX generator
│   │   ├── theory_agent.py         # Theory explainer
│   │   └── tutor_agent.py          # Main router
│   ├── app.py                      # Flask application
│   ├── requirements.txt            # Python dependencies
│   └── .env.example                # Environment template
├── frontend/
│   ├── app/
│   │   ├── page.tsx                # Landing page
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   ├── chat/page.tsx           # Chat interface
│   │   └── ece-practical/page.tsx  # Practical generator
│   ├── components/
│   │   ├── chat-interface.tsx      # Chat UI
│   │   ├── ece-practical-interface.tsx
│   │   ├── practical-tabs.tsx      # Tabbed results
│   │   └── ui/                     # shadcn/ui components
│   ├── types/chat.ts               # TypeScript types
│   ├── utils/api.ts                # API client
│   └── package.json
├── LICENSE
├── Procfile                        # Deployment config
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for providing the Gemini API
- **Vercel** for frontend hosting
- **Render** for backend deployment
- **shadcn/ui** for beautiful UI components
- **Next.js** and **Flask** communities

## 📞 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/Rewant-1/ECE-helper/issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Built with ❤️ for ECE students**
