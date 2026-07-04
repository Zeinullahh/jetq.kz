"use client";

import { motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function MotionHeroText({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={shouldReduceMotion ? undefined : container}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export function MotionHeroItem({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className}`}
      variants={shouldReduceMotion ? undefined : item}
    >
      {children}
    </motion.div>
  );
}
