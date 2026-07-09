"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import { addresses, companyHours } from "@/lib/addresses";
import { useCity, usePhones } from "@/components/site-context";
import { AddressBlock } from "@/components/address-block";

export function ContactBlock() {
  const city = useCity();
  const { generalPhone } = usePhones();

  const almatyAddresses = addresses.filter((a) => a.city === "Алматы");
  const astanaAddresses = addresses.filter((a) => a.city === "Астана");

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <MapPin className="mt-1 flex-shrink-0 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Адреса
          </p>
          <div className="mt-2 space-y-4">
            {(city === null || city === "almaty") && (
              <div>
                <p className="text-sm font-normal uppercase tracking-widest text-foreground">
                  Алматы
                </p>
                {almatyAddresses.map((address) => (
                  <AddressBlock key={address.id} address={address} />
                ))}
              </div>
            )}
            {(city === null || city === "astana") && (
              <div>
                <p className="text-sm font-normal uppercase tracking-widest text-foreground">
                  Астана
                </p>
                {astanaAddresses.map((address) => (
                  <AddressBlock key={address.id} address={address} />
                ))}
              </div>
            )}
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
            href={`tel:${generalPhone.replace(/\D/g, "")}`}
            className="mt-1 text-foreground hover:text-link-blue transition-colors"
          >
            {generalPhone}
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Clock className="mt-1 flex-shrink-0 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Режим работы
          </p>
          <p className="mt-1 text-foreground">{companyHours}</p>
        </div>
      </div>
    </div>
  );
}
