import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={heroImage}
        fill
        className="object-cover object-top"
        quality={80}
        placeholder="blur"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="lg:text-8xl md:text-7xl text-5xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 lg:px-8 px-6 lg:py-6 py-4 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
