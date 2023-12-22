"use client";
import Link from "@/node_modules/next/link";
export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-4">
      <Link href="/test">صفحه تست</Link>
    </main>
  );
}
