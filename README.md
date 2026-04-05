# Pawfect Shelter

Pawfect Shelter is a small full-stack project with three parts:

- a React + Vite frontend
- a Node + Express recommendation API
- a FastAPI machine-learning scoring service

## Local start commands

Frontend:

```bash
npm install
npm run dev
```

Node API:

```bash
cd server
npm install
npm run dev
```

ML API:

```bash
cd ml
pip install -r requirements.txt
uvicorn api:app --reload --port 8000
```

## Environment variables

Frontend:

```bash
VITE_API_URL=http://localhost:3001
```

Node API:

```bash
ML_API_URL=http://127.0.0.1:8000
PORT=3001
```

## Deployment

See `DEPLOYMENT.md` for the recommended Render setup.
