import SectionHeading from '@/components/ui/SectionHeading';
import ProductGrid from './ProductGrid';
import { getFeaturedProducts } from '@/lib/catalog';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  return (
    <section className={`container ${styles.section}`} aria-labelledby="featured-title">
      <SectionHeading eyebrow="Best sale" title="Featured Products" id="featured-title" />
      <div className={styles.inner}>
        <ProductGrid products={getFeaturedProducts().slice(0, 8)} />
      </div>
    </section>
  );
}
