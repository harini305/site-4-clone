import Button from '@/components/ui/Button';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="nf-title">
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 id="nf-title" className={styles.title}>
        Oops! That page can&apos;t be found.
      </h1>
      <p className={styles.text}>The page you were looking for may have moved or no longer exists.</p>
      <div className={styles.actions}>
        <Button href="/">Back to home</Button>
        <Button href="/shop" variant="outline">
          Visit the shop
        </Button>
      </div>
    </section>
  );
}
