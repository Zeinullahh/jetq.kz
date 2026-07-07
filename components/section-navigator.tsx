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
    <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col md:flex">
      <div className="rounded-xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur">
        <p className="mb-2 text-center text-[10px] font-normal uppercase tracking-widest text-muted-foreground">
          Разделы
        </p>
        <div className="flex flex-col gap-1.5">
          {sections.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`group flex items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors ${
                  isActive
                    ? "bg-gold/10 text-gold"
                    : "text-card-foreground hover:bg-muted"
                }`}
              >
                <span
                  className={`block h-2 w-2 rounded-full border transition-colors ${
                    isActive
                      ? "border-gold bg-gold"
                      : "border-muted-foreground bg-transparent group-hover:border-card-foreground"
                  }`}
                />
                <span className="whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
