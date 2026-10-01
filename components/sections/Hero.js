'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '@/components/ui/Button';
import CategoryMenu from './CategoryMenu';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('[data-hero-media]', { scale: 1.12, duration: 1.6, clearProps: 'transform' })
          .from('[data-hero-menu] li', { x: -30, autoAlpha: 0, stagger: 0.05, duration: 0.6, clearProps: 'all' }, 0.1)
          .from('[data-hero-script]', { y: 30, autoAlpha: 0, duration: 0.9, clearProps: 'all' }, 0.35)
          .from('[data-hero-line]', { yPercent: 110, duration: 0.9, stagger: 0.12, clearProps: 'all' }, 0.5)
          .from('[data-hero-cta]', { y: 20, autoAlpha: 0, duration: 0.7, clearProps: 'all' }, 0.95);

        // gentle parallax on the background image while scrolling past the hero
        gsap.to('[data-hero-img]', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div data-hero-menu className={styles.menuCol}>
        <CategoryMenu />
      </div>

      <div className={styles.banner}>
        <div data-hero-media className={styles.media}>
          <Image
            data-hero-img
            src="/images/banners/hero-armchair.jpg"
            alt="Yellow armchair beside a side table and cabinet against a grey concrete wall"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1020px"
            className="img-fallback"
            style={{ objectFit: 'cover', objectPosition: 'center right' }}
          />
        </div>
        <div className={styles.content}>
          <p data-hero-script className={styles.script} aria-hidden="true">
            New Collection
          </p>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.mask}>
              <span data-hero-line>Style every room</span>
            </span>{' '}
            <span className={styles.mask}>
              <span data-hero-line>with one simple</span>
            </span>{' '}
            <span className={styles.mask}>
              <span data-hero-line>selection</span>
            </span>
          </h1>
          <div data-hero-cta>
            <Button href="/shop" variant="gold" size="lg">
              Shop now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
