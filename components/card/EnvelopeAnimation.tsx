"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CARD_CONTENT } from "@/config/cardContent";

interface EnvelopeAnimationProps {
  onComplete: () => void;
}

export function EnvelopeAnimation({ onComplete }: EnvelopeAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start animation after 1 second
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If reduced motion is preferred, skip directly to card
    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shouldReduceMotion, onComplete]);

  // For reduced motion, show simple fade
  if (shouldReduceMotion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-text-secondary"
        >
          Opening your note...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-md aspect-[3/2]">
        {/* Envelope base */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            animationStarted
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-sm shadow-2xl"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.1)",
            zIndex: 1
          }}
        >
          {/* Text positioned in upper area (will be revealed when flap opens) */}
          <div className="absolute top-8 left-0 right-0 flex items-center justify-center px-8">
            <div className="text-center w-full">
              <motion.p
                initial={{ opacity: 0 }}
                animate={animationStarted ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="font-serif text-2xl md:text-3xl text-accent-indigo/80 mb-2"
              >
                For {CARD_CONTENT.recipientName}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={animationStarted ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-xs text-text-light tracking-widest uppercase"
              >
                {CARD_CONTENT.label}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Envelope flap - positioned above text */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={
            animationStarted ? { rotateX: -180 } : { rotateX: 0 }
          }
          transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
          onAnimationComplete={() => {
            setTimeout(() => onComplete(), 800);
          }}
          className="absolute inset-x-0 top-0 h-1/2 origin-bottom"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            zIndex: 2
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-t-sm"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>

        {/* Inner card peeking out */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={
            animationStarted
              ? { y: -20, opacity: 0.3 }
              : { y: 0, opacity: 0 }
          }
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute inset-x-0 top-0 h-3/4 bg-card rounded-sm mx-8 shadow-lg"
          style={{ zIndex: 0 }}
        />
      </div>
    </div>
  );
}
