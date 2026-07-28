import { AsYouType, parsePhoneNumber } from "libphonenumber-js";

// Default country for numbers typed without a leading "+" (this is a .kz site).
const DEFAULT_COUNTRY = "KZ";

/**
 * Format a phone number as the user types, applying the spacing/grouping
 * conventions of the detected country:
 *   Kazakhstan  +7 777 123 4567
 *   Ukraine     +380 67 123 4567
 *   UAE         +971 50 123 4567
 *   …and so on for any other country code.
 */
export function formatPhoneInput(raw: string): string {
  const hasPlus = raw.trimStart().startsWith("+");
  const digits = raw.replace(/\D/g, "").slice(0, 15);
  if (!digits) return hasPlus ? "+" : "";
  const input = (hasPlus ? "+" : "") + digits;
  return new AsYouType(DEFAULT_COUNTRY).input(input);
}

/**
 * Apply a raw input event value against the previously displayed value.
 * Handles the case where backspacing deletes only a formatting character
 * (space, parenthesis): the formatter would rebuild the exact same string
 * and the field would get "stuck". In that case extra digits are removed
 * until the value actually changes.
 */
export function applyPhoneInput(prev: string, raw: string): string {
  let formatted = formatPhoneInput(raw);
  if (formatted === prev && raw.length < prev.length) {
    let digits = raw.replace(/\D/g, "");
    const hasPlus = raw.trimStart().startsWith("+");
    while (formatted === prev && digits.length > 0) {
      digits = digits.slice(0, -1);
      formatted = formatPhoneInput((hasPlus ? "+" : "") + digits);
    }
  }
  return formatted;
}

/**
 * Normalize to E.164 ("+77771234567") or return null if the number is not a
 * valid, complete number for its country.
 */
export function normalizePhone(value: string): string | null {
  if (!value.replace(/\D/g, "")) return null;
  try {
    const phone = value.trimStart().startsWith("+")
      ? parsePhoneNumber(value)
      : parsePhoneNumber(value, DEFAULT_COUNTRY);
    if (phone && phone.isValid()) return phone.number;
  } catch {
    // not parseable
  }
  return null;
}

export function validatePhone(value: string): string {
  if (!value.replace(/\D/g, "")) return "Введите номер телефона";
  if (!normalizePhone(value)) {
    return "Неверный формат номера. Пример: +7 777 123 4567 или +380 67 123 4567";
  }
  return "";
}
