# Shop Decoration — Next.js clone

A complete, responsive Next.js rebuild of the **Shop Decoration** furniture/decor store demo
(reference: <https://demo.phlox.pro/shop-decoration-1/>).

> ⚠️ Review build. Images are the reference demo's assets and are for **local review only**.
> See [ASSETS.md](ASSETS.md) before publishing anything.

## Quick start

```bash
npm install
npm run assets   # download the review images into public/images/ (gitignored)
npm run dev      # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (Next.js config) |
| `npm run assets` | Download reference images for local review |

Optional env: `NEXT_PUBLIC_SITE_URL` sets the absolute base URL for metadata/Open Graph.
On Vercel it falls back to the production domain automatically.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: hero + category menu, promo grid, featured products, deal of the day, features |
| `/shop` | Catalog with search, category / brand / colour / price filters, sorting, pagination |
| `/store` | Same catalog (target of the homepage "Shop now" links on the reference) |
| `/product-category/[slug]` | 12 category listings |
| `/product/[slug]` | 20 product pages: gallery + lightbox, qty, cart, wishlist, share, tabs, reviews, related carousel |
| `/search?q=` | Search results |
| `/about-us`, `/contact-us` | About (animated counters) and Contact (validated form + map) |
| `/cart`, `/checkout` | Cart with totals, demo checkout with validation |
| `/wishlist`, `/my-account` | Wishlist, demo login/register |
| anything else | Custom 404 |

## Structure

```
app/                 routes (App Router), global styles, root layout
components/
  layout/            TopBar, Header, Footer, Newsletter, CartDrawer, SearchOverlay, MobileMenu, PageHeader
  sections/          Hero, CategoryMenu, PromoGrid, FeaturedProducts, ProductGrid, DealRow, Features
  shop/              ShopView, ShopSidebar, SortSelect, Pagination
  product/           ProductGallery, ProductInfo, ProductTabs, RelatedProducts
  store/             CartView, CheckoutView, WishlistView, AccountView
  forms/             ContactForm
  motion/            Reveal (GSAP + ScrollTrigger)
  ui/                Button, ProductCard, Price, Rating, QuantityInput, Drawer, Toasts, Countdown, Counter, …
context/             StoreContext: cart, wishlist, panels, toasts (localStorage)
data/                site config, categories, products, homepage content
lib/                 catalog queries/filters, formatting, checkout rules
scripts/             download-assets.mjs
```

## Demo-only functionality

There is no backend. The following work in the browser only and are labelled as demo in the UI:

- Cart, wishlist and reviews persist in `localStorage`.
- Checkout validates and shows a confirmation, but no order or payment is made.
- Login/register simulate a session locally. No credentials are stored or sent.
- Contact and newsletter forms validate and show a success state, but send nothing.

## Animations

GSAP + ScrollTrigger: hero entrance timeline (image scale, menu stagger, masked headline lines),
hero background parallax, fade-up/left/right reveals that mirror the reference's appear effects,
staggered product grids and counters. All are disabled under `prefers-reduced-motion`, and every
reveal clears its inline styles so content is never left hidden. Content is visible in the server HTML.
