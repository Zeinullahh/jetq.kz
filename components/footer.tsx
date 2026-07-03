import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const socials = [
  { href: "https://www.instagram.com/jetqauto.kz/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="rounded-none bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <Image
            src="/images/JetQ_Type_White.png"
            alt="JetQ"
            width={180}
            height={62}
            className="h-14 w-auto object-contain"
          />
          <p className="mt-2 text-white/70">
            Премиальные автомобильные услуги в Алматы.
          </p>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-white/70">
            Быстрые ссылки
          </p>
          <ul className="mt-4 space-y-2 text-white">
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
          <p className="text-xs font-normal uppercase tracking-widest text-white/70">
            Контакты
          </p>
          <address className="mt-4 not-italic text-white space-y-1">
            <p>г. Алматы, ЖК Forum Residence</p>
            <p>ул. Байтурсынова 179/2, блок 2</p>
            <p>+7 (775) 006-14-11</p>
            <p>10:00 – 19:00, ежедневно</p>
          </address>
        </div>
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-white/70">
            Мы в соцсетях
          </p>
          <ul className="mt-4 space-y-2 text-white">
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
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/70">
        © {new Date().getFullYear()} ТОО «JETQ GROUP». Все права защищены.
      </div>
    </footer>
  );
}
