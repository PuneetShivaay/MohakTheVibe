"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const WORD = "MOHAK";
const CENTRE = Math.floor(WORD.length / 2);
// Horizontal start offset per step away from the centre letter (outer letters travel ~a third of the screen)
const STEP_VW = 16;

// Letters left of centre slide in from the left, right of centre from the right, the centre one fades in.
// Outer letters travel farther, so all of them land together.
function Letter({ char, index, progress, still }: { char: string; index: number; progress: MotionValue<number>; still: boolean }) {
  const offset = (index - CENTRE) * STEP_VW;
  const x = useTransform(progress, [0, 1], [still ? "0vw" : `${offset}vw`, "0vw"]);
  const opacity = useTransform(progress, [0, 1], [still || index !== CENTRE ? 1 : 0, 1]);
  return (
    <motion.span style={{ x, opacity }} className="inline-block">
      {char}
    </motion.span>
  );
}

// Oversized faded footer wordmark, tied to scrolling: the letters meet while the word scrolls into view
// and part again when scrolling back up. With reduced motion the same markup simply stays at rest.
export function FooterWordmark() {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const still = useReducedMotion() ?? false;
  // 0 when the word's top enters the screen, 1 when it is fully in view (the only time it can be seen moving)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  return (
    <p
      ref={ref}
      aria-hidden
      className="font-headline text-[22vw] md:text-[16vw] leading-none tracking-[0.08em] text-center text-foreground/[0.08] select-none pt-10 whitespace-nowrap"
    >
      {WORD.split("").map((char, i) => (
        <Letter key={i} char={char} index={i} progress={scrollYProgress} still={still} />
      ))}
    </p>
  );
}
