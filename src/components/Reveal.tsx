"use client";

import * as React from "react";
import { motion, MotionConfig } from "framer-motion";

// Fades and rises children into view once, the first time they scroll into the viewport.
// reducedMotion="user" drops the rise (fade only) for visitors who prefer reduced motion,
// while keeping server and client markup identical.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
