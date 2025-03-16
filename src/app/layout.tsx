import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodoGenie - Voice-Controlled Todo App",
  description: "Enterprise-grade voice-controlled todo application with AI capabilities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">TodoGenie</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/todos" className="hover:text-gray-300">Todos</Link>
              <Link href="/calendar" className="hover:text-gray-300">Calendar</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
