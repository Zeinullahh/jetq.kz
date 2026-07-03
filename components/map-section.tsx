import { ContactBlock } from "@/components/contact-block";
import { SectionHeader } from "@/components/section-header";

export function MapSection() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Наш адрес"
          subtitle="Приезжайте на осмотр — поможем подобрать и оформить автомобиль."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <ContactBlock />
          </div>
          <div className="overflow-hidden bg-background">
            <iframe
              title="JetQ Group на карте"
              src="https://maps.google.com/maps?q=43.2308809,76.9345894&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[400px] w-full border-0 lg:h-full lg:min-h-[400px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
