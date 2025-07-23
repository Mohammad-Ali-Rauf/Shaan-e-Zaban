import { client } from "../../sanity/lib/client"

export type Word = {
  text: string
  transliteration: string
  meaning: string
}

export type Sentence = {
  urdu: string
  english: string
  audioUrl?: string
  words: Word[]
}

export type Story = {
  _id?: string
  title: string
  slug: string
  level: 'beginner' | 'intermediate' | 'advanced'
  sentences: Sentence[]
  tags?: string[]
  userEmail: string
}

export async function getAllStories() {
  const query = `*[_type == "story"] | order(_createdAt desc){
    _id,
    title,
    slug,
    level,
    "authorEmail": userEmail,
    tags
  }`

  return await client.fetch(query)
}

export async function getStoryBySlug(slug: string) {
  const query = `*[_type == "story" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    level,
    sentences[]{
      urdu,
      english,
      audioUrl,
      words[]{
        text,
        transliteration,
        meaning
      }
    },
    "authorEmail": userEmail,
    tags
  }`

  return await client.fetch(query, { slug })
}

export async function getUserStories(email: string) {
  const query = `*[_type == "story" && userEmail == $email] | order(_createdAt desc){
    _id,
    title,
    slug,
    level,
    tags
  }`

  return await client.fetch(query, { email })
}

export async function createStory(data: Story) {
  const story = {
    _type: 'story',
    title: data.title,
    slug: {
      _type: 'slug',
      current: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
    },
    level: data.level,
    tags: data.tags || [],
    userEmail: data.userEmail,
    sentences: data.sentences.map((s) => ({
      _type: 'sentence',
      urdu: s.urdu,
      english: s.english,
      audioUrl: s.audioUrl ?? '',
      words: s.words.map((w) => ({
        _type: 'word',
        text: w.text,
        transliteration: w.transliteration,
        meaning: w.meaning,
      })),
    })),
  }

  return await client.create(story)
}

export async function updateStory(id: string, data: Partial<Story>) {
  const patch: any = {}

  if (data.title) patch.title = data.title
  if (data.slug) patch.slug = { _type: 'slug', current: data.slug }
  if (data.level) patch.level = data.level
  if (data.tags) patch.tags = data.tags

  if (data.sentences) {
    patch.sentences = data.sentences.map((s) => ({
      _type: 'sentence',
      urdu: s.urdu,
      english: s.english,
      audioUrl: s.audioUrl ?? '',
      words: s.words.map((w) => ({
        _type: 'word',
        text: w.text,
        transliteration: w.transliteration,
        meaning: w.meaning,
      })),
    }))
  }

  return await client.patch(id).set(patch).commit()
}

export async function deleteStory(id: string) {
  return await client.delete(id)
}
