'use client';

import Link from 'next/link';
import { PiHeart, PiHeartFill, PiHandbag } from 'react-icons/pi';
import Price from './Price';
import ProductImage from './ProductImage';
import { useStore } from '@/context/StoreContext';
import { categoryNames } from '@/lib/catalog';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, priority = false, sizes }) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated } = useStore();
  const wished = hydrated && isWishlisted(product.slug);
  const href = `/product/${product.slug}`;
  const onSale = product.regularPrice > product.price;

  return (
    <article className={styles.card} data-reveal-item>
      <div className={styles.media}>
        <Link href={href} className={styles.imageLink} aria-label={`${product.name} — view product`}>
          <ProductImage src={product.images[0]} alt={product.name} priority={priority} sizes={sizes} />
          {product.images[1] && (
            <span className={styles.alt} aria-hidden="true">
              <ProductImage src={product.images[1]} alt="" sizes={sizes} />
            </span>
          )}
        </Link>
        {onSale && <span className={styles.badge}>Sale!</span>}

        <div className={styles.tools}>
          <button
            type="button"
            className={styles.tool}
            onClick={() => addToCart(product.slug)}
            aria-label={`Add ${product.name} to cart`}
          >
            <PiHandbag aria-hidden="true" />
            <span>Add to Cart</span>
          </button>
          <button
            type="button"
            className={`${styles.wish} ${wished ? styles.wished : ''}`}
            onClick={() => toggleWishlist(product.slug)}
            aria-pressed={wished}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            {wished ? <PiHeartFill aria-hidden="true" /> : <PiHeart aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <h3 className={styles.name}>
            <Link href={href}>{product.name}</Link>
          </h3>
          <p className={styles.cats}>
            {categoryNames(product).map((c, i) => (
              <span key={c.slug}>
                {i > 0 && ', '}
                <Link href={`/product-category/${c.slug}`}>{c.name}</Link>
              </span>
            ))}
          </p>
        </div>
        <Price product={product} className={styles.price} />
      </div>
    </article>
  );
}
