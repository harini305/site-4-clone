'use client';

import { PiStar, PiStarFill } from 'react-icons/pi';
import styles from './Rating.module.css';

const labels = ['Very poor', 'Not that bad', 'Average', 'Good', 'Perfect'];

/** Read-only stars, or an accessible radio-group picker when `onChange` is given. */
export default function Rating({ value = 0, onChange, name = 'rating' }) {
  if (!onChange) {
    return (
      <span className={styles.stars} role="img" aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (n <= value ? <PiStarFill key={n} /> : <PiStar key={n} />))}
      </span>
    );
  }

  return (
    <div className={styles.picker} role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <label key={n} className={styles.option} title={labels[n - 1]}>
          <input
            type="radio"
            name={name}
            value={n}
            checked={value === n}
            onChange={() => onChange(n)}
            className="sr-only"
          />
          {n <= value ? <PiStarFill aria-hidden="true" /> : <PiStar aria-hidden="true" />}
          <span className="sr-only">
            {n} star{n > 1 ? 's' : ''} — {labels[n - 1]}
          </span>
        </label>
      ))}
    </div>
  );
}
