# Genesis — Team Brand Platform

From messy systems to durable architecture. Next.js brand site + Prisma CMS + per-member bilingual resumes.

## Stack

- **App:** Next.js 14 (App Router) + Tailwind + Aurora landing
- **API:** Next.js Route Handlers under `/api`
- **DB:** Prisma + SQLite (`prisma/dev.db`)
- **Fonts:** Self-hosted via `@fontsource` (no Google Fonts / CDN — works in Iran without VPN)
- **Admin:** `/admin` panel for members, resumes, site copy

## Quick start

```bash
npm install
npx prisma migrate dev
npm run dev
```

- Public site: http://localhost:3000
- Team resume example: http://localhost:3000/team/ali-mahdavinia
- Admin: http://localhost:3000/admin/login
- Health: http://localhost:3000/api/health

Default admin: `admin` / `admin123` (change in `.env`)

Copy `.env.example` → `.env` if needed. First API request also seeds the DB if empty.

## Homepage sections

1. Hero — Genesis manifesto  
2. The Void — messy / hard problems  
3. The Crossing — chaos → order narrative  
4. Capabilities — services bento  
5. Method — discover → illuminate  
6. Team — members → individual resumes  
7. Contact — real mailto / social links  

## Data

- Seeded on first boot from `src/data/profile.json` (Ali) + placeholder teammates  
- Runtime content lives in SQLite (`prisma/dev.db`)  
- Edit everything in Admin → Members / Site Settings  
- Uploads go to `public/uploads/`

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js (web + API) |
| `npm run build` | Production build |
| `npm run db:migrate` | Apply Prisma migrations |
| `npm run db:studio` | Prisma Studio |
