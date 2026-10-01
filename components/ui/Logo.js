import Link from 'next/link';
import { site } from '@/data/site';
import styles from './Logo.module.css';

// Text wordmark (script + bold caps) styled after the reference logo.
// The reference uses the theme vendor's branded logo image, which isn't reused here.
export default function Logo({ className = '' }) {
  return (
    <Link href="/" className={`${styles.logo} ${className}`} aria-label={`${site.name} — home`}>
      <span className={styles.script} aria-hidden="true">
        {site.shortName}
      </span>
      <span className={styles.word} aria-hidden="true">
        SHOP
      </span>
    </Link>
  );
}
