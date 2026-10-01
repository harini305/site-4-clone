import { formatPrice } from '@/lib/format';
import styles from './Price.module.css';

export default function Price({ product, price, regularPrice, size = 'md', className = '' }) {
  const current = product ? product.price : price;
  const regular = product ? product.regularPrice : regularPrice;
  const onSale = regular != null && regular > current;

  return (
    <span className={`${styles.price} ${styles[size]} ${className}`}>
      {onSale && (
        <del className={styles.regular}>
          <span className="sr-only">Original price: </span>
          {formatPrice(regular)}
        </del>
      )}
      <ins className={styles.current}>
        {onSale && <span className="sr-only">Current price: </span>}
        {formatPrice(current)}
      </ins>
    </span>
  );
}
