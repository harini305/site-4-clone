'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const offsets = {
  up: { y: 60 },
  left: { x: -70 },
  right: { x: 70 },
  none: {},
};

/**
 * Scroll-triggered appear animation (mirrors the reference's fade-in-up/left/right).
 * - `stagger` animates direct children (matching `[data-reveal-item]`) one after another.
 * - Content is rendered visible in HTML; GSAP only hides it once JS runs, and always
 *   clears inline styles on completion so nothing can stay hidden.
 * - Disabled entirely for users who prefer reduced motion.
 */
export default function Reveal({
  as: Tag = 'div',
  from = 'up',
  delay = 0,
  duration = 1,
  stagger = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const el = ref.current;
        const targets = stagger ? el.querySelectorAll('[data-reveal-item]') : el;
        if (stagger && !targets.length) return;

        gsap.from(targets, {
          ...offsets[from],
          autoAlpha: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
