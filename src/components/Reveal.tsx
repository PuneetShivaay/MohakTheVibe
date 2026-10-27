"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Fades and rises children into view once, the first time they scroll into the viewport
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
