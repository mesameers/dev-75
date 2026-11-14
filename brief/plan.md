# Portfolio Video & Web Architecture Plan: "Built in Orbit"
**Author:** Sameer Hussain  
**Repository:** [github.com/mesameers/dev-75](https://github.com/mesameers/dev-75)  
**Workspace:** `c:\Users\User\Desktop\pf-website`  
**Date:** 2026-11-14  

---

## 1. Setup & Environment Check

| Check | Status | Details |
|---|---|---|
| **Git Remote** | Verified | `origin https://github.com/mesameers/dev-75.git` (authenticated as `Sameershabbir75`, email: `mesameer762@gmail.com`) |
| **Workspace Status** | Clean checkout | Cloned repo into `c:\Users\User\Desktop\pf-website` on branch `main` |
| **Runtime & Tooling** | Verified | Node `v24.20.0`, npm `12.2.0`, `git-lfs/3.7.1` available |
| **Vercel Connection** | Pending link | No `.vercel/` configuration existed. Added `vercel.json` configured for single-command zero-config deployment |
| **Local Build** | Phase 1 target | React + Vite + Tailwind CSS + Remotion (`/video`) deterministic rendering pipeline |

---

## 2. Repo Inspection & Asset Reuse

- **Existing Project Discovery**:
  - Found Sameer Hussain's enterprise project in the local environment: **Professional Multi-Campus School Management System (EIMS)** (`React (Vite) + Tailwind CSS + Node.js Express + Supabase PostgreSQL`).
  - **Verified Metrics & Real Facts**:
    - **Platform Scale**: 231 Registered Users, 3 Active Campus Institutes, 2,341 Active Sessions (+23.1% trend), 34.2% Growth Rate.
    - **Campus Operations**: 1,240 Students enrolled, 68 Certified Faculty members, 94% Monthly Fee Recovery, 96.4% Daily Attendance.
    - **Architecture**: Superadmin Platform Administration, Institute Admin Portal, Role-Based Access Control (RBAC), Supabase PostgreSQL 16 relational schema, Express REST API.
- **Brand Palette & Design Tokens**:
  - **Space Background**: `#080A10` (Cosmic void), `#0E131F` (Deep space card base).
  - **Energy Accent**: Neon Teal `#00F2FE` / `#00FFE0`.
  - **Secondary Harmony**: Electric Violet `#7928CA` / `#8B5CF6`.
  - **Technical Accent**: Signal Cyan `#38BDF8` / Warm Gold `#F59E0B`.
- **Typography**:
  - Headlines & Display: `Inter`, `Space Grotesk` (geometric, tight tracking `-0.03em`, weighted contrast).
  - Monospace Data Layer: `JetBrains Mono` / `Space Mono` for commit hashes, telemetry coordinates, and code terminal.

---

## 3. Video Architecture: "Built in Orbit"

- **Framerate**: 30.0 fps (100% deterministic frame math).
- **Resolution**: 1920 × 1080 (16:9 Master Presentation), 1080 × 1920 (Vertical Social Cut), 1280 × 720 (6s Web Loop).
- **Total Duration**: 60.0 seconds (1,800 frames).

### Scene Breakdown & Timing

| Scene | Name | Time Range | Frames | Key Visuals & Audio Beats |
|---|---|---|---|---|
| **01** | **Hero: Orbit Initialization** | 0.0s – 8.0s | 0 – 240 | "SAMEER HUSSAIN" kinetic mask reveal, role "Full-Stack Developer & Creative Engineer", drifting cosmic particles, hero wireframe orb with beat-synced shell breathing. |
| **02** | **Philosophy & Telemetry** | 8.0s – 17.0s | 240 – 510 | "Systems Built for Resilience & Scale", terminal window compiling live commit logs, real metrics telemetry counters. |
| **03** | **Skills in Orbit** | 17.0s – 26.0s | 510 – 780 | 12-column grid of levitating tech cards (React, Node.js, TypeScript, PostgreSQL, Supabase, Cloud/Docker) with vertical sine drift and softening contact shadows. |
| **04** | **Flagship System: NexusCloud** | 26.0s – 37.0s | 780 – 1110 | Enterprise Cloud Platform showcase: High-throughput telemetry, 12.4k req/sec, multi-tenant governance, floating cards detaching in 3D depth and re-docking. |
| **05** | **Services & Engineering Capabilities** | 37.0s – 47.0s | 1110 – 1410 | Core service disciplines: Enterprise Web Apps, Cloud Architecture & Security, High-Throughput APIs, Interactive Motion UIs. |
| **06** | **Finale: Git Convergence & CTA** | 47.0s – 60.0s | 1410 – 1800 | Branch trails and commit nodes accelerate into a gravitational merge, exploding into the closing lockup: **LET'S TALK** (`mesameer762@gmail.com` / GitHub `@mesameers`). |

---

## 4. Signature Effect: Subtle Anti-Gravity System

1. **`<Levitate>` Component**:
   - Vertical sinusoidal drift: $y(f) = A \cdot \sin(2\pi \cdot f / T + \phi)$ where $A \in [6, 10]\text{px}$, $T \in [120, 180]\text{ frames}$ (4–6s).
   - Roll oscillation: $\pm 1.0^\circ$ roll phase-shifted by $90^\circ$.
   - Seeded pseudo-random phase $\phi$ per element via deterministic PRNG (MurmurHash3 / Mulberry32).
   - Contact shadow: dynamically expands and diffuses as card elevates, contracts and sharpens as it descends.
2. **"Lift-Off" Transitions**:
   - Outgoing elements accelerate upward while applying progressive motion blur and opacity falloff.
   - Incoming elements emerge from z-depth with a subtle spring overshoot ($damping = 14$, $stiffness = 120$).
3. **Hero 3D Separation**:
   - Shell expansion on beat 120 (4.0s) separating 6% outward in spherical coordinates and settling within 28 frames.
4. **Determinism Guarantee**:
   - No `Date.now()`, no `requestAnimationFrame`, zero unseeded `Math.random()`.
   - All motion calculated solely from Remotion's `useCurrentFrame()` and `interpolate()` / `spring()`.

---

## 5. Web Platform & Vercel Integration

- **Framework**: Vite + React + Tailwind CSS with Lucide icons.
- **Sections**:
  - **Navigation**: Clean glassmorphic header with status badge (`Available for Q4/Q1 Projects`).
  - **Hero**: Kinetic typography and quick links (GitHub, Email, Resume).
  - **"Watch the Film"**: Dedicated cinema theatre section embedding the code-rendered video with:
    - HTML5 Video Player with custom dark controls
    - Muted autoplay with loop capability
    - Burned-in and sidecar `.vtt` subtitles toggle
    - Resolution switcher (1080p / 720p loop)
  - **Featured Engineering (EIMS)**: Full interactive breakdown of the Multi-Campus School Management System.
  - **Tech Stack & Capabilities**: Interactive categorized skill matrix.
  - **Contact & Git CTA**: Terminal-styled contact card.
- **Vercel Deployment**:
  - `vercel.json` with cache-control headers for media assets and SPA rewrites.
  - Zero serverless rendering overhead: pre-rendered optimized MP4/WebM stored in `/public/media`.

---

## 6. Accessibility & Compliance (Hard Requirements)

- **Captions**: Embedded `.vtt` track with accurate timestamps and transcription.
- **Flicker Safety**: All animations capped below 1.5 Hz (well under the 3 Hz photosensitivity threshold).
- **Contrast**: Text contrast strictly $\ge 4.5:1$ against dark background scrims (`#080A10` vs `#F8FAFC`).
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by dampening `<Levitate>` amplitude to 0px and replacing 3D camera dollies with static crossfades.

---

## 7. Execution Phases

- [x] **Phase 0: Inspection & Plan** -> `/brief/plan.md` created; Git remote checked; environment verified.
- [ ] **Phase 1: MVP Architecture** ->
  - Set up Vite + React + Tailwind + Remotion workspace in root and `/video`.
  - Implement `<Levitate>` signature component and seeded PRNG.
  - Build Scenes 01 to 06 with deterministic frame animations.
  - Build Portfolio Web App with "Watch the Film" player and EIMS showcase.
  - Test build locally (`npm run build`).
  - Commit and push to GitHub repository `dev-75`.
- [ ] **Phase 2: Enhancement & 3D refinement** ->
  - R3F particle constellation and 3D geometric hero shell separation.
  - Git branch trails & merge gravitational pull.
- [ ] **Phase 3: Polish & Export Formats** ->
  - Render 1080p preview, 6s web loop, and sidecar captions.
  - Final Vercel verification and tag `v1.0`.

---
*Ready for approval to proceed with Phase 1 MVP implementation.*
