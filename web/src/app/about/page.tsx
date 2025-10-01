import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          About Shaan-e-Zaban
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <p className="text-xl leading-relaxed text-gray-200">
            <strong className="text-red-400">Shaan-e-Zaban (شانِ زبان)</strong> is an open-source Urdu language learning platform rooted in cultural authenticity, linguistic respect, and unwavering dedication to the beauty of the Urdu script.
          </p>
        </div>

        {/* Problem Statement */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            Most language tools either lump Urdu in with Hindi, ignore its distinct script, or gamify it into oblivion. We take a different path — one grounded in care, clarity, and cultural pride.
          </p>
        </div>

        {/* Quote */}
        <blockquote className="border-l-4 border-red-500 pl-6 py-4 italic text-gray-300 text-lg bg-gradient-to-r from-red-900/20 to-transparent rounded-r-2xl">
          &quot;If Arabic, Russian, and Mandarin can be taught in their native scripts, why not Urdu?&quot;
        </blockquote>

        {/* Principles */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-6">
            Our Principles
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Urdu deserves more than shortcuts. That&apos;s why Shaan-e-Zaban is built on principles that honor the language:
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-200">
                <strong className="text-red-300">Native Nastaliq script</strong> — no Roman Urdu, ever
              </span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-200">
                <strong className="text-red-300">Carefully curated stories</strong> — authentic content that respects the language
              </span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-200">
                <strong className="text-red-300">Authentic pronunciation</strong> — recorded by native speakers
              </span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-gray-200">
                <strong className="text-red-300">Cultural context</strong> — learning the language through its rich heritage
              </span>
            </li>
          </ul>
        </div>

        {/* Mission */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            This is more than a language project — it&apos;s a commitment to preserving the soul of Urdu. Whether you&apos;re a beginner or reconnecting with your roots, you&apos;re welcome here.
          </p>
        </div>

        {/* Urdu Calligraphy */}
        <div className="text-center py-8">
          <p className="font-urdu text-3xl md:text-4xl text-red-300 mb-4">
            اردو کی شان کو بحال کریں
          </p>
          <p className="text-gray-400 text-sm">
            &quot;Let&apos;s restore the glory of Urdu&quot;
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 border border-red-700/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-red-300 mb-4">
            Ready to begin your journey?
          </h3>
          <p className="text-gray-300 mb-6">
            Join our community of Urdu learners and experience authentic language learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border border-red-600/30"
            >
              Start Learning
            </Link>
            <a
              href="/contribute"
              className="px-8 py-3 border border-red-600/50 text-red-400 rounded-xl font-semibold hover:bg-red-900/30 transition-all duration-300 transform hover:scale-105"
            >
              Contribute
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}