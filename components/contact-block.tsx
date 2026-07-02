import { MapPin, Phone, Clock } from "lucide-react";

export function ContactBlock() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <MapPin className="mt-1 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Адрес
          </p>
          <p className="mt-1 text-foreground">
            г. Алматы, ЖК Forum Residence
            <br />
            ул. Байтурсынова 179/2, блок 2
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Phone className="mt-1 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Телефон
          </p>
          <a
            href="tel:+77750061411"
            className="mt-1 text-foreground hover:text-link-blue transition-colors"
          >
            +7 (775) 006-14-11
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Clock className="mt-1 text-gold" />
        <div>
          <p className="text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Режим работы
          </p>
          <p className="mt-1 text-foreground">10:00 – 19:00, ежедневно</p>
        </div>
      </div>
    </div>
  );
}
