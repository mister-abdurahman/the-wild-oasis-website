"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();
  return (
    <nav className="border-r border-primary-900">
      <ul className="flex sm:flex-col flex-row sm:gap-2 gap-0 sm:h-full h-fit sm:text-lg text-xs">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              className={`py-3 sm:px-5 px-3 hover:bg-primary-800 hover:text-primary-100 ${
                pathName === link.href && "bg-primary-800 text-primary-100"
              } transition-colors flex items-center sm:gap-4 gap-2 sm:flex-row flex-col font-semibold text-primary-200`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          </li>
        ))}

        <li className="sm:mt-auto mt-0 sm:ml-0 ml-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
