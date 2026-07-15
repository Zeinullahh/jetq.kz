"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { MapPin } from "lucide-react";
import { CTAButton } from "@/components/cta-button";

export type CitySlug = "almaty" | "astana";

const STORAGE_KEY = "jetq-selected-city";

const CITIES: { slug: CitySlug; label: string }[] = [
  { slug: "almaty", label: "Алматы" },
  { slug: "astana", label: "Астана" },
];

export function CitySelectorModal() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved === "almaty" || saved === "astana") {
      router.replace(`/${saved}`);
      return;
    }

    setReady(true);
    setIsOpen(true);
  }, [router]);

  function selectCity(slug: CitySlug) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, slug);
    }
    setIsOpen(false);
    router.push(`/${slug}`);
  }

  if (!ready || !isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="city-selector-title"
    >
      <div className="w-full max-w-md border border-white/10 bg-card p-8 shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center bg-gold/10 text-gold">
            <MapPin size={28} strokeWidth={1.5} />
          </div>
        </div>

        <h2
          id="city-selector-title"
          className="text-center text-2xl font-normal uppercase tracking-tight text-card-foreground"
        >
          Выберите город
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground">
          С какого города вам удобнее заказать автомобиль?
        </p>

        <div className="mt-8 grid gap-4">
          {CITIES.map((city) => (
            <CTAButton
              key={city.slug}
              variant="primary"
              onClick={() => selectCity(city.slug)}
              className="w-full justify-center py-4 text-lg"
            >
              {city.label}
            </CTAButton>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
