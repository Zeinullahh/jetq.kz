"use client";

import { useMemo } from "react";
import { Phone, Clock } from "lucide-react";
import { addresses, companyHours } from "@/lib/addresses";
import { useCity, usePhones } from "@/components/site-context";
import { SectionHeader } from "@/components/section-header";
import { AddressBlock } from "@/components/address-block";
import { TwoGisMap } from "@/components/two-gis-map";

type CityKey = "almaty" | "astana" | null;

interface AddressesSectionProps {
  id?: string;
  className?: string;
  city?: CityKey;
}

export function AddressesSection({
  id,
  className,
  city: cityProp,
}: AddressesSectionProps) {
  const contextCity = useCity();
  const activeCity = cityProp ?? contextCity;
  const { almatyPhone, astanaPhone } = usePhones();

  const almatyAddresses = useMemo(
    () => addresses.filter((a) => a.city === "Алматы"),
    []
  );
  const astanaAddresses = useMemo(
    () => addresses.filter((a) => a.city === "Астана"),
    []
  );

  const almatyOrgIds = useMemo(
    () => almatyAddresses.flatMap((a) => a.twoGisOrgIds),
    [almatyAddresses]
  );
  const astanaOrgIds = useMemo(
    () => astanaAddresses.flatMap((a) => a.twoGisOrgIds),
    [astanaAddresses]
  );

  const almatyCenter = useMemo(() => ({ lat: 43.233, lon: 76.905 }), []);
  const astanaCenter = useMemo(() => ({ lat: 51.122707, lon: 71.406067 }), []);

  const subtitle = activeCity
    ? `Приезжайте на осмотр в ${activeCity === "almaty" ? "Алматы" : "Астане"} — поможем подобрать и оформить автомобиль.`
    : "Приезжайте на осмотр — поможем подобрать и оформить автомобиль.";

  return (
    <section id={id} className={`bg-muted/50 py-20 scroll-mt-24 ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title="Наш адрес" subtitle={subtitle} />
        <div className="grid gap-8 lg:grid-cols-2">
          {(activeCity === null || activeCity === "almaty") && (
            <div className="bg-card p-6 md:p-8">
              <h3 className="text-2xl font-normal uppercase tracking-tight text-card-foreground">
                Алматы
              </h3>
              <div className="mt-6 space-y-6">
                {almatyAddresses.map((address) => (
                  <AddressBlock key={address.id} address={address} />
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-4 text-card-foreground">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 flex-shrink-0 text-gold" size={20} />
                  <div>
                    <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
                      Телефон
                    </p>
                    <a
                      href={`tel:${almatyPhone.replace(/\D/g, "")}`}
                      className="mt-1 text-card-foreground hover:text-link-blue transition-colors"
                    >
                      {almatyPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 flex-shrink-0 text-gold" size={20} />
                  <div>
                    <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
                      Режим работы
                    </p>
                    <p className="mt-1 text-card-foreground">{companyHours}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <TwoGisMap
                  orgIds={almatyOrgIds}
                  city="almaty"
                  center={almatyCenter}
                  zoom={13}
                  className="h-[400px] w-full"
                />
              </div>
            </div>
          )}

          {(activeCity === null || activeCity === "astana") && (
            <div className="bg-card p-6 md:p-8">
              <h3 className="text-2xl font-normal uppercase tracking-tight text-card-foreground">
                Астана
              </h3>
              <div className="mt-6 space-y-6">
                {astanaAddresses.map((address) => (
                  <AddressBlock key={address.id} address={address} />
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-4 text-card-foreground">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 flex-shrink-0 text-gold" size={20} />
                  <div>
                    <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
                      Телефон
                    </p>
                    <a
                      href={`tel:${astanaPhone.replace(/\D/g, "")}`}
                      className="mt-1 text-card-foreground hover:text-link-blue transition-colors"
                    >
                      {astanaPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 flex-shrink-0 text-gold" size={20} />
                  <div>
                    <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
                      Режим работы
                    </p>
                    <p className="mt-1 text-card-foreground">{companyHours}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <TwoGisMap
                  orgIds={astanaOrgIds}
                  city="nur_sultan"
                  center={astanaCenter}
                  zoom={16}
                  className="h-[400px] w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
