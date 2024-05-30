import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>The Wild Oasis. Welcome 🥰</h1>;
      <Link href={"/cabins"}>Explore premium cabins</Link>
    </div>
  );
}
