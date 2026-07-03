"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function MagneticButton({ children, className = "" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ x: shouldReduceMotion ? 0 : springX, y: shouldReduceMotion ? 0 : springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0"
        whileHover={{ opacity: 1, x: ["-100%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
