"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MotionSectionHeader({ title, subtitle, centered = true, accent = false }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`mb-10 ${centered ? "text-center" : ""}`}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-center justify-center gap-4">
        <motion.div
          className="h-px origin-right transform-gpu will-change-transform bg-gold"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 60 }}
        />
        <motion.h2
          className={`transform-gpu will-change-transform text-3xl font-normal uppercase tracking-tight md:text-4xl lg:text-5xl ${
            accent ? "text-gold-text" : "text-foreground"
          }`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        <motion.div
          className="h-px origin-left transform-gpu will-change-transform bg-gold"
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: 60 }}
        />
      </div>
      {subtitle && (
        <motion.p
          className="mx-auto mt-4 max-w-2xl transform-gpu will-change-transform text-lg text-muted-foreground"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
