import { MapPin, Phone, Clock } from "lucide-react";

export function ContactBlock() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <MapPin className="mt-1 text-primary" />
        <div>
          <p className="font-semibold">Адрес</p>
          <p className="text-muted-foreground">
            г. Алматы, ЖК Forum Residence
            <br />
            ул. Байтурсынова 179/2, блок 2
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Phone className="mt-1 text-primary" />
        <div>
          <p className="font-semibold">Телефон</p>
          <a
            href="tel:+77750061411"
            className="text-muted-foreground hover:text-foreground"
          >
            +7 (775) 006-14-11
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Clock className="mt-1 text-primary" />
        <div>
          <p className="font-semibold">Режим работы</p>
          <p className="text-muted-foreground">10:00 – 19:00, ежедневно</p>
        </div>
      </div>
    </div>
  );
}
