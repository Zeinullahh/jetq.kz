"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroVideo } from "@/components/hero-video";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";
import { WHATSAPP_URL } from "@/lib/constants";
import { MotionHeroText, MotionHeroItem } from "@/components/motion-hero-text";
import { MotionSectionHeader } from "@/components/motion-section-header";
import { MotionCard } from "@/components/motion-card";
import { MagneticButton } from "@/components/magnetic-button";
import { TimelineLine } from "@/components/timeline-line";
import { Sparkles, Shield, Droplets, Paintbrush } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Полировка кузова",
    description:
      "Устраняем мелкие царапины, голограммы и следы окисления. Возвращаем глубину цвета и блеск.",
  },
  {
    icon: Shield,
    title: "Керамическое покрытие",
    description:
      "Долговременная защита ЛКП от химии, УФ-лучей и мелких повреждений. Гидрофобный эффект до нескольких лет.",
  },
  {
    icon: Droplets,
    title: "Химчистка салона",
    description:
      "Глубокая очистка кожи, алькантары и текстиля. Удаляем запахи, пятна и загрязнения.",
  },
  {
    icon: Paintbrush,
    title: "Защита пленкой",
    description:
      "Антигравийная полиуретановая пленка для защиты передней части кузова и зон риска.",
  },
];

const steps = [
  {
    number: "01",
    title: "Диагностика",
    description: "Оцениваем состояние кузова и салона, обсуждаем желаемый результат.",
  },
  {
    number: "02",
    title: "Мойка и подготовка",
    description: "Тщательная мойка, обезжиривание и подготовка поверхностей.",
  },
  {
    number: "03",
    title: "Детейлинг",
    description: "Выполняем полировку, покрытие, химчистку или защиту пленкой.",
  },
  {
    number: "04",
    title: "Контроль качества",
    description: "Проверяем каждый сантиметр автомобиля перед передачей клиенту.",
  },
];

const gallery = [
  "/images/placeholder-1.jpg",
  "/images/placeholder-2.webp",
  "/images/placeholder-3.webp",
  "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80",
  "/images/zeekr-9x.jpg",
];

export default function DetailingPage() {
  return (
    <>
      {/* Fixed full-screen background unique to the detailing page */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          src="/videos/hero-detailing.mp4"
          poster="/videos/hero-detailing-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          webkit-playsinline="true"
          className="absolute inset-0 h-full w-full scale-[1.2] object-cover origin-center"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      <HeroVideo>
        <MotionHeroText className="flex flex-col items-center">
          <MotionHeroItem>
            <p className="text-sm font-normal uppercase tracking-widest text-white/80">
              JetQ Детейлинг
            </p>
          </MotionHeroItem>
          <MotionHeroItem>
            <h1 className="mt-4 text-5xl font-normal uppercase leading-[0.92] md:text-7xl lg:text-8xl xl:text-[7.5rem]">
              Идеальный вид
              <br />
              вашего автомобиля
            </h1>
          </MotionHeroItem>
          <MotionHeroItem>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
              Премиальный уход за кузовом и салоном в Алматы.
            </p>
          </MotionHeroItem>
          <MotionHeroItem>
            <MagneticButton>
              <CTAButton href={WHATSAPP_URL} variant="primary">
                Позвонить и записаться
              </CTAButton>
            </MagneticButton>
          </MotionHeroItem>
        </MotionHeroText>
      </HeroVideo>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <MotionSectionHeader
            title="Услуги детейлинга"
            subtitle="Комплексный уход, который сохраняет и подчеркивает достоинства вашего авто."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MotionCard className="h-full bg-card p-6" sheen>
                  <Icon className="h-10 w-10 text-gold" />
                  <h3 className="mt-4 text-xl font-normal uppercase tracking-tight text-card-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{description}</p>
                </MotionCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <MotionSectionHeader
            title="Процесс работы"
            subtitle="От диагностики до идеального результата — четыре понятных этапа."
          />
          <div className="relative max-w-3xl mx-auto">
            <TimelineLine className="left-[19px] top-0 lg:left-[23px]" />
            <div className="relative space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="group relative flex gap-6">
                    <motion.div
                      className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center bg-gold text-sm font-normal text-black lg:h-12 lg:w-12 lg:text-base"
                      initial={false}
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.12 }}
                    >
                      {step.number}
                    </motion.div>
                    <MotionCard className="flex-1 border-l-2 border-gold bg-card p-5 transition-colors duration-300 hover:bg-card/80">
                      <h3 className="text-lg font-normal uppercase tracking-tight text-card-foreground lg:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground lg:text-base">
                        {step.description}
                      </p>
                    </MotionCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <MotionSectionHeader
            title="Галерея"
            subtitle="Примеры наших работ — премиальный уход за кузовом и салоном."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: "some", margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <MotionCard className="group relative aspect-video overflow-hidden bg-muted" hoverScale={1.03}>
                  <Image
                    src={src}
                    alt={`Пример детейлинга ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-3xl font-light text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </MotionCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <MotionSectionHeader
            title="Запишитесь на детейлинг"
            subtitle="Оставьте заявку или позвоните — мы подберем оптимальное решение."
          />
          <ContactBlock />
          <div className="mt-10 flex justify-center">
            <MagneticButton>
              <CTAButton href={WHATSAPP_URL} variant="primary">
                Позвонить и записаться
              </CTAButton>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
