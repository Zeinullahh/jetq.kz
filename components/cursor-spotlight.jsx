"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CursorSpotlight() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 25 });
  const springY = useSpring(y, { stiffness: 80, damping: 25 });

  // Throttle mousemove updates to animation frames so the main thread isn't
  // overwhelmed by Framer Motion value writes on every mouse event.
  const rafRef = useRef(null);
  const pendingRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMove = (e) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        x.set(pendingRef.current.x);
        y.set(pendingRef.current.y);
        rafRef.current = null;
      });
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.body.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [shouldReduceMotion, x, y, isVisible]);

  if (shouldReduceMotion || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[90] transform-gpu will-change-transform"
      style={{ x: springX, y: springY }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full backface-hidden"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
