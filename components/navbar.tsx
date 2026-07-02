"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Default to dark styles on the server/initial render to match defaultTheme.
  const isDark = mounted ? theme === "dark" : true;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isDark
          ? "bg-black/50 border-white/10"
          : "bg-white/50 border-black/10"
      }`}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <MobileMenu
          trigger={
            <span
              className={`inline-flex items-center gap-2 text-sm font-normal uppercase tracking-wide transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              <Menu size={20} />
              МЕНЮ
            </span>
          }
        />
        <Link
          href="/"
          className={`absolute left-1/2 -translate-x-1/2 text-2xl font-medium uppercase tracking-tight transition-colors duration-300 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          JETQ
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
