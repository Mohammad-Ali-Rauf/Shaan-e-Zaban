import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const word = searchParams.get('word')
  const sentence = searchParams.get('sentence')?.trim()

  console.log('👉 word:', word)
  console.log('👉 sentence:', sentence)

  if (!word || !sentence) {
    return NextResponse.json({ error: 'Missing word or sentence' }, { status: 400 })
  }

  try {
    console.log(`[Context Translating]: "${word}" in "${sentence}"`)

    // Step 1: Get sentence-level English translation
    const sentenceRes = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: sentence,
        source: 'ur',
        target: 'en',
        format: 'text',
      }),
    })
    const sentenceData = await sentenceRes.json()
    const sentenceTranslation = sentenceData.translatedText

    // Step 2: Translate the word itself
    const wordRes = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: word,
        source: 'ur',
        target: 'en',
        format: 'text',
      }),
    })
    const wordData = await wordRes.json()

    return NextResponse.json({
      meaning: wordData.translatedText || 'Unknown',
      transliteration: wordData.translatedText || 'Unknown',
      sentenceHint: sentenceTranslation || '',
    })
  } catch (err) {
    console.error('❌ Translation Error:', err)
    return NextResponse.json({
      meaning: 'Unknown',
      transliteration: 'Unknown',
    })
  }
}
