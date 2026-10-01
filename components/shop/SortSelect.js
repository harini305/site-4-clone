'use client';

import { useEffect, useRef, useState } from 'react';
import { PiCaretDown } from 'react-icons/pi';
import { sortOptions } from '@/lib/catalog';
import styles from './SortSelect.module.css';

// Accessible dropdown styled like the reference's black "SORT BY" button.
export default function SortSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = sortOptions.find((o) => o.value === value) || sortOptions[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onListKey = (e) => {
    const items = [...ref.current.querySelectorAll('[role="menuitemradio"]')];
    const i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    }
  };

  return (
    <div ref={ref} className={styles.wrap}>
      <button
        type="button"
        className={styles.toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        Sort by: {current.label}
        <PiCaretDown aria-hidden="true" className={open ? styles.flip : ''} />
      </button>
      {open && (
        <ul className={styles.menu} role="menu" aria-label="Sort products" onKeyDown={onListKey}>
          {sortOptions.map((o) => (
            <li key={o.value} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={o.value === current.value}
                className={o.value === current.value ? styles.selected : ''}
                autoFocus={o.value === current.value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
