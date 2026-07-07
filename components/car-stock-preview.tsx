"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { carStock } from "@/lib/cars-stock";
import { MotionSectionHeader } from "@/components/motion-section-header";
import { MotionCard } from "@/components/motion-card";
import { CTAButton } from "@/components/cta-button";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { ArrowRight } from "lucide-react";

interface CarStockPreviewProps {
  limit?: number;
  ctaHref?: string;
  id?: string;
  className?: string;
}

export function CarStockPreview({ limit = 3, ctaHref = "/cars", id, className }: CarStockPreviewProps) {
  const isTouch = useTouchDevice();
  const previewCars = carStock.slice(0, limit);

  return (
    <section id={id} className={`bg-background/50 py-20 scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-4">
        <MotionSectionHeader
          title="Авто в наличии"
          subtitle="Актуальный сток популярных автомобилей из Китая в Алматы."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 80, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={ctaHref}
                aria-label={`Узнать подробнее о ${car.model}`}
                className="block"
              >
                <MotionCard
                  className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm"
                  tilt
                  sheen
                  hoverScale={1.03}
                >
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={isTouch ? undefined : { scale: 1.12 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={car.image}
                        alt={car.model}
                        width={1113}
                        height={516}
                        className="h-auto w-full object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <p className="text-sm uppercase tracking-widest text-gold">{car.model}</p>
                    <h3 className="mt-1 text-xl uppercase tracking-tight">{car.model}</h3>
                    <p className="mt-2 text-sm text-white/80">Подробнее →</p>
                  </motion.div>
                </MotionCard>
              </a>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CTAButton href={ctaHref} variant="primary">
            <ArrowRight size={18} className="mr-2" />
            Смотреть все авто
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
