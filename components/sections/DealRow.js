import Image from 'next/image';
import Button from '@/components/ui/Button';
import Countdown from '@/components/ui/Countdown';
import Price from '@/components/ui/Price';
import Reveal from '@/components/motion/Reveal';
import { dealOfTheDay } from '@/data/products';
import styles from './DealRow.module.css';

export default function DealRow() {
  return (
    <section className={`container ${styles.row}`} aria-label="Promotions">
      <Reveal from="left" className={styles.bedroom}>
        <Image
          src="/images/banners/bedroom-accessories.jpg"
          alt="Minimal white bedroom with a copper bedside lamp"
          fill
          sizes="(max-width: 900px) 100vw, 440px"
          className={`img-fallback ${styles.img}`}
        />
        <div className={styles.bedroomContent}>
          <span className={styles.script} aria-hidden="true">
            New
          </span>
          <h2 className={styles.bedroomTitle}>Bedroom Accessories</h2>
          <Button href="/product-category/bedroom" variant="light" size="md">
            Shop now
          </Button>
        </div>
      </Reveal>

      <Reveal from="right" className={styles.deal}>
        <Image
          src="/images/banners/deal-of-the-day.jpg"
          alt="Glass dining table with dried flowers in a bright room"
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className={`img-fallback ${styles.img}`}
        />
        <div className={styles.dealContent}>
          <p className={styles.dealEyebrow}>Deal of the day</p>
          <h2 className={styles.dealTitle}>{dealOfTheDay.name}</h2>
          <Price price={dealOfTheDay.price} regularPrice={dealOfTheDay.regularPrice} className={styles.dealPrice} />
          <Countdown />
          <Button href={dealOfTheDay.href} size="md" className={styles.dealBtn}>
            Shop now
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
