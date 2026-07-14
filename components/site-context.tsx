"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  ComponentProps,
} from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { almatyPhone, astanaPhone } from "@/lib/addresses";
import {
  ALMATY_WHATSAPP_URL,
  ASTANA_WHATSAPP_URL,
  ASTANA_DETAILING_WHATSAPP_URL,
  ASTANA_INSTAGRAM_URL,
  INSTAGRAM_URL,
} from "@/lib/constants";

export type City = "almaty" | "astana";

interface PhonesValue {
  almatyPhone: string;
  astanaPhone: string;
  generalPhone: string;
}

const PhoneContext = createContext<PhonesValue | null>(null);
const CityContext = createContext<City | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const city = useCityFromPathname();

  const phones = useMemo<PhonesValue>(() => {
    return {
      almatyPhone,
      astanaPhone,
      generalPhone: city === "astana" ? astanaPhone : almatyPhone,
    };
  }, [city]);

  return (
    <CityContext.Provider value={city}>
      <PhoneContext.Provider value={phones}>
        {children}
      </PhoneContext.Provider>
    </CityContext.Provider>
  );
}

function useCityFromPathname(): City | null {
  const pathname = usePathname();

  return useMemo<City | null>(() => {
    if (!pathname) return null;
    const segment = pathname.split("/")[1];
    if (segment === "almaty" || segment === "astana") {
      return segment;
    }
    return null;
  }, [pathname]);
}

export function useCity(): City | null {
  return useContext(CityContext);
}

export function usePhones(): PhonesValue {
  const phones = useContext(PhoneContext);
  if (!phones) {
    throw new Error("usePhones must be used within <SiteProvider>");
  }
  return phones;
}

export function useWhatsAppUrl(): string {
  const city = useCity();
  if (city === "astana") return ASTANA_WHATSAPP_URL;
  return ALMATY_WHATSAPP_URL;
}

export function useInstagramUrl(): string {
  const city = useCity();
  if (city === "astana") return ASTANA_INSTAGRAM_URL;
  return INSTAGRAM_URL;
}

export function useDetailingWhatsAppUrl(): string {
  const city = useCity();
  if (city === "astana") return ASTANA_DETAILING_WHATSAPP_URL;
  return ALMATY_WHATSAPP_URL;
}

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  );
}

function useCurrentSearch(): string {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setSearch(window.location.search);
    const handlePop = () => setSearch(window.location.search);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  return search;
}

export function useCityHref(href: string): string {
  const city = useCity();
  const search = useCurrentSearch();

  return useMemo(() => {
    if (isExternalHref(href) || city === null) {
      return href;
    }

    const queryString = search ? `${search}` : "";

    // href is expected to start with "/"
    const normalizedHref = href.startsWith("/") ? href : `/${href}`;
    return `/${city}${normalizedHref}${queryString}`;
  }, [href, city, search]);
}

export type CityLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function CityLink({ href, ...rest }: CityLinkProps) {
  const cityHref = useCityHref(href);
  return <Link {...rest} href={cityHref} />;
}
