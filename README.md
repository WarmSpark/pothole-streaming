# POTHOLE STREAMING 🎬⚡

An enterprise-grade cinema streaming platform and Digital Asset Management (DAM) system engineered with **Django REST Framework (DRF)**, **React 19 (TypeScript & Vite)**, **RFC 7233 HTTP 206 Byte-Range Video Streaming Proxy**, **Real-Time 10-Second Micro-Royalty Telemetry**, and **Supabase PostgreSQL**.

---

## 🚀 Key Architectural Features

- **HTTP 206 Byte-Range Streaming Engine:** Shields raw origin video storage URLs behind a high-performance Django streaming proxy. Supports seek scrubbing, instant buffering, and forward-chunk streaming.
- **Universal OMDb & IMDb Catalog:** Integrated with OMDb API for high-resolution theatrical posters, IMDb scores, synopsis, director, cast, and companion 4K YouTube trailers.
- **Publisher Portal & Multi-Tenant Studio DAM:** Dedicated publisher portal for genre studios (`scifi_studios`, `action_studios`, `drama_studios`, `anime_studios`) to manage hosted releases and view real-time earnings.
- **10-Second Micro-Royalty Settlement Ledger:** High-frequency playback telemetry logs verified watch time directly to the Supabase database ledger, calculating streaming payouts per second.
- **Role-Based Access Control (RBAC):** Gated full-movie streaming (requires viewer sign-in), protected publisher dashboard (studio role only), and guest trailer browsing.
- **Cinema-Grade Netflix Aesthetic:** Fluid 60fps intro animation with the iconic "TA-DUM" boom sound synthesized via the Web Audio API, responsive carousel rows, and modal previews.

---

## 🏗️ Project Architecture

```
pothole-streaming/
├── render.yaml                 # 1-Click Automated Render Blueprint
├── .gitignore                  # Git ignore rules for Python & Node
├── README.md                   # System documentation
│
├── pothole-django/             # Backend API & Streaming Proxy
│   ├── manage.py
│   ├── build.sh                # Render deployment build script
│   ├── Procfile                # Gunicorn production entrypoint
│   ├── requirements.txt        # Production dependencies
│   ├── accounts/               # Custom User & Auth APIs (JWT)
│   ├── movies/                 # Catalog & HTTP 206 Streaming Views
│   ├── royalties/              # Real-Time Telemetry & Studio Ledger
│   └── pothole_backend/        # Project settings & URL routing
│
└── mediamerge-web/             # Frontend Client Application
    ├── index.html              # HTML5 entry with strict-origin policy
    ├── package.json
    ├── vite.config.ts
    ├── public/
    │   └── _redirects          # SPA client routing rewrite rule
    └── src/
        ├── api.ts              # API client (auto-detects production URL)
        ├── App.tsx             # Main Netflix layout & route guards
        └── components/         # NetflixHero, Rows, Player, StudioView, Intro
```

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons |
| **Backend** | Python 3.11+, Django 5/6, Django REST Framework, SimpleJWT |
| **Streaming** | RFC 7233 HTTP 206 Partial Content Reverse-Proxy, Web Audio API |
| **Database** | PostgreSQL (Supabase Cloud) |
| **Audio** | Web Audio API (Synthesized sub-bass, mid thump, and metallic chime) |
| **Deployment** | Render (Web Service + Static Site CDN) |

---

## ⚡ Quick Start (Local Development)

### 1. Backend (Django)
```bash
cd pothole-django
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver 0.0.0.0:8000
```

### 2. Frontend (Vite)
```bash
cd mediamerge-web
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Publisher & Viewer Credentials

The sign-in modal features 1-click demo login buttons for immediate testing:

| Role / Account | Email | Password | Catalog Focus |
| :--- | :--- | :--- | :--- |
| **Apex Sci-Fi Productions** | `scifi_studios@pothole.tv` | `StudioPass123!` | *Interstellar*, *Inception*, *Blade Runner 2049*, *Matrix* |
| **Titan Action Studios** | `action_studios@pothole.tv` | `StudioPass123!` | *The Dark Knight*, *John Wick*, *Fight Club*, *Avengers* |
| **Criterion Drama Works** | `drama_studios@pothole.tv` | `StudioPass123!` | *Oppenheimer*, *Whiplash* |
| **Sakura Animation Studios** | `anime_studios@pothole.tv` | `StudioPass123!` | *Spider-Man: Across the Spider-Verse*, *Your Name*, *Suzume* |
| **Demo Viewer** | `viewer_demo@pothole.tv` | `ViewerPass123!` | Consumer streaming access |

---

## 🌐 Deploy to Render

This repository includes a `render.yaml` blueprint for 1-click deployment on Render:

1. Push this repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com) $\rightarrow$ Click **New +** $\rightarrow$ **Blueprint**.
3. Select your repository. Render will automatically provision:
   - **`pothole-backend`** (Python Web Service with Gunicorn)
   - **`pothole-frontend`** (Static Site on Global Edge CDN)
4. Click **Apply**. Both services will build and link automatically.
