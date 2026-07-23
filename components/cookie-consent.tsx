"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { CTAButton } from "@/components/cta-button";

const STORAGE_KEY = "jetq-cookie-consent";

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (consent !== "accepted") {
      setIsVisible(true);
    }
    setReady(true);
  }, []);

  function accept() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    }
    setIsVisible(false);
  }

  if (!ready || !isVisible || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed bottom-4 left-4 right-4 z-[200] md:right-auto md:w-full md:max-w-md"
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на использование cookie"
    >
      <div className="border border-white/10 bg-black/60 p-6 shadow-2xl backdrop-blur-md">
        <p className="text-sm leading-relaxed text-white/90">
          Мы используем cookie, в том числе сторонних сервисов (Google Ads,
          CallGear), для анализа эффективности рекламы, звонков и улучшения
          работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
          <Link
            href="/cookie-policy"
            className="text-gold underline underline-offset-4 transition-colors hover:text-gold-text"
          >
            Политикой использования cookie
          </Link>
          .
        </p>
        <div className="mt-5 flex justify-end">
          <CTAButton
            variant="primary"
            onClick={accept}
            className="px-8 py-2.5 text-sm"
          >
            Согласен
          </CTAButton>
        </div>
      </div>
    </div>,
    document.body
  );
}
