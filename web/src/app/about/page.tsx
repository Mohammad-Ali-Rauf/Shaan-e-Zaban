export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">About Shaan-e-Zaban</h1>

      <p className="text-lg leading-relaxed">
        <strong>Shaan-e-Zaban (شانِ زبان)</strong> is an open-source Urdu language learning platform rooted in cultural authenticity, linguistic respect, and unwavering dedication to the beauty of the Urdu script.
      </p>

      <p className="text-md text-gray-700">
        Most language tools either lump Urdu in with Hindi, ignore its distinct script, or gamify it into oblivion. We take a different path — one grounded in care, clarity, and cultural pride.
      </p>

      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
        “If Arabic, Russian, and Mandarin can be taught in their native scripts, why not Urdu?”
      </blockquote>

      <p className="text-md text-gray-800">
        Urdu deserves more than shortcuts. That’s why Shaan-e-Zaban is built on principles that honor the language:
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>✅ Native Nastaliq script — no Roman Urdu, ever</li>
        <li>✅ Carefully curated stories</li>
        <li>
          ✅ Authentic pronunciation — recorded by me or other native speakers
        </li>
      </ul>

      <p className="text-md text-gray-700">
        This is more than a language project — it’s a commitment to preserving the soul of Urdu. Whether you’re a beginner or reconnecting with your roots, you’re welcome here.
      </p>

      <p className="font-urdu text-right text-2xl mt-6">
        اردو کی شان کو بحال کریں
      </p>
    </div>
  );
}