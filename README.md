# Student Report Card Generation

This repository contains a full-stack student report card application.

- `frontend/`: React + Vite frontend
- `backend/`: Express + MongoDB backend

## Deployment Links

- Frontend: https://Afrazshaik7799.github.io/Student-report-card-genereation/
- Backend: Not deployed yet

> The frontend is already published to GitHub Pages.
> Deploy the backend separately and update this URL when ready.

## Frontend Deployment

The frontend is configured to deploy to GitHub Pages using a GitHub Actions workflow.

- Source: `frontend/`
- Build output: `frontend/dist`
- GitHub Pages site: `gh-pages` branch

## Backend Deployment

The backend must be hosted separately. Recommended providers:

- Render: https://render.com
- Railway: https://railway.app
- Heroku: https://heroku.com

Once deployed, update the backend link above and the frontend API URL if needed.

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Frontend API Configuration

The frontend currently uses the backend API base URL:

```js
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});
```

If you deploy the backend, add a `frontend/.env` file with:

```env
VITE_API_URL=https://your-backend-host.onrender.com/api
```
