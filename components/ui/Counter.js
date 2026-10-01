'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Counts up from 0 when scrolled into view. The final value is in the HTML,
// so it reads correctly without JS and for reduced-motion users.
export default function Counter({ value, suffix = '', className }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
          onUpdate: () => {
            if (ref.current) ref.current.textContent = `${Math.round(obj.n)}${suffix}`;
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
