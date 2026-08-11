import type { ReactNode } from "react";

interface LegalPageProps {
  /** Page heading (rendered as the centered uppercase <h1>) */
  title: string;
  /** Last-update notice rendered at the bottom (e.g. "Последнее обновление: 2026.") */
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <section className="min-h-screen bg-background py-24 text-foreground">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-center text-3xl font-normal uppercase tracking-tight md:text-4xl">
          {title}
        </h1>
        <div className="mt-12 space-y-8 text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
        <p className="mt-12 text-sm text-white/50">{lastUpdated}</p>
      </div>
    </section>
  );
}
