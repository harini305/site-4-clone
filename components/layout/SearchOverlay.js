'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import Drawer from '@/components/ui/Drawer';
import Price from '@/components/ui/Price';
import ProductImage from '@/components/ui/ProductImage';
import { useStore } from '@/context/StoreContext';
import { searchProducts } from '@/lib/catalog';
import styles from './SearchOverlay.module.css';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState('');
  const router = useRouter();
  const close = () => setSearchOpen(false);
  const results = q.trim().length >= 2 ? searchProducts(q).slice(0, 6) : [];

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    close();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <Drawer open={searchOpen} onClose={close} side="full" title="Search products">
      <div className={styles.wrap}>
        <form role="search" className={styles.form} onSubmit={submit}>
          <label htmlFor="overlay-search" className="sr-only">
            Search products
          </label>
          <input
            id="overlay-search"
            data-autofocus
            className={styles.input}
            type="search"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className={styles.submit} aria-label="Submit search">
            <PiMagnifyingGlass aria-hidden="true" />
          </button>
        </form>

        {q.trim().length >= 2 && (
          <div className={styles.results} aria-live="polite">
            {results.length === 0 ? (
              <p className={styles.none}>No products match “{q}”.</p>
            ) : (
              <ul className={styles.grid}>
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/product/${p.slug}`} className={styles.result} onClick={close}>
                      <span className={styles.thumb}>
                        <ProductImage src={p.images[0]} alt="" sizes="72px" />
                      </span>
                      <span>
                        <span className={styles.name}>{p.name}</span>
                        <Price product={p} size="sm" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}
