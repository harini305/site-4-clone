'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard } from 'swiper/modules';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import ProductCard from '@/components/ui/ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './RelatedProducts.module.css';

export default function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className={styles.section} aria-labelledby="related-title">
      <SectionHeading eyebrow="Best sale" title="Related Products" id="related-title" />
      <div className={styles.carousel}>
        <button type="button" className={`${styles.nav} ${styles.prev} related-prev`} aria-label="Previous products">
          <PiCaretLeft aria-hidden="true" />
        </button>
        <Swiper
          modules={[Navigation, A11y, Keyboard]}
          navigation={{ prevEl: '.related-prev', nextEl: '.related-next' }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          spaceBetween={20}
          slidesPerView={1.3}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 20 },
            900: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          a11y={{ prevSlideMessage: 'Previous products', nextSlideMessage: 'Next products' }}
        >
          {products.map((p) => (
            <SwiperSlide key={p.slug}>
              <ProductCard product={p} sizes="(max-width: 900px) 50vw, 25vw" />
            </SwiperSlide>
          ))}
        </Swiper>
        <button type="button" className={`${styles.nav} ${styles.next} related-next`} aria-label="Next products">
          <PiCaretRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
