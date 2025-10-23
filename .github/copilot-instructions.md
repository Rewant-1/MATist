<!--
AI Agent Instructions for the AI-Tutor repository.
Purpose: give context and project-specific patterns to an automated coding assistant.
-->

# AI-Tutor: Copilot Instructions

This file helps AI coding agents get productive quickly on the AI-Tutor project. Keep it short, focused, and concrete.

Key points
- Backend: Flask app in `backend/app.py` that exposes `/api/chat`, `/api/health`, and `/api/agents`.
- Agents live in `backend/agents/` and inherit from `BaseAgent` (`backend/agents/base_agent.py`). The `TutorAgent` routes to the specialist agents.
- Gemini (Google Generative AI) is used in `BaseAgent` via `google-generativeai`. API key comes from `GEMINI_API_KEY` in `.env`.
- Frontend: Next.js app (TypeScript) under `frontend/` using `chatApi.sendMessage` (`frontend/utils/api.ts`) to POST `{ messages: [{role, content}] }`.

Important file references
- `backend/agents/tutor_agent.py`: routing logic and how classification output must be a JSON with keys `subject` and `reason`.
- `backend/agents/*.py`: each agent sets an `instructions` string passed to Gemini; keep modifications compatible with current prompt usage.
- `backend/tools/`: utility modules (calculator, constants). Use `tools.calculator.safe_eval` for math when implementing deterministic computation.
- `frontend/components/chat-interface.tsx`: message shape, typing animation, math rendering, and how the frontend expects the response payload (`message` or `response` field).
- `frontend/types/chat.ts`: canonical types for messages and responses.

Patterns and constraints
- Message shape: always send arrays of objects: { role: "user" | "assistant", content: string } from frontend to backend.
- TutorAgent expects classification to return a JSON string. When editing classification prompts, preserve that strict JSON format.
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

Testing and safety notes
- The project uses an external LLM (Gemini). Avoid committing API keys; follow `.env` convention.
- The calculator uses `eval` with a controlled namespace. Keep this function conservative if extending.

Small code rules for patches
- Preserve agent prompt structure in `BaseAgent` and `TutorAgent` to avoid breaking classification.
- When adding features that return structured data to the frontend, populate `response` and `message` fields as the frontend checks both.
- For UI changes, prefer non-blocking styles and small component edits; reuse `ui` components.

If unsure
- Reference the main router `backend/agents/tutor_agent.py` and `frontend/components/chat-interface.tsx` for how messages are built, routed and rendered.

Ask the maintainer for clarification if you need changes to the Gemini prompt wording or want to add new agent tools that compute results locally.
