import { Suspense } from 'react';
import ShopView from '@/components/shop/ShopView';

export const metadata = {
  title: 'Shop',
  description: 'Browse furniture, lighting, plants and decorative accessories.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopView title="Featured Product" />
    </Suspense>
  );
}
