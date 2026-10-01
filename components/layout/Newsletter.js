'use client';

import Image from 'next/image';
import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import styles from './Newsletter.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | done

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      return;
    }
    // Demo only: no mailing-list backend is connected.
    setStatus('done');
    setEmail('');
  };

  return (
    <section className={`container ${styles.section}`} aria-labelledby="newsletter-title">
      <div className={styles.media}>
        <Image
          src="/images/banners/newsletter.jpg"
          alt=""
          fill
          sizes="(max-width: 1440px) 100vw, 1370px"
          className="img-fallback"
          style={{ objectFit: 'cover' }}
          data-parallax
        />
      </div>
      <Reveal className={styles.card} from="right">
        <p className="eyebrow">Join our community</p>
        <h2 id="newsletter-title" className={styles.title}>
          Fresh Decor Ideas Straight To Your Inbox
        </h2>
        {status === 'done' ? (
          <p className={styles.success} role="status">
            Thanks for subscribing! (Demo — no email was sent.)
          </p>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              className={styles.input}
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              required
            />
            <button type="submit" className={styles.submit}>
              Subscribe
            </button>
          </form>
        )}
        {status === 'error' && (
          <p id="newsletter-error" className="field-error">
            Please enter a valid email address.
          </p>
        )}
      </Reveal>
    </section>
  );
}
