'use client';

import { useEffect, useRef } from 'react';
import { PiX } from 'react-icons/pi';
import styles from './Drawer.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible off-canvas panel / overlay.
 * side: 'left' | 'right' | 'full'
 */
export default function Drawer({ open, onClose, side = 'right', title, children, labelledBy, className = '' }) {
  const panelRef = useRef(null);
  const lastFocus = useRef(null);
  // Keep the latest onClose without re-running the open/close effect on every render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    const panel = panelRef.current;
    const first = panel?.querySelector('[data-autofocus]') || panel?.querySelector(FOCUSABLE);
    const t = setTimeout(() => first?.focus(), 60);

    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key !== 'Tab' || !panel) return;
      const nodes = [...panel.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault();
        firstNode.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
  }, [open]);

  return (
    <div className={`${styles.root} ${open ? styles.open : ''}`} aria-hidden={!open} inert={!open}>
      <div className={styles.backdrop} onClick={onClose} />
      <div
        ref={panelRef}
        className={`${styles.panel} ${styles[side]} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : title}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <PiX aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}
