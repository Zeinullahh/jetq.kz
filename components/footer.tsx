"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { addresses, companyHours } from "@/lib/addresses";
import { useCity, usePhones, CityLink } from "@/components/site-context";
import { AddressBlock } from "@/components/address-block";

const socials = [
  { href: "https://www.instagram.com/jetqauto.kz/", label: "Instagram" },
];

export function Footer() {
  const city = useCity();
  const { generalPhone } = usePhones();

  const almatyAddresses = addresses.filter((a) => a.city === "Алматы");
  const astanaAddresses = addresses.filter((a) => a.city === "Астана");

  return (
    <footer className="rounded-none bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Image
            src="/images/JetQ_Type_White.png"
            alt="JetQ"
            width={180}
            height={62}
            className="h-14 w-auto object-contain"
          />
          <p className="mt-2 text-white/70">
            Премиальные автомобильные услуги в Алматы и Астане.
          </p>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-white/70">
            Быстрые ссылки
          </p>
          <ul className="mt-4 space-y-2 text-white">
            <li>
              <CityLink
                href="/"
                className="hover:text-link-blue transition-colors"
              >
                Главная
              </CityLink>
            </li>
            <li>
              <CityLink
                href="/detailing"
                className="hover:text-link-blue transition-colors"
              >
                Детейлинг
              </CityLink>
            </li>
            <li>
              <CityLink
                href="/cars"
                className="hover:text-link-blue transition-colors"
              >
                Авто в наличии
              </CityLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-white/70">
            Контакты
          </p>
          <div className="mt-4 space-y-6">
            {(city === null || city === "almaty") && (
              <div>
                <p className="text-xs font-normal uppercase tracking-widest text-white/70">
                  Алматы
                </p>
                <div className="mt-3 space-y-4">
                  {almatyAddresses.map((address) => (
                    <AddressBlock key={address.id} address={address} variant="light" />
                  ))}
                </div>
              </div>
            )}
            {(city === null || city === "astana") && (
              <div>
                <p className="text-xs font-normal uppercase tracking-widest text-white/70">
                  Астана
                </p>
                <div className="mt-3 space-y-4">
                  {astanaAddresses.map((address) => (
                    <AddressBlock key={address.id} address={address} variant="light" />
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-1 text-white">
              <p>{generalPhone}</p>
              <p>{companyHours}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-white/70">
            Мы в соцсетях
          </p>
          <ul className="mt-4 space-y-2 text-white">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-link-blue transition-colors"
                >
                  {social.label} <ExternalLink size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/70">
        © {new Date().getFullYear()} ТОО «JETQ GROUP». Все права защищены.
      </div>
    </footer>
  );
}
