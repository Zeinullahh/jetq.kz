import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { ProcessStep } from "@/components/process-step";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";
import { FAQAccordion } from "@/components/faq-accordion";
import { Sparkles, Phone } from "lucide-react";

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

const advantages = [
  {
    title: "Прямые поставки из Китая",
    description: "Работаем напрямую с производителями и поставщиками.",
  },
  {
    title: "Современное оборудование",
    description: "Детейлинг-центр оснащен профессиональными материалами.",
  },
  {
    title: "Прозрачные цены",
    description: "Фиксируем стоимость в договоре без скрытых доплат.",
  },
  {
    title: "Кредит, лизинг и trade-in",
    description: "Помогаем выбрать удобный способ приобретения авто.",
  },
  {
    title: "Работаем с банками",
    description: "Партнерские программы кредитования и лизинга для физических и юридических лиц.",
  },
  {
    title: "Привозим для юридических лиц с НДС",
    description: "Официальная поставка автомобилей с полным пакетом документов и НДС.",
  },
  {
    title: "Гарантия качества",
    description: "Отвечаем за результат всех работ и услуг.",
  },
  {
    title: "Расположение в Алматы",
    description: "ЖК Forum Residence, удобный заезд и парковка.",
  },
];

const steps = [
  {
    number: "01",
    title: "Оставляете заявка",
    description: "Наш менеджер связывается с вами и отвечает на все вопросы.",
  },
  {
    number: "02",
    title: "Подписание договора",
    description: "Заключение договора, в котором прописываем ответственность сторон.",
  },
  {
    number: "03",
    title: "Поиск и выкуп вашего авто",
    description: "Вместе мы подбираем подходящий автомобиль.",
  },
  {
    number: "04",
    title: "Доставка и таможня",
    description: "Доставляем авто до Алматы, и закрываем все таможенные вопросы.",
  },
  {
    number: "05",
    title: "Вручение автомобиля",
    description: "Вручаем автомобиль.",
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

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Актуальные акции на авто в JetQ"
            subtitle="Топовые позиции и популярные автомобили."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-none bg-gold p-8 md:p-10">
              <div className="flex h-10 w-10 items-center justify-center bg-black text-gold">
                <Sparkles size={20} />
              </div>
              <h3 className="mt-6 text-2xl font-normal uppercase tracking-tight text-black md:text-3xl">
                Первый и единственный Zeekr 8X в Казахстане!
              </h3>
              <p className="mt-4 text-black/80">
                Посмотреть автомобиль можно по адресу г. Алматы, Байтурсынова 179/2.
              </p>
              <div className="mt-6">
                <CTAButton href="/cars" variant="white">
                  Смотреть авто
                </CTAButton>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-none bg-white/50 p-6 backdrop-blur-md dark:bg-charcoal/50">
                <h3 className="text-xl font-normal uppercase tracking-tight text-foreground">
                  Топовые позиции
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Эксклюзивные модели и редкие комплектации в наличии и под заказ.
                </p>
              </div>
              <div className="rounded-none bg-white/50 p-6 backdrop-blur-md dark:bg-charcoal/50">
                <h3 className="text-xl font-normal uppercase tracking-tight text-foreground">
                  Популярные автомобили
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Востребованные китайские бренды с лучшим соотношением цены и качества.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Наши услуги"
            subtitle="Полный спектр премиальных услуг для вашего автомобиля."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Почему JetQ?"
            subtitle="Работаем для тех, кто ценит качество, прозрачность и сервис."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {advantages.map((item) => (
              <div
                key={item.title}
                className="bg-card p-6"
              >
                <h3 className="text-lg font-normal uppercase tracking-tight text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-none bg-white/50 p-8 backdrop-blur-md dark:bg-charcoal/50 md:p-12">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-normal uppercase tracking-tight md:text-4xl">
                  Бесплатная консультация специалиста
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                  Проконсультируем по всем вопросам и поможем подобрать нужный вариант авто.
                </p>
              </div>
              <CTAButton href="tel:+77750061411" variant="primary">
                <Phone size={18} className="mr-2" />
                Позвонить
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Как мы работаем"
            subtitle="Простой и понятный процесс от заявки до результата."
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <ProcessStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Частые вопросы"
            subtitle="Отвечаем на популярные вопросы о наших услугах."
          />
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="bg-muted/50 backdrop-blur-md py-20">
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
