import { Suspense } from 'react';
import ShopView from '@/components/shop/ShopView';

// "/store" is the target of the homepage "Shop now" tiles on the reference site.
// The reference page itself is an empty page-builder template, so here it shows the full catalog.
export const metadata = {
  title: 'Store',
  description: 'Shop the full collection of home decoration products.',
  alternates: { canonical: '/shop' },
};

export default function StorePage() {
  return (
    <Suspense fallback={null}>
      <ShopView title="Store" />
    </Suspense>
  );
}
