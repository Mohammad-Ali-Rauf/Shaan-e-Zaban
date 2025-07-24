# **Shaan-e-Zaban (شانِ زبان)**

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/frontend-Next.js-blue)
![Status](https://img.shields.io/badge/status-Active-lightgrey)

**Shaan-e-Zaban** is the world’s first open-source, community-driven Urdu language learning platform. It empowers learners and native speakers to contribute immersive short stories — complete with native **Nastaliq script**, **human audio**, and **contextual translations** — all through an elegant, scalable, and modular web app.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [License](#license)
- [Contribution](#contribution)

---

## 🔍 Overview

**Shaan-e-Zaban** is more than just an app — it’s a cultural movement.  
Instead of vocab drills or robotic gamification, learners explore Urdu through **community-written stories** presented in authentic Urdu script.

Authors control their content:  
they can optionally add **word-by-word translations**, upload **custom pronunciation audio**, and tag their stories for thematic or grammatical relevance.

### 🧠 Architecture Breakdown

- ✍️ **Story content is managed in Sanity CMS**
- 🧑‍💼 **Users are managed in PostgreSQL**
- 📂 **Legacy stories in `/curriculum/` are used to seed Sanity at setup time**

---

## ✨ Key Features

* **📝 Community-Contributed Stories**  
  Any signed-in user can create, edit, and delete their own stories via a full CRUD interface.

* **📚 Progressive Learning Flow**  
  Stories are categorized into Beginner, Intermediate, and Advanced levels — building vocabulary and grammar naturally through context.

* **🖋 Nastaliq Script**  
  Learners read in beautiful, calligraphic **Nastaliq**.

* **🔊 Optional Audio Support**  
  Authors can attach `.mp3` or `.wav` recordings of their own voice or public sources for pronunciation guidance.

* **📘 Optional Word-Level Translations**  
  Sentence-level English translations are required, but authors can also break down vocabulary per word.

* **🏷️ Tags for Grammar & Topics**  
  Helps learners filter by themes, sentence structures, or even tenses.

* **🔐 JWT Auth System**  
  User auth and story ownership is secured via a simple custom JWT-based system.

* **🌍 Open Source & Built to Scale**  
  Released under the MIT License. Scalable with Sanity, extendable with React components, and deployable anywhere.

---

## ⚙️ Technology Stack

| Layer           | Tech                                           |
|----------------|------------------------------------------------|
| Frontend        | **Next.js** (App Router, React 19)             |
| Styling         | **Tailwind CSS**                               |
| Backend API     | **Next.js API Routes**                         |
| Content Layer   | **Sanity CMS** (for stories, tags, media, etc.)|
| Database        | **PostgreSQL via Prisma** (for user auth only) |
| Auth            | **JWT (Custom Implementation)**                |
| Audio Storage   | **Static MP3/WAV** served via `/public/audio`  |
| Deployment      | Not deployed yet — local only for now          |

---

## 📁 Directory Structure

```bash
shaan-e-zaban/
├── compose.yml                   # Docker Compose (for local Postgres setup)
├── .env.example                  # Template for setting up your .env
├── .gitignore                    # Ignore unnecessary files from Git
├── LICENSE                       # MIT License file
├── README.md                     # You’re reading this
├── CONTRIBUTING.md               # Guidelines for community contributions

├── curriculum/                   # 🔹 Legacy story data used for seeding Sanity
│   ├── beginner/stories.json     # Beginner-level stories
│   ├── intermediate/stories.json # Intermediate-level stories
│   └── advanced/stories.json     # Advanced-level stories

└── sez/                          # 🔥 Main web app source
    ├── .env.example              # Frontend .env template
    ├── next.config.ts            # Next.js config
    ├── middleware.ts             # JWT auth check for protected routes
    ├── postcss.config.mjs        # Tailwind/PostCSS setup
    ├── eslint.config.mjs         # Custom ESLint rules
    ├── tsconfig.json             # TypeScript config
    ├── yarn.lock                 # Yarn dependency lockfile
    ├── sanity.config.ts          # Sanity studio config (schema, plugins)
    ├── sanity.cli.ts             # Sanity CLI bootstrap

    ├── prisma/                   # 🔐 User auth model only (via PostgreSQL)
    │   └── schema.prisma         # Only defines user & session schema

    ├── public/
    │   └── audio/                # Initial audio files for seeding into sanity with /curriculum (MP3/WAV)
    │       ├── 001.mp3
    │       └── 001.wav

    ├── sanity/                   # 📦 Sanity schema & CMS logic
    │   ├── env.ts                # Env var loading for Sanity scripts
    │   ├── lib/
    │   │   ├── client.ts         # Sanity client instance for queries
    │   │   ├── image.ts          # Image optimization helpers
    │   │   └── live.ts           # Preview/live content hooks (future use?)
    │   ├── schemaTypes/          # 🧠 Sanity content schemas
    │   │   ├── index.ts
    │   │   ├── sentence.ts       # Sentence model for stories
    │   │   ├── story.ts          # Main story schema
    │   │   └── word.ts           # Word-by-word translation model
    │   ├── structure.ts          
    │   └── scripts/
    │       └── seed.ts           # Seeds Sanity with curriculum JSON

    ├── src/                      # 🚀 Main application code (Next.js)
    │   ├── app/                  # App Router layout
    │   │   ├── layout.tsx        # Root layout (shared nav, fonts, etc)
    │   │   ├── globals.css       # Tailwind + custom global styles
    │   │   ├── page.tsx          # Homepage
    │   │   ├── about/page.tsx    # About page
    │   │   ├── contribute/page.tsx # Story submission info

    │   │   ├── dashboard/page.tsx  # User dashboard
    │   │   ├── learn/[level]/[slug]/page.tsx  # Dynamic story reader
    │   │
    │   │   ├── auth/              # Auth UI pages
    │   │   │   ├── signin/page.tsx
    │   │   │   └── signup/page.tsx

    │   │   ├── api/               # 🔐 API routes for auth + stories
    │   │   │   ├── auth/
    │   │   │   │   ├── login/route.ts
    │   │   │   │   ├── logout/route.ts
    │   │   │   │   ├── me/route.ts
    │   │   │   │   └── signup/route.ts
    │   │   │   └── stories/        # Story CRUD API
    │   │   │       ├── create/route.ts
    │   │   │       ├── delete/route.ts
    │   │   │       ├── getAll/route.ts
    │   │   │       ├── getById/route.ts
    │   │   │       └── update/route.ts

    │   ├── components/            # UI components
    │   │   ├── Editor.tsx         # Story editor component
    │   │   └── StoryCard.tsx      # Reusable story display card

    │   ├── hooks/
    │   │   └── useSession.ts      # Hook for managing auth session in UI

    │   └── lib/                   # Shared logic libs
    │       ├── db.ts              # DB connection
    │       ├── prisma.ts          # Prisma client instance
    │       ├── sanity.ts          # Sanity query functions
    │       └── getServerSession.ts # getting logged in user for server components
```

---

## 🚀 Installation

### Prerequisites

* Node.js 20+
* Yarn (or npm / bun)
* PostgreSQL (for users only)
* Sanity CLI + project setup

### Setup

```bash
cd sez
yarn install
yarn dev
```

App will be running at: `http://localhost:3000`

To seed stories into Sanity from `curriculum/`, run:

```bash
yarn sanity exec sanity/scripts/seed.ts
```

---

## 📜 License

**MIT License**
© 2025 Mohammad Ali
See [`LICENSE`](./LICENSE) for full terms.

---

## 🤝 Contribution

This is your platform too — help shape its future.

Check [`CONTRIBUTING.md`](./CONTRIBUTING.md) for how to get started.

### ✨ Ways to Contribute:

* ✍️ Write authentic Urdu short stories
* 🎙 Submit voice recordings (regional accents welcome!)
* 🧠 Help improve UX, accessibility, or UI polish
* 🐞 Find & squash bugs
* 🌐 Translate the interface (coming soon)
* 🛠 Propose & build new features

Together we’ll make Urdu learning **culturally rich, script-faithful, and community-owned**.
