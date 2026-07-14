"use client";

import { FormEvent, useState, ChangeEvent } from "react";
import { useCity, useCityHref } from "@/components/site-context";
import { CTAButton } from "@/components/cta-button";

declare global {
  interface Window {
    CallGear?: {
      getCredentials?: () => { hit_id?: number | string };
      addOfflineRequest?: (
        request: Record<string, string>,
        callback?: (resp: unknown) => void
      ) => void;
    };
  }
}

interface LeadFormProps {
  auto?: string;
  submitLabel?: string;
  className?: string;
  theme?: "dark" | "light";
}

function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && /^[78]/.test(digits)) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  let out = "+7";
  if (digits.length > 0) out += " (" + digits.slice(0, 3);
  if (digits.length >= 3) out += ")";
  if (digits.length > 3) out += " " + digits.slice(3, 6);
  if (digits.length > 6) out += "-" + digits.slice(6, 8);
  if (digits.length > 8) out += "-" + digits.slice(8, 10);
  return out;
}

function validateName(value: string): string {
  if (!value || value.trim().length < 2) return "Введите имя";
  return "";
}

function validatePhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && /^[78]/.test(digits)) {
    digits = digits.slice(1);
  }
  if (digits.length < 10) return "Введите номер полностью";
  if (digits.length > 10) return "Неверный формат номера";
  return "";
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

  const [phoneValue, setPhoneValue] = useState("+7");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setPhoneValue(formatPhone(e.target.value));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  }

  function handleNameChange() {
    if (errors.name) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.name;
        return next;
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const cityValue = String(formData.get("city") || "").trim();
    const autoValue = String(formData.get("auto") || "").trim();

    const nameError = validateName(name);
    const phoneError = validatePhone(phone);

    if (nameError || phoneError) {
      event.preventDefault();
      setErrors({ name: nameError, phone: phoneError });
      return;
    }

    setErrors({});

    let message = "";
    if (autoValue) {
      message += `Какой автомобиль вы ищете: ${autoValue} \n`;
    }
    if (cityValue) {
      message += `Ваш город: ${cityValue} \n`;
    }

    const payload = { name, phone, message };

    try {
      sessionStorage.setItem("curs-form-1", JSON.stringify(payload));
    } catch {
      // ignore sessionStorage errors
    }
  }

  return (
    <form
      action={thankYouUrl}
      method="GET"
      data-success-url={thankYouUrl}
      className={`space-y-4 ${className}`}
      onSubmit={handleSubmit}
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
          onChange={handleNameChange}
          className={inputClass + (errors.name ? " border-red-500" : "")}
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        ) : null}
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
          value={phoneValue}
          onChange={handlePhoneChange}
          className={inputClass + (errors.phone ? " border-red-500" : "")}
        />
        {errors.phone ? (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        ) : null}
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
