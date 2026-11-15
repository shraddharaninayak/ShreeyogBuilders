# Shreeyog Builders & Land Developers — Web Project

Official web application for Shreeyog Builders & Land Developers (Nashik, Maharashtra).

---

## Project Structure

```
d:/Shreeyogweb/
├── public/                 # Production static web assets served by server.js
│   ├── index.html          # Homepage
│   ├── projects/           # Projects portfolio & 15 detail pages
│   ├── about/              # About & Heritage page
│   ├── contact/            # Contact & Site Visit consultations
│   ├── _nuxt/              # Nuxt JS/CSS compiled bundles
│   ├── images/             # High-resolution architectural images
│   ├── fonts/              # Typography & web fonts
│   ├── videos/             # Video backgrounds & media
│   └── fav/                # Multi-size favicons
├── pages/                  # Quick-reference page templates (Home, About, Projects, Contact)
├── assets/                 # Symlinks / junctions to static media (images, fonts, videos)
├── scripts/                # Development, automation & maintenance scripts
│   ├── updates/            # Section transformation & content migration scripts
│   ├── debug/              # DOM inspection & route debugging scripts
│   └── utils/              # Media processing, image optimizers & asset helpers
├── references/             # Archived reference documents & downloaded source materials
│   ├── brochures/          # Verified project brochures (e.g. Shree Bramhand)
│   └── downloaded/         # Scraped font caches and web metadata
├── node_modules/           # Node.js project dependencies
├── package.json            # Project manifest & scripts
├── package-lock.json       # Exact dependency lockfile
└── server.js               # Local development HTTP server (Node.js)
```

---

## Running Locally

To start the local development server:

```bash
npm start
# or
node server.js
```

The server runs on **`http://localhost:3000/`**.

### Available Routes:
- **Home**: `http://localhost:3000/`
- **Projects**: `http://localhost:3000/projects`
  - 15 Project Detail Routes: `/projects/shree-bramhand`, `/projects/shree-safalya`, `/projects/shree-anant`, `/projects/shree-niwas`, `/projects/shree-vishwa`, `/projects/shree-swarup`, `/projects/shree-nandan`, `/projects/shree-malhar`, `/projects/shree-neelkanth`, `/projects/shree-pandurang`, `/projects/shree-venkatesh`, `/projects/shree-nath-enclave`, `/projects/shree-navshakti`, `/projects/shree-samruddhi-park`, `/projects/shree-padma`
- **About**: `http://localhost:3000/about`
- **Contact**: `http://localhost:3000/contact`
