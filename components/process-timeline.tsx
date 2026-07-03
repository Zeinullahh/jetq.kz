"use client";

import Image from "next/image";
import { SectionHeader } from "./section-header";
import { FadeIn } from "./fade-in";
import { StaggerContainer, StaggerItem } from "./stagger-container";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className="relative bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Как мы работаем"
          subtitle="Простой и понятный процесс от заявки до результата."
        />

        <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: atmospheric car image */}
          <FadeIn direction="left" className="relative min-h-[320px] overflow-hidden bg-black lg:min-h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80"
              alt="Премиальный автомобиль"
              fill
              className="object-cover opacity-80"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-muted/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />
          </FadeIn>

          {/* Right: timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 h-full w-px bg-gold/30 lg:left-[23px]" />

            <StaggerContainer staggerDelay={0.12} className="relative space-y-8">
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="group relative flex gap-6">
                    {/* Number badge */}
                    <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center bg-gold text-sm font-normal text-black lg:h-12 lg:w-12 lg:text-base">
                      {step.number}
                    </div>

                    {/* Card */}
                    <div className="flex-1 border-l-2 border-gold bg-card p-5 transition-colors duration-300 hover:bg-card/80">
                      <h3 className="text-lg font-normal uppercase tracking-tight text-card-foreground lg:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground lg:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
