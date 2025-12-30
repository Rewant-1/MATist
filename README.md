# MATist - AI-Powered ECE MATLAB Practical Assistant

<div align="center">

**Transform your ECE MATLAB practicals with AI.**  
Theory → Code → Explanations → LaTeX Reports — all in minutes.


<a href="https://nextjs.org/">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,python,flask,postgres,prisma,vercel,docker" />
</a>


</div>

---

##  Features

| Feature | Description |
|---------|-------------|
|  **Multi-Agent System** | Specialized AI agents for theory, code, explanations, and LaTeX |
|  **Dual Code Output** | Brute-force (educational) + Optimized (production) MATLAB code |
|  **LaTeX Reports** | Publication-ready reports for Overleaf |
|  **AI Fallback** | Gemini → OpenRouter automatic failover for reliability |
|  **Real-time Chat** | SSE streaming for responsive Q&A |
|  **History** | Past practicals saved to PostgreSQL |
|  **SEO Optimized** | Sitemap, robots.txt, OpenGraph tags |

---

##  Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                    (Next.js 16 + React)                      │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      Flask API                               │
│                   (Rate Limited)                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│   Gemini    │──▶│ OpenRouter  │   │ PostgreSQL  │
│  (Primary)  │   │ (Fallback)  │   │  (History)  │
└─────────────┘   └─────────────┘   └─────────────┘
```

### AI Agents
| Agent | Role |
|-------|------|
| `TutorAgent` | Routes queries, professor-like persona |
| `TheoryAgent` | Generates structured theory with formulas |
| `CodeGeneratorAgent` | Creates brute-force + optimized MATLAB code |
| `CodeExplainerAgent` | Line-by-line code breakdown |
| `LaTeXGeneratorAgent` | Assembles academic reports |

---

## Tech Stack

**Frontend**
- Next.js 16, React 19, TypeScript
- Tailwind CSS, Shadcn UI, Framer Motion
- SEO: Sitemap, Robots.txt, OpenGraph

**Backend**
- Flask 3.1, Python 3.11+
- Google Gemini AI (Primary)
- OpenRouter API (Fallback)
- Prisma (Python), PostgreSQL (Neon)

**Deployment**
- Frontend: Vercel
- Backend: Render

---

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+ / pnpm
- PostgreSQL (or Neon DB)

### Backend Setup
```bash
cd backend
python -m venv venv && venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys

prisma generate
prisma db push
python app.py
```

### Frontend Setup
```bash
cd frontend
pnpm install
cp .env.example .env.local
# Edit .env.local with backend URL

pnpm dev
```

---

## Environment Variables

### Backend (`.env`)
```env
# Required
GEMINI_API_KEY=your_gemini_api_key

# Database
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Optional: AI Fallback
OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=google/gemini-2.0-flash-001

# Server
PORT=5000
FLASK_DEBUG=False
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=https://matist.vercel.app
```

---

## API Endpoints

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| `POST` | `/api/chat` | Chat with tutor | 50/hour |
| `POST` | `/api/chat/stream` | Streaming chat | 50/hour |
| `POST` | `/api/ece-practical` | Generate full practical | 10/hour |
| `POST` | `/api/generate-pdf` | LaTeX → PDF | 5/hour |
| `GET` | `/api/history` | List saved practicals | - |
| `GET` | `/api/history/<id>` | Get practical details | - |
| `GET` | `/api/topics` | ECE syllabus topics | - |
| `GET` | `/api/health` | Health check | - |

---

## Project Structure

```
MATist/
├── backend/
│   ├── agents/                 # AI Agents
│   │   ├── base_agent.py       # Gemini + OpenRouter fallback
│   │   ├── tutor_agent.py      # Main routing agent
│   │   ├── theory_agent.py     # Theory generation
│   │   ├── code_generator_agent.py
│   │   ├── code_explainer_agent.py
│   │   └── latex_generator_agent.py
│   ├── utils/
│   │   └── openrouter_client.py  # OpenRouter API client
│   ├── prisma/                 # Database schema
│   ├── app.py                  # Flask API
│   └── db.py                   # Prisma connection
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── chat/               # Q&A chat interface
│   │   ├── ece-practical/      # Practical generator
│   │   ├── layout.tsx          # SEO metadata
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   └── robots.ts           # SEO robots config
│   ├── components/             # React components
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── chat-interface.tsx
│   │   ├── chat-sidebar.tsx
│   │   └── practical-tabs.tsx
│   └── utils/
│       └── api.ts              # API client
```

---

##  AI Fallback System

MATist uses a dual-AI approach for maximum reliability:

```
1. User Request
       ↓
2. Try Gemini (2 retries)
       ↓
3. If failed → OpenRouter fallback
       ↓
4. Return response (or graceful error)
```

