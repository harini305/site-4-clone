'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;
const empty = { name: '', email: '', phone: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your full name.';
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Please enter a valid email address.';
    if (!PHONE_RE.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`contact-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    // Demo only — no backend is connected, nothing is sent.
    setSent(true);
    setForm(empty);
  };

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <p>Thanks for getting in touch! We&apos;ll reply within one working day.</p>
        <p className={styles.small}>(Demo — this form isn&apos;t connected to a backend, so no message was sent.)</p>
        <button type="button" className={styles.again} onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (key, label, type = 'text', autoComplete) => (
    <div className={styles.field}>
      <label htmlFor={`contact-${key}`} className="sr-only">
        {label}
      </label>
      <input
        id={`contact-${key}`}
        type={type}
        className={styles.input}
        placeholder={`${label}*`}
        value={form[key]}
        onChange={set(key)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
        required
      />
      {errors[key] && (
        <p id={`contact-${key}-error`} className="field-error">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.row}>
        {field('name', 'Full name', 'text', 'name')}
        {field('email', 'Email', 'email', 'email')}
        {field('phone', 'Phone number', 'tel', 'tel')}
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Message"
          value={form.message}
          onChange={set('message')}
          rows={2}
        />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </div>
    </form>
  );
}
