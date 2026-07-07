import { ExternalLink } from "lucide-react";
import { loanPartners, type LoanPartner } from "@/lib/loan-partners";
import { MotionSectionHeader } from "@/components/motion-section-header";
import { LoanCalculator } from "@/components/loan-calculator";
import { FadeIn } from "@/components/fade-in";

interface LoanPartnersSectionProps {
  id?: string;
  className?: string;
}

export function LoanPartnersSection({ id, className }: LoanPartnersSectionProps) {
  const calculatorPartners = loanPartners.filter(
    (p): p is LoanPartner & { calculator: NonNullable<LoanPartner["calculator"]> } =>
      !!p.calculator
  );

  return (
    <section id={id} className={`bg-background/50 py-24 scroll-mt-24 ${className ?? ""}`}>
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
                className="bg-card p-6 md:p-8"
              >
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xl font-normal uppercase tracking-tight text-card-foreground hover:text-link-blue transition-colors"
                >
                  {partner.name}
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-link-blue" />
                </a>
                <ul className="mt-4 list-disc space-y-2 pl-4 text-muted-foreground">
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
