export interface LoanPartner {
  id: string;
  name: string;
  url: string;
  bullets: string[];
  calculator?: {
    minAmount: number;
    maxAmount: number;
    minTerm: number;
    maxTerm: number;
    rate: number;
    paymentType: "annuity" | "annuity-or-equal";
  };
}

export const loanPartners: LoanPartner[] = [
  {
    id: "mycarfinance",
    name: "MyCar Finance",
    url: "https://mycarfinance.kz/",
    bullets: [
      "Ставка от 23% годовых",
      "Для заявки нужны только ИИН и номер телефона",
      "30+ автокредитов выдают ежедневно",
      "80% одобрения заявок",
      "Работают в 19 городах Казахстана",
    ],
    calculator: {
      minAmount: 1_000_000,
      maxAmount: 73_840_000,
      minTerm: 12,
      maxTerm: 120,
      rate: 0.23,
      paymentType: "annuity",
    },
  },
  {
    id: "sdfinance",
    name: "Sapa Digital Finance",
    url: "https://sdfinance.kz/",
    bullets: [
      "Ставка от 2.6% до 34.49% (ГЭСВ до 40.45%)",
      "Сумма от 150 000 до 8 000 000 ₸",
      "Срок от 3 до 84 месяцев",
      "Аннуитетные или равные платежи",
      "Без подтверждения дохода",
    ],
    calculator: {
      minAmount: 150_000,
      maxAmount: 8_000_000,
      minTerm: 3,
      maxTerm: 84,
      rate: 0.22,
      paymentType: "annuity-or-equal",
    },
  },
  {
    id: "jetfin",
    name: "JetFinance",
    url: "https://jetfin.kz/",
    bullets: [
      "Сумма от 300 000 до 15 000 000 ₸ или до 70% от стоимости авто",
      "Срок от 3 до 84 месяцев",
      "Одобрение заявки за 30 минут",
      "Без подтверждения дохода",
      "Онлайн-оформление с биометрией",
    ],
  },
];
