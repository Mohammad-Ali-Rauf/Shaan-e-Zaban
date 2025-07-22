import Link from "next/link";

export default function ContributePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">🤝 Contribute to Shaan-e-Zaban</h1>

      <p className="text-lg text-gray-700">
        <strong>Shaan-e-Zaban</strong> is an open-source Urdu learning platform — built by the community, for the community. Whether you're a developer, designer, linguist, or just passionate about Urdu, your contributions matter.
      </p>

      <h2 className="text-2xl font-semibold mt-6">🔧 Ways You Can Help</h2>

      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>🎙️ Record clear, native Urdu audio clips for stories</li>
        <li>📖 Add new stories to the curriculum (`stories.json` files)</li>
        <li>🎨 Improve the user experience, typography, or layout</li>
        <li>💻 Optimize performance, clean up code, or improve accessibility</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">📂 GitHub Repository</h2>
      <p className="text-blue-700 underline">
        <Link href="https://github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban" target="_blank" rel="noopener noreferrer">
          → github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban
        </Link>
      </p>

      <h2 className="text-2xl font-semibold mt-6">📄 Contribution Guide</h2>
      <p className="text-md text-gray-700">
        For setup instructions, code standards, and how to submit a pull request, check our{" "}
        <Link href="https://github.com/Mohammad-Ali-Rauf/Shaan-e-Zaban/blob/master/CONTRIBUTING.md" className="text-blue-600 underline">
          CONTRIBUTING.md
        </Link>{" "}
        file.
      </p>

      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-medium">
          💡 Every bit counts — even fixing a typo or rewording a sentence makes a difference.
        </p>
      </div>
    </div>
  );
}