'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PiX } from 'react-icons/pi';
import { categories } from '@/data/categories';
import { brands, colors } from '@/data/products';
import { priceBounds } from '@/lib/catalog';
import styles from './ShopSidebar.module.css';

function CheckList({ legend, items, selected, onToggle }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.heading}>
        <span>{legend}</span>
      </legend>
      <ul className={styles.checks}>
        {items.map((item) => {
          const id = `f-${legend}-${item.value}`.toLowerCase().replace(/\s+/g, '-');
          return (
            <li key={item.value}>
              <input
                type="checkbox"
                id={id}
                className={styles.checkbox}
                checked={selected.includes(item.value)}
                onChange={() => onToggle(item.value)}
                disabled={item.count === 0 && !selected.includes(item.value)}
              />
              <label htmlFor={id} className={styles.checkLabel}>
                <span className={styles.box} aria-hidden="true" />
                {item.swatch && <span className={styles.swatch} style={{ background: item.swatch }} aria-hidden="true" />}
                <span className={styles.labelText}>{item.label}</span>
                <span className={styles.count}>({item.count})</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export default function ShopSidebar({ state, base, hideCategories, onChange, onClose }) {
  const router = useRouter();
  const bounds = priceBounds();
  const [q, setQ] = useState(state.q);
  const [min, setMin] = useState(state.min ?? bounds.min);
  const [max, setMax] = useState(state.max ?? bounds.max);
  const [priceError, setPriceError] = useState('');

  const toggle = (key, current, value) =>
    onChange({ [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] });

  const submitSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : '/shop');
  };

  const submitPrice = (e) => {
    e.preventDefault();
    const lo = Number(min);
    const hi = Number(max);
    if (Number.isNaN(lo) || Number.isNaN(hi) || lo < 0 || hi < lo) {
      setPriceError('Enter a valid range (minimum must not exceed maximum).');
      return;
    }
    setPriceError('');
    onChange({ min: lo === bounds.min ? null : lo, max: hi === bounds.max ? null : hi });
    onClose?.();
  };

  return (
    <div className={styles.sidebar}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close filters">
        <PiX aria-hidden="true" />
      </button>

      <form role="search" className={styles.group} onSubmit={submitSearch}>
        <h2 className={styles.heading}>
          <label htmlFor="sidebar-search">Search</label>
        </h2>
        <input
          id="sidebar-search"
          type="search"
          className={styles.search}
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>

      {!hideCategories && (
        <CheckList
          legend="Category"
          selected={state.categories}
          onToggle={(v) => toggle('category', state.categories, v)}
          items={[...categories]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => ({
              value: c.slug,
              label: c.name,
              count: base.filter((p) => p.categories.includes(c.slug)).length,
            }))}
        />
      )}

      <CheckList
        legend="Brand"
        selected={state.brands}
        onToggle={(v) => toggle('brand', state.brands, v)}
        items={brands
          .map((b) => ({ value: b, label: b, count: base.filter((p) => p.brand === b).length }))
          .filter((b) => b.count > 0 || state.brands.includes(b.value))}
      />

      <CheckList
        legend="Color"
        selected={state.colors}
        onToggle={(v) => toggle('color', state.colors, v)}
        items={colors
          .map((c) => ({ value: c.slug, label: c.name, swatch: c.hex, count: base.filter((p) => p.color === c.slug).length }))
          .filter((c) => c.count > 0 || state.colors.includes(c.value))}
      />

      <form className={styles.group} onSubmit={submitPrice} noValidate>
        <h2 className={`${styles.heading} ${styles.small}`}>
          <span>Price</span>
        </h2>
        <label htmlFor="price-min" className="sr-only">
          Minimum price
        </label>
        <input
          id="price-min"
          type="number"
          inputMode="numeric"
          className={styles.price}
          value={min}
          min={0}
          onChange={(e) => setMin(e.target.value)}
        />
        <label htmlFor="price-max" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-max"
          type="number"
          inputMode="numeric"
          className={styles.price}
          value={max}
          min={0}
          onChange={(e) => setMax(e.target.value)}
        />
        {priceError && <p className="field-error">{priceError}</p>}
        <button type="submit" className={styles.btn}>
          Filter
        </button>
      </form>
    </div>
  );
}
