import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";
import {
  ArrowRight,
  ArrowDown,
  RefreshCw,
  CreditCard,
  Calendar,
  Briefcase,
} from "lucide-react";

const cars = [
  {
    title: "Zeekr 8X",
    description: "Единственный в Казахстане премиальный электрокроссовер.",
    href: "/cars",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Популярные китайские авто",
    description: "Бюджетные и премиальные модели под заказ из Китая.",
    href: "/cars",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Авто в наличии",
    description: "Готовые автомобили в Алматы с быстрым оформлением.",
    href: "/cars",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  },
];

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

function CarCard({
  title,
  description,
  href,
  image,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-none bg-white/50 backdrop-blur-md transition-colors hover:bg-white/70 dark:bg-charcoal/50 dark:hover:bg-charcoal/70"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-2xl font-normal uppercase tracking-tight text-white">
          {title}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-normal uppercase tracking-wide text-card-foreground">
          Подробнее <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}

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

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Актуальные предложения"
            subtitle="Популярные автомобили и эксклюзивные позиции JetQ."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.title} {...car} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative aspect-[21/9] w-full md:aspect-[21/7]">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
            alt="Автомобили JetQ"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
            <p className="text-sm font-normal uppercase tracking-widest text-white/80">
              JetQ Auto
            </p>
            <h2 className="mt-3 text-3xl font-normal uppercase tracking-tight md:text-5xl lg:text-6xl">
              Популярные авто
            </h2>
            <div className="mt-6">
              <CTAButton href="tel:+77750061411" variant="white">
                Подобрать автомобиль
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Способы приобретения"
            subtitle="Выберите удобный формат покупки."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {purchaseOptions.map((option) => (
              <div
                key={option.title}
                className="bg-card p-6"
              >
                <option.icon className="text-gold" size={28} />
                <h3 className="mt-4 text-xl font-normal uppercase tracking-tight text-card-foreground">
                  {option.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center py-2">
        <ArrowDown className="text-gold/40" size={32} />
      </div>

      <section className="bg-muted/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Trade-In / Обмен авто"
            subtitle="Быстрая оценка и честные условия обмена."
          />
          <div className="bg-card p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
              <div>
                <h3 className="text-2xl font-normal uppercase tracking-tight text-card-foreground">
                  У нас есть Trade-In
                </h3>
                <p className="mt-4 text-muted-foreground">
                  Оценим ваш авто по рынку, подберем новый и оформим документы.
                </p>
                <div className="mt-6">
                  <CTAButton href="tel:+77750061411" variant="primary">
                    Оценить мой авто
                  </CTAButton>
                </div>
              </div>
              <div className="hidden justify-center md:flex">
                <ArrowRight className="text-gold/50" size={40} />
              </div>
              <div className="relative aspect-video overflow-hidden bg-muted">
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

      <section className="bg-background/50 backdrop-blur-md py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Свяжитесь с нами"
            subtitle="Приезжайте на осмотр или позвоните — подберем лучший вариант."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
