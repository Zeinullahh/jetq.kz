import Image from "next/image";
import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";

const cars = [
  {
    title: "Zeekr 8X",
    description: "Первый и единственный Zeekr 8X в Казахстане. Премиальный электрокроссовер.",
    href: "/cars",
  },
  {
    title: "Популярные китайские авто",
    description: "Широкий выбор бюджетных и премиальных моделей под заказ из Китая.",
    href: "/cars",
  },
  {
    title: "Авто в наличии",
    description: "Готовые автомобили в Алматы. Быстрое оформление и выдача.",
    href: "/cars",
  },
];

const purchaseOptions = [
  { title: "Trade-In", description: "Обменяйте свой автомобиль на новый с доплатой." },
  { title: "Кредит", description: "Оформляем кредит через наших банков-партнеров." },
  { title: "Рассрочка", description: "Удобная рассрочка без переплат." },
  { title: "Лизинг", description: "Выгодные условия лизинга для юридических лиц." },
];

export default function CarsPage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-normal uppercase tracking-widest text-white/80">
          JetQ Auto
        </p>
        <h1 className="mt-4 text-5xl font-normal uppercase leading-[0.92] md:text-7xl lg:text-8xl xl:text-[7.5rem]">
          Автомобили
          <br />
          из Китая и в наличии
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Подбор, выкуп, доставка, таможня и оформление под ключ.
        </p>
        <div className="mt-8">
          <CTAButton href="tel:+77750061411" variant="primary">
            Получить консультацию
          </CTAButton>
        </div>
      </HeroVideo>

      <section className="bg-black py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Актуальные предложения"
            subtitle="Популярные автомобили и эксклюзивные позиции JetQ."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <ServiceCard key={car.title} {...car} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Способы приобретения"
            subtitle="Выбирайте удобный вариант покупки и получайте дополнительные преимущества."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {purchaseOptions.map((option) => (
              <div
                key={option.title}
                className="bg-black p-6"
              >
                <h3 className="text-xl font-normal uppercase tracking-tight text-white">
                  {option.title}
                </h3>
                <p className="mt-2 text-ash">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Trade-In / Обмен авто"
            subtitle="Обменяйте свой автомобиль на новый — быстрая оценка и честные условия."
          />
          <div className="bg-charcoal p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-normal uppercase tracking-tight text-white">
                  У нас есть Trade-In
                </h3>
                <p className="mt-4 text-ash">
                  Оценим ваш автомобиль по рыночной стоимости, поможем подобрать новый
                  и оформим все документы. Экономьте время и деньги с JetQ.
                </p>
                <div className="mt-6">
                  <CTAButton href="tel:+77750061411" variant="primary">
                    Оценить мой авто
                  </CTAButton>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden bg-dark-iron">
                <Image
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
                  alt="Trade-In — обмен автомобиля"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Свяжитесь с нами"
            subtitle="Приезжайте на осмотр или позвоните — мы подберем лучший вариант."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
