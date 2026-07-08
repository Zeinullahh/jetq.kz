"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { SectionHeader } from "./section-header";

const partners = [
  { name: "CarPay", src: "/images/partners/CarPay_logo.png", width: 160, height: 70 },
  { name: "InDrive", src: "/images/partners/InDrive_Logo.webp", width: 160, height: 70 },
  { name: "AB Restaurants", src: "/images/partners/AB Restaurants.png", width: 160, height: 70 },
  { name: "Integra Construction Kz", src: "/images/partners/Integra Construction Kz.jpg", width: 160, height: 70 },
  { name: "STECOL CORPORATION", src: "/images/partners/STECOL CORPORATION.jpg", width: 160, height: 70 },
  { name: "А-Лизинг", src: "/images/partners/А-Лизинг.png", width: 160, height: 70 },
  { name: "БЦК Бизнес", src: "/images/partners/БЦК Бизнес.png", width: 160, height: 70 },
  { name: "Береке Бизнес", src: "/images/partners/Береке Бизнес.webp", width: 160, height: 70 },
  { name: "Евразийский Банк Развития", src: "/images/partners/Евразийский Банк Развития.jpg", width: 160, height: 70 },
  { name: "Real-Construction Co", src: "/images/partners/Real-Construction Co.jpeg", width: 160, height: 70 },
];

function LogoStrip({ suffix }: { suffix: string }) {
  return (
    <>
      {partners.map((partner) => (
        <div
          key={`${partner.name}-${suffix}`}
          className="mx-2 flex h-[110px] w-[200px] flex-shrink-0 items-center justify-center rounded-xl bg-white px-6 py-4 md:mx-3 md:h-[130px] md:w-[260px] md:px-8 md:py-6"
        >
          <Image
            src={partner.src}
            alt={partner.name}
            width={partner.width}
            height={partner.height}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </>
  );
}

const COPIES = 6;

export function PartnersTicker() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Нам доверяют"
          subtitle="Лидеры рынка и бизнеса выбирают JetQ."
        />
      </div>

      <div className="mt-2 bg-white">
        <div className="group relative overflow-hidden">
          <div
            className={`flex w-max items-center ${prefersReducedMotion ? "" : "animate-marquee"}`}
            style={{
              "--marquee-duration": "40s",
              "--marquee-translate": `-${100 / COPIES}%`,
            } as CSSProperties}
          >
            {Array.from({ length: COPIES }).map((_, i) => (
              <LogoStrip key={i} suffix={String.fromCharCode(97 + i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
