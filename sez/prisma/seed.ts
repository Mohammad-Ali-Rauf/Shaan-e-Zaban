import { PrismaClient, StoryLevel } from '@/generated/prisma';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const LEVEL_MAP: Record<string, StoryLevel> = {
  beginner: 'BEGINNER',
  intermediate: 'INTERMEDIATE',
  advanced: 'ADVANCED',
};

async function seed() {
  const curriculumPath = path.join(__dirname, '../../curriculum');

  // Clear existing data
  await prisma.userProgress.deleteMany();
  await prisma.word.deleteMany();
  await prisma.sentence.deleteMany();
  await prisma.story.deleteMany();

  const levels = fs.readdirSync(curriculumPath);

  for (const levelDir of levels) {
    const jsonPath = path.join(curriculumPath, levelDir, 'stories.json');

    if (!fs.existsSync(jsonPath)) {
      console.warn(`⚠️ Skipping: ${jsonPath} not found`);
      continue;
    }

    let rawStories: any[] = [];

    try {
      const fileContent = fs.readFileSync(jsonPath, 'utf-8');
      const parsed = JSON.parse(fileContent);

      rawStories = Array.isArray(parsed) ? parsed : Object.values(parsed);
    } catch (err) {
      console.error(`Invalid or non-array JSON in ${jsonPath}`);
      continue;
    }

    const storyLevel = LEVEL_MAP[levelDir.toLowerCase()] ?? 'BEGINNER';

    for (const story of rawStories) {
      const createdStory = await prisma.story.upsert({
        where: { slug: story.slug },
        update: {
          title: story.title,
          level: storyLevel,
        },
        create: {
          slug: story.slug,
          title: story.title,
          level: storyLevel,
          sentences: {
            create: story.sentences.map((s: any, i: number) => ({
              urdu: s.urdu,
              english: s.english,
              audioUrl: s.audioUrl,
              order: i,
              words: s.words?.length
                ? {
                  create: s.words.map((w: any) => ({
                    text: w.text,
                    transliteration: w.transliteration,
                    meaning: w.meaning,
                  })),
                }
                : undefined
            })),
          },
        },
      });

      console.log(`✅ Seeded story: ${story.title} (${story.sentences.length} sentences)`);
    }
  }

  console.log('\n🌱 Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('🚨 Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());