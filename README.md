# Genesis — Team Brand Platform

From messy systems to durable architecture. Next.js brand site + FastAPI CMS + per-member bilingual resumes.

## Stack

- **Frontend:** Next.js 14, Tailwind, Aurora landing (7 sections)
- **Backend:** FastAPI, SQLAlchemy, SQLite, JWT admin auth
- **Admin:** `/admin` panel for members, resumes, site copy

## Quick start

### 1. API

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\pip install -r requirements.txt   # Windows
# source .venv/bin/activate && pip install -r requirements.txt  # macOS/Linux
copy .env.example .env
.\.venv\Scripts\uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API docs: http://127.0.0.1:8000/docs

Default admin: `admin` / `admin123` (change in `backend/.env`)

### 2. Web

```bash
# from repo root
npm install
# ensure .env.local has NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
npm run dev
```

- Public site: http://localhost:3000
- Team resume example: http://localhost:3000/team/ali-mahdavinia
- Admin: http://localhost:3000/admin/login

## Homepage sections

1. Hero — Genesis manifesto  
2. The Void — messy / hard problems  
3. The Crossing — chaos → order narrative  
4. Capabilities — services bento  
5. Method — discover → illuminate  
6. Team — members → individual resumes  
7. Contact — real mailto / social links  

## Data

- Seeded on first API boot from `src/data/profile.json` (Ali) + placeholder teammates  
- Runtime content lives in SQLite (`backend/genesis.db`)  
- Edit everything in Admin → Members / Site Settings  

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js |
| `npm run build` | Production web build |
| Backend uvicorn | See API section above |
