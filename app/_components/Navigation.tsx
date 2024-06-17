import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-20 xl:text-xl text-base relative">
      {/* for small screen */}
      <input id="menu" type="checkbox" className="hidden checkbox" />
      <label
        htmlFor="menu"
        className="menubar_parent sm:hidden bg-accent-500 cursor-pointer shadow-md rounded-full w-12 h-12 z-30 flex justify-center items-center"
      >
        <span
          className={`relative bg-primary-700 before:bg-primary-700 after:bg-primary-700 w-8 h-[2px] transition-transform duration-500 menubar`}
        >
          &nbsp;
        </span>
      </label>
      <span
        className={`menubar_bg transition-transform rounded-full h-4 aspect-square duration-500 sm:hidden block absolute bg-primary-800 top-6 right-6 -z-10`}
      >
        &nbsp;
      </span>
      <ul
        className={`sm:hidden menubar_list h-screen fixed top-0 right-0 opacity-0 flex justify-center items-center flex-col gap-4 transition-all duration-700 w-0 z-20`}
      >
        <li className="min-w-max">
          <a href="/" className="hover:text-accent-400 transition-colors">
            Home
          </a>
        </li>
        <li className="min-w-max">
          <a href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </a>
        </li>
        <li className="min-w-max">
          <a href="/about" className="hover:text-accent-400 transition-colors">
            About
          </a>
        </li>
        <li className="min-w-max">
          {session?.user?.image ? (
            <a
              href="/account"
              className="hover:text-accent-400 transition-colors flex gap-4 items-center min-w-max"
            >
              <figure className="h-12 rounded-full aspect-square relative overflow-clip">
                <Image
                  src={session?.user?.image}
                  fill
                  alt={session?.user?.name || "user profile photo"}
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
              </figure>
              <span>Guest area</span>
            </a>
          ) : (
            <a
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </a>
          )}
        </li>
      </ul>
      {/* <SmallScreenNav session={session} /> */}

      <ul className="hidden sm:flex xl:gap-16 gap-10 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex gap-4 items-center"
            >
              <figure className="h-12 rounded-full aspect-square relative overflow-clip">
                <Image
                  src={session?.user?.image}
                  fill
                  alt={session?.user?.name || "user profile photo"}
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
              </figure>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
