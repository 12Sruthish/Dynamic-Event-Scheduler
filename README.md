Dynamic Event Scheduler — Phase 1 Demo
-------------------------------------

This minimal demo includes:
 - backend: Express server with /api/schedule/optimize endpoint
 - frontend: Vite + React app that posts sessions JSON to backend and displays optimized sessions

How to run locally (requires Node.js):

1) Backend
   cd backend
   npm install
   npm start
   # server will run on http://localhost:5000

2) Frontend (in a separate terminal)
   cd frontend
   npm install
   npm run dev
   # vite will run on http://localhost:5173 (or another port shown in terminal)

Example:
  Open the frontend URL, edit or accept the default sessions JSON, click "Optimize Schedule".

Notes:
 - This is a minimal, self-contained demo for Phase 1. No database is required.
 - The scheduling algorithm uses weighted interval scheduling (DP with binary search).

