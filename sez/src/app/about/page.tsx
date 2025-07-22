export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">About Shaan-e-Zaban</h1>

      <p className="text-lg leading-relaxed">
        <strong>Shaan-e-Zaban (شانِ زبان)</strong> is an open-source Urdu language learning platform — built with cultural respect, linguistic accuracy, and a deep love for the script that defines Urdu.
      </p>

      <p className="text-md text-gray-700">
        Most platforms treat Urdu as a sidekick to Hindi, ignore its beautiful script, or rely on half-baked AI tricks and gamified nonsense. Not here.
      </p>

      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
        "If we can teach Arabic, Russian, or Mandarin in their scripts, why not Urdu?"
      </blockquote>

      <p className="text-md text-gray-800">
        Urdu deserves dignity. That means:
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>✅ Native Nastaliq script, no Roman Urdu</li>
        <li>✅ Hand-curated sentences, not AI junk</li>
        <li>✅ Open data from <a href="https://tatoeba.org" className="underline text-blue-600">Tatoeba</a> & <a href="https://lingualibre.org" className="underline text-blue-600">LinguaLibre</a></li>
        <li>✅ Built by a native Urdu speaker 🇵🇰</li>
      </ul>

      <p className="text-md text-gray-700">
        This is just the beginning. Join the journey. Spread the word. Preserve the script.
      </p>

      <p className="font-urdu text-right text-2xl mt-6">
        اردو کی شان کو بحال کریں
      </p>
    </div>
  );
}