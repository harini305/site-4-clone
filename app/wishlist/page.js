import PageHeader from '@/components/layout/PageHeader';
import WishlistView from '@/components/store/WishlistView';

export const metadata = {
  title: 'Wishlist',
  description: "Products you've saved for later.",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <section className="container" aria-labelledby="page-title">
      <PageHeader title="Wishlist" />
      <WishlistView />
    </section>
  );
}
