"use client";

import { useCity, useCityHref } from "@/components/site-context";
import { CTAButton } from "@/components/cta-button";

interface LeadFormProps {
  auto?: string;
  submitLabel?: string;
  className?: string;
}

export function LeadForm({
  auto,
  submitLabel = "Получить консультацию",
  className = "",
}: LeadFormProps) {
  const city = useCity();
  const thankYouUrl = useCityHref("/thankyou");

  const cityLabel =
    city === "astana" ? "Астана" : city === "almaty" ? "Алматы" : "";

  return (
    <form
      action={thankYouUrl}
      method="GET"
      data-success-url={thankYouUrl}
      className={`space-y-4 ${className}`}
    >
      <div>
        <label
          htmlFor="lead-name"
          className="block text-xs font-normal uppercase tracking-widest text-muted-foreground"
        >
          Ваше имя
        </label>
        <input
          id="lead-name"
          type="text"
          data-tilda-rule="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Имя"
          className="mt-2 w-full bg-muted border border-border px-4 py-3 text-card-foreground outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      <div>
        <label
          htmlFor="lead-phone"
          className="block text-xs font-normal uppercase tracking-widest text-muted-foreground"
        >
          Телефон
        </label>
        <input
          id="lead-phone"
          type="tel"
          data-tilda-rule="phone"
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+7 (___) ___-__-__"
          className="mt-2 w-full bg-muted border border-border px-4 py-3 text-card-foreground outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      {cityLabel && (
        <input type="hidden" name="city" value={cityLabel} />
      )}

      {auto && <input type="hidden" name="auto" value={auto} />}

      <div className="pt-2">
        <CTAButton variant="primary" type="submit">
          {submitLabel}
        </CTAButton>
      </div>

      <p className="text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
