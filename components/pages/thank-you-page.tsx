"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCity } from "@/components/site-context";
import { CheckCircle } from "lucide-react";

export function ThankYouPage() {
  const city = useCity();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const homeHref = city ? `/${city}/` : "/";

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center py-24 scroll-mt-24">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-gold" />
        <h1 className="mt-6 text-3xl font-normal uppercase tracking-tight md:text-4xl">
          Спасибо за заявку!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Наш менеджер свяжется с вами в ближайшее время, чтобы уточнить
          детали.
        </p>
        {isClient && (
          <p className="mt-2 text-sm text-muted-foreground">
            Номер вашей заявки обрабатывается.
          </p>
        )}
        <div className="mt-8">
          <Link
            href={homeHref}
            className="inline-flex items-center justify-center bg-gold px-6 py-3 text-base font-normal uppercase tracking-wide text-black transition-colors hover:bg-dark-gold"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </section>
  );
}
