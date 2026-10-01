'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PiFunnel } from 'react-icons/pi';
import ProductGrid from '@/components/sections/ProductGrid';
import ShopSidebar from './ShopSidebar';
import SortSelect from './SortSelect';
import Pagination from './Pagination';
import { products } from '@/data/products';
import { filterProducts, getProductsByCategory, PAGE_SIZE } from '@/lib/catalog';
import styles from './ShopView.module.css';

const list = (v) => (v ? v.split(',').filter(Boolean) : []);
const num = (v) => (v === null || v === '' || Number.isNaN(Number(v)) ? null : Number(v));

/**
 * Product listing with sidebar filters, sorting and pagination.
 * All state lives in the URL (?category=&brand=&color=&min=&max=&orderby=&page=&q=)
 * so filtered views are shareable and survive refresh.
 */
export default function ShopView({ title = 'Featured Product', category = null, searchMode = false }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const state = {
    categories: list(params.get('category')),
    brands: list(params.get('brand')),
    colors: list(params.get('color')),
    min: num(params.get('min')),
    max: num(params.get('max')),
    q: params.get('q') || '',
    sort: params.get('orderby') || 'default',
    page: Math.max(1, parseInt(params.get('page') || '1', 10) || 1),
  };

  const base = category ? getProductsByCategory(category) : products;

  const filtered = useMemo(
    () =>
      filterProducts(
        base,
        { categories: state.categories, brands: state.brands, colors: state.colors, min: state.min, max: state.max, q: state.q },
        state.sort
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [base, params]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(state.page, pages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const update = (changes, { resetPage = true } = {}) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(changes).forEach(([k, v]) => {
      const value = Array.isArray(v) ? v.join(',') : v;
      if (value === null || value === undefined || value === '' || (k === 'orderby' && value === 'default'))
        next.delete(k);
      else next.set(k, String(value));
    });
    if (resetPage) next.delete('page');
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const goToPage = (n) => {
    update({ page: n === 1 ? null : n }, { resetPage: false });
    document.getElementById('shop-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeCount =
    state.categories.length + state.brands.length + state.colors.length + (state.min != null || state.max != null ? 1 : 0);

  return (
    <div className={`container ${styles.layout}`}>
      <aside
        id="shop-filters"
        className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}
        aria-label="Product filters"
      >
        <ShopSidebar
          state={state}
          base={base}
          hideCategories={Boolean(category)}
          onChange={update}
          onClose={() => setFiltersOpen(false)}
        />
      </aside>

      <section className={styles.main} aria-labelledby="shop-title" id="shop-results">
        <header className={styles.head}>
          <h1 id="shop-title" className={styles.title}>
            {searchMode ? (state.q ? `Results for “${state.q}”` : 'Search') : title}
          </h1>
          <span className={styles.rule} aria-hidden="true" />
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.filterToggle}
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
              aria-controls="shop-filters"
            >
              <PiFunnel aria-hidden="true" />
              Filters{activeCount ? ` (${activeCount})` : ''}
            </button>
            <SortSelect value={state.sort} onChange={(v) => update({ orderby: v })} />
          </div>
        </header>

        <p className={styles.count} aria-live="polite">
          {filtered.length === 0
            ? 'No products were found matching your selection.'
            : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} results`}
        </p>

        {visible.length > 0 && (
          <ProductGrid key={`${params.toString()}`} products={visible} columns={3} />
        )}

        {activeCount > 0 && filtered.length === 0 && (
          <button
            type="button"
            className={styles.reset}
            onClick={() => update({ category: null, brand: null, color: null, min: null, max: null })}
          >
            Clear all filters
          </button>
        )}

        <Pagination page={page} pages={pages} onChange={goToPage} />
      </section>
    </div>
  );
}
