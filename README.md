# Portfolio & Resume — Ali Mahdavinia

Portfolio landing page and bilingual (Persian/English) resume built with Next.js 14, powered by a single JSON data source.

## Features

- 🎨 **Modern Landing Page** with WebGL Fluid Simulation
- 📄 **Bilingual Resume** (Persian/English) with language switcher
- 📱 **Fully Responsive** design
- ⚡ **Next.js 14** with App Router
- 🎯 **Single Source of Truth** — All data in `src/data/profile.json`
- 🔍 **SEO Optimized** with proper metadata

## Project Structure

```
resume-app/
├── data/
│   └── profile.json      # Single source of truth for all data
├── public/               # Static assets
│   ├── logo.png
│   ├── dat.gui.min.js
│   └── fluid.js
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── page.tsx     # Landing page
│   │   └── resume/      # Resume page
│   └── lib/
│       └── profile.ts   # Profile data utilities
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Data Management

All content is managed through `src/data/profile.json`:

- **Landing Page**: `profile.landing`
- **Resume**: `profile.resume` (bilingual with `fa` and `en`)

Update the JSON file to change any content — no code changes needed!

## Deployment

This project can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting** with `npm run build && npm start`

## License

Private project — All rights reserved.

---

Built with ❤️ by Ali Mahdavinia

