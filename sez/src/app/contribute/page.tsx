import Link from "next/link";

export default function ContributePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">🤝 Contribute to Shaan-e-Zaban</h1>

      <p className="text-lg text-gray-700">
        This platform is fully <strong>open source</strong> and we welcome contributions from everyone —
        whether you're a developer, linguist, or just someone passionate about Urdu.
      </p>

      <h2 className="text-2xl font-semibold mt-6">🔧 How You Can Help</h2>

      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>🎙️ Record native Urdu audio clips (clean, clear, high-quality)</li>
        <li>📖 Add new sentence pairs to the curriculum JSON files</li>
        <li>🧠 Write grammar tips or simple usage guides</li>
        <li>🎨 Improve the UI/UX of lesson pages</li>
        <li>💻 Help with performance or accessibility enhancements</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">📂 Repository</h2>
      <p className="text-blue-700 underline">
        <a href="https://github.com/your-repo-link" target="_blank" rel="noopener noreferrer">
          → GitHub.com/your-repo-link
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-6">📄 Contribution Guidelines</h2>
      <p>
        See our{" "}
        <Link href="/CONTRIBUTING.md" className="text-blue-600 underline">
          CONTRIBUTING.md
        </Link>{" "}
        file for full details on setting up your dev environment, submitting PRs, and following style guides.
      </p>

      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-medium">
          No contribution is too small. Even fixing a typo counts.
        </p>
      </div>
    </div>
  );
}