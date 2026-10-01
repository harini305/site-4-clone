import Link from 'next/link';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { categories } from '@/data/categories';
import styles from './CategoryMenu.module.css';

export default function CategoryMenu({ className = '' }) {
  return (
    <nav className={`${styles.box} ${className}`} aria-label="Product categories">
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/product-category/${c.slug}`} className={styles.link}>
              <CategoryIcon name={c.icon} className={styles.icon} />
              <span>{c.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
