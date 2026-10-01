'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PiHeart, PiHeartFill, PiShareNetwork } from 'react-icons/pi';
import Price from '@/components/ui/Price';
import QuantityInput from '@/components/ui/QuantityInput';
import { useStore } from '@/context/StoreContext';
import { categoryNames } from '@/lib/catalog';
import styles from './ProductInfo.module.css';

export default function ProductInfo({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, hydrated, toast } = useStore();
  const [qty, setQty] = useState(1);
  const wished = hydrated && isWishlisted(product.slug);
  const cats = categoryNames(product);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast('Product link copied to clipboard.');
      }
    } catch {
      // user cancelled the share sheet — nothing to do
    }
  };

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.name}</h1>
      <Price product={product} size="lg" className={styles.price} />
      <p className={styles.desc}>{product.description}</p>

      <form
        className={styles.cart}
        onSubmit={(e) => {
          e.preventDefault();
          addToCart(product.slug, qty);
          setQty(1);
        }}
      >
        <QuantityInput value={qty} onChange={setQty} label={`${product.name} quantity`} />
        <button type="submit" className={styles.add}>
          Add to cart
        </button>
      </form>

      <div className={styles.row}>
        <button
          type="button"
          className={`${styles.wish} ${wished ? styles.wished : ''}`}
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
        >
          {wished ? 'Remove from wishlist' : 'Add to wishlist'}
          {wished ? <PiHeartFill aria-hidden="true" /> : <PiHeart aria-hidden="true" />}
        </button>
        <button type="button" className={styles.share} onClick={share}>
          Share <PiShareNetwork aria-hidden="true" />
        </button>
      </div>

      <p className={styles.meta}>
        <span className={styles.metaLabel}>{cats.length > 1 ? 'Categories' : 'Category'}</span>
        {cats.map((c, i) => (
          <span key={c.slug}>
            {i > 0 && ', '}
            <Link href={`/product-category/${c.slug}`}>{c.name}</Link>
          </span>
        ))}
      </p>
    </div>
  );
}
