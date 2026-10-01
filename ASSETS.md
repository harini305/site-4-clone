# Image assets & licensing

All images in `public/images/` are the **reference demo's own assets**, downloaded from
`https://demo.phlox.pro/shop-decoration-1/` by `scripts/download-assets.mjs` for **local design review only**.

They belong to the theme vendor (Phlox / averta) and/or their stock-photo licensors. They are **not**
cleared for public or production use, so `/public/images/` is listed in `.gitignore` and is never
committed, pushed or deployed.

## Get the review assets

```bash
npm run assets          # downloads 39 files into public/images/
npm run assets -- --force   # re-download everything
```

## What must be replaced before a public launch

Everything in the table below must be swapped for images you own or have licensed.
Keep the same file paths and names and no code changes are needed.

| Folder | Files | Used on |
| --- | --- | --- |
| `banners/` | hero-armchair, accessories, art-wall, modern-furniture, home-plants, console, summer-sale, bathroom-decor, bedroom-accessories, deal-of-the-day, newsletter (11 × `.jpg`) | Homepage hero, promo tiles, deal row, footer newsletter (every page) |
| `about/` | about-us.jpg, about-2.jpg | About page |
| `products/` | 22 product cut-outs (`group-*.png` / `group-*.jpg`) | Product cards, product pages, cart, search |
| `icons/` | info-circle, user, search, bag, empty-cart (`.svg`) | Downloaded for parity; the UI uses `react-icons` instead |

Not reused from the reference on purpose:

- **Logo**: the reference logo is the theme vendor's branded mark. The site uses a text wordmark (`components/ui/Logo.js`).
- **Copy**: page text, product descriptions, brand names and contact details are original placeholders (see `data/`).

## Behaviour without the assets

If `public/images/` is empty (e.g. a fresh clone, or a deployment built from GitHub), every image
request 404s and image slots show empty. Run `npm run assets` locally, or add licensed replacements,
before reviewing the design. This has not been tested as a "polished" state.
