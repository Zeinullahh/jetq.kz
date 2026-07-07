"use client";

import { useEffect, useId, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Главная" },
  { href: "/detailing", label: "Детейлинг" },
  { href: "/cars", label: "Авто в наличии" },
];

const pageSections: Record<string, { id: string; label: string }[]> = {
  "/": [
    { id: "hero", label: "Главная" },
    { id: "stock", label: "Авто в наличии" },
    { id: "why-jetq", label: "Почему JetQ" },
    { id: "consultation", label: "Консультация" },
    { id: "credit", label: "Автокредитование" },
    { id: "contact", label: "Контакты" },
    { id: "addresses", label: "Адреса" },
    { id: "faq", label: "FAQ" },
  ],
  "/cars/": [
    { id: "hero", label: "Главная" },
    { id: "stock", label: "Авто в наличии" },
    { id: "popular", label: "Популярные авто" },
    { id: "purchase", label: "Способы покупки" },
    { id: "process", label: "Этапы" },
    { id: "trade-in", label: "Trade-In" },
    { id: "credit", label: "Автокредитование" },
    { id: "addresses", label: "Адреса" },
    { id: "faq", label: "FAQ" },
  ],
};

interface MobileMenuProps {
  trigger?: React.ReactNode;
}

export function MobileMenu({ trigger }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const sections = pageSections[pathname] ?? [];

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
            <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-20">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: index * 0.05,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl font-normal uppercase tracking-tight text-foreground transition-colors hover:text-gold-text md:text-5xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {sections.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: links.length * 0.05,
                  }}
                  className="w-full max-w-xs"
                >
                  <button
                    type="button"
                    onClick={() => setSectionsOpen((v) => !v)}
                    className="flex w-full items-center justify-center gap-2 text-sm font-normal uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>Разделы</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        sectionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {sectionsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 flex flex-col items-center gap-2">
                          {sections.map((section) => (
                            <button
                              key={section.id}
                              type="button"
                              onClick={() => scrollTo(section.id)}
                              className="text-sm uppercase tracking-wide text-foreground/70 transition-colors hover:text-gold-text"
                            >
                              {section.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </nav>
          </div>,
          document.body as HTMLElement
        )}
    </>
  );
}
