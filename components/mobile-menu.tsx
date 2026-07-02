"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/detailing", label: "Детейлинг" },
  { href: "/cars", label: "Авто в наличии" },
];

export function MobileMenu() {
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
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-muted rounded-full"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        aria-controls={menuId}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {open && (
        <div
          id={menuId}
          className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
