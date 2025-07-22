# **Shaan-e-Zaban (شانِ زبان)**

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/frontend-Next.js-blue)
![Status](https://img.shields.io/badge/status-Active-lightgrey)

**Shaan-e-Zaban** is an open-source Urdu language learning platform focused on delivering culturally rooted, script-faithful, and context-driven instruction through immersive short stories.

---

## 📚 Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [Directory Structure](#directory-structure)
* [Installation](#installation)
* [Data Format](#data-format)
* [License](#license)
* [Contribution](#contribution)

---

## 🔍 Overview

**Shaan-e-Zaban** is a story-based Urdu language learning platform designed to preserve the linguistic, literary, and cultural heritage of Urdu through structured storytelling. The platform emphasizes **native script (Nastaliq)** instruction, avoiding Romanized or simplified transliterations, in order to maintain the language’s integrity and richness.

The application introduces learners to Urdu using level-based short stories written in formal, everyday, and conversational Urdu — with aligned translations and audio pronunciation support.

---

## ✨ Key Features

* **Story-Based Curriculum**
  Language is taught through progressive short stories categorized into Beginner, Intermediate, and Advanced levels. Each story introduces contextual vocabulary, sentence structure, and grammar elements.

* **Native Urdu Script (Nastaliq)**
  All content is delivered in original Urdu script. Roman Urdu or Latinized substitutions are deliberately avoided.

* **Human Pronunciation Audio**
  Audio is sourced from open pronunciation databases like [Tatoeba](https://tatoeba.org) and [LinguaLibre](https://lingualibre.org), ensuring natural and culturally accurate pronunciation.

* **Tag-Based Filtering**
  Stories are tagged with grammar topics, themes, and difficulty levels, enabling learners to navigate and focus their learning effectively.

* **Fully Open Source**
  Released under the MIT License, allowing full transparency and community contribution.

* **Modern Stack Architecture**
  Built with Next.js, Tailwind CSS, and Prisma ORM, ensuring a responsive, modular, and extensible codebase.

---

## ⚙️ Technology Stack

* **Frontend/Backend**: Next.js (App Router, React 19)
* **Styling**: Tailwind CSS
* **ORM & Database**: Prisma + PostgreSQL
* **Authentication**: NextAuth
* **Audio Integration**: Static assets (MP3) from public pronunciation databases
* **Deployment**: Online-first (offline support planned)

---

## 📁 Directory Structure

```bash
shaan-e-zaban/
├── compose.yml
├── CONTRIBUTING.md
├── curriculum/
│   ├── beginner/stories.json
│   ├── intermediate/stories.json
│   └── advanced/stories.json
├── LICENSE
├── README.md
└── sez/
    ├── public/audio/
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── app/
    │   │   ├── learn/[level]/[story]/page.tsx
    │   │   ├── api/
    │   │   ├── auth/
    │   │   ├── curriculum/page.tsx
    │   │   └── dashboard/page.tsx
    │   ├── components/
    │   └── lib/
    ├── next.config.ts
    ├── tsconfig.json
    └── yarn.lock
```

---

## 🚀 Installation

### Prerequisites

* Node.js 20+
* Yarn (or npm / bun)

### Steps

```bash
cd sez
yarn install
yarn dev
```

Visit: `http://localhost:3000` to access the platform locally.

---

## 📄 Data Format

### Example: `curriculum/beginner/stories.json`

```json
[
  {
    "id": 1,
    "title": "میرا پہلا دن",
    "level": "beginner",
    "sentences": [
      {
        "urdu": "آج میرا اسکول میں پہلا دن تھا۔",
        "english": "Today was my first day at school."
      },
      {
        "urdu": "میں بہت خوش تھا کیونکہ مجھے نئے دوست بنانے تھے۔",
        "english": "I was very happy because I wanted to make new friends."
      }
    ]
  }
]
```

Each story consists of:

* A unique identifier and title
* Urdu content split by sentence
* English translation for each sentence
* Audio paths for pronunciation
* Associated tags for filtering and categorization

---

## 📜 License

**MIT License**
© 2025 Mohammad Ali

See [`LICENSE`](./LICENSE) for full details.

---

## 🤝 Contribution

Contributions are welcome. Please refer to the [`CONTRIBUTING.md`](./CONTRIBUTING.md) guide for details.

You can contribute by:

* Writing original Urdu stories
* Recording high-quality Urdu audio
* Improving UI/UX or accessibility
* Suggesting features or enhancements
* Reviewing and testing existing content

Pull requests and discussions are encouraged.