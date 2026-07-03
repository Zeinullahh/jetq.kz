"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleComplete = () => {
      // Small delay so the loader feels intentional, not jarring.
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.05, 1],
                      filter: [
                        "drop-shadow(0 0 0px rgba(212,175,55,0))",
                        "drop-shadow(0 0 24px rgba(212,175,55,0.6))",
                        "drop-shadow(0 0 0px rgba(212,175,55,0))",
                      ],
                    }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/JetQ_Type_White.png"
                alt="JetQ"
                width={240}
                height={82}
                className="h-20 w-auto object-contain md:h-24"
                priority
              />
            </motion.div>
            <motion.div
              className="mt-8 h-0.5 w-32 overflow-hidden bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gold"
                animate={shouldReduceMotion ? undefined : { x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
