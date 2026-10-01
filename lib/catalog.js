import { products } from '@/data/products';
import { categories } from '@/data/categories';

export const PAGE_SIZE = 9;

export const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'date', label: 'Newness' },
  { value: 'price', label: 'Low Price' },
  { value: 'price-desc', label: 'High Price' },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (slug) =>
  products.filter((p) => p.categories.includes(slug));

export const getFeaturedProducts = () =>
  products.filter((p) => p.featured).sort((a, b) => b.id - a.id);

export const categoryCount = (slug) => getProductsByCategory(slug).length;

export const categoryNames = (product) =>
  product.categories
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean);

export function getRelatedProducts(product, limit = 4) {
  const shared = products.filter(
    (p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c))
  );
  const rest = products.filter((p) => p.slug !== product.slug && !shared.includes(p));
  return [...shared, ...rest].slice(0, limit);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const cats = categoryNames(p).map((c) => c.name.toLowerCase());
    return (
      p.name.toLowerCase().includes(q) ||
      cats.some((c) => c.includes(q)) ||
      (p.brand || '').toLowerCase().includes(q)
    );
  });
}

export const priceBounds = () => {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

/**
 * Filters + sorts a product list.
 * filters: { categories: [], brands: [], colors: [], min, max, q }
 */
export function filterProducts(list, filters = {}, sort = 'default') {
  let out = list.filter((p) => {
    if (filters.categories?.length && !p.categories.some((c) => filters.categories.includes(c)))
      return false;
    if (filters.brands?.length && !filters.brands.includes(p.brand)) return false;
    if (filters.colors?.length && !filters.colors.includes(p.color)) return false;
    if (filters.min != null && p.price < filters.min) return false;
    if (filters.max != null && p.price > filters.max) return false;
    if (filters.q && !searchProducts(filters.q).includes(p)) return false;
    return true;
  });

  switch (sort) {
    case 'price':
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case 'date':
      out = [...out].sort((a, b) => b.id - a.id);
      break;
    case 'popularity':
    case 'rating':
      // No real sales/rating data in the demo — fall back to featured-first.
      out = [...out].sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
    default:
      break;
  }
  return out;
}
