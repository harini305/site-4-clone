import ProductCard from '@/components/ui/ProductCard';
import Reveal from '@/components/motion/Reveal';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products, columns = 4, animate = true }) {
  const cls = `${styles.grid} ${styles[`cols${columns}`]}`;
  const sizes =
    columns === 4 ? '(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw' : '(max-width: 600px) 50vw, 30vw';

  const items = products.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 2} sizes={sizes} />);

  if (!animate) return <div className={cls}>{items}</div>;
  return (
    <Reveal className={cls} stagger={0.08}>
      {items}
    </Reveal>
  );
}
