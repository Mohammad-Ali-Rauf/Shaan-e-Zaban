import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "@/lib/getServerSession";

export const metadata: Metadata = {
  title: "Shaan-e-Zaban | Learn Urdu",
  description: "A culturally authentic platform to learn standard Urdu in its true script.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-800">
        <nav className="flex justify-between p-4 border-b items-center">
          <Link href="/" className="font-bold text-xl">
            📚 Shaan-e-Zaban
          </Link>
          <div className="flex gap-4 text-blue-600 text-sm items-center">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>

            {session && (
              <>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link href="/contribute" className="hover:underline">
                  Contribute
                </Link>
                <form action="/api/auth/logout" method="POST">
                  <button
                    type="submit"
                    className="hover:underline text-red-600 ml-2"
                  >
                    Logout
                  </button>
                </form>
              </>
            )}

            {!session && (
              <Link href="/auth/signin" className="hover:underline">
                Sign In
              </Link>
            )}
          </div>
        </nav>
        <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
