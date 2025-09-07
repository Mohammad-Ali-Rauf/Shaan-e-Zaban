# **Shaan-e-Zaban (شانِ زبان)**

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/frontend-Next.js-blue)
![MongoDB](https://img.shields.io/badge/database-MongoDB-brightgreen)
![Sanity](https://img.shields.io/badge/content-Sanity-orange)
![Status](https://img.shields.io/badge/status-Active-lightgrey)

**Shaan-e-Zaban** is the world’s **first open-source Urdu learning platform that teaches through immersive stories**.
Forget boring drills and robotic translation exercises — here, learners **experience the language**, read in **beautiful Nastaliq script**, and listen to **human audio narration**.

> **USP:** Learning Urdu through stories makes language intuitive, emotional, and memorable. Every word is learned in context, not in isolation.

---

## 📚 Table of Contents

* [Overview](#overview)
* [Sample Story](#sample-story)
* [Key Features](#key-features)
* [Technology Stack](#technology-stack)
* [Directory Structure](#directory-structure)
* [Installation](#installation)
* [License](#license)
* [Contribution](#contribution)

---

## 🔍 Overview

**Shaan-e-Zaban** is not just a language app — it is a **cultural and educational movement**.

Traditional language apps focus on:

* Vocab lists
* Repetitive exercises
* Robotic translation

These approaches teach words, but not understanding, feeling, or context.

**Shaan-e-Zaban flips this approach**: learners explore Urdu **through community-written stories**, narrated in **authentic Nastaliq script** with **optional audio**.

Authors can:

* Add word-by-word translations
* Upload custom audio recordings
* Tag stories by topic, grammar, or difficulty

---

## 🧠 Architecture Breakdown

* ✍️ **Stories** are managed in **Sanity CMS**
* 🧑‍💼 **Users and progress** stored in **MongoDB via Prisma**
* 🧠 **UserProgress and StoryProgress** are embedded for quick access
* 📂 **Legacy stories** in `/curriculum/` can be seeded into Sanity

---

## 📖 Sample Story: “خاموشی کا راز” / “The Secret of Silence”

### Urdu Version

کراچی کی ایک پرانی گلی میں واقع ایک خستہ حال مکان میں ایک بوڑھی عورت رہتی تھی جس کا نام زینب تھا۔ زینب کی عمر ستر سال سے تجاوز کر چکی تھی، اور وہ اکثر اپنی چھت پر بیٹھ کر آسمان کو تکتے ہوئے گھنٹوں خاموش رہتی۔ محلے والے اسے "خاموش زینب" کہتے تھے کیونکہ وہ بہت کم بولتی تھی۔

زینب کی زندگی ایک معمہ تھی۔ کوئی نہیں جانتا تھا کہ وہ کس کے ساتھ رہتی تھی، اس کا کوئی رشتہ دار ہے یا نہیں، اور وہ کس طرح اپنے اخراجات پورے کرتی ہے۔ کچھ لوگ کہتے تھے کہ وہ کسی زمانے میں ایک مشہور مصنفہ تھی، لیکن کسی نے اس کی کوئی کتاب نہیں دیکھی۔

ایک دن محلے میں ایک نوجوان لڑکی، مریم، اپنے والدین کے ساتھ رہنے آئی۔ مریم کو کتابیں پڑھنے کا شوق تھا اور وہ زینب کے بارے میں جاننے کے لیے بے چین تھی۔ ایک شام وہ زینب کے دروازے پر گئی اور سلام کیا۔ زینب نے دروازہ کھولا، اس کی آنکھوں میں حیرت تھی لیکن چہرے پر نرمی۔

"کیا میں آپ سے کچھ دیر بات کر سکتی ہوں؟" مریم نے پوچھا۔

زینب نے سر ہلایا اور اسے اندر آنے کا اشارہ دیا۔ گھر کے اندر ہر چیز صاف ستھری تھی، لیکن دیواروں پر پرانی تصاویر اور کتابوں کی قطاریں تھیں۔ مریم نے ایک تصویر کی طرف اشارہ کیا جس میں ایک جوان عورت کسی تقریب میں تقریر کر رہی تھی۔

"یہ آپ ہیں؟" مریم نے پوچھا۔

زینب نے مسکرا کر کہا، "ہاں، بہت پرانی بات ہے۔"

مریم نے ہمت کر کے پوچھا، "آپ نے لکھنا کیوں چھوڑ دیا؟"

زینب نے ایک طویل سانس لی اور کہا، "زندگی نے کچھ ایسے موڑ لیے کہ قلم تھم گیا۔"

پھر زینب نے ایک پرانی الماری کھولی اور ایک ڈائری نکالی۔ "یہ میری آخری تحریر ہے، جو کبھی مکمل نہ ہو سکی۔"

مریم نے ڈائری کھولی اور پڑھنا شروع کیا۔ اس میں ایک کہانی تھی جو ایک لڑکی کے خوابوں اور جدوجہد پر مبنی تھی۔ مریم نے کہا، "یہ تو بہت خوبصورت ہے، آپ کو اسے مکمل کرنا چاہیے۔"

زینب نے کہا، "اگر تم چاہو تو ہم مل کر اسے مکمل کر سکتے ہیں۔"

یوں زینب کی خاموشی ٹوٹ گئی۔ وہ روز مریم کے ساتھ بیٹھتی، اپنی کہانی سناتی، اور مریم اسے لکھتی۔ محلے والے حیران تھے کہ زینب اب باتیں کرتی ہے، ہنستی ہے، اور اس کی آنکھوں میں زندگی کی چمک ہے۔

چند ماہ بعد، زینب کی اور مریم کی مشترکہ کتاب شائع ہوئی۔ اس کا نام تھا "خاموشی کا راز"۔ کتاب نے بہت شہرت حاصل کی، اور زینب کو دوبارہ پہچان ملی۔

زینب نے مریم سے کہا، "تم نے مجھے میری آواز واپس دی۔"

مریم نے مسکرا کر کہا، "اور آپ نے مجھے خواب دیکھنا سکھایا۔"

---

### English Translation

In an old alley of Karachi, there lived an elderly woman named Zainab in a dilapidated house. Zainab was over seventy years old and often sat on her rooftop, staring at the sky in silence for hours. The neighbors called her “Silent Zainab” because she spoke very little.

Zainab’s life was a mystery. No one knew who she lived with, whether she had any relatives, or how she managed her expenses. Some said she was once a famous writer, but no one had ever seen her books.

One day, a young girl named Maryam moved into the neighborhood with her parents. Maryam loved reading and was curious about Zainab. One evening, she went to Zainab’s door and greeted her. Zainab opened the door, her eyes filled with surprise but her face was gentle.

“May I talk to you for a while?” Maryam asked.

Zainab nodded and invited her in. Inside, everything was neat, but the walls were lined with old photographs and shelves of books. Maryam pointed to a picture of a young woman giving a speech at an event.

“Is this you?” Maryam asked.

Zainab smiled and said, “Yes, a long time ago.”

Maryam gathered courage and asked, “Why did you stop writing?”

Zainab took a deep breath and said, “Life took turns that silenced my pen.”

Then Zainab opened an old cupboard and took out a diary. “This is my last piece of writing, never completed.”

Maryam opened the diary and began reading. It was a story about a girl’s dreams and struggles. Maryam said, “This is beautiful. You should finish it.”

Zainab replied, “If you want, we can finish it together.”

And so, Zainab’s silence broke. She would sit with Maryam every day, narrating her story while Maryam wrote. The neighbors were amazed that Zainab now talked, laughed, and her eyes sparkled with life.

A few months later, Zainab and Maryam’s joint book was published. Its title was “The Secret of Silence.” The book gained fame, and Zainab was recognized once again.

Zainab told Maryam, “You gave me back my voice.”

Maryam smiled and said, “And you taught me how to dream.”

---

### 📚 Vocabulary (مشکل الفاظ)

| Urdu        | English     |
| ----------- | ----------- |
| خستہ حال    | Dilapidated |
| معمہ        | Mystery     |
| تقریر       | Speech      |
| تحریر       | Writing     |
| الماری      | Cupboard    |
| جدوجہد      | Struggle    |
| پہچان       | Recognition |
| چمک         | Sparkle     |
| خاموشی      | Silence     |
| خواب دیکھنا | To dream    |

> This sample demonstrates **how stories make learning natural, memorable, and fun**.

---

## ✨ Key Features

* **📝 Community-Contributed Stories** – Full CRUD for signed-in users
* **📚 Progressive Learning Flow** – Beginner → Advanced stories for natural progression
* **🖋 Nastaliq Script** – Elegant calligraphy for reading Urdu
* **🔊 Optional Audio Support** – MP3/WAV for pronunciation guidance
* **📘 Optional Word-Level Translations** – Sentence-level translations required, word-level optional
* **🏷️ Grammar & Topic Tags** – Filter stories by theme, grammar, or tense
* **📈 Personalized Progress Tracking** – MongoDB-based, per-sentence resume support
* **🔐 JWT Auth System** – Secure authentication & story ownership
* **🌍 Open Source & Scalable** – MIT license, Sanity backend, React extensible

---

## ⚙️ Technology Stack

| Layer         | Tech                               |
| ------------- | ---------------------------------- |
| Frontend      | Next.js (App Router, React 19)     |
| Styling       | Tailwind CSS                       |
| Backend API   | Next.js API Routes                 |
| Content Layer | Sanity CMS                         |
| Database      | MongoDB Atlas via Prisma           |
| Auth          | Custom JWT Implementation          |
| Audio Storage | Static MP3/WAV via `/public/audio` |
| Deployment    | Vercel                             |

---

## 📁 Directory Structure

```bash
shaan-e-zaban/
├── compose.yml
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── curriculum/
│   ├── beginner/stories.json
│   ├── intermediate/stories.json
│   └── advanced/stories.json
└── sez/
    ├── .env.example
    ├── next.config.ts
    ├── middleware.ts
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    ├── tsconfig.json
    ├── yarn.lock
    ├── prisma/schema.prisma
    ├── public/audio/
    ├── sanity/
    └── src/
```

---

## 🚀 Installation

### Prerequisites

* Node.js 20+
* Yarn (or npm / bun)
* MongoDB Atlas connection string (`MONGO_URI`)
* Sanity CLI + project setup

### Setup

```bash
cd sez
yarn install
yarn dev
```

Runs at: `http://localhost:3000`

Seed stories into Sanity from `curriculum/`:

```bash
yarn sanity exec sanity/scripts/seed.ts
```

---

## 📜 License

**MIT License** © 2025 Mohammad Ali
See [`LICENSE`](./LICENSE) for full terms.

---

## 🤝 Contribution

This is your platform too — help shape its future.

Check [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines.

### Ways to Contribute

* ✍️ Write authentic Urdu short stories
* 🎙 Submit voice recordings (regional accents welcome)
* 🧠 Improve UX, accessibility, or UI polish
* 🐞 Report or fix bugs
* 🌐 Translate interface (coming soon)
* 🛠 Propose and build new features

> **Your stories can make learning Urdu alive for thousands of learners.**
