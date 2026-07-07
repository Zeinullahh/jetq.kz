import { MapPin } from "lucide-react";
import type { Address } from "@/lib/addresses";

interface AddressBlockProps {
  address: Address;
}

export function AddressBlock({ address }: AddressBlockProps) {
  return (
    <div className="flex items-start gap-4">
      <MapPin className="mt-1 flex-shrink-0 text-gold" size={20} />
      <div>
        <p className="text-xs font-normal uppercase tracking-widest text-white/70">
          {address.label}
        </p>
        <address className="mt-1 not-italic text-white">
          {address.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      </div>
    </div>
  );
}
