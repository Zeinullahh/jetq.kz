"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { SectionHeader } from "./section-header";

const partners = [
  { name: "CarPay", src: "/images/partners/CarPay_logo.png", width: 140, height: 60 },
  { name: "Max Auto", src: "/images/partners/max-logo.png", width: 130, height: 60 },
  { name: "InDrive", src: "/images/partners/InDrive_Logo.webp", width: 130, height: 60 },
  { name: "MB RUS", src: "/images/partners/MB_RUS_logo.svg", width: 130, height: 60 },
];

function LogoStrip({ suffix }: { suffix: string }) {
  return (
    <>
      {partners.map((partner) => (
        <div
          key={`${partner.name}-${suffix}`}
          className="flex h-[120px] w-[200px] flex-shrink-0 items-center justify-center border-r border-white/10 px-8 last:border-r-0 md:h-[140px] md:w-[260px]"
        >
          <div className="flex items-center justify-center">
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export function PartnersTicker() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Партнеры"
          subtitle="Нам доверяют лидеры автомобильного рынка."
        />
      </div>

      <div className="mt-2 border-y border-white/10 bg-card">
        <div className="group relative overflow-hidden">
          <div
            className={`flex w-max items-center ${prefersReducedMotion ? "" : "animate-marquee"}`}
            style={{ "--marquee-duration": "40s" } as CSSProperties}
          >
            <LogoStrip suffix="a" />
            <LogoStrip suffix="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
