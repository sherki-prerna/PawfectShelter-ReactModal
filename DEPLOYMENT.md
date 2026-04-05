# Deployment Guide

This project deploys cleanly as three Render services:

- `pawfect-frontend` for the React app
- `pawfect-api` for the Node API
- `pawfect-ml` for the FastAPI ML service

## Service layout

Frontend:

- root directory: repo root
- build command: `npm install && npm run build`
- publish directory: `dist`

Node API:

- root directory: `server`
- build command: `npm install`
- start command: `npm start`

ML API:

- root directory: `ml`
- build command: `pip install -r requirements.txt`
- start command: `sh start.sh`

## Environment variables

Frontend:

```bash
VITE_API_URL=https://pawfect-api.onrender.com
```

Node API:

```bash
ML_API_URL=https://pawfect-ml.onrender.com
PORT=10000
```

ML API:

```bash
PORT=10000
```

## Recommended order

1. Deploy the ML service first.
2. Copy its Render URL into the Node service as `ML_API_URL`.
3. Deploy the Node service.
4. Copy the Node service URL into the frontend as `VITE_API_URL`.
5. Deploy the frontend.

## Notes

- `vite.config.js` proxy is only for local development.
- The trained model must exist at `ml/model/model.pkl`.
- If you retrain the model, redeploy the ML service so the new `model.pkl` is included.
