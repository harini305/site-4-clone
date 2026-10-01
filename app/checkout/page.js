import PageHeader from '@/components/layout/PageHeader';
import CheckoutView from '@/components/store/CheckoutView';

export const metadata = {
  title: 'Checkout',
  description: "Complete your order.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <section className="container" aria-labelledby="page-title">
      <PageHeader title="Checkout" />
      <CheckoutView />
    </section>
  );
}
