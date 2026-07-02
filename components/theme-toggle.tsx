"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Default to dark styles on the server/initial render to match defaultTheme.
  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-none border bg-transparent transition-colors hover:border-teal-action hover:bg-teal-action hover:text-white ${
        isDark ? "border-white/50 text-white" : "border-black/50 text-black"
      }`}
      aria-label="Переключить тему"
      disabled={!mounted}
    >
      {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
