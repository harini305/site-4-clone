'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from '@/components/ui/Drawer';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { useStore } from '@/context/StoreContext';
import { mainNav } from '@/data/site';
import { categories } from '@/data/categories';
import { isActive } from './Header';
import styles from './MobileMenu.module.css';

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useStore();
  const pathname = usePathname();
  const close = () => setMenuOpen(false);

  return (
    <Drawer open={menuOpen} onClose={close} side="left" labelledBy="mobile-menu-title">
      <nav className={styles.wrap} aria-labelledby="mobile-menu-title">
        <h2 id="mobile-menu-title" className={styles.title}>
          Menu
        </h2>
        <ul className={styles.main}>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className={isActive(pathname, item.href) ? styles.active : ''}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/wishlist" onClick={close}>
              Wishlist
            </Link>
          </li>
          <li>
            <Link href="/my-account" onClick={close}>
              My Account
            </Link>
          </li>
        </ul>

        <p className={styles.sub}>Categories</p>
        <ul className={styles.cats}>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/product-category/${c.slug}`} onClick={close}>
                <CategoryIcon name={c.icon} />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
}
