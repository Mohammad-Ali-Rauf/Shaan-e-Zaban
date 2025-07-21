# Shaan-e-Zaban (شانِ زبان)

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/frontend-Next.js-blue)
![Go](https://img.shields.io/badge/backend-Go-orange)
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

**Shaan-e-Zaban** is a minimalistic, culturally authentic Urdu language learning app built by a native speaker—designed to fill the long-standing gap in structured, accessible, and native-focused Urdu tools.

Unlike AI-heavy platforms or gamified distractions, this project prioritizes **clarity**, **real content**, and **respect for the language**.

⚠️ We do not use Roman Urdu. Shaan-e-Zaban teaches Urdu in its native Nastaliq script, not Latinized substitutions. Just like **Mandarin**, **Russian**, or **Arabic** apps don’t abandon their writing systems, **Urdu** deserves to be taught in its own beautiful script.
Roman Urdu is inconsistent, unstandardized, and unable to convey the cultural and visual beauty of Urdu — we don’t compromise.

This is an **MVP (Minimum Viable Product)** release — **offline support will be added in future versions**, but the current build is designed for online use to streamline development and deployment.

---

## Key Features

* **Built Specifically for Urdu**: Unlike most platforms that group Urdu under Hindi, Shaan-e-Zaban is built for Urdu learners—with attention to its linguistic, script, and cultural integrity.

* **Native Speaker Audio**: All content is paired with real human pronunciation, sourced from open linguistic databases like [Tatoeba](https://tatoeba.org) and [LinguaLibre](https://lingualibre.org).

* **Tag-Based Sentence System**: Sentences are categorized by difficulty level, grammatical tone, and topic, enabling smart filtering and modular learning paths.

* **Open Source**: Fully MIT-licensed. Transparent, customizable, and built to be extended by the community.

* **Modern Web Stack**: Built using modern web technologies (Next.js + Go) for speed and clarity.

---

## Technology Stack

* **Frontend**: Next.js (React 19, App Router, Tailwind CSS)
* **Backend**: Go (Golang)
* **Data Source**: Tatoeba sentence pairs, LinguaLibre audio
* **Storage**: JSON files or SQLite (for user progress and sentence indexing)
* **Deployment**: Currently online-first; offline support planned for future

---

## Directory Structure

```
shaan-e-zaban/
├── backend/             # Go backend
│   ├── main.go
│   ├── data/
│   │   ├── urdu_sentences.json
│   │   └── user_progress.json
│   └── audio/
│       └── *.mp3
├── frontend/            # Next.js frontend
│   ├── app/
│   │   ├── learn/
│   │   ├── review/
│   │   └── progress/
│   └── public/
│       └── audio/
├── LICENSE
└── README.md
```

---

## Installation

### Prerequisites

* Go 1.21+
* Node.js 20+
* npm / yarn / bun (choose one)

### Backend (Go)

```bash
cd backend
go run main.go
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Once both services are running, open your browser at `http://localhost:3000`.

---

## Data Format

**Example: `urdu_sentences.json`**

```json
[
  {
    "id": 1,
    "urdu": "آپ کیسے ہیں؟",
    "english": "How are you?",
    "tags": ["greeting", "formal", "masculine"],
    "level": "A1",
    "audio": "audio/001.mp3"
  }
]
```

User progress is stored in local JSON or SQLite for now. Future releases may sync with cloud or add PWA support.

---

## License

MIT License
© 2025 Mohammad Ali

> See full license in the `LICENSE` file.

---

## Contribution

> See full guide in the `CONTRIBUTING.md` file.

Contributions are welcome! You can help by:

* Improving Urdu-English sentence pairs
* Recording native Urdu audio
* Enhancing the UI/UX
* Optimizing backend performance
* Adding grammar explanations or quiz features

Open a pull request or issue to suggest changes.
