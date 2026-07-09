import { MapPin } from "lucide-react";
import type { Address } from "@/lib/addresses";

interface AddressBlockProps {
  address: Address;
  variant?: "default" | "light";
}

export function AddressBlock({ address, variant = "default" }: AddressBlockProps) {
  const labelClass =
    variant === "light"
      ? "text-xs font-normal uppercase tracking-widest text-white/70"
      : "text-xs font-normal uppercase tracking-widest text-muted-foreground";
  const textClass =
    variant === "light"
      ? "mt-1 not-italic text-white"
      : "mt-1 not-italic text-foreground";

  return (
    <div className="flex items-start gap-4">
      <MapPin className="mt-1 flex-shrink-0 text-gold" size={20} />
      <div>
        <p className={labelClass}>{address.label}</p>
        <address className={textClass}>
          {address.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      </div>
    </div>
  );
}
