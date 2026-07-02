import Link from "next/link";
import { ExternalLink } from "lucide-react";

const socials = [
  { href: "https://www.instagram.com/jetqauto.kz/", label: "Instagram" },
  { href: "https://jetq.kz/", label: "jetq.kz" },
];

export function Footer() {
  return (
    <footer className="rounded-none bg-charcoal/50 text-foreground backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <p className="text-2xl font-medium uppercase tracking-tight">JETQ</p>
          <p className="mt-2 text-muted-foreground">
            Премиальные автомобильные услуги в Алматы.
          </p>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Быстрые ссылки
          </p>
          <ul className="mt-4 space-y-2 text-foreground">
            <li>
              <Link
                href="/"
                className="hover:text-link-blue transition-colors"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                href="/detailing"
                className="hover:text-link-blue transition-colors"
              >
                Детейлинг
              </Link>
            </li>
            <li>
              <Link
                href="/cars"
                className="hover:text-link-blue transition-colors"
              >
                Авто в наличии
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Контакты
          </p>
          <address className="mt-4 not-italic text-foreground space-y-1">
            <p>г. Алматы, ЖК Forum Residence</p>
            <p>ул. Байтурсынова 179/2, блок 2</p>
            <p>+7 (775) 006-14-11</p>
            <p>10:00 – 19:00, ежедневно</p>
          </address>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Мы в соцсетях
          </p>
          <ul className="mt-4 space-y-2 text-foreground">
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
      <div className="border-t border-border/10 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ТОО «JETQ GROUP». Все права защищены.
      </div>
    </footer>
  );
}
