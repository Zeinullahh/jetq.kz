"use client";

import { useEffect, useState } from "react";

export interface Section {
  id: string;
  label: string;
}

interface SectionNavigatorProps {
  sections: Section[];
}

export function SectionNavigator({ sections }: SectionNavigatorProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (sections.length === 0) return null;

  return (
    <nav className="fixed right-4 top-24 z-50 hidden flex-col items-center gap-3 md:flex">
      <div className="relative flex flex-col items-center gap-3">
        <div className="absolute left-1/2 top-1 h-full w-px -translate-x-1/2 bg-border" />
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className="group relative flex items-center justify-center rounded-full p-1"
              aria-label={label}
            >
              <span
                className={`relative z-10 block h-2 w-2 rounded-full transition-colors ${
                  isActive
                    ? "bg-gold"
                    : "bg-border group-hover:bg-muted-foreground"
                }`}
              />
              <span className="absolute right-full mr-3 whitespace-nowrap rounded bg-card px-2 py-1 text-xs text-card-foreground opacity-0 shadow transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
