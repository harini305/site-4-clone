// Product catalog. Names, prices, categories and images mirror the reference
// catalog; descriptions are original placeholder copy.
// Images live in public/images/products (see scripts/download-assets.mjs).

const img = (file) => `/images/products/${file}`;

// Brand and colour values are neutral placeholders for the shop filters.
export const brands = ['Atelier', 'Haven', 'Lumen', 'Nordic', 'Oakline', 'Terra'];
export const colors = [
  { slug: 'blue', name: 'Blue', hex: '#5b7fa6' },
  { slug: 'green', name: 'Green', hex: '#4f7a4a' },
  { slug: 'orange', name: 'Orange', hex: '#d98a3d' },
  { slug: 'red', name: 'Red', hex: '#b8473e' },
];

const details = {
  lamp: {
    short:
      'A soft, warm light source that brings a calm, lived-in glow to living rooms, bedrooms and reading corners.',
    features: [
      'Hand-finished body with a durable protective coating',
      'Works with standard E27 warm-white LED bulbs',
      'Generous cable length for flexible placement',
      'Wipe clean with a soft, dry cloth',
    ],
  },
  decor: {
    short:
      'A characterful decorative piece designed to add texture and personality to shelves, consoles and side tables.',
    features: [
      'Crafted from natural, hand-selected materials',
      'Each piece varies slightly, making it one of a kind',
      'Pairs well with neutral and earthy interiors',
      'Display indoors away from direct moisture',
    ],
  },
  seat: {
    short:
      'Comfortable seating with clean, timeless lines — built to be used every day and to look good doing it.',
    features: [
      'Solid hardwood frame with a natural oil finish',
      'High-resilience foam cushioning',
      'Easy-care upholstery fabric',
      'Delivered fully assembled',
    ],
  },
};

const p = (o) => ({
  salePrice: null,
  brand: null,
  color: null,
  featured: false,
  dimensions: '42 x 15 x 20 cm',
  ...o,
  description: details[o.kind].short,
  features: details[o.kind].features,
});

export const products = [
  p({ id: 93, slug: 'color-art', name: 'Color Art', price: 15, categories: ['plants'], kind: 'decor', brand: 'Terra', color: 'orange', images: [img('group-10198.png')] }),
  p({ id: 96, slug: 'comfy-chair', name: 'Comfy Chair', price: 30, categories: ['mirror'], kind: 'seat', brand: 'Nordic', color: 'blue', images: [img('group-10204.png')] }),
  p({ id: 105, slug: 'deco-dish', name: 'Deco Dish', price: 15, salePrice: 15, regularPrice: 20, categories: ['bathroom'], kind: 'decor', brand: 'Oakline', color: 'orange', images: [img('group-10195.png')] }),
  p({ id: 108, slug: 'deco-glow', name: 'Deco Glow', price: 20, salePrice: 20, regularPrice: 300, categories: ['bedroom'], kind: 'lamp', brand: 'Lumen', images: [img('group-10194.png')] }),
  p({ id: 1194, slug: 'desk-decor-2', name: 'Desk Decor', price: 15, categories: ['chair', 'kitchen'], kind: 'decor', brand: 'Terra', color: 'red', images: [img('group-10203.png')] }),
  p({ id: 98, slug: 'soft-glow', name: 'Soft Armchair', price: 15, categories: ['lightening'], kind: 'lamp', brand: 'Lumen', images: [img('group-10201.png')] }),
  p({ id: 110, slug: 'soft-chair', name: 'Soft Chair', price: 30, categories: ['console', 'mirror'], kind: 'seat', brand: 'Nordic', color: 'red', images: [img('group-10200.png')] }),
  p({ id: 113, slug: 'soft-glow-2', name: 'Soft Glow', price: 65, categories: ['desk', 'inside'], kind: 'seat', brand: 'Haven', color: 'blue', images: [img('group-10202.png')] }),
  p({ id: 4289, slug: 'soft-glow-3', name: 'Soft Glow', price: 62, categories: ['chair'], kind: 'seat', brand: 'Oakline', color: 'green', images: [img('group-10194.jpg'), img('group-10205.png')] }),
  p({ id: 4292, slug: 'soft-glow-4', name: 'Soft Glow', price: 90000, categories: ['mirror'], kind: 'lamp', brand: 'Atelier', images: [img('group-10194w.jpg'), img('group-10194q.jpg')] }),
  p({ id: 4302, slug: 'soft-glow-5', name: 'Soft Glow', price: 27000, categories: ['plants'], kind: 'decor', brand: 'Terra', color: 'green', images: [img('group-10157.jpg'), img('group-10161.jpg')] }),
  p({ id: 4310, slug: 'soft-glow-6', name: 'Soft Glow', price: 3400, categories: ['lightening'], kind: 'lamp', brand: 'Lumen', featured: true, images: [img('group-10194w.jpg'), img('group-10201.png')] }),
  p({ id: 4311, slug: 'soft-glow-7', name: 'Soft Glow', price: 27000, categories: ['lightening'], kind: 'decor', brand: 'Haven', featured: true, images: [img('group-10194e.jpg'), img('group-10194w.jpg')] }),
  p({ id: 4312, slug: 'soft-glow-8', name: 'Soft Glow', price: 90000, categories: ['kitchen'], kind: 'decor', brand: 'Atelier', featured: true, images: [img('group-10194sx.jpg'), img('group-10194k.jpg')] }),
  p({ id: 4314, slug: 'soft-glow-9', name: 'Soft Glow', price: 9950, categories: ['inside'], kind: 'decor', brand: 'Haven', featured: true, images: [img('group-10194x.jpg'), img('group-10203.png')] }),
  p({ id: 4315, slug: 'soft-glow-10', name: 'Soft Glow', price: 90000, categories: ['furniture'], kind: 'seat', brand: 'Nordic', featured: true, images: [img('group-10204.png'), img('group-10202.png')] }),
  p({ id: 4316, slug: '4316', name: 'Soft Glow', price: 3500, categories: ['desk'], kind: 'seat', brand: 'Oakline', featured: true, images: [img('group-10194s.jpg'), img('group-10194.jpg')] }),
  p({ id: 4318, slug: 'soft-glow-11', name: 'Soft Glow', price: 100000, categories: ['decorative'], kind: 'decor', brand: 'Atelier', featured: true, images: [img('group-10194er.jpg'), img('group-10194q.jpg')] }),
  p({ id: 4321, slug: 'soft-glow-12', name: 'Soft Glow', price: 99500, categories: ['bedroom'], kind: 'decor', brand: 'Haven', featured: true, images: [img('group-10194dg.jpg'), img('group-10194q.jpg')] }),
  p({ id: 103, slug: 'wood-chair', name: 'Wood Chair', price: 35, categories: ['decorative', 'furniture'], kind: 'seat', brand: 'Oakline', images: [img('group-10205.png')] }),
];

// "Deal of the day" product on the homepage (not part of the shop listing on the reference).
export const dealOfTheDay = {
  name: 'Aqua Globes 2',
  regularPrice: 300,
  price: 250,
  href: '/shop',
};
