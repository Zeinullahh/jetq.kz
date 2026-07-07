"use client";

import { useEffect, useState } from "react";

export interface Section {
  id: string;
  label: string;
}

interface SectionNavigatorProps {
  sections: Section[];
  pageLabel: string;
}

export function SectionNavigator({ sections, pageLabel }: SectionNavigatorProps) {
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
    <aside className="fixed right-4 top-1/2 z-40 hidden w-52 -translate-y-1/2 flex-col lg:flex">
      <div className="rounded-lg border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
        <p className="mb-3 inline-block border-b-2 border-gold pb-1 text-sm font-normal uppercase tracking-wide text-card-foreground">
          {pageLabel}
        </p>
        <nav className="flex flex-col gap-1">
          {sections.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors ${
                  isActive
                    ? "bg-gold/10 text-gold"
                    : "text-muted-foreground hover:bg-muted hover:text-card-foreground"
                }`}
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? "bg-gold" : "bg-muted-foreground/50"
                  }`}
                />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
