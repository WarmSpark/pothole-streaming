# MediaMerge Web 🎬🔐

A high-performance media platform frontend combining **Digital Asset Management (DAM)**, **Rights & Royalty Accounting**, and a **Subscription Streaming Service with DRM & ABR Ladders**.

Built with the exact **Pothole streaming dark theme** (`#0C111B`, Electric Blue `#1f80e0`, Cinema Red `#E50914`, Neon Violet `#9D4EDD`).

---

## 🚀 Key Modules & Architecture

### 1. 🍿 Stream & Discover (The Consumer Experience)
* **Hero Billboard Banner:** High-impact hero preview with trailer playback, 99% AI match score, DRM indicators, and audio toggles.
* **Vector Recommendations Row:** Ranked by preference embeddings and watch completion vectors.
* **Master Mezzanine Vault:** High-bitrate 4K ProRes & HDR catalog cards.
* **DRM ABR Video Player Modal:**
  * Interactive **Adaptive Bitrate (ABR)** ladder selector (`Auto`, `4K UHD 16.5 Mbps`, `1080p 5.2 Mbps`, `720p 2.4 Mbps`, `480p 850 Kbps`).
  * **MPEG-CENC Decryption Status HUD:** Live key ID (`KID`) inspection and license authentication status.
  * **10-Second Royalty Telemetry Heartbeat:** Quietly emits watch-time pings that increment the session payout and sync directly to the royalty ledger.

### 2. 🗄️ Digital Asset Management (DAM Studio)
* **Mezzanine Master Ingest Station:** Drag-and-drop zone simulating presigned chunked S3 uploads with speed meter (`48.4 MB/s`).
* **Technical Metadata Inspector:** Instant readout of container profiles (ProRes 4444 XQ, MXF, MKV), codecs, ACEScc color grading, and spatial audio channels.
* **ABR Ladder Generator:** Visualizes sliced `.ts` HLS chunks, bitrates, and CENC encryption statuses.
* **Pipeline Visualizer:** 4-stage assembly line from Raw Mezzanine ➔ FFmpeg Transcoder ➔ Shaka Packager ➔ Edge CDN.

### 3. ⚖️ Rights & Geofencing Matrix
* **Contractual Rules Ledger:** Tracks licensors, license windows (expiration dates), and exclusivity terms (Exclusive vs Non-Exclusive).
* **Geo-IP Manifest Access Simulator:** Test whether a user from India, the US, Germany, Japan, or Brazil is granted access (`200 OK`) or blocked (`HTTP 451 Unavailable For Legal Reasons`).

### 4. 📊 Royalty Accounting Ledger
* **Double-Entry Financial Stream:** Append-only ledger displaying transaction hashes, licensor names, anonymous user hashes, watch duration, and accrued payouts.
* **Real-Time Integration:** Whenever you watch a video in the player, real-time 10s heartbeats generate new live ledger entries.
* **Licensor Payout Calculator:** Interactive simulator calculating net revenue distribution by watch minutes and contract rates.

### 5. 💎 Subscriptions & Entitlements
* **Tier Pricing Grid:** Basic (720p Ad-supported), Standard (1080p 5.1), and Premium (4K UHD + Dolby Vision + Widevine L1 Hardware DRM).
* **Redis Device Limiter:** Active device session tracker with instantaneous stream token revocation to prevent password sharing.

---

## 🛠️ How to Run Locally

```bash
cd /home/divyansh_1410/mediamerge-web

# Install dependencies (already installed)
npm install

# Start the Vite development server
npm run dev
```

The app will start on `http://localhost:5173` (or the next available port). Open it in your browser to experience the full interactive platform!

---

## 📦 Tech Stack
* **Framework:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS v4 (Pothole palette)
* **Icons:** Lucide React
* **Architecture:** 100% Client-side state & interactive simulation (Zero backend required to run).
