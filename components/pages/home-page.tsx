"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCity } from "@/components/site-context";
import { HeroVideo } from "@/components/hero-video";
import { MotionHeroText, MotionHeroItem } from "@/components/motion-hero-text";
import { MotionSectionHeader } from "@/components/motion-section-header";
import { CTAButton } from "@/components/cta-button";
import { YouTubeBackground } from "@/components/youtube-background";
import { PartnersTicker } from "@/components/partners-ticker";
import { MotionCard } from "@/components/motion-card";
import { MagneticButton } from "@/components/magnetic-button";
import { CarStockPreview } from "@/components/car-stock-preview";
import { AddressesSection } from "@/components/addresses-section";
import { LoanPartnersSection } from "@/components/loan-partners-section";
import { FAQSection } from "@/components/faq-section";
import { useWhatsAppUrl } from "@/components/site-context";
import { LeadForm } from "@/components/lead-form";
import { Phone, ArrowDown } from "lucide-react";

const advantages = [
  {
    title: "Прямые поставки",
    description: "Работаем напрямую с производителями и поставщиками из Китая.",
  },
  {
    title: "Современный детейлинг",
    description: "Профессиональное оборудование и материалы премиум-класса.",
  },
  {
    title: "Прозрачные цены",
    description: "Фиксируем стоимость в договоре без скрытых доплат.",
  },
  {
    title: "Кредит, лизинг, trade-in",
    description: "Удобные способы приобретения авто под любой бюджет.",
  },
  {
    title: "Юридическим лицам с НДС",
    description: "Официальная поставка с полным пакетом документов.",
  },
  {
    title: "Гарантия качества",
    description: "Отвечаем за результат всех работ и услуг.",
  },
];

function useCityLabel() {
  const city = useCity();
  if (city === "astana") return "Астане";
  if (city === "almaty") return "Алматы";
  return null;
}

export function HomePage() {
  const cityLabel = useCityLabel();
  const whatsappUrl = useWhatsAppUrl();

  return (
    <>
      <YouTubeBackground
        videoId="0_Or6gyR87g"
        skipSegments={[{ start: 7, end: 13 }]}
      />
      <div id="hero" className="scroll-mt-24">
        <HeroVideo>
          <MotionHeroText className="flex flex-col items-center">
            <MotionHeroItem>
              <p className="text-sm font-normal uppercase tracking-widest text-white/80">
                JetQ Group
              </p>
            </MotionHeroItem>
            <MotionHeroItem>
              <h1 className="mt-4 text-5xl font-normal uppercase leading-[0.92] md:text-7xl lg:text-8xl xl:text-[7.5rem]">
                Премиальный
                <br />
                автомобильный сервис
              </h1>
            </MotionHeroItem>
            <MotionHeroItem>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
                {cityLabel
                  ? `Детейлинг, продажа и обмен автомобилей в ${cityLabel}. Качество, которое видно с первого взгляда.`
                  : "Детейлинг, продажа и обмен автомобилей в Алматы. Качество, которое видно с первого взгляда."}
              </p>
            </MotionHeroItem>
            <MotionHeroItem>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton>
                  <CTAButton href={whatsappUrl} variant="primary">
                    JetQ Детейлинг
                  </CTAButton>
                </MagneticButton>
                <MagneticButton>
                  <CTAButton href="/cars/" variant="ghost">
                    Авто в наличии
                  </CTAButton>
                </MagneticButton>
              </div>
            </MotionHeroItem>
          </MotionHeroText>
        </HeroVideo>
      </div>

      <CarStockPreview limit={3} id="stock" />

      <section id="why-jetq" className="relative bg-muted/50 py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4">
          <MotionSectionHeader
            title="Почему JetQ?"
            subtitle="Качество, прозрачность и сервис для тех, кто ценит авто."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <MotionCard className="group flex h-full flex-col justify-between bg-card p-6" sheen>
                    <div>
                      <div className="flex items-center gap-2 text-gold">
                        <span className="text-xs font-normal uppercase tracking-widest">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-normal uppercase tracking-tight text-card-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </MotionCard>
                </motion.div>
              ))}
            </div>
            <div className="relative min-h-[320px] overflow-hidden bg-background/50 lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80"
                alt="Автомобиль в движении"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-white/70">
                  JetQ
                </p>
                <h3 className="mt-2 text-2xl uppercase tracking-tight text-white md:text-3xl">
                  Надежность на каждом этапе
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 text-gold/20 lg:block">
          <ArrowDown size={48} strokeWidth={1} />
        </div>
      </section>

      <PartnersTicker />

      <section id="consultation" className="bg-background/50 py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden bg-gold p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div>
                <h2 className="text-3xl font-normal uppercase tracking-tight text-black md:text-4xl">
                  Бесплатная консультация
                </h2>
                <p className="mt-4 max-w-xl text-lg text-black/80">
                  Проконсультируем по всем вопросам и подберем нужный вариант авто.
                </p>
                <div className="mt-6">
                  <MagneticButton>
                    <CTAButton href={whatsappUrl} variant="white">
                      <Phone size={18} className="mr-2" />
                      Написать в WhatsApp
                    </CTAButton>
                  </MagneticButton>
                </div>
              </div>
              <div className="bg-white p-6 md:p-8 shadow-lg">
                <h3 className="text-lg font-normal uppercase tracking-tight text-black">
                  Оставить заявку
                </h3>
                <LeadForm
                  submitLabel="Отправить"
                  className="mt-4"
                  theme="light"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LoanPartnersSection id="credit" />

      <AddressesSection id="addresses" />

      <FAQSection id="faq" />
    </>
  );
}
