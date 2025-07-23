import fs from "fs/promises"
import { fileURLToPath } from "url"
import path from "path"
import * as dotenv from "dotenv"
import { v4 as uuidv4 } from "uuid"

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../../.env.local") })


console.log(process.env.SANITY_STUDIO_DATASET)

import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: '2025-07-23',
  useCdn: false,
})


type Word = {
  text: string
  transliteration: string
  meaning: string
}

type Sentence = {
  urdu: string
  english: string
  audioUrl?: string
  words: Word[]
}

type Story = {
  title: string
  slug: string
  level: "beginner" | "intermediate" | "advanced"
  tags?: string[]
  sentences: Sentence[]
  userEmail: string
}

async function readStoriesFrom(level: string): Promise<Story[]> {
  const filePath = path.join(__dirname, "../../../curriculum", level, "stories.json")
  const file = await fs.readFile(filePath, "utf-8")
  return JSON.parse(file)
}

async function seed() {
  const levels = ["beginner", "intermediate", "advanced"] as const

  for (const level of levels) {
    const stories = await readStoriesFrom(level)
    console.log(`📚 Seeding ${stories.length} stories for level: ${level}`)

    for (const story of stories) {
      try {
        const doc = {
          _id: `story-${story.slug}`,
          _type: "story",
          _key: uuidv4(),
          title: story.title,
          slug: {
            _type: "slug",
            current: story.slug,
          },
          level: story.level,
          tags: story.tags || [],
          userEmail: story.userEmail,
          sentences: story.sentences.map((s) => ({
            _type: "sentence",
            urdu: s.urdu,
            english: s.english,
            audioUrl: s.audioUrl || "",
            words: Array.isArray(s.words) ? s.words.map((w) => ({
              _type: "word",
              _key: uuidv4(),
              text: w.text,
              transliteration: w.transliteration,
              meaning: w.meaning,
            })) : [],

          })),
        }

        const created = await client.createIfNotExists(doc)
        console.log(`✅ Seeded: ${story.slug}`)
      } catch (err) {
        console.error(`❌ Failed to seed ${story.slug}`, err)
      }
    }
  }

  console.log("🎉 Done seeding all stories!")
}

seed()