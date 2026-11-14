"use client";

import * as React from "react";
import { motion } from "framer-motion";

// Photo reveal for below-the-fold images: the picture wipes open from the top while it settles from a
// slight zoom, once, as it scrolls into view. Slower and more deliberate than the fade-up in `Reveal`.
// Fill the parent with it (absolute inset-0). Reduced motion is handled in globals.css (.image-reveal),
// not with a hook, so server and client markup stay identical.
// Don't use it for first-screen images: like `Reveal` it is hidden until JavaScript runs (use FadeIn there).
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const transition = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: delay / 1000 };
  return (
    <motion.div
      className={`image-reveal absolute inset-0 ${className ?? ""}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
    >
      <motion.div
        className="image-reveal-inner absolute inset-0"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ ...transition, duration: 1.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
