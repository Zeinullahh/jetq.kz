export const USD_PER_YUAN = 0.15;

export function parseAmount(value: string): number {
  return parseInt(String(value).replace(/\D/g, ""), 10) || 0;
}

export function formatUsd(amount: number): string {
  return (
    "$ " +
    Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  );
}

export function formatYuan(amount: number): string {
  return (
    Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ¥"
  );
}

export function isDollar(value: string): boolean {
  return String(value).includes("$");
}

export function isYuan(value: string): boolean {
  return String(value).includes("¥");
}
