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
      className={`rounded-full p-2 transition-colors duration-300 ${
        isDark
          ? "text-white hover:bg-white/10"
          : "text-black hover:bg-black/10"
      }`}
      aria-label="Переключить тему"
      disabled={!mounted}
    >
      {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
