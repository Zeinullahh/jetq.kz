"use client";

import { MotionSectionHeader } from "@/components/motion-section-header";
import { FAQAccordion } from "@/components/faq-accordion";
import { FadeIn } from "@/components/fade-in";

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
      "Наши офисы находятся в Алматы (ЖК Forum Residence, ул. Байтурсынова 179/2, блок 2; ул. Каныша Сатпаева, 90/21) и в Астане (Туран 34Б). Работаем ежедневно с 10:00 до 19:00.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-background/50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <MotionSectionHeader
          title="Частые вопросы"
          subtitle="Отвечаем на популярные вопросы о наших услугах."
        />
        <FadeIn>
          <FAQAccordion items={faqItems} />
        </FadeIn>
      </div>
    </section>
  );
}
