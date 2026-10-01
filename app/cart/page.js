import PageHeader from '@/components/layout/PageHeader';
import CartView from '@/components/store/CartView';

export const metadata = {
  title: 'Cart',
  description: "Review the products in your cart.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="container" aria-labelledby="page-title">
      <PageHeader title="Cart" />
      <CartView />
    </section>
  );
}
