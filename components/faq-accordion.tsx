"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            className="rounded-none bg-white/50 backdrop-blur-md dark:bg-charcoal/50"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="pr-4 text-lg font-normal uppercase tracking-tight text-foreground">
                {item.question}
              </span>
              <motion.span
                className="shrink-0 text-gold"
                animate={isOpen && !shouldReduceMotion ? { rotate: 180 } : { rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <ChevronDown size={24} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
