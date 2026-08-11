import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика cookie — JetQ",
  description:
    "Страница переехала. Политика использования cookie теперь является частью Политики конфиденциальности JetQ.",
  robots: "noindex",
};

export default function CookiePolicyPage() {
  return (
    <>
      <meta
        httpEquiv="refresh"
        content="0; url=/privacy-policy#cookies"
      />
      <section className="min-h-screen bg-background py-24 text-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-normal uppercase tracking-tight md:text-4xl">
            Страница переехала
          </h1>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground">
            Политика использования cookie теперь является частью{" "}
            <a
              href="/privacy-policy#cookies"
              className="text-link-blue underline underline-offset-4"
            >
              Политики конфиденциальности
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Если вы не были перенаправлены автоматически, перейдите по ссылке выше.
          </p>
        </div>
      </section>
    </>
  );
}
