import { PiCaretRight, PiCaretLeft } from 'react-icons/pi';
import styles from './Pagination.module.css';

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className={styles.nav} aria-label="Product pages">
      {page > 1 && (
        <button type="button" className={styles.item} onClick={() => onChange(page - 1)} aria-label="Previous page">
          <PiCaretLeft aria-hidden="true" />
        </button>
      )}
      {nums.map((n) => (
        <button
          key={n}
          type="button"
          className={`${styles.item} ${n === page ? styles.current : ''}`}
          aria-current={n === page ? 'page' : undefined}
          aria-label={`Page ${n}`}
          onClick={() => n !== page && onChange(n)}
        >
          {n}
        </button>
      ))}
      {page < pages && (
        <>
          <button type="button" className={styles.item} onClick={() => onChange(page + 1)} aria-label="Next page">
            <PiCaretRight aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.item} ${styles.wide}`} onClick={() => onChange(pages)}>
            Last
          </button>
        </>
      )}
    </nav>
  );
}
