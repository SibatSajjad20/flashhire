<div align="center">

# ⚡ FlashHire — AI Resume Optimizer

### Stop getting filtered out. Start getting interviews.

**FlashHire** uses Google Gemini AI to rewrite your resume around any job description — maximizing ATS keyword matches, strengthening bullet points, and giving you a real shot at getting past the bots.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-8B5CF6?style=for-the-badge&logo=google)](https://ai.google.dev)

![FlashHire Demo](https://raw.githubusercontent.com/SibatSajjad20/flashhire/main/public/demo.png)

</div>

---

## 🚀 What is FlashHire?

Most resumes never reach a human. They get killed by **Applicant Tracking Systems (ATS)** — automated filters that scan for exact keywords before a recruiter ever sees your name.

FlashHire fixes that. Paste your resume and a job description, and our AI — acting as a Senior Technical Recruiter — rewrites your bullets to:

- ✅ Match the **exact keywords** from the job description
- ✅ Start every bullet with a **strong action verb**
- ✅ Make your experience sound **quantifiable and impactful**
- ✅ Output clean, **ATS-friendly Markdown**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Gemini AI** | Powered by Google Gemini 2.5 Flash — one of the most capable LLMs available |
| 🎯 **ATS Optimization** | Engineered prompt that maximizes keyword density without fabricating experience |
| 📊 **Side-by-Side View** | Compare your original vs optimized resume instantly on the results page |
| 🗄️ **Persistent History** | Every optimization is saved to a PostgreSQL database hosted on Neon |
| ⚡ **Retry Logic** | Auto-retries on API overload with exponential backoff — no failed requests |
| 📋 **One-Click Copy** | Copy your optimized resume to clipboard instantly |
| 🌑 **Dark UI** | Sleek dark interface built for focus — no distractions |

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router) — file-based routing, server components
- **React 19** — latest concurrent features
- **Tailwind CSS v3** — utility-first styling
- `sessionStorage` — passes results between pages without a round-trip

### Backend
- **Next.js API Routes** — serverless POST endpoint at `/api/optimize`
- **@google/genai SDK** — official Google Gemini client
- Input validation, error handling, and non-blocking DB writes

### Database
- **PostgreSQL** via **Neon** (serverless, auto-scaling)
- 3 tables: `resumes`, `job_descriptions`, `optimized_resumes`
- Connection pooling via the `pg` library

### AI
- **Model:** `gemini-2.5-flash-lite`
- **Prompt Engineering:** Senior Technical Recruiter persona with 4 hard constraints
- **Retry Strategy:** 3 attempts with 1s/2s backoff on 503 errors

---

## 📁 Project Structure

```
flashhire/
├── app/
│   ├── api/
│   │   └── optimize/
│   │       └── route.js        # POST /api/optimize
│   ├── results/
│   │   └── page.js             # Side-by-side results page
│   ├── globals.css             # Tailwind base styles
│   ├── layout.js               # Root layout
│   └── page.js                 # Home page (input form)
├── lib/
│   ├── ai.js                   # Gemini AI integration + retry logic
│   └── db.js                   # PostgreSQL connection pool
├── scripts/
│   └── init-db.mjs             # DB schema initialization script
└── .env.local                  # Environment variables (never committed)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/apikey) API key
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/SibatSajjad20/flashhire.git
cd flashhire
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_neon_postgresql_connection_string_here
```

### 4. Initialize the database

```bash
npm run init-db
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start optimizing.

---

## 🗃️ Database Schema

```sql
-- Stores original resumes
CREATE TABLE resumes (
  id          SERIAL PRIMARY KEY,
  original_text TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores job descriptions
CREATE TABLE job_descriptions (
  id               SERIAL PRIMARY KEY,
  role_title       VARCHAR(255),
  description_text TEXT NOT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Links resumes to job descriptions with the AI output
CREATE TABLE optimized_resumes (
  id                  SERIAL PRIMARY KEY,
  resume_id           INTEGER REFERENCES resumes(id) ON DELETE CASCADE,
  job_description_id  INTEGER REFERENCES job_descriptions(id) ON DELETE CASCADE,
  optimized_text      TEXT NOT NULL,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key from [AI Studio](https://aistudio.google.com/apikey) |
| `DATABASE_URL` | Neon PostgreSQL connection string (with `sslmode=require`) |

> ⚠️ Never commit `.env.local` — it's already in `.gitignore`

---

## 🚢 Deployment

This project is optimized for **Vercel** deployment:

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add `GEMINI_API_KEY` and `DATABASE_URL` in the Vercel environment variables dashboard
4. Deploy — done ✅

Every push to `main` auto-deploys.

---

## 👨‍💻 Developer

<div align="center">

**Sibat Sajjad** — Full Stack Web Developer

Passionate about building scalable, modern web applications with cutting-edge technologies.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sibat-sajjad-a096731a9/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/SibatSajjad20)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](https://mail.google.com/mail/?view=cm&to=sajjadsibat33@gmail.com)

</div>

---

<div align="center">

⭐ **If this project helped you, drop a star — it means a lot!**

*Built with ❤️ and way too much coffee*

</div>
