<!--
AI Agent Instructions for the ECE MATLAB Helper repository.
Purpose: give context and project-specific patterns to an automated coding assistant.
-->

# ECE MATLAB Helper: Copilot Instructions

This file helps AI coding agents get productive quickly on the ECE MATLAB Helper project. Keep it short, focused, and concrete.

Key points
- Backend: Flask app in `backend/app.py` that exposes `/api/chat`, `/api/health`, `/api/agents`, and `/api/ece-practical`.
- Single agent focus: All queries route through `TutorAgent` to ECE MATLAB assistance
- Agents live in `backend/agents/` and inherit from `BaseAgent` (`backend/agents/base_agent.py`)
- The `TutorAgent` now routes all questions to ECE MATLAB focused responses
- Gemini (Google Generative AI) is used in `BaseAgent` via `google-generative`. API key comes from `GEMINI_API_KEY` in `.env`.
- Frontend: Next.js 15 app (TypeScript, React 19) under `frontend/` using `chatApi.sendMessage` (`frontend/utils/api.ts`) to POST `{ messages: [{role, content}] }`.

Important file references
- `backend/agents/tutor_agent.py`: simplified routing - all queries go to ECE MATLAB helper
- `backend/agents/ece_matlab_agent.py`: main ECE MATLAB specialist agent
- `backend/agents/*.py`: each agent sets an `instructions` string passed to Gemini; keep modifications compatible with current prompt usage.
- `frontend/components/chat-interface.tsx`: message shape, typing animation, math rendering, and how the frontend expects the response payload (`message` or `response` field).
- `frontend/types/chat.ts`: canonical types for messages and responses.

Patterns and constraints
- Message shape: always send arrays of objects: { role: "user" | "assistant", content: string } from frontend to backend.
- TutorAgent now handles all queries with ECE MATLAB context - no more classification logic
- Agents call `BaseAgent.respond()` to ask Gemini; do not assume streaming APIs — response is a full text string.
- Keep message trimming in `TutorAgent._trim_messages()` when changing history handling to avoid token limit regressions.

Developer workflows
- Backend
  - Start: `python backend/app.py` (port 5000 by default)
  - Install deps: `pip install -r backend/requirements.txt`
  - Set `GEMINI_API_KEY` in `.env` before running.

- Frontend
  - Install deps: `npm install` (in `frontend/`)
  - Start dev server: `npm run dev`
  - Default backend URL: `NEXT_PUBLIC_BACKEND_URL` (set in `.env.local`)
  - Now using Next.js 15 and React 19

Testing and safety notes
- The project uses an external LLM (Gemini). Avoid committing API keys; follow `.env` convention.
- Focus is exclusively on ECE MATLAB help - no math, physics, chemistry, or history agents.

Small code rules for patches
- Preserve agent prompt structure in `BaseAgent` and `TutorAgent` to maintain ECE focus.
- When adding features that return structured data to the frontend, populate `response` and `message` fields as the frontend checks both.
- For UI changes, prefer non-blocking styles and small component edits; reuse `ui` components.
- All UI text should reflect ECE MATLAB focus, not general tutoring.

If unsure
- Reference the main router `backend/agents/tutor_agent.py` and `frontend/components/chat-interface.tsx` for how messages are built, routed and rendered.
- This is an ECE MATLAB helper, not a multi-subject tutor system.

Ask the maintainer for clarification if you need changes to the Gemini prompt wording or want to add new ECE-specific features.
