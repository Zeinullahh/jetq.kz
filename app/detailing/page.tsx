import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ProcessStep } from "@/components/process-step";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";
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
  "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552930294-6a8f015c827b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520340356584-76214b2f5e7b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
];

export default function DetailingPage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-normal uppercase tracking-widest text-white/80">
          JetQ Детейлинг
        </p>
        <h1 className="mt-4 text-5xl font-normal uppercase leading-[0.92] md:text-7xl lg:text-8xl xl:text-[7.5rem]">
          Идеальный вид
          <br />
          вашего автомобиля
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Премиальный уход за кузовом и салоном в Алматы.
        </p>
        <div className="mt-8">
          <CTAButton href="tel:+77750061411" variant="primary">
            Позвонить и записаться
          </CTAButton>
        </div>
      </HeroVideo>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Услуги детейлинга"
            subtitle="Комплексный уход, который сохраняет и подчеркивает достоинства вашего авто."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-card p-6"
              >
                <Icon className="h-10 w-10 text-gold" />
                <h3 className="mt-4 text-xl font-normal uppercase tracking-tight text-card-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Процесс работы"
            subtitle="От диагностики до идеального результата — четыре понятных этапа."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step) => (
              <ProcessStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Галерея"
            subtitle="Примеры наших работ — премиальный уход за кузовом и салоном."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <div key={src} className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={src}
                  alt={`Пример детейлинга ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Запишитесь на детейлинг"
            subtitle="Оставьте заявку или позвоните — мы подберем оптимальное решение."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
