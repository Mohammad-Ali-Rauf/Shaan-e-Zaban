'use client';

import { useEffect, useState, useRef } from 'react';

type Sentence = {
    id: number;
    urdu: string;
    english: string;
    tags: string[];
    level: string;
    audio: string;
};

export default function LearnPage() {
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const getLearnedIDs = (): number[] => {
        if (typeof window === 'undefined') return [];
        return JSON.parse(localStorage.getItem('learnedSentenceIDs') || '[]');
    };

    const markAsLearned = (id: number) => {
        const learned = getLearnedIDs();
        const updated = Array.from(new Set([...learned, id]));
        localStorage.setItem('learnedSentenceIDs', JSON.stringify(updated));
    };

    useEffect(() => {
        fetch('http://localhost:4000/urdu_sentences')
            .then(res => res.json())
            .then(data => {
                const learned = getLearnedIDs();
                const remaining = data.filter((s: Sentence) => !learned.includes(s.id));
                setSentences(remaining);
            })
            .catch(err => console.error('Failed to fetch sentences:', err));
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.warn("Autoplay blocked:", err);
            });
        }
    }, [currentIndex]);


    const handleLearned = () => {
        const currentSentence = sentences[currentIndex];
        if (!currentSentence) return;
        markAsLearned(currentSentence.id);
        setCurrentIndex((prev) => prev + 1);
    };

    if (sentences.length === 0) {
        return <div className="p-4 text-xl">🎉 You’ve learned all available sentences!</div>;
    }

    const sentence = sentences[currentIndex];
    if (!sentence) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-2">🎉 You’ve completed all available lessons!</h2>
                <p className="text-gray-600">Come back soon — more content is on the way.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">📖 Learn Urdu</h1>

            <div className="bg-white shadow p-4 rounded">
                <p className="text-right text-3xl font-nastaliq mb-2">{sentence.urdu}</p>
                <p className="text-xl mb-4">🇬🇧 {sentence.english}</p>

                <div className="flex flex-wrap gap-2 text-sm text-white mb-4">
                    <span className="bg-purple-600 px-2 py-1 rounded">📘 Level: {sentence.level}</span>
                    {sentence.tags.map((tag) => (
                        <span key={tag} className="bg-blue-600 px-2 py-1 rounded">#{tag}</span>
                    ))}
                </div>
                <audio
                    ref={audioRef}
                    controls
                    className="mb-4"
                    src={`/audio/${sentence.audio}`}
                />
                <div className="flex gap-2">
                    <button
                        onClick={handleLearned}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        ✅ Mark as Learned
                    </button>

                    <button
                        onClick={() => setCurrentIndex((prev) => prev + 1)}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded"
                    >
                        ❌ Skip
                    </button>
                </div>
            </div>

            <progress
                value={currentIndex + 1}
                max={sentences.length}
                className="w-full h-2 rounded mb-4"
            />
            <p className="text-sm text-gray-500">
                Sentence {currentIndex + 1} of {sentences.length}
            </p>
        </div>
    );
}