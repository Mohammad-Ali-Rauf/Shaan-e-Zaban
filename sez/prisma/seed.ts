import { PrismaClient, LearningType, Level } from '@/generated/prisma';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const LEVEL_MAP: Record<string, Level> = {
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
};

async function seed() {
  const curriculumPath = path.join(__dirname, '../../curriculum');
  const levels = fs.readdirSync(curriculumPath);

  // Clear existing data for clean seeding
  await prisma.userProgress.deleteMany();
  await prisma.learningUnit.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.course.deleteMany();

  for (const courseTitle of levels) {
    const courseSlug = courseTitle.toLowerCase();

    const course = await prisma.course.create({
      data: {
        title: courseTitle,
        slug: courseSlug,
        description: `${courseTitle} Urdu course`,
      },
    });

    const coursePath = path.join(curriculumPath, courseTitle);
    const chapters = fs.readdirSync(coursePath);

    for (const chapterSlug of chapters) {
      const fullChapterSlug = `${courseSlug}-${chapterSlug.toLowerCase()}`;
      const chapter = await prisma.chapter.create({
        data: {
          title: chapterSlug,
          slug: fullChapterSlug,
          description: `${chapterSlug} level chapter`,
          courseId: course.id,
        },
      });

      const jsonPath = path.join(coursePath, chapterSlug, 'sentences.json');
      if (!fs.existsSync(jsonPath)) {
        console.warn(`⚠️  Skipping: ${jsonPath} not found`);
        continue;
      }

      const raw = fs.readFileSync(jsonPath, 'utf-8');
      let parsed: any[] = [];

      try {
        const json = JSON.parse(raw);
        parsed = Array.isArray(json) ? json : Object.values(json);
      } catch (e) {
        console.error(`❌ Invalid JSON in ${jsonPath}`);
        continue;
      }

      const lessonSlug = `${courseTitle}-${chapterSlug}-lesson`.toLowerCase();

      const lesson = await prisma.lesson.create({
        data: {
          title: 'Default Lesson',
          slug: lessonSlug,
          chapterId: chapter.id,
        },
      });

      for (const [index, unit] of parsed.entries()) {
        await prisma.learningUnit.create({
          data: {
            type: LearningType.SENTENCE,
            title: typeof unit.title === 'string' ? unit.title : `Unit ${index + 1}`,
            urduText: unit.urdu || '',
            englishText: unit.english || '',
            audioUrl: unit.audio || null,
            tags: Array.isArray(unit.tags) ? unit.tags : [],
            level: LEVEL_MAP[chapterSlug.toUpperCase()] ?? Level.A1,
            lessonId: lesson.id,
            order: index,
          },
        });
      }

      console.log(`📘 Seeded: ${courseTitle} > ${chapterSlug} > ${parsed.length} units`);
    }
  }

  console.log('\n✅ Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());