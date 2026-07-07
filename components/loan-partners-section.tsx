import { ExternalLink } from "lucide-react";
import { loanPartners } from "@/lib/loan-partners";
import { MotionSectionHeader } from "@/components/motion-section-header";
import { LoanCalculator } from "@/components/loan-calculator";
import { FadeIn } from "@/components/fade-in";

export function LoanPartnersSection() {
  const calculatorPartners = loanPartners.filter((p) => p.calculator);

  return (
    <section id="LoanPartnersSection" className="bg-background/50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <MotionSectionHeader
          title="Автокредитование"
          subtitle="Выгодные условия от проверенных партнёров."
        />

        <FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {loanPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-[#202020] p-6 md:p-8"
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xl font-normal uppercase tracking-tight text-white hover:text-link-blue transition-colors"
                >
                  {partner.name}
                  <ExternalLink size={16} className="text-white/50 group-hover:text-link-blue" />
                </a>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-white/80">
                  {partner.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {calculatorPartners.map((partner) => (
              <LoanCalculator key={partner.id} partner={partner} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
