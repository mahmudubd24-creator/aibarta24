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

## 🔒 Private & Secure Admin Panel Guide

The AI Barta 24 Admin Panel is completely private and hidden from public visitors. It uses native Web Crypto PBKDF2-SHA-256 salted hashing (100,000 iterations), brute-force rate-limiting protection, and session validation.

### 1. How to Create Your First Admin Account
1. Open your browser and navigate directly to:
   ```
   https://yourdomain.com/admin/setup
   ```
   (In local development: `http://localhost:3000/admin/setup`)
2. You will be greeted by the **First Admin Setup Wizard**.
3. Enter your **Admin Gmail / Email** (e.g. `mahmudubd24@gmail.com`).
4. Enter your desired **Admin Password** (minimum 8 characters) and confirm it.
5. Click **"Save Credentials & Lock Setup"**.
6. Your credentials will be cryptographically salted and hashed. Once created:
   - An active 24-hour admin session will begin immediately.
   - The `/admin/setup` portal is **permanently disabled and locked** to prevent anyone else from running setup again.

---

### 2. Where to Set Your Admin Gmail
* **During First Setup:** Enter your Gmail directly into the `/admin/setup` screen.
* **Via Environment Variable (Optional):** You can set `VITE_ADMIN_EMAIL="mahmudubd24@gmail.com"` in your Netlify or `.env` configuration. This will automatically prefill your email in the setup wizard for convenience.

---

### 3. Where to Set / Change Your Admin Password
* **Initial Password:** Set during the one-time `/admin/setup` process.
* **Change Password Later:**
  1. Log into `/admin`.
  2. Navigate to **Platform Settings** (the bottom tab in the Admin sidebar).
  3. Scroll to the **Admin Security & Password Management** section.
  4. Enter your **Current Password**, followed by your **New Password** and **Confirm New Password**.
  5. Click **"Update Password Securely"**. The system verifies your current password, generates a fresh cryptographic salt, hashes the new password with PBKDF2, and refreshes your secure session token.

---

### 4. How to Log Into `/admin`
1. Navigate directly to the protected login portal:
   ```
   https://yourdomain.com/admin/login
   ```
2. Enter your registered Admin Gmail and Password.
3. Click **"Sign In to Admin Panel"**.
4. Upon successful verification, you will be redirected to the full Admin Dashboard at `/admin`.
5. If an unauthenticated visitor tries to type `/admin` directly, the system immediately redirects them to `/admin/login` without disclosing any dashboard data.

---

### 5. Brute-Force Rate Limiting & Lockout Protection
* To prevent unauthorized access, the login endpoint tracks consecutive failed attempts.
* After **5 failed login attempts**, the login portal triggers an automated **5-minute security lockout**. A live countdown timer is displayed and further attempts are rejected until the cooldown expires.

---

### 6. Netlify Environment Variables Configuration
To configure environment variables for production on Netlify:
1. Log in to your [Netlify Dashboard](https://app.netlify.com).
2. Go to your site: **Site configuration → Environment variables**.
3. Click **Add a variable** and configure:
   - `VITE_ADMIN_EMAIL`: Your master admin email (e.g. `mahmudubd24@gmail.com`).
   - `VITE_SITE_TITLE`: `AI Barta 24`
   - `VITE_FOUNDER_NAME`: `Mahmudul Hasan`
   - `VITE_CONTACT_EMAIL`: `aibartabd@mail.com`
4. Re-deploy the site.

---

### 7. Security Best Practices
- **Never commit plain-text credentials** to GitHub or any public repository.
- **Never hardcode passwords** into frontend source code.
- Always use a strong, unique password consisting of letters, numbers, and symbols.
- Log out of the Admin Panel when using shared computers using the **"Logout"** button in the Admin sidebar, which terminates the active cryptographic session token.
- SPA redirects are secured via `public/_redirects` (`/*  /index.html  200`).

