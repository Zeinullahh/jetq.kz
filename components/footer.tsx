import Link from "next/link";
import { ExternalLink } from "lucide-react";

const socials = [
  { href: "https://www.instagram.com/jetqauto.kz/", label: "Instagram" },
  { href: "https://jetq.kz/", label: "jetq.kz" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <p className="text-2xl font-bold">JETQ</p>
          <p className="mt-2 text-muted-foreground">
            Премиальные автомобильные услуги в Алматы.
          </p>
        </div>
        <div>
          <p className="font-semibold">Быстрые ссылки</p>
          <ul className="mt-2 space-y-2 text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Главная
              </Link>
            </li>
            <li>
              <Link href="/detailing" className="hover:text-foreground">
                Детейлинг
              </Link>
            </li>
            <li>
              <Link href="/cars" className="hover:text-foreground">
                Авто в наличии
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Контакты</p>
          <address className="mt-2 not-italic text-muted-foreground space-y-1">
            <p>г. Алматы, ЖК Forum Residence</p>
            <p>ул. Байтурсынова 179/2, блок 2</p>
            <p>+7 (775) 006-14-11</p>
            <p>10:00 – 19:00, ежедневно</p>
          </address>
        </div>
        <div>
          <p className="font-semibold">Мы в соцсетях</p>
          <ul className="mt-2 space-y-2 text-muted-foreground">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  {social.label} <ExternalLink size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ТОО «JETQ GROUP». Все права защищены.
      </div>
    </footer>
  );
}
