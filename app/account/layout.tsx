import { ReactNode } from "react";
import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[16rem_1fr] grid-cols-1 sm:grid-rows-1 grid-rows-[3rem_1fr] sm:gap-12 gap-9 h-full">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
