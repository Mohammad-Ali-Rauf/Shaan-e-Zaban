# Shaan-e-Zaban (شانِ زبان)

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/frontend-Next.js-blue)
![Status](https://img.shields.io/badge/status-MVP-lightgrey)

**An open-source Urdu language learning platform built with simplicity, precision, and deep respect for the richness of the language.**

---

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
- [Data Format](#data-format)
- [License](#license)
- [Contribution](#contribution)

---

## Overview

**Shaan-e-Zaban** is a minimalistic, culturally authentic Urdu language learning app built by a native speaker — designed to fill the long-standing gap in structured, accessible, and Urdu-focused tools.

Unlike AI-heavy platforms or gamified distractions, this project prioritizes **clarity**, **real content**, and **respect for the language**.

⚠️ We do not use Roman Urdu. Shaan-e-Zaban teaches Urdu in its native **Nastaliq script**, not Latinized substitutions. Just like Mandarin, Russian, or Arabic apps don’t abandon their writing systems, **Urdu deserves to be taught in its own beautiful script**.

Roman Urdu is inconsistent, unstandardized, and unable to convey the cultural and visual beauty of Urdu — we don’t compromise.

> 🛠️ This is an MVP (Minimum Viable Product) release. Offline support will be added in future versions. The current build is designed for **online-first usage** to streamline development and deployment.

---

### Why It Matters

Urdu is the 10th most spoken language on Earth, yet has one of the weakest digital learning ecosystems.

**Shaan-e-Zaban is the FIRST-EVER application to teach the standard version of Urdu in a systematic way — and to do so in its original writing script.**

---

## Key Features

- **Built Specifically for Urdu**: Unlike most platforms that group Urdu under Hindi, Shaan-e-Zaban is dedicated to Urdu learners — with attention to linguistic, script, and cultural integrity.

- **Native Speaker Audio**: All content is paired with human pronunciation, sourced from open linguistic databases like [Tatoeba](https://tatoeba.org) and [LinguaLibre](https://lingualibre.org).

- **Tag-Based Sentence System**: Sentences are categorized by difficulty level, grammatical tone, and topic — enabling smart filtering and modular learning paths.

- **Open Source**: Fully MIT-licensed. Transparent, customizable, and built to be extended by the community.

- **Modern Web Stack**: Built using Next.js for a fast, flexible, and scalable frontend/backend architecture.

---

## Technology Stack

- **Frontend & Backend**: Next.js (React 19, App Router, Tailwind CSS)
- **Data Source**: Tatoeba sentence pairs, LinguaLibre audio
- **Storage**: PostgreSQL (via Prisma ORM)
- **Deployment**: Currently online-first; offline support planned

---

## Directory Structure

```

shaan-e-zaban/
├── compose.yml
├── CONTRIBUTING.md
├── curriculum/
│   ├── Beginner/A1/sentences.json
│   ├── Beginner/A2/sentences.json
│   ├── Intermediate/B1/sentences.json
│   ├── Intermediate/B2/sentences.json
│   ├── Advanced/C1/sentences.json
│   └── Advanced/C2/sentences.json
├── LICENSE
├── README.md
└── sez/
├── public/audio/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── learn/\[course]/\[chapter]/\[lesson]/page.tsx
│   └── lib/
│       ├── db.ts
│       └── prisma.ts
├── next.config.ts
├── tsconfig.json
├── yarn.lock
└── package.json

```

---

## Installation

### Prerequisites

- Node.js 20+
- Yarn (or npm / bun)

```bash
cd sez
yarn install
yarn dev
````

Then open your browser at:
👉 `http://localhost:3000`

---

## Data Format

**Example file: `curriculum/Beginner/A1/sentences.json`**

```json
[
  {
    "id": 1,
    "urdu": "السلام علیکم",
    "english": "Peace be upon you",
    "tags": ["greeting", "formal"],
    "level": "A1",
    "audio": "audio/001.mp3"
  }
]
```

---

## License

MIT License
© 2025 Mohammad Ali

> Full license in the [`LICENSE`](./LICENSE) file.

---

## Contributions

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for full guide.

You can help by:

* Recording native Urdu audio
* Enhancing the UI/UX
* Optimizing performance
* Adding grammar explanations or quiz features

Feel free to open a pull request or suggest features via issues.