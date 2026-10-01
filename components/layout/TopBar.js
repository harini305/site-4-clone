import Link from 'next/link';
import { PiInfo, PiUser } from 'react-icons/pi';
import { site } from '@/data/site';
import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.welcome}>{site.welcome}</p>
        <ul className={styles.links}>
          <li>
            <Link href="/contact-us" className={styles.link} aria-label="Need help? Contact us">
              <PiInfo aria-hidden="true" className={styles.icon} />
              <span className={styles.label}>Need help</span>
            </Link>
          </li>
          <li>
            <Link href="/my-account" className={styles.link} aria-label="Sign in or register">
              <PiUser aria-hidden="true" className={styles.icon} />
              <span className={styles.label}>Sign in / Register</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
