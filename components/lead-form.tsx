"use client";

import { useCity, useCityHref } from "@/components/site-context";
import { CTAButton } from "@/components/cta-button";

interface LeadFormProps {
  auto?: string;
  submitLabel?: string;
  className?: string;
  theme?: "dark" | "light";
}

export function LeadForm({
  auto,
  submitLabel = "Получить консультацию",
  className = "",
  theme = "dark",
}: LeadFormProps) {
  const city = useCity();
  const thankYouUrl = useCityHref("/thankyou");

  const cityLabel =
    city === "astana" ? "Астана" : city === "almaty" ? "Алматы" : "";

  const isLight = theme === "light";

  const labelClass = isLight
    ? "block text-xs font-normal uppercase tracking-widest text-black/70"
    : "block text-xs font-normal uppercase tracking-widest text-muted-foreground";

  const inputClass = isLight
    ? "mt-2 w-full bg-white border border-black/20 px-4 py-3 text-black placeholder:text-black/40 outline-none focus:ring-1 focus:ring-black"
    : "mt-2 w-full bg-muted border border-border px-4 py-3 text-card-foreground outline-none focus:ring-1 focus:ring-gold";

  const noteClass = isLight
    ? "text-xs text-black/60"
    : "text-xs text-muted-foreground";

  return (
    <form
      action={thankYouUrl}
      method="GET"
      data-success-url={thankYouUrl}
      className={`space-y-4 ${className}`}
    >
      <div>
        <label htmlFor="lead-name" className={labelClass}>
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
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="lead-phone" className={labelClass}>
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
          className={inputClass}
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

      <p className={noteClass}>
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
