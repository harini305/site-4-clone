import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Reveal from '@/components/motion/Reveal';
import { promoTiles } from '@/data/home';
import styles from './PromoGrid.module.css';

function TileContent({ tile }) {
  const cta = tile.cta && (
    <Button
      href={tile.cta.href}
      variant={tile.cta.variant}
      size={tile.cta.variant === 'text' ? 'sm' : 'md'}
      style={tile.cta.accent ? { '--accent': tile.cta.accent } : undefined}
      aria-label={`Shop now: ${tile.eyebrow ? `${tile.eyebrow} ` : ''}${tile.title}`}
    >
      {tile.cta.label}
    </Button>
  );

  if (tile.layout === 'sale') {
    return (
      <Link href={tile.href} className={`${styles.content} ${styles.box} ${styles.saleBox}`}>
        <span className={styles.eyebrow}>{tile.eyebrow}</span>
        <span className={styles.big}>{tile.big}</span>
        <span className={styles.saleTitle}>{tile.title}</span>
      </Link>
    );
  }

  return (
    <div className={`${styles.content} ${styles[tile.layout]}`}>
      {tile.script && (
        <span className={styles.script} aria-hidden="true">
          {tile.script}
        </span>
      )}
      {tile.eyebrow && <span className={styles.eyebrow}>{tile.eyebrow}</span>}
      <h3 className={styles.title}>{tile.title}</h3>
      {cta}
    </div>
  );
}

export default function PromoGrid() {
  return (
    <section className={`container ${styles.grid}`} aria-label="Shop by collection">
      {promoTiles.map((tile) => (
        <Reveal key={tile.area} from={tile.from} className={`${styles.tile} ${styles[tile.area]}`}>
          <Image
            src={tile.image}
            alt={tile.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`img-fallback ${styles.img}`}
          />
          <TileContent tile={tile} />
        </Reveal>
      ))}
    </section>
  );
}
