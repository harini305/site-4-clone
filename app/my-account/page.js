import AccountView from '@/components/store/AccountView';

export const metadata = {
  title: 'My account',
  description: 'Sign in to your account.',
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <section className="container page-section">
      <AccountView />
    </section>
  );
}
