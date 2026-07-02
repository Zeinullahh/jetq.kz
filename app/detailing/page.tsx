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

export default function DetailingPage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">
          JetQ Детейлинг
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
          Идеальный вид вашего автомобиля
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

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Услуги детейлинга"
          subtitle="Комплексный уход, который сохраняет и подчеркивает достоинства вашего авто."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <Icon className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
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

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Галерея"
          subtitle="Примеры наших работ — скоро здесь появятся фото до и после."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-video rounded-xl bg-muted flex items-center justify-center text-muted-foreground"
            >
              Фото работы {i}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
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
