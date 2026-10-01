import Link from 'next/link';
import { PiInstagramLogo, PiLinkedinLogo, PiFacebookLogo, PiXLogo } from 'react-icons/pi';
import Logo from '@/components/ui/Logo';
import Newsletter from './Newsletter';
import { site, footerVisitLinks, footerCompanyLinks, socialLinks } from '@/data/site';
import styles from './Footer.module.css';

const socialIcons = {
  instagram: PiInstagramLogo,
  linkedin: PiLinkedinLogo,
  facebook: PiFacebookLogo,
  twitter: PiXLogo,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Newsletter />

      <div className={`container ${styles.cols}`}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <div>
          <h2 className={styles.heading}>Visit Link</h2>
          <ul className={styles.list}>
            {footerVisitLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Company</h2>
          <ul className={styles.list}>
            {footerCompanyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Contact</h2>
          <address className={styles.text}>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </address>
        </div>

        <div>
          <h2 className={styles.heading}>Address</h2>
          <address className={styles.text}>
            {site.address[0]}
            <br />
            {site.address[1]}
          </address>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>
          © {year} {site.name}. All rights reserved.
        </p>
        <ul className={styles.social}>
          {socialLinks.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <li key={s.icon}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
