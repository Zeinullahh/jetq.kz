"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { SectionHeader } from "./section-header";
import { StaggerContainer, StaggerItem } from "./stagger-container";

const partners = [
  { name: "CarPay", src: "/images/partners/CarPay_logo.png", width: 140, height: 60 },
  { name: "Max Auto", src: "/images/partners/max-logo.png", width: 130, height: 60 },
  { name: "InDrive", src: "/images/partners/InDrive_Logo.webp", width: 130, height: 60 },
  { name: "MB RUS", src: "/images/partners/MB_RUS_logo.svg", width: 130, height: 60 },
];

// Duplicate enough times so the track is always wider than the viewport.
const DUPLICATES = 4;
const SCROLL_SPEED = 0.4; // pixels per frame (~60 fps)
const RESUME_DELAY = 1200; // ms

export function PartnersTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [boost, setBoost] = useState(0);
  const rafRef = useRef<number>();
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isInteractingRef = useRef(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // +1 prevents floating-point edge cases.
    setCanScroll(track.scrollWidth > track.clientWidth + 1);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (canScroll && !isPaused && !isInteractingRef.current) {
        const singleSetWidth = track.scrollWidth / DUPLICATES;
        const speed = SCROLL_SPEED + boost;
        let next = track.scrollLeft + speed;
        if (next >= singleSetWidth) {
          next = 0;
        }
        track.scrollLeft = next;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isPaused, canScroll, boost]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setBoost(0.6);
      clearTimeout(timeout);
      timeout = setTimeout(() => setBoost(0), 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [prefersReducedMotion]);

  const pause = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setIsPaused(true);
  };

  const scheduleResume = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  };

  const handlePointerEnter = () => pause();
  const handlePointerLeave = () => scheduleResume();
  const handlePointerDown = () => {
    isInteractingRef.current = true;
    pause();
  };
  const handlePointerUp = () => {
    isInteractingRef.current = false;
    scheduleResume();
  };

  const track = Array.from({ length: DUPLICATES }, (_, i) =>
    partners.map((p) => ({ ...p, key: `${p.name}-${i}` }))
  ).flat();

  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Партнеры"
          subtitle="Нам доверяют лидеры автомобильного рынка."
        />
      </div>

      <div className="mt-2 border-y border-white/10 bg-card">
        <div
          ref={trackRef}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="no-scrollbar flex cursor-grab overflow-x-auto active:cursor-grabbing"
        >
          <StaggerContainer staggerDelay={0.08} className="flex w-max items-center">
            {track.map((partner) => (
              <StaggerItem
                key={partner.key}
                className="flex h-[120px] w-[200px] flex-shrink-0 items-center justify-center border-r border-white/10 px-8 last:border-r-0 md:h-[140px] md:w-[260px]"
              >
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
