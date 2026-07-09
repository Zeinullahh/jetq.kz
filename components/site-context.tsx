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
import {
  almatyPhone,
  astanaPhone,
  astanaUtmPhone,
} from "@/lib/addresses";
import { ALMATY_WHATSAPP_URL, ASTANA_WHATSAPP_URL } from "@/lib/constants";

const SESSION_KEY = "jetq-utm-phones";

export type City = "almaty" | "astana";

interface PhonesValue {
  almatyPhone: string;
  astanaPhone: string;
  generalPhone: string;
}

const PhoneContext = createContext<PhonesValue | null>(null);
const CityContext = createContext<City | null>(null);

function detectOverrideFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("utm_source") === "blogger" &&
    params.get("utm_campaign") === "erkesha"
  );
}

function hasOverrideFlag(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function setOverrideFlag(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, "1");
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [overrideAstana, setOverrideAstana] = useState(false);

  useEffect(() => {
    if (hasOverrideFlag() || detectOverrideFromUrl()) {
      setOverrideAstana(true);
      setOverrideFlag();
    }
  }, []);

  const city = useCityFromPathname();

  // When the UTM flag is active, every phone number on the site becomes
  // the override number. Otherwise city paths use their default numbers.
  const phones = useMemo<PhonesValue>(() => {
    if (overrideAstana) {
      return {
        almatyPhone: astanaUtmPhone,
        astanaPhone: astanaUtmPhone,
        generalPhone: astanaUtmPhone,
      };
    }
    return {
      almatyPhone,
      astanaPhone,
      generalPhone: city === "astana" ? astanaPhone : almatyPhone,
    };
  }, [overrideAstana, city]);

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
