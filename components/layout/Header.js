'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiHeart, PiHandbag, PiMagnifyingGlass, PiList } from 'react-icons/pi';
import Logo from '@/components/ui/Logo';
import { mainNav } from '@/data/site';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';
import styles from './Header.module.css';

export function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  if (href === '/shop')
    return ['/shop', '/store', '/product', '/product-category'].some((p) => pathname.startsWith(p));
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const { cartCount, cartTotal, wishlist, hydrated, setCartOpen, setSearchOpen, setMenuOpen } = useStore();
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const count = hydrated ? cartCount : 0;
  const wishCount = hydrated ? wishlist.length : 0;

  return (
    <header className={`${styles.header} ${stuck ? styles.stuck : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.menu}>
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.menuLink} ${active ? styles.active : ''}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.action} ${styles.burger}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <PiList aria-hidden="true" />
          </button>

          <Link href="/wishlist" className={styles.action} aria-label={`Wishlist (${wishCount} items)`}>
            <PiHeart aria-hidden="true" />
            {wishCount > 0 && <span className={styles.badge}>{wishCount}</span>}
          </Link>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            className={styles.action}
            onClick={() => setCartOpen(true)}
            aria-label={`Open basket, ${count} items, ${formatPrice(hydrated ? cartTotal : 0)}`}
          >
            <span className={styles.actionLabel}>Basket</span>
            <span className={styles.bagWrap}>
              <PiHandbag aria-hidden="true" />
              <span className={styles.badge}>{count}</span>
            </span>
          </button>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            className={styles.action}
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <span className={styles.actionLabel}>Search</span>
            <PiMagnifyingGlass aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
