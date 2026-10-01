'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PiCheckCircle } from 'react-icons/pi';
import Button from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';
import { shippingFor } from '@/lib/checkout';
import styles from './CheckoutView.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fields = [
  { key: 'firstName', label: 'First name', autoComplete: 'given-name', half: true },
  { key: 'lastName', label: 'Last name', autoComplete: 'family-name', half: true },
  { key: 'address', label: 'Street address', autoComplete: 'street-address' },
  { key: 'city', label: 'Town / City', autoComplete: 'address-level2', half: true },
  { key: 'postcode', label: 'Postcode / ZIP', autoComplete: 'postal-code', half: true },
  { key: 'phone', label: 'Phone', autoComplete: 'tel', type: 'tel', half: true },
  { key: 'email', label: 'Email address', autoComplete: 'email', type: 'email', half: true },
];

export default function CheckoutView() {
  const { cartItems, cartTotal, hydrated, clearCart } = useStore();
  const [form, setForm] = useState(Object.fromEntries(fields.map((f) => [f.key, ''])));
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  if (!hydrated) return <p className={styles.muted}>Loading checkout…</p>;

  if (order) {
    return (
      <div className={styles.done} role="status">
        <PiCheckCircle aria-hidden="true" className={styles.doneIcon} />
        <h2>Thank you. Your order has been received.</h2>
        <p>
          Order number: <strong>{order.number}</strong> · Total: <strong>{formatPrice(order.total)}</strong>
        </p>
        <p className="demo-note">Demo checkout — no payment was taken and no order was actually placed.</p>
        <Button href="/shop">Continue shopping</Button>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className={styles.emptyBox}>
        <p>Your cart is currently empty, so there is nothing to check out.</p>
        <Button href="/shop">Return to shop</Button>
      </div>
    );
  }

  const shipping = shippingFor(cartTotal);
  const total = cartTotal + shipping;

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    fields.forEach((f) => {
      if (!form[f.key].trim()) errs[f.key] = `${f.label} is required.`;
    });
    if (form.email && !EMAIL_RE.test(form.email.trim())) errs.email = 'Please enter a valid email address.';
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    setOrder({ number: Math.floor(100000 + Math.random() * 900000), total });
    clearCart();
    window.scrollTo({ top: 0 });
  };

  return (
    <form className={styles.layout} onSubmit={submit} noValidate>
      <div>
        <h2 className={styles.title}>Billing details</h2>
        <p className="demo-note">Demo checkout — please don&apos;t enter real personal or payment details.</p>
        <div className={styles.grid}>
          {fields.map((f) => (
            <div key={f.key} className={`field ${f.half ? styles.half : styles.full}`}>
              <label htmlFor={`co-${f.key}`}>
                {f.label} <span className="req">*</span>
              </label>
              <input
                id={`co-${f.key}`}
                className="input"
                type={f.type || 'text'}
                autoComplete={f.autoComplete}
                value={form[f.key]}
                onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                aria-invalid={Boolean(errors[f.key])}
                aria-describedby={errors[f.key] ? `co-${f.key}-err` : undefined}
              />
              {errors[f.key] && (
                <p id={`co-${f.key}-err`} className="field-error">
                  {errors[f.key]}
                </p>
              )}
            </div>
          ))}
          <div className={`field ${styles.full}`}>
            <label htmlFor="co-notes">Order notes (optional)</label>
            <textarea id="co-notes" className="input" placeholder="Notes about your order, e.g. special notes for delivery." />
          </div>
        </div>
      </div>

      <aside className={styles.summary} aria-labelledby="order-title">
        <h2 id="order-title" className={styles.title}>
          Your order
        </h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ slug, qty, product, lineTotal }) => (
              <tr key={slug}>
                <td>
                  <Link href={`/product/${slug}`}>{product.name}</Link> × {qty}
                </td>
                <td>{formatPrice(lineTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Subtotal</th>
              <td>{formatPrice(cartTotal)}</td>
            </tr>
            <tr>
              <th scope="row">Shipping</th>
              <td>{shipping === 0 ? 'Free shipping' : formatPrice(shipping)}</td>
            </tr>
            <tr className={styles.grand}>
              <th scope="row">Total</th>
              <td>{formatPrice(total)}</td>
            </tr>
          </tfoot>
        </table>

        <fieldset className={styles.payment}>
          <legend className="sr-only">Payment method</legend>
          <label>
            <input type="radio" name="payment" defaultChecked /> Cash on delivery
          </label>
          <label>
            <input type="radio" name="payment" /> Direct bank transfer
          </label>
        </fieldset>

        <button type="submit" className={styles.place}>
          Place order
        </button>
      </aside>
    </form>
  );
}
