import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shaan-e-Zaban | Learn Urdu",
  description: "A culturally authentic platform to learn standard Urdu in its true script.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-800">
        <nav className="flex justify-between p-4 border-b items-center">
          <Link href="/" className="font-bold text-xl">📚 Shaan-e-Zaban</Link>
          <div className="flex gap-4 text-blue-600 text-sm">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/curriculum" className="hover:underline">Curriculum</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contribute" className="hover:underline">Contribute</Link>
          </div>
        </nav>
        <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}