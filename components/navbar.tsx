"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { useCityHref, usePhones } from "@/components/site-context";

export function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const homeHref = useCityHref("/");
  const { generalPhone } = usePhones();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Default to dark styles on the server/initial render to match defaultTheme.
  const isDark = mounted ? theme === "dark" : true;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-4 py-3 shadow-lg backdrop-blur-xl transition-all duration-300 md:px-6 md:py-3.5 ${
          isDark
            ? "border-white/10 bg-black/60 shadow-black/40"
            : "border-black/10 bg-white/70 shadow-black/10"
        } ${scrolled ? "scale-[0.98] opacity-95" : "scale-100 opacity-100"}`}
      >
        <MobileMenu
          trigger={
            <span
              className={`inline-flex items-center gap-2 text-sm font-normal uppercase tracking-wide transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              <Menu size={20} />
              МЕНЮ
            </span>
          }
        />
        <Link href={homeHref} className="absolute left-1/2 -translate-x-1/2">
          <Image
            src={isDark ? "/images/JetQ_Type_White.png" : "/images/JetQ_Type_Black.png"}
            alt="JetQ"
            width={200}
            height={68}
            className="h-12 w-auto object-contain transition-opacity duration-300 md:h-14"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${generalPhone.replace(/\D/g, "")}`}
            aria-label={`Позвонить ${generalPhone}`}
            className={`rounded-full p-2 transition-colors duration-300 ${
              isDark
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/10"
            }`}
          >
            <Phone size={20} />
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
