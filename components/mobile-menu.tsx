"use client";

import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Главная" },
  { href: "/detailing", label: "Детейлинг" },
  { href: "/cars", label: "Авто в наличии" },
];

interface MobileMenuProps {
  trigger?: React.ReactNode;
}

export function MobileMenu({ trigger }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

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
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-xl dark:bg-black/95"
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
            <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-20">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
