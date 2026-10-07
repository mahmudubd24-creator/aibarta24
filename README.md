# AI BARTA 24

**AI Barta 24** is a premium, modern AI education, personal brand, course marketplace, and digital learning ecosystem founded by **Mahmudul Hasan**.

- **Founder & Instructor:** Mahmudul Hasan (AI Educator | AI Trainer | AI Learner | Content Creator)
- **Primary Email:** [aibartabd@mail.com](mailto:aibartabd@mail.com)
- **Brand Concept:** AI + Education + Technology + Creativity + Digital Learning + Bengali Identity

---

## 🚀 Key Features

1. **Brand Identity & Landing Page:**
   - Futuristic, professional aesthetic with Deep Navy (`#030712`, `#0B132B`), Electric Blue, and Cyan accents.
   - Dual-language typography: English (`Plus Jakarta Sans`) & Bengali (`Hind Siliguri`).
   - Anti-slop zero-pill design discipline and high visual rhythm.

2. **Personal Brand & Expertise:**
   - Dedicated sections on Mahmudul Hasan's philosophy, mission, vision, and teaching methodology.
   - Core AI disciplines: Generative AI, Prompt Engineering, AI Video Production, No-Code Automation (Make/n8n), AI Marketing, and Custom GPTs.

3. **Course Marketplace & Details:**
   - Filterable courses by category and search keywords.
   - Dedicated syllabus breakdowns, collapsible modules, lesson duration, and free video preview modals.

4. **Multi-Step Enrollment & Payment System:**
   - Manual payment gateways: **bKash**, **Nagad**, **Rocket**, and **Bank Transfer**.
   - Copyable merchant/personal account numbers with step-by-step instructions.
   - Transaction verification submission (Sender number, TrxID, receipt screenshot URL).
   - Coupon system with percentage or flat discount calculations.
   - Ready-to-connect architecture for automated payment gateways (SSLCommerz, bKash PGW, Stripe).

5. **Student Learning Portal:**
   - Student Dashboard tracking course progress and enrolled modules.
   - Interactive Course Player classroom with lesson video, lecture notes, downloadable assets, and "Mark as Completed" progression.
   - Downloadable resources library (cheat sheets, prompt packs, ZIP blueprints).
   - Order history with live verification statuses.

6. **Full-Featured Protected Admin Panel (`/admin`):**
   - Overview metrics: Revenue (BDT), Pending Verifications, Enrolled Students, Active Courses.
   - 1-click Order Verification: Approve or Reject manual transactions (approval immediately grants course access).
   - Course Curriculum Manager: Create, edit, publish/draft courses and syllabus lessons.
   - Digital Products & Downloads Manager.
   - Inbound Contact Messages desk.
   - Settings CMS: Edit brand title, hero text, Mahmudul Hasan biography, payment numbers, and SEO metadata without editing code.
   - Full JSON Platform Data Export & Backup.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Icons:** Lucide React
- **Typography:** Plus Jakarta Sans & Hind Siliguri (Google Fonts)
- **State & Storage:** Context API with persistent localStorage & JSON schema backup
- **Deployment Targets:** Netlify, GitHub Pages, Vercel, VPS, or Docker

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Netlify Deployment Guide

1. Push your repository to **GitHub**.
2. Connect your repository to **Netlify**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. SPA routing is pre-configured via `public/_redirects` (`/*  /index.html  200`).
4. To connect a custom domain like `aibarta24.com`:
   - Go to **Site Configuration → Domain Management** in Netlify.
   - Add your custom domain.
   - Point your DNS A-Record or CNAME to Netlify's servers.

---

## 🔐 Admin Authentication

- To access the Admin Dashboard, click on **Admin** in the demo role switcher or navigate to `/admin`.
- Default pre-configured administrator:
  - **Email:** `admin@aibarta24.com`
  - **Role:** `admin`
- All settings, payment numbers, and course content can be managed directly in the Admin Panel without touching source code.
