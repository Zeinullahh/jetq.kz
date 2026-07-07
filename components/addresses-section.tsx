import { useMemo } from "react";
import { Phone, Clock } from "lucide-react";
import { addresses } from "@/lib/addresses";
import { SectionHeader } from "@/components/section-header";
import { AddressBlock } from "@/components/address-block";
import { TwoGisMap } from "@/components/two-gis-map";

const almatyAddresses = addresses.filter((a) => a.city === "Алматы");
const astanaAddresses = addresses.filter((a) => a.city === "Астана");

export function AddressesSection() {
  const almatyOrgIds = useMemo(
    () => almatyAddresses.flatMap((a) => a.twoGisOrgIds),
    []
  );
  const astanaOrgIds = useMemo(
    () => astanaAddresses.flatMap((a) => a.twoGisOrgIds),
    []
  );

  const almatyCenter = useMemo(() => ({ lat: 43.233, lon: 76.905 }), []);
  const astanaCenter = useMemo(() => ({ lat: 51.122707, lon: 71.406067 }), []);

  return (
    <section id="AddressesSection" className="bg-muted/50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Наш адрес"
          subtitle="Приезжайте на осмотр — поможем подобрать и оформить автомобиль."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Алматы */}
          <div className="bg-[#202020] p-6 md:p-8">
            <h3 className="text-2xl font-normal uppercase tracking-tight text-white">
              Алматы
            </h3>
            <div className="mt-6 space-y-6">
              {almatyAddresses.map((address) => (
                <AddressBlock key={address.id} address={address} />
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-4 text-white">
              <div className="flex items-start gap-4">
                <Phone className="mt-1 flex-shrink-0 text-gold" size={20} />
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-white/70">
                    Телефон
                  </p>
                  <a
                    href={`tel:${almatyAddresses[0].phone.replace(/\D/g, "")}`}
                    className="mt-1 text-white hover:text-link-blue transition-colors"
                  >
                    {almatyAddresses[0].phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 flex-shrink-0 text-gold" size={20} />
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-white/70">
                    Режим работы
                  </p>
                  <p className="mt-1 text-white">{almatyAddresses[0].hours}</p>
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

          {/* Астана */}
          <div className="bg-[#202020] p-6 md:p-8">
            <h3 className="text-2xl font-normal uppercase tracking-tight text-white">
              Астана
            </h3>
            <div className="mt-6 space-y-6">
              {astanaAddresses.map((address) => (
                <AddressBlock key={address.id} address={address} />
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-4 text-white">
              <div className="flex items-start gap-4">
                <Phone className="mt-1 flex-shrink-0 text-gold" size={20} />
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-white/70">
                    Телефон
                  </p>
                  <a
                    href={`tel:${astanaAddresses[0].phone.replace(/\D/g, "")}`}
                    className="mt-1 text-white hover:text-link-blue transition-colors"
                  >
                    {astanaAddresses[0].phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 flex-shrink-0 text-gold" size={20} />
                <div>
                  <p className="text-xs font-normal uppercase tracking-widest text-white/70">
                    Режим работы
                  </p>
                  <p className="mt-1 text-white">{astanaAddresses[0].hours}</p>
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
        </div>
      </div>
    </section>
  );
}
