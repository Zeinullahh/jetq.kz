"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroVideo } from "@/components/hero-video";
import { MotionHeroText, MotionHeroItem } from "@/components/motion-hero-text";
import { MotionSectionHeader } from "@/components/motion-section-header";
import { CTAButton } from "@/components/cta-button";
import { YouTubeBackground } from "@/components/youtube-background";
import { CarStockGrid } from "@/components/car-stock-grid";
import { MapSection } from "@/components/map-section";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxImage } from "@/components/parallax-image";
import { MotionCard } from "@/components/motion-card";
import { WHATSAPP_URL } from "@/lib/constants";
import {
  ArrowRight,
  RefreshCw,
  CreditCard,
  Calendar,
  Briefcase,
} from "lucide-react";

const purchaseOptions = [
  {
    title: "Trade-In",
    description: "Обменяйте свой автомобиль на новый.",
    icon: RefreshCw,
  },
  {
    title: "Кредит",
    description: "Оформление через банков-партнеров.",
    icon: CreditCard,
  },
  {
    title: "Рассрочка",
    description: "Удобная рассрочка без переплат.",
    icon: Calendar,
  },
  {
    title: "Лизинг",
    description: "Выгодные условия для юридических лиц.",
    icon: Briefcase,
  },
];

export default function CarsPage() {
  return (
    <>
      <YouTubeBackground videoId="0_Or6gyR87g" />
      <HeroVideo>
        <MotionHeroText className="flex flex-col items-center">
          <MotionHeroItem>
            <p className="text-sm font-normal uppercase tracking-widest text-white/80">
              JetQ Auto
            </p>
          </MotionHeroItem>
          <MotionHeroItem>
            <h1 className="mt-4 text-5xl font-normal uppercase leading-[0.92] md:text-7xl lg:text-8xl xl:text-[7.5rem]">
              Автомобили
              <br />
              из Китая и в наличии
            </h1>
          </MotionHeroItem>
          <MotionHeroItem>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
              Подбор, выкуп, доставка, таможня и оформление под ключ.
            </p>
          </MotionHeroItem>
          <MotionHeroItem>
            <MagneticButton>
              <CTAButton href={WHATSAPP_URL} variant="primary">
                Получить консультацию
              </CTAButton>
            </MagneticButton>
          </MotionHeroItem>
        </MotionHeroText>
      </HeroVideo>

      <CarStockGrid />

      <section className="relative overflow-hidden">
        <ParallaxImage className="relative aspect-[21/9] w-full md:aspect-[21/7]" speed={0.2}>
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
            alt="Автомобили JetQ"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </ParallaxImage>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
          <p className="text-sm font-normal uppercase tracking-widest text-white/80">
            JetQ Auto
          </p>
          <h2 className="mt-3 text-3xl font-normal uppercase tracking-tight md:text-5xl lg:text-6xl">
            Популярные авто
          </h2>
          <div className="mt-6">
            <CTAButton href={WHATSAPP_URL} variant="white">
              Подобрать автомобиль
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <MotionSectionHeader
            title="Способы приобретения"
            subtitle="Выберите удобный формат покупки."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {purchaseOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ perspective: 1000 }}
              >
                <MotionCard className="h-full bg-card p-6" sheen>
                  <option.icon className="text-gold" size={28} />
                  <h3 className="mt-4 text-xl font-normal uppercase tracking-tight text-card-foreground">
                    {option.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{option.description}</p>
                </MotionCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <MotionSectionHeader
            title="Trade-In / Обмен авто"
            subtitle="Быстрая оценка и честные условия обмена."
          />
          <div className="bg-card p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <MotionCard className="bg-card p-8 md:p-12" sheen>
                  <h3 className="text-2xl font-normal uppercase tracking-tight text-card-foreground">
                    У нас есть Trade-In
                  </h3>
                  <p className="mt-4 text-muted-foreground">
                    Оценим ваш авто по рынку, подберем новый и оформим документы.
                  </p>
                  <div className="mt-6">
                    <MagneticButton>
                      <CTAButton href={WHATSAPP_URL} variant="primary">
                        Оценить мой авто
                      </CTAButton>
                    </MagneticButton>
                  </div>
                </MotionCard>
              </motion.div>
              <div className="hidden justify-center md:flex">
                <ArrowRight className="text-gold/50" size={40} />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <MotionCard className="relative aspect-video overflow-hidden bg-muted" hoverScale={1.02}>
                  <Image
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
                    alt="Trade-In — обмен автомобиля"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </MotionCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <MapSection />
    </>
  );
}
