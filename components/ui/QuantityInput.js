'use client';

import styles from './QuantityInput.module.css';

export default function QuantityInput({ value, onChange, min = 1, max = 99, label = 'Quantity', size = 'md' }) {
  const set = (n) => onChange(Math.max(min, Math.min(max, Number.isFinite(n) ? n : min)));

  return (
    <div className={`${styles.qty} ${styles[size]}`}>
      <button type="button" onClick={() => set(value - 1)} disabled={value <= min} aria-label={`Decrease ${label}`}>
        –
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => set(parseInt(e.target.value, 10))}
      />
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max} aria-label={`Increase ${label}`}>
        +
      </button>
    </div>
  );
}
