# **CONTRIBUTING.md** 🤝

## 🌟 Welcome Contributors

Thank you for helping build the world's first open-source Urdu learning platform.

---

## 🚀 Quick Start

1. 🍴 Fork the repository
2. 📥 Clone your fork
3. 🌿 Create feature branch: `git checkout -b feature/your-feature`
4. 💻 Make changes
5. 📤 Push and open PR

**First time?** Look for `good first issue` tags.

---

## 🛠️ Setup

```bash
cd web
yarn install
cp .env.example .env
# Configure DATABASE_URL, JWT_SECRET, SANITY_PROJECT_ID
npx prisma generate
npx prisma db push
yarn dev
```

Visit: `http://localhost:3000`

---

## 🎯 What to Contribute

### Code 🖥️
- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: API routes, MongoDB, Prisma
- **Auth**: JWT middleware

### Content ✍️
- **Urdu stories** with translations
- **Vocabulary** lists
- **Audio recordings** 🎙️

### Design 🎨
- UI improvements
- Nastaliq typography
- Accessibility

---

## 💻 Code Standards

### Structure
```
src/
├── app/           # Next.js 15
├── components/    # React components  
├── hooks/         # Custom hooks
└── lib/           # Utilities
```

### TypeScript
```typescript
export type Story = {
  _id?: string
  title: string
  slug: {
    _type: "slug"
    current: string
  }
  level: 'beginner' | 'intermediate' | 'advanced'
  sentences: Sentence[]
  tags?: string[]
  author?: {
    _id: string
    name?: string
    email?: string
  }
}
```

### Commits
```
feat: add user progress
fix: resolve audio issue
docs: update guide
```

---

## 📖 Story Guidelines

**Beginner**: Simple vocabulary, short sentences  
**Intermediate**: Complex sentences, some idioms  
**Advanced**: Literary language, cultural context

Include:
- Urdu text with proper punctuation
- English translation
- Vocabulary list

---

## 🔄 Pull Requests

### Before submitting:
- ✅ Code works
- 📝 Docs updated
- 🔍 Self-reviewed

### PR template:
```markdown
## What changed?
## Related issue?
## Type: bug fix | feature | docs
## Testing done?
```

---

## 👥 Community

**Be:**
- Respectful 🙏
- Constructive 🛠️
- Inclusive 🌍

**Don't:**
- Harass or discriminate ❌
- Be disrespectful ❌

Need help? Check docs first, then ask in issues.

---

<div align="center">

**"خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے  
خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے"**

— علامہ اقبال

**Happy Contributing!** 🚀

</div>