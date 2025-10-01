import type { Metadata } from "next";
import "./globals.css";
import {Navbar} from "@/components";

export const metadata: Metadata = {
  title: "Shaan-e-Zaban | Learn Urdu",
  description: "A culturally authentic platform to learn standard Urdu in its true script.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-gray-900 to-black text-white min-h-screen">
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-800 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-900 rounded-full blur-3xl opacity-5"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}