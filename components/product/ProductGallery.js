'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PiMagnifyingGlassPlus, PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import Drawer from '@/components/ui/Drawer';
import styles from './ProductGallery.module.css';

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const many = images.length > 1;

  const go = (dir) => setActive((i) => (i + dir + images.length) % images.length);

  // Arrow-key navigation inside the lightbox
  useEffect(() => {
    if (!zoom || !many) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, many]);

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        {images.map((src, i) => (
          <div key={src} className={`${styles.slide} ${i === active ? styles.current : ''}`} aria-hidden={i !== active}>
            <Image
              src={src}
              alt={i === 0 ? name : `${name} — view ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 900px) 100vw, 580px"
              className="img-fallback"
              style={{ objectFit: 'contain', padding: '10%' }}
            />
          </div>
        ))}
        <button type="button" className={styles.zoom} onClick={() => setZoom(true)} aria-label="Open image in full screen">
          <PiMagnifyingGlassPlus aria-hidden="true" />
        </button>
        {many && (
          <>
            <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous image">
              <PiCaretLeft aria-hidden="true" />
            </button>
            <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => go(1)} aria-label="Next image">
              <PiCaretRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {many && (
        <div className={styles.thumbs} role="group" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image src={src} alt="" fill sizes="90px" style={{ objectFit: 'contain', padding: '12%' }} />
            </button>
          ))}
        </div>
      )}

      <Drawer open={zoom} onClose={() => setZoom(false)} side="full" title={`${name} image viewer`}>
        <div className={styles.lightbox}>
          <div className={styles.lightboxImg}>
            <Image
              src={images[active]}
              alt={name}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
          {many && (
            <div className={styles.lightboxNav}>
              <button type="button" onClick={() => go(-1)} aria-label="Previous image">
                <PiCaretLeft aria-hidden="true" />
              </button>
              <span aria-live="polite">
                {active + 1} / {images.length}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next image">
                <PiCaretRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
