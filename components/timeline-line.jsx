"use client";

import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";

export function TimelineLine({ className = "" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={ref} className={`absolute h-full ${className}`}>
      <div className="absolute inset-0 w-px bg-gold/20" />
      <motion.div
        className="absolute left-0 top-0 w-px bg-gold"
        style={{
          height: "100%",
          originY: 0,
          scaleY: shouldReduceMotion ? 1 : scrollYProgress,
        }}
      />
    </div>
  );
}
