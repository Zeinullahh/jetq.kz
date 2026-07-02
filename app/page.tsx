import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { ProcessStep } from "@/components/process-step";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";
import { FAQAccordion } from "@/components/faq-accordion";
import { Sparkles, Phone, ArrowRight, ArrowDown, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Детейлинг",
    description: "Премиальный уход за кузовом и салоном.",
    href: "/detailing",
    featured: true,
  },
  {
    title: "Авто из Китая",
    description: "Подбор, выкуп, доставка и таможня под ключ.",
    href: "/cars",
  },
  {
    title: "Trade-In",
    description: "Обмен вашего авто на новый с доплатой.",
    href: "/cars",
  },
  {
    title: "Авто в наличии",
    description: "Готовые автомобили в Алматы.",
    href: "/cars",
  },
];

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

const steps = [
  {
    number: "01",
    title: "Заявка",
    description: "Менеджер связывается и отвечает на вопросы.",
  },
  {
    number: "02",
    title: "Договор",
    description: "Закрепляем условия и ответственность сторон.",
  },
  {
    number: "03",
    title: "Подбор авто",
    description: "Вместе находим подходящий автомобиль.",
  },
  {
    number: "04",
    title: "Доставка",
    description: "Привозим авто в Алматы и проходим таможню.",
  },
  {
    number: "05",
    title: "Вручение",
    description: "Передаем ключи и документы.",
  },
];

const faqItems = [
  {
    question: "Как купить авто из Китая через JetQ?",
    answer:
      "Оставьте заявку на сайте или позвоните нам. Менеджер проконсультирует, поможет подобрать модель, заключим договор и возьмем на себя поиск, выкуп, доставку и таможенное оформление.",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer:
      "Доступны наличный и безналичный расчет, кредит, рассрочка и лизинг. Для юридических лиц возможна поставка с НДС.",
  },
  {
    question: "Что такое Trade-In?",
    answer:
      "Trade-In — это обмен вашего автомобиля на новый с доплатой. Мы оценим ваш авто по рыночной стоимости и подберем лучшее предложение.",
  },
  {
    question: "Сколько занимает доставка?",
    answer:
      "Срок зависит от модели, комплектации и маршрута. В среднем доставка автомобиля из Китая занимает от нескольких недель до двух месяцев. Точные сроки озвучивает менеджер после подбора авто.",
  },
  {
    question: "Где находится ваш офис?",
    answer:
      "Наш офис находится в Алматы, ЖК Forum Residence, ул. Байтурсынова 179/2, блок 2. Работаем ежедневно с 10:00 до 19:00.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-normal uppercase tracking-widest text-white/80">
          JetQ Group
        </p>
        <h1 className="mt-4 text-5xl font-normal uppercase leading-[0.92] md:text-7xl lg:text-8xl xl:text-[7.5rem]">
          Премиальный
          <br />
          автомобильный сервис
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Детейлинг, продажа и обмен автомобилей в Алматы. Качество, которое видно с первого взгляда.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTAButton href="/detailing" variant="primary">
            JetQ Детейлинг
          </CTAButton>
          <CTAButton href="/cars" variant="ghost">
            Авто в наличии
          </CTAButton>
        </div>
      </HeroVideo>

      <section className="relative bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Актуальные акции"
            subtitle="Топовые позиции и популярные автомобили в JetQ."
          />
          <div className="grid gap-0 overflow-hidden bg-gold lg:grid-cols-2">
            <div className="relative min-h-[320px] lg:min-h-[420px]">
              {/* Replace with "/images/zeekr-8x.jpg" when the file is available */}
              <Image
                src="https://images.unsplash.com/photo-1710774965929-89c8234ba2b9?auto=format&fit=crop&w=1200&q=80"
                alt="Zeekr 8X — первый в Казахстане"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <div className="flex h-10 w-10 items-center justify-center bg-black text-gold">
                <Sparkles size={20} />
              </div>
              <h3 className="mt-6 text-2xl font-normal uppercase tracking-tight text-black md:text-3xl lg:text-4xl">
                Первый Zeekr 8X в Казахстане
              </h3>
              <p className="mt-4 max-w-md text-black/80">
                Уникальный электромобиль уже в Алматы. Запишитесь на просмотр.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CTAButton href="/cars" variant="white">
                  Смотреть авто
                </CTAButton>
                <span className="text-sm uppercase tracking-wide text-black/70">
                  Байтурсынова 179/2
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 text-gold/20 lg:block">
          <ArrowDown size={48} strokeWidth={1} />
        </div>
      </section>

      <section className="relative bg-background/50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Наши услуги"
            subtitle="Все, что нужно для вашего автомобиля."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden bg-muted/50 lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1000&q=80"
                alt="Премиальный автомобиль"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <p className="text-xs uppercase tracking-widest text-white/70">
                  JetQ
                </p>
                <h3 className="mt-2 text-2xl uppercase tracking-tight text-white md:text-3xl">
                  Премиум-уход
                </h3>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 text-white/10 lg:block">
          <ChevronRight size={56} strokeWidth={1} className="rotate-90" />
        </div>
      </section>

      <section className="relative bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Почему JetQ?"
            subtitle="Качество, прозрачность и сервис для тех, кто ценит авто."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((item, index) => (
                <div
                  key={item.title}
                  className="group flex flex-col justify-between bg-card p-6"
                >
                  <div>
                    <div className="flex items-center gap-2 text-gold">
                      <span className="text-xs font-normal uppercase tracking-widest">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ArrowRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-3 text-lg font-normal uppercase tracking-tight text-card-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
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

      <section className="bg-background/50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden bg-gold p-8 md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-normal uppercase tracking-tight text-black md:text-4xl">
                  Бесплатная консультация
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-black/80">
                  Проконсультируем по всем вопросам и подберем нужный вариант авто.
                </p>
              </div>
              <CTAButton href="tel:+77750061411" variant="white">
                <Phone size={18} className="mr-2" />
                Позвонить
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Как мы работаем"
            subtitle="Простой и понятный процесс от заявки до результата."
          />
          <div className="relative mb-10 aspect-video min-h-[300px] w-full overflow-hidden bg-muted/50">
            <Image
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
              alt="Электромобиль"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="relative">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <ProcessStep {...step} />
                  {index < steps.length - 1 && (
                    <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-gold/30 lg:block">
                      <ChevronRight size={24} strokeWidth={1} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 text-white/10 lg:block">
          <ArrowDown size={48} strokeWidth={1} />
        </div>
      </section>

      <section className="bg-background/50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Частые вопросы"
            subtitle="Отвечаем на популярные вопросы о наших услугах."
          />
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Свяжитесь с нами"
            subtitle="Приезжайте в офис или позвоните — мы ответим на все вопросы."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
