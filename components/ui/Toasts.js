'use client';

import { PiCheckCircle, PiX } from 'react-icons/pi';
import { useStore } from '@/context/StoreContext';
import styles from './Toasts.module.css';

export default function Toasts() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className={styles.stack} role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type] || ''}`}>
          <PiCheckCircle aria-hidden="true" className={styles.icon} />
          <span>{t.message}</span>
          <button type="button" onClick={() => dismissToast(t.id)} aria-label="Dismiss notification">
            <PiX aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
