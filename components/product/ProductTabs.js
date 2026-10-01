'use client';

import { useEffect, useRef, useState } from 'react';
import Rating from '@/components/ui/Rating';
import styles from './ProductTabs.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const reviewsKey = (slug) => `shop-decoration:reviews:${slug}`;

function ReviewForm({ productName, onSubmit }) {
  const [form, setForm] = useState({ rating: 0, text: '', name: '', email: '' });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.rating) errs.rating = 'Please select a rating.';
    if (!form.text.trim()) errs.text = 'Please write your review.';
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Please enter a valid email address.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ rating: form.rating, text: form.text.trim(), name: form.name.trim(), date: new Date().toISOString() });
    setForm({ rating: 0, text: '', name: '', email: '' });
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <h3 className={styles.formTitle}>Be the first to review “{productName}”</h3>
      <p className={styles.note}>
        Your email address will not be published. Required fields are marked <span className="req">*</span>
      </p>

      <div className="field">
        <span id="rating-label" className={styles.label}>
          Your rating <span className="req">*</span>
        </span>
        <Rating value={form.rating} onChange={set('rating')} />
        {errors.rating && <p className="field-error">{errors.rating}</p>}
      </div>

      <div className="field">
        <label htmlFor="review-text">
          Your review <span className="req">*</span>
        </label>
        <textarea
          id="review-text"
          className="input"
          value={form.text}
          onChange={set('text')}
          aria-invalid={Boolean(errors.text)}
        />
        {errors.text && <p className="field-error">{errors.text}</p>}
      </div>

      <div className={styles.twoCol}>
        <div className="field">
          <label htmlFor="review-name">
            Name <span className="req">*</span>
          </label>
          <input id="review-name" className="input" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="review-email">
            Email <span className="req">*</span>
          </label>
          <input
            id="review-email"
            type="email"
            className="input"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
      </div>

      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
}

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const tabRefs = useRef({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(reviewsKey(product.slug)) || '[]');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore demo reviews from storage
      if (Array.isArray(saved)) setReviews(saved);
    } catch {
      // ignore
    }
  }, [product.slug]);

  const addReview = (review) => {
    const next = [...reviews, review];
    setReviews(next);
    try {
      localStorage.setItem(reviewsKey(product.slug), JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews', count: reviews.length },
  ];

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = tabs.findIndex((t) => t.id === tab);
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    setTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section className={styles.wrap} aria-label="Product details">
      <div className={styles.tabs} role="tablist" onKeyDown={onKey}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => (tabRefs.current[t.id] = el)}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className={`${styles.tab} ${tab === t.id ? styles.active : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {'count' in t && <span className={styles.count}>{t.count}</span>}
          </button>
        ))}
      </div>

      <div className={styles.panelWrap}>
        <div id="panel-description" role="tabpanel" aria-labelledby="tab-description" hidden={tab !== 'description'} className={styles.panel}>
          <h2 className={styles.heading}>About this piece</h2>
          <p>{product.description}</p>
          <p>
            Designed to sit comfortably alongside both modern and classic interiors, it brings a considered, finished
            look to any room. Combine it with other pieces from the same collection for a coordinated style.
          </p>
          <ul className={styles.list}>
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <hr className={styles.hr} />
          <p className={styles.dims}>Approximate dimensions (product): {product.dimensions}</p>
        </div>

        <div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" hidden={tab !== 'reviews'} className={styles.panel}>
          <h2 className={styles.heading}>Reviews</h2>
          {reviews.length === 0 ? (
            <p>There are no reviews yet.</p>
          ) : (
            <ol className={styles.reviews}>
              {reviews.map((r) => (
                <li key={r.date} className={styles.review}>
                  <Rating value={r.rating} />
                  <p className={styles.reviewMeta}>
                    <strong>{r.name}</strong> – {new Date(r.date).toLocaleDateString()}
                  </p>
                  <p>{r.text}</p>
                </li>
              ))}
            </ol>
          )}
          <p className="demo-note">Demo: reviews are saved only in this browser.</p>
          <ReviewForm productName={product.name} onSubmit={addReview} />
        </div>
      </div>
    </section>
  );
}
