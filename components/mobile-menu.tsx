"use client";

import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

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
        className="inline-flex items-center gap-2 text-sm font-normal uppercase tracking-wide text-white"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls={menuId}
      >
        {trigger ?? "МЕНЮ"}
      </button>
      {open && (
        <div
          id={menuId}
          className="fixed inset-0 z-50 flex flex-col bg-black/80 px-6 py-4 backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-normal uppercase tracking-wide text-muted-foreground">
              МЕНЮ
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-foreground"
              aria-label="Закрыть меню"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-normal uppercase tracking-tight text-foreground transition-colors hover:text-gold-text md:text-5xl"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
