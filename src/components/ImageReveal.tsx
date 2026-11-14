"use client";

import * as React from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Photo reveal for below-the-fold images: a panel the colour of the card background slides away from the top
// while the picture settles from a slight zoom, once, as it scrolls into view. Slower and more deliberate than
// the fade-up in `Reveal`. Fill the parent with it (absolute inset-0).
//
// Why a cover panel and not clip-path: browsers measure "in view" AFTER clipping, so a photo clipped to nothing
// is never seen as in view. The reveal never started and the lazy-loaded image never loaded (homepage cards
// stayed empty). The wrapper that is observed, and the photo itself, are never clipped or hidden here.
//
// Reduced motion is handled in globals.css (.image-reveal-*), not with a hook, so server and client markup
// stay identical. Don't use it for first-screen images: like `Reveal` it needs JavaScript (use FadeIn there).
export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const d = delay / 1000;
  return (
    <motion.div
      className={`image-reveal absolute inset-0 ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="image-reveal-inner absolute inset-0"
        variants={{ hidden: { scale: 1.12 }, visible: { scale: 1, transition: { duration: 1.4, ease, delay: d } } }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="image-reveal-cover absolute inset-0 bg-muted"
        style={{ originY: 1 }}
        variants={{ hidden: { scaleY: 1 }, visible: { scaleY: 0, transition: { duration: 1.1, ease, delay: d } } }}
      />
    </motion.div>
  );
}
