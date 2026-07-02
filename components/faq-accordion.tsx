"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-none bg-white/50 backdrop-blur-md dark:bg-charcoal/50"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-normal uppercase tracking-tight text-foreground pr-4">
                {item.question}
              </span>
              <span
                className={cn(
                  "shrink-0 text-gold transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              >
                <ChevronDown size={24} />
              </span>
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96" : "max-h-0"
              )}
            >
              <p className="px-6 pb-6 text-muted-foreground">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
