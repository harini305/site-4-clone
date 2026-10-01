import { Suspense } from 'react';
import ShopView from '@/components/shop/ShopView';

export const metadata = {
  title: 'Search results',
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <ShopView searchMode />
    </Suspense>
  );
}
