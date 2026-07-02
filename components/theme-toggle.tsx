"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 hover:bg-muted transition-colors"
      aria-label="Переключить тему"
      disabled={!mounted}
    >
      {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
