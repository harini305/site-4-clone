'use client';

import Link from 'next/link';
import { PiHeart, PiTrash } from 'react-icons/pi';
import Button from '@/components/ui/Button';
import Price from '@/components/ui/Price';
import ProductImage from '@/components/ui/ProductImage';
import { useStore } from '@/context/StoreContext';
import { getProduct } from '@/lib/catalog';
import styles from './StoreTables.module.css';

export default function WishlistView() {
  const { wishlist, hydrated, toggleWishlist, addToCart } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  if (!hydrated) return <p className={styles.loading}>Loading your wishlist…</p>;

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <PiHeart aria-hidden="true" className={styles.emptyIcon} />
        <p>Your wishlist is currently empty.</p>
        <Button href="/shop">Return to shop</Button>
      </div>
    );
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">Remove</span>
            </th>
            <th scope="col">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col">Product name</th>
            <th scope="col">Unit price</th>
            <th scope="col">Stock status</th>
            <th scope="col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.slug}>
              <td data-label="">
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => toggleWishlist(p.slug)}
                  aria-label={`Remove ${p.name} from wishlist`}
                >
                  <PiTrash aria-hidden="true" />
                </button>
              </td>
              <td>
                <Link href={`/product/${p.slug}`} className={styles.thumb} tabIndex={-1} aria-hidden="true">
                  <ProductImage src={p.images[0]} alt="" sizes="90px" />
                </Link>
              </td>
              <td data-label="Product">
                <Link href={`/product/${p.slug}`} className={styles.name}>
                  {p.name}
                </Link>
              </td>
              <td data-label="Price">
                <Price product={p} size="sm" />
              </td>
              <td data-label="Stock">
                <span className={styles.stock}>In stock</span>
              </td>
              <td>
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => {
                    addToCart(p.slug);
                    toggleWishlist(p.slug);
                  }}
                >
                  Add to cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.footer}>
        <Button href="/shop" variant="outline">
          Continue shopping
        </Button>
        <button
          type="button"
          className={styles.action}
          onClick={() => items.forEach((p) => addToCart(p.slug))}
        >
          Add all to cart
        </button>
      </div>
    </>
  );
}
