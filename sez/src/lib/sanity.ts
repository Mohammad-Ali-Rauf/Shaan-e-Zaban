import { client } from "../../sanity/lib/client"
import { v4 as uuidv4 } from "uuid"

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
  author?: {
    _id: string
    name?: string
    email?: string
  }
}

export async function getAllStories() {
  const query = `*[_type == "story"] | order(_createdAt desc){
  _id,
  title,
  slug,
  level,
  tags,
  author->{
    _id,
    name,
    email
  }
}`

  return await client.fetch(query)
}

export async function getStoryBySlug(slug: string) {
  const query = `*[_type == "story" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  level,
  tags,
  author->{
    _id,
    name,
    email
  },
  sentences[]{
    urdu,
    english,
    audioUrl,
    words[]{
      text,
      transliteration,
      meaning
    }
  }
}`

  return await client.fetch(query, { slug })
}

export async function getUserStories(email: string) {
  const query = `*[_type == "story" && author.email == $email] | order(_createdAt desc){
  _id,
  title,
  slug,
  level,
  tags,
  author->{
    name,
    email
  }
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
    author: {
      name: data.author?.name,
      email: data.author?.email,
    },
    sentences: data.sentences.map((s) => ({
      _type: 'sentence',
      urdu: s.urdu,
      _key: uuidv4(),
      english: s.english,
      audioUrl: s.audioUrl ?? '',
      words: (s.words ?? []).map((w) => ({
        _type: 'word',
        _key: uuidv4(),
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
      _key: uuidv4(),
      english: s.english,
      audioUrl: s.audioUrl ?? '',
      words: s.words.map((w) => ({
        _type: 'word',
        _key: uuidv4(),
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
