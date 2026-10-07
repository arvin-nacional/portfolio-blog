"use client";
import Link from "next/link";

export default function ContentError({ reset }: { reset: () => void }) {
  return <section className="mx-auto min-h-[60vh] max-w-3xl px-5 pb-20 pt-36 text-center text-light-700">
    <h1 className="mb-4 text-3xl font-bold">Content is temporarily unavailable</h1>
    <p className="mb-6">Please try again in a moment.</p>
    <button type="button" onClick={reset} className="rounded-lg bg-primary-500 px-5 py-3 text-white">Try again</button>
    <Link href="/" className="ml-5 underline">Back to home</Link>
  </section>;
}
