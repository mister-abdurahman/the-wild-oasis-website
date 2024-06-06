import Header from "./_components/Header";
import Logo from "./_components/Logo";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  desccription: "Luxurious cabin hotel located in the heart of Ikeja, Lagos",
};

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html>
      <body
        className={`${josefin_sans.className} bg-primary-900 relative min-h-screen text-primary-50 flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="mx-auto max-w-7xl w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
