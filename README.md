# Shaan-e-Zaban (شانِ زبان)

**An open-source, offline Urdu language learning platform built with simplicity, precision, and respect for the richness of the language.**

---

## Overview

**Shaan-e-Zaban** is a minimalistic, privacy-conscious, and culturally authentic Urdu language learning application designed to provide learners with access to native content—without the noise of artificial intelligence or gamified distractions. It is developed by a native Urdu speaker to fill the long-standing gap in accessible, structured Urdu learning tools.

---

## Key Features

- **Focused on Urdu**: Unlike most platforms that group Urdu under Hindi, Shaan-e-Zaban is built specifically for Urdu learners with attention to its linguistic and cultural integrity.

- **Offline-First**: Designed to work entirely offline after initial setup. No cloud dependencies, no constant internet access required.

- **Native Speaker Audio**: All content is paired with native pronunciation from actual speakers, sourced from public linguistic databases such as [Tatoeba](https://tatoeba.org) and [LinguaLibre](https://lingualibre.org).

- **Open Source**: Licensed under MIT. Built to be transparent, customizable, and extensible for contributors and learners alike.

- **Minimalistic Design**: A clean, distraction-free user interface powered by Next.js and a simple backend written in Go.

---

## Technology Stack

- **Frontend**: Next.js (React 18, App Router, Tailwind CSS)
- **Backend**: Go (Golang)
- **Data Source**: Tatoeba sentence pairs, LinguaLibre audio
- **Storage**: JSON files or SQLite (for user progress and sentence indexing)
- **Deployment**: Fully offline capable; optional self-hosting or static build

---

## Directory Structure

```

shaan-e-zaban/
├── backend/             # Go backend
│   ├── main.go
│   ├── data/
│   │   ├── urdu\_sentences.json
│   │   └── user\_progress.json
│   └── audio/
│       └── \*.mp3
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
- Go 1.21+
- Node.js 20+
- npm / yarn / bun (choose one)

### Backend (Go)
```bash
cd backend
go run main.go
````

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Once both services are running, open your browser at `http://localhost:3000`.

---

## Data Format

**Example: urdu\_sentences.json**

```json
[
  {
    "id": 1,
    "urdu": "آپ کیسے ہیں؟",
    "english": "How are you?",
    "audio": "audio/001.mp3"
  },
  ...
]
```

User progress is stored locally in a lightweight JSON or SQLite format.

---

## License

MIT License

Copyright (c) 2025 Mohammad Ali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Contribution

Contributions are welcome. You may contribute in any of the following ways:

* Improve or correct Urdu-English sentence pairs
* Record native Urdu audio
* Improve the frontend design and UX
* Enhance backend performance and structure
* Expand support for grammar-focused learning

Please submit a pull request or open an issue to discuss any improvements.

---

## Vision

**Shaan-e-Zaban** aspires to make Urdu accessible, learnable, and respected at the same level as global languages—without compromising its identity. This project is a step toward providing high-quality, free learning tools built on the principles of clarity, utility, and cultural integrity.
