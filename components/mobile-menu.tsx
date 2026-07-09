"use client";

import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { CityLink, useCity } from "@/components/site-context";

interface PageLink {
  href: string;
  label: string;
}

const links: PageLink[] = [
  { href: "/", label: "Главная" },
  { href: "/detailing", label: "Детейлинг" },
  { href: "/cars", label: "Авто в наличии" },
];

const pageSections: Record<string, { id: string; label: string }[]> = {
  "/": [
    { id: "stock", label: "Авто в наличии" },
    { id: "why-jetq", label: "Почему JetQ" },
    { id: "consultation", label: "Консультация" },
    { id: "credit", label: "Автокредитование" },
    { id: "contact", label: "Контакты" },
    { id: "addresses", label: "Адреса" },
  ],
  "/detailing": [
    { id: "services", label: "Услуги" },
    { id: "process", label: "Процесс" },
    { id: "gallery", label: "Галерея" },
    { id: "contact", label: "Запись" },
    { id: "addresses", label: "Адреса" },
  ],
  "/cars": [
    { id: "stock", label: "Авто в наличии" },
    { id: "purchase", label: "Способы покупки" },
    { id: "trade-in", label: "Trade-In" },
    { id: "credit", label: "Автокредитование" },
    { id: "addresses", label: "Адреса" },
  ],
};

interface MobileMenuProps {
  trigger?: React.ReactNode;
}

function normalizePathname(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

function stripCity(pathname: string, city: string | null) {
  if (!city) return pathname;
  return pathname.replace(new RegExp(`^/${city}(?=/|$)`), "") || "/";
}

export function MobileMenu({ trigger }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const city = useCity();
  const currentPath = stripCity(
    normalizePathname(pathname ?? "/"),
    city
  );
  const sections = pageSections[currentPath] ?? [];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) {
      document.body.classList.add("overflow-hidden");
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm font-normal uppercase tracking-wide text-foreground"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls={menuId}
      >
        {trigger ?? "МЕНЮ"}
      </button>
      {open &&
        createPortal(
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex flex-col bg-mist dark:bg-charcoal"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm font-normal uppercase tracking-wide text-muted-foreground">
                МЕНЮ
              </span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-black/10 p-2 text-foreground transition-colors hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
                aria-label="Закрыть меню"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-1 items-center justify-center gap-12 px-6 pb-20">
              <div className="flex flex-col items-end gap-6">
                {links.map((link, index) => {
                  const isActive = currentPath === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: index * 0.05,
                      }}
                    >
                      <CityLink
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block text-4xl font-normal uppercase tracking-tight transition-colors hover:text-gold-text md:text-5xl ${
                          isActive
                            ? "text-foreground underline decoration-gold decoration-2 underline-offset-8"
                            : "text-foreground"
                        }`}
                      >
                        {link.label}
                      </CityLink>
                    </motion.div>
                  );
                })}
              </div>

              {sections.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                  className="flex flex-col items-start gap-3 border-l border-border pl-12"
                >
                  <p className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground">
                    Разделы
                  </p>
                  {sections.map((section, sIndex) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                        delay: 0.25 + sIndex * 0.04,
                      }}
                      type="button"
                      onClick={() => scrollTo(section.id)}
                      className="text-left text-sm uppercase tracking-wide text-muted-foreground transition-colors hover:text-gold-text"
                    >
                      {section.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </nav>
          </div>,
          document.body as HTMLElement
        )}
    </>
  );
}
