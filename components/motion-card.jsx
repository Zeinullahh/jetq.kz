"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export function MotionCard({
  children,
  className = "",
  tilt = true,
  hoverScale = 1.02,
  glow = false,
  sheen = false,
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e) => {
    if (!tilt || shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: 1000,
        rotateX: tilt && !shouldReduceMotion ? rotateX : 0,
        rotateY: tilt && !shouldReduceMotion ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={shouldReduceMotion ? undefined : { scale: hoverScale, z: 40 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {sheen && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
          }}
        />
      )}
      {glow && !shouldReduceMotion && (
        <div className="pointer-events-none absolute -inset-px rounded-inherit opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      {children}
    </motion.div>
  );
}
