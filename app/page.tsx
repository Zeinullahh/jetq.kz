import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { ProcessStep } from "@/components/process-step";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";

const services = [
  {
    title: "Детейлинг",
    description:
      "Премиальный уход за кузовом и салоном. Керамика, полировка, химчистка и защита ЛКП.",
    href: "/detailing",
    featured: true,
  },
  {
    title: "Авто из Китая",
    description:
      "Привезем любой автомобиль из Китая под ключ: подбор, выкуп, доставка и таможня.",
    href: "/cars",
  },
  {
    title: "Trade-In / Обмен",
    description:
      "Обменяйте свой автомобиль на новый с доплатой. Оценим ваш авто и подберем лучшее предложение.",
    href: "/cars",
  },
  {
    title: "Авто в наличии",
    description:
      "Готовые автомобили в Алматы. Просмотр, тест-драйв и оформление в день визита.",
    href: "/cars",
  },
];

const steps = [
  {
    number: "01",
    title: "Заявка",
    description: "Оставляете заявку или звоните нам. Менеджер отвечает на все вопросы.",
  },
  {
    number: "02",
    title: "Подбор",
    description: "Подбираем автомобиль или пакет услуг под ваши задачи и бюджет.",
  },
  {
    number: "03",
    title: "Договор",
    description: "Заключаем договор с прозрачными условиями и фиксированной ценой.",
  },
  {
    number: "04",
    title: "Выполнение",
    description: "Доставляем авто или выполняем детейлинг строго в срок.",
  },
  {
    number: "05",
    title: "Передача",
    description: "Передаем автомобиль с полным пакетом документов и результатами работ.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">
          JetQ Group
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Премиальный автомобильный сервис
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Детейлинг, продажа и обмен автомобилей в Алматы. Качество, которое видно с первого взгляда.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTAButton href="/detailing" variant="primary">
            JetQ Детейлинг
          </CTAButton>
          <CTAButton href="/cars" variant="outline" className="text-white border-white hover:bg-white/10">
            Авто в наличии
          </CTAButton>
        </div>
      </HeroVideo>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Наши услуги"
          subtitle="Полный спектр премиальных услуг для вашего автомобиля."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Почему JetQ?"
            subtitle="Работаем для тех, кто ценит качество, прозрачность и сервис."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              "Прямые поставки из Китая",
              "Современное детейлинг-оборудование",
              "Прозрачные цены без скрытых доплат",
              "Помощь в кредите, лизинге и trade-in",
              "Гарантия качества на все работы",
              "Удобное расположение в Алматы",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-card p-6"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Как мы работаем"
          subtitle="Простой и понятный процесс от заявки до результата."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Свяжитесь с нами"
            subtitle="Приезжайте в наш офис или позвоните — мы ответим на все вопросы."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
