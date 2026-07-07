"use client";

import { useEffect, useMemo, useState } from "react";
import type { LoanPartner } from "@/lib/loan-partners";
import { formatMoney } from "@/lib/utils";
import { CTAButton } from "@/components/cta-button";
import { WHATSAPP_URL } from "@/lib/constants";
import { Check } from "lucide-react";

interface LoanCalculatorProps {
  partner: LoanPartner & { calculator: NonNullable<LoanPartner["calculator"]> };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function parseSum(value: string) {
  return parseInt(value.replace(/\D/g, ""), 10) || 0;
}

function formatSum(value: number) {
  return value.toLocaleString("ru-RU").replace(/,/g, " ");
}

function formatWithSpaces(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function countDigitsBefore(value: string, position: number): number {
  let count = 0;
  for (let i = 0; i < position && i < value.length; i++) {
    if (/\d/.test(value[i])) count++;
  }
  return count;
}

function positionAfterDigits(value: string, digitCount: number): number {
  let count = 0;
  for (let i = 0; i < value.length; i++) {
    if (/\d/.test(value[i])) {
      count++;
      if (count === digitCount) return i + 1;
    }
  }
  return value.length;
}

function handleNumericChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setter: (value: string) => void
) {
  const input = e.currentTarget;
  const oldValue = input.value;
  const cursor = input.selectionStart ?? oldValue.length;
  const digitsBefore = countDigitsBefore(oldValue, cursor);

  const newValue = formatWithSpaces(e.target.value);
  const newCursor = positionAfterDigits(newValue, digitsBefore);

  setter(newValue);

  requestAnimationFrame(() => {
    input.setSelectionRange(newCursor, newCursor);
  });
}

interface LocalResult {
  monthlyPayment: number;
  totalPayment: number;
}

function calculateLocal(
  principal: number,
  term: number,
  monthlyRate: number,
  paymentType: "annuity" | "equal"
): LocalResult {
  if (principal <= 0 || term <= 0 || monthlyRate <= 0) {
    return { monthlyPayment: 0, totalPayment: 0 };
  }

  if (paymentType === "annuity") {
    const payment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return { monthlyPayment: payment, totalPayment: payment * term };
  }

  const principalPart = principal / term;
  let rest = principal;
  let totalInterest = 0;
  let firstMonthPayment = 0;

  for (let k = 0; k < term; k++) {
    const interest = rest * monthlyRate;
    const pay = principalPart + interest;
    if (k === 0) firstMonthPayment = pay;
    totalInterest += interest;
    rest -= principalPart;
  }

  return {
    monthlyPayment: firstMonthPayment,
    totalPayment: principal + totalInterest,
  };
}

export function LoanCalculator({ partner }: LoanCalculatorProps) {
  const cfg = partner.calculator;
  const api = cfg.api;

  const initialPrice = clamp(cfg.minAmount * 10, cfg.minAmount, cfg.maxAmount);
  const initialDownPayment = api
    ? Math.round(initialPrice * api.minDownPaymentRate)
    : 0;
  const initialTerm = api ? api.periods[0] : cfg.minTerm;

  const [priceRaw, setPriceRaw] = useState(formatSum(initialPrice));
  const [downPaymentRaw, setDownPaymentRaw] = useState(
    formatSum(initialDownPayment)
  );
  const [term, setTerm] = useState(initialTerm);
  const [paymentType, setPaymentType] = useState<"annuity" | "equal">(
    "annuity"
  );
  const [isKasko, setIsKasko] = useState(0);

  const price = parseSum(priceRaw);
  const downPayment = parseSum(downPaymentRaw);
  const monthlyRate = cfg.rate / 12;

  const minDownPayment = api ? Math.round(price * api.minDownPaymentRate) : 0;
  const effectiveDownPayment = api
    ? clamp(downPayment, minDownPayment, price)
    : clamp(downPayment, 0, price);
  const principal = Math.max(0, price - effectiveDownPayment);

  const localResult = useMemo(
    () => calculateLocal(principal, term, monthlyRate, paymentType),
    [principal, term, monthlyRate, paymentType]
  );

  const [apiResult, setApiResult] = useState<LocalResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!api) {
      setApiResult(null);
      setApiError(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      setApiError(false);
      fetch(api.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          prepay: effectiveDownPayment,
          period: term,
          paymentMethod: paymentType === "annuity" ? "ann" : "dif",
          isKaskoChecked: isKasko,
          isTrackerChecked: 0,
          saleType: api.saleType,
        }),
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            setApiResult({
              monthlyPayment: Number(json.data.monthlyPayment) || 0,
              totalPayment: Number(json.data.total_interest) || 0,
            });
            setApiError(false);
          } else {
            setApiResult(null);
          }
        })
        .catch(() => {
          setApiResult(null);
          setApiError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [api, price, effectiveDownPayment, term, paymentType, isKasko]);

  const result = apiResult ?? localResult;

  function handlePriceBlur() {
    const parsed = clamp(parseSum(priceRaw), cfg.minAmount, cfg.maxAmount);
    setPriceRaw(formatSum(parsed));

    const dpParsed = api
      ? clamp(parseSum(downPaymentRaw), Math.round(parsed * api.minDownPaymentRate), parsed)
      : clamp(parseSum(downPaymentRaw), 0, parsed);
    setDownPaymentRaw(formatSum(dpParsed));
  }

  function handleDownPaymentBlur() {
    const dpParsed = api
      ? clamp(parseSum(downPaymentRaw), minDownPayment, price)
      : clamp(parseSum(downPaymentRaw), 0, price);
    setDownPaymentRaw(formatSum(dpParsed));
  }

  const periods = api?.periods;

  return (
    <div className="bg-card p-6 md:p-8">
      <h4 className="text-xl font-normal uppercase tracking-tight text-card-foreground">
        Калькулятор {partner.name}
      </h4>

      <div className="mt-6 space-y-5">
        <label className="block">
          <span className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Стоимость автомобиля
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={priceRaw}
            onChange={(e) => handleNumericChange(e, setPriceRaw)}
            onBlur={handlePriceBlur}
            className="mt-2 w-full bg-muted border border-border px-4 py-3 text-card-foreground outline-none focus:ring-1 focus:ring-gold"
          />
        </label>

        {api && (
          <label className="block">
            <span className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
              Первоначальный взнос
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={downPaymentRaw}
              onChange={(e) => handleNumericChange(e, setDownPaymentRaw)}
              onBlur={handleDownPaymentBlur}
              className="mt-2 w-full bg-muted border border-border px-4 py-3 text-card-foreground outline-none focus:ring-1 focus:ring-gold"
            />
            <span className="mt-1 block text-xs text-muted-foreground">
              Минимальный взнос — {Math.round(api.minDownPaymentRate * 100)}%
            </span>
          </label>
        )}

        <label className="block">
          <span className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Срок (месяцев): {term}
          </span>
          {periods ? (
            <div className="mt-3 grid grid-cols-7 gap-2">
              {periods.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTerm(p)}
                  className={`px-2 py-2 text-sm transition-colors ${
                    term === p
                      ? "bg-gold text-black"
                      : "border border-border text-card-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          ) : (
            <>
              <input
                type="range"
                min={cfg.minTerm}
                max={cfg.maxTerm}
                step={1}
                value={term}
                onChange={(e) => setTerm(parseInt(e.target.value, 10))}
                className="mt-3 w-full accent-gold"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{cfg.minTerm} мес</span>
                <span>{cfg.maxTerm} мес</span>
              </div>
            </>
          )}
        </label>

        {cfg.paymentType === "annuity-or-equal" && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaymentType("annuity")}
              className={`flex-1 px-4 py-3 text-sm uppercase tracking-widest transition-colors ${
                paymentType === "annuity"
                  ? "bg-gold text-black"
                  : "border border-border text-card-foreground hover:bg-muted"
              }`}
            >
              Аннуитет
            </button>
            <button
              type="button"
              onClick={() => setPaymentType("equal")}
              className={`flex-1 px-4 py-3 text-sm uppercase tracking-widest transition-colors ${
                paymentType === "equal"
                  ? "bg-gold text-black"
                  : "border border-border text-card-foreground hover:bg-muted"
              }`}
            >
              Равными долями
            </button>
          </div>
        )}

        {api && (
          <button
            type="button"
            onClick={() => setIsKasko((v) => (v ? 0 : 1))}
            className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-sm uppercase tracking-widest transition-colors border ${
              isKasko
                ? "bg-gold text-black border-gold"
                : "border-border text-card-foreground hover:bg-muted"
            }`}
          >
            <span>КАСКО</span>
            <span
              className={`flex h-5 w-5 items-center justify-center border ${
                isKasko ? "border-black bg-black text-gold" : "border-card-foreground/50"
              }`}
            >
              {isKasko ? <Check size={14} strokeWidth={3} /> : null}
            </span>
          </button>
        )}
      </div>

      <p className="mt-8 text-xs font-normal uppercase tracking-widest text-muted-foreground">
        Программа «Авто от Партнера»
      </p>

      <div className="mt-2 grid gap-4 border-t border-border pt-6">
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Ежемесячный платёж
          </p>
          <p
            className={`mt-1 text-3xl font-normal uppercase tracking-tight text-card-foreground ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            {formatMoney(result.monthlyPayment)}
          </p>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Общая сумма выплат
          </p>
          <p className="mt-1 text-xl font-normal uppercase tracking-tight text-card-foreground">
            {formatMoney(result.totalPayment)}
          </p>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            ГЭСВ
          </p>
          <p className="mt-1 text-xl font-normal uppercase tracking-tight text-card-foreground">
            {cfg.gesv}
          </p>
        </div>
      </div>

      {apiError && !apiResult && (
        <p className="mt-2 text-xs text-muted-foreground">
          Расчёт при отсутствии связи с MyCar
        </p>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        *Расчёт является ориентировочным и носит информационный характер.
      </p>

      <div className="mt-6">
        <CTAButton href={WHATSAPP_URL} variant="primary">
          Оставить заявку
        </CTAButton>
      </div>
    </div>
  );
}
