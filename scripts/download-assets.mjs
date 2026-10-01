// Downloads the reference demo images into public/images/ for LOCAL REVIEW ONLY.
//
// These files are the theme vendor's demo assets (stock photography and product
// cut-outs). They are NOT cleared for public production use. public/images/ is
// gitignored so they are never committed, pushed or deployed by accident.
// Replace them with licensed/owned images before any public launch.
//
// Usage: npm run assets
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://demo.phlox.pro/shop-decoration-1/wp-content/uploads/sites/321/';
const THEME = 'https://demo.phlox.pro/shop-decoration-1/wp-content/themes/phlox-pro/auxin/images/';
const OUT = path.join(process.cwd(), 'public', 'images');

// local path (relative to public/images) -> source URL
const manifest = {
  // Homepage / promo banners
  'banners/hero-armchair.jpg': BASE + '2021/10/15-12-20-1-89204-original-protected.jpg',
  'banners/accessories.jpg': BASE + '2021/10/876_13-40443-original-protected.jpg',
  'banners/art-wall.jpg': BASE + '2024/11/download.jpg',
  'banners/modern-furniture.jpg': BASE + '2021/10/Group-10193.jpg',
  'banners/home-plants.jpg': BASE + '2021/10/brown-sofa-wooden-table-living-room-interior-with-plant-concrete-wall.jpg',
  'banners/console.jpg': BASE + '2021/10/10-12-20-2-35805-original-protected.jpg',
  'banners/summer-sale.jpg': BASE + '2021/10/07-05-21-4-62503-original-protected.jpg',
  'banners/bathroom-decor.jpg': BASE + '2021/10/pexels-monstera-6620948.jpg',
  'banners/bedroom-accessories.jpg': BASE + '2021/10/2397p-1-47878-original-protected.jpg',
  'banners/deal-of-the-day.jpg': BASE + '2021/10/13-04-21-1-74486-original-protected.jpg',
  'banners/newsletter.jpg': BASE + '2021/10/03-04-21-2-34579-original-protected-scaled.jpg',

  // About page
  'about/about-us.jpg': BASE + '2021/10/about-us.jpg',
  'about/about-2.jpg': BASE + '2021/10/about-2-scaled.jpg',

  // Header / UI icons
  'icons/info-circle.svg': BASE + '2021/10/Info-Circle.svg',
  'icons/user.svg': BASE + '2021/10/noun_User_754636.svg',
  'icons/search.svg': BASE + '2021/10/Path-43.svg',
  'icons/bag.svg': BASE + '2021/10/noun_bag_3819495.svg',
  'icons/empty-cart.svg': THEME + 'other/empty-cart.svg',

  // Product images (full size originals)
  'products/group-10194.png': BASE + '2021/10/Group-10194.png',
  'products/group-10194.jpg': BASE + '2021/10/Group-10194.jpg',
  'products/group-10195.png': BASE + '2021/10/Group-10195.png',
  'products/group-10198.png': BASE + '2021/10/Group-10198.png',
  'products/group-10200.png': BASE + '2021/10/Group-10200.png',
  'products/group-10201.png': BASE + '2021/10/Group-10201.png',
  'products/group-10202.png': BASE + '2021/10/Group-10202.png',
  'products/group-10203.png': BASE + '2021/10/Group-10203.png',
  'products/group-10204.png': BASE + '2021/10/Group-10204.png',
  'products/group-10205.png': BASE + '2021/10/Group-10205.png',
  'products/group-10194dg.jpg': BASE + '2023/03/Group-10194dg.jpg',
  'products/group-10194e.jpg': BASE + '2023/03/Group-10194e.jpg',
  'products/group-10194er.jpg': BASE + '2023/03/Group-10194er.jpg',
  'products/group-10194k.jpg': BASE + '2023/03/Group-10194k.jpg',
  'products/group-10194q.jpg': BASE + '2023/03/Group-10194q.jpg',
  'products/group-10194s.jpg': BASE + '2023/03/Group-10194s.jpg',
  'products/group-10194sx.jpg': BASE + '2023/03/Group-10194sx.jpg',
  'products/group-10194w.jpg': BASE + '2023/03/Group-10194w.jpg',
  'products/group-10194x.jpg': BASE + '2023/03/Group-10194x.jpg',
  'products/group-10157.jpg': BASE + '2023/03/Group_10157.jpg',
  'products/group-10161.jpg': BASE + '2023/03/Group_10161.jpg',
};

const force = process.argv.includes('--force');
let ok = 0;
let failed = 0;

for (const [rel, url] of Object.entries(manifest)) {
  const dest = path.join(OUT, rel);
  if (!force) {
    try {
      await access(dest);
      ok++;
      continue;
    } catch {
      // not downloaded yet
    }
  }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log('✓', rel);
    ok++;
  } catch (err) {
    console.error('✗', rel, '-', err.message);
    failed++;
  }
}

console.log(`\n${ok} assets ready, ${failed} failed (in public/images/)`);
if (failed) process.exitCode = 1;
