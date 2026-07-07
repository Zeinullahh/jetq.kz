import { MapPin, Phone, Clock } from "lucide-react";
import { addresses } from "@/lib/addresses";
import { AddressBlock } from "@/components/address-block";

const almatyAddresses = addresses.filter((a) => a.city === "Алматы");
const astanaAddresses = addresses.filter((a) => a.city === "Астана");

export function ContactBlock() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <MapPin className="mt-1 flex-shrink-0 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Адреса
          </p>
          <div className="mt-2 space-y-4">
            <div>
              <p className="text-sm font-normal uppercase tracking-widest text-foreground">
                Алматы
              </p>
              {almatyAddresses.map((address) => (
                <AddressBlock key={address.id} address={address} />
              ))}
            </div>
            <div>
              <p className="text-sm font-normal uppercase tracking-widest text-foreground">
                Астана
              </p>
              {astanaAddresses.map((address) => (
                <AddressBlock key={address.id} address={address} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Phone className="mt-1 flex-shrink-0 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Телефон
          </p>
          <a
            href={`tel:${addresses[0].phone.replace(/\D/g, "")}`}
            className="mt-1 text-foreground hover:text-link-blue transition-colors"
          >
            {addresses[0].phone}
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Clock className="mt-1 flex-shrink-0 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Режим работы
          </p>
          <p className="mt-1 text-foreground">{addresses[0].hours}</p>
        </div>
      </div>
    </div>
  );
}
