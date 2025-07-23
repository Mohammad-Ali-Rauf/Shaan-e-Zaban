import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ProgressTracker from '@/components/ProgressTracker';
import Link from 'next/link';

import ClientOnly from '@/components/ClientOnly'

import Sentence from '@/components/Sentence'

interface Props {
  params: { level: string; story: string };
  searchParams?: { sentence?: string };
}

export default async function StoryPage({ params, searchParams }: Props) {
  const { level, story } = params;

  const rawIndex = parseInt(searchParams?.sentence || '0', 10);
  const sentenceIndex = Number.isNaN(rawIndex) ? 0 : rawIndex;

  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/signin');

  const storyData = await prisma.story.findUnique({
    where: { slug: story },
    include: {
      sentences: {
        orderBy: { order: 'asc' },
        include: {
          words: true,
        },
      },
    },
  });

  if (!storyData || storyData.level.toLowerCase() !== level.toLowerCase()) {
    return notFound();
  }

  const sentences = storyData.sentences;
  const sentence = sentences[sentenceIndex];

  // If the sentence index is invalid, redirect to start
  if (!sentence) {
    return redirect(`/learn/${level}/${story}?sentence=0`);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <ProgressTracker
        storyId={storyData.id}
        isLastSentence={sentenceIndex === sentences.length - 1}
      />
      <h1 className="text-3xl font-bold mb-4">{storyData.title}</h1>

      <div className="border p-4 rounded shadow space-y-3">
        <Sentence text={sentence.urdu} words={sentence.words} />
        <div className="italic text-gray-600">{sentence.english}</div>
        {sentence.audioUrl && (
          <audio controls className="mt-2">
            <source src={`${sentence.audioUrl}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>

      <PaginationNav
        currentIndex={sentenceIndex}
        total={sentences.length}
        baseUrl={`/learn/${level}/${story}`}
      />
    </div>
  );
}

function PaginationNav({
  currentIndex,
  total,
  baseUrl,
}: {
  currentIndex: number;
  total: number;
  baseUrl: string;
}) {
  const prev = currentIndex > 0 ? `${baseUrl}?sentence=${currentIndex - 1}` : null;
  const next = currentIndex < total - 1 ? `${baseUrl}?sentence=${currentIndex + 1}` : null;

  return (
    <div className="flex justify-between items-center w-full mt-8 text-sm text-blue-600">
      {prev ? (
        <Link href={prev} className="hover:underline">← Previous</Link>
      ) : (
        <span />
      )}

      <span className="text-gray-600">
        {currentIndex + 1} / {total}
      </span>

      {next ? (
        <Link href={next} className="hover:underline">Next →</Link>
      ) : (
        <span />
      )}
    </div>
  );
}