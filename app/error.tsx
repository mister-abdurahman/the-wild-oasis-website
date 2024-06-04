"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: { message: string };
  reset: any;
}) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <div className="flex justify-center gap-4">
        <button
          onClick={reset}
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-block bg-slate-800 text-accent-500 px-6 py-3 text-lg"
        >
          Go To Home
        </Link>
      </div>
    </main>
  );
}
