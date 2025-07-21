
# طریقہ ء زبان – Tariqah-e-Zaban

**An offline, open-source Urdu language learning tool**  
Built with real human voice data, no AI hallucinations, and full respect for the language it teaches.

---

## 📌 What is this?

**Tariqah-e-Zaban** (طریقہ ء زبان) is a language learning app focused entirely on **Urdu**, created by a native speaker — for learners who want **authentic, offline, and real-world practice** without distractions, ads, or synthetic content.

---

## 🚀 Features

✅ **Teaches Urdu, Not Hindi** – Built by a native Urdu speaker using Urdu-specific scripts, culture, and expressions.  
✅ **Offline-First** – Works completely offline after initial setup. No tracking, no telemetry, no "please connect to internet" garbage.  
✅ **Real Sentences + Real Audio** – Native speaker recordings sourced from [Tatoeba](https://tatoeba.org) and other open corpora. No AI voice clones or fake sentences.  
✅ **Simple UI** – Built with **Next.js** frontend and **Go** backend for performance and clarity.  
✅ **Open Source** – MIT licensed. Fork it. Contribute. Make it better.

---

## 📦 Stack

- **Frontend:** Next.js 14 (App Router, TypeScript, Tailwind CSS)  
- **Backend:** Go (Golang), minimal REST API  
- **Storage:** Local JSON or SQLite (depending on build mode)  
- **Audio:** Stored locally (`/audio/`) for full offline access  
- **Sentence Data:** Cleaned Urdu-English sentence pairs from Tatoeba

---

## 📂 Folder Structure

```

tariqah-e-zaban/
├── backend/             # Go backend serving API and static audio
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

````

---

## 📖 Usage

### 🔧 Prerequisites:
- Go 1.21+
- Node.js 20+
- npm or bun or yarn (your pick)

### 🛠 Run Dev Environment

**Backend (Go):**
```bash
cd backend
go run main.go
````

**Frontend (Next.js):**

```bash
cd frontend
npm install
npm run dev
```

---

## 💬 Sentence Data

Urdu-English sentences are sourced from [Tatoeba.org](https://tatoeba.org). Each sentence is paired with:

* A translation
* A native pronunciation recording
* A unique ID for progress tracking

Want to contribute more accurate or regional Urdu content? PRs are welcome.

---

## 📃 License

This project is licensed under the **MIT License**.
You’re free to fork, modify, and redistribute — just don’t sell a closed version.

---

## 🧠 Philosophy

> **"Language isn’t data. It’s culture."**

This app doesn’t use AI.
It doesn’t track users.
It doesn’t push dopamine-hitting gamification.
It teaches **Urdu** the way it’s actually spoken — with respect, simplicity, and fluency in mind.

---

## ✊ Built by

**Ali** — DevSecOps & native Urdu speaker
📍 Linux user, OSS nerd, and someone who got sick of being told to “just use Duolingo for Hindi.”

---

## 🌟 Contribute

Wanna help out?

* Submit sentence pairs (Urdu + English)
* Record native speaker audio clips
* Improve UI/UX
* Translate to other languages

PRs, issues, and feedback always welcome.
