import Link from "next/link";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black dark:bg-transparent">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <MobileMenu
          trigger={
            <span className="inline-flex items-center gap-2 text-sm font-normal uppercase tracking-wide text-white">
              <Menu size={20} />
              МЕНЮ
            </span>
          }
        />
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-medium uppercase tracking-tight text-white"
        >
          JETQ
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
