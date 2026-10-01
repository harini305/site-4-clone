import { Montserrat, Questrial, Mrs_Saint_Delafield } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { StoreProvider } from '@/context/StoreContext';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import SearchOverlay from '@/components/layout/SearchOverlay';
import MobileMenu from '@/components/layout/MobileMenu';
import Toasts from '@/components/ui/Toasts';
import BackToTop from '@/components/ui/BackToTop';
import ScrollManager from '@/components/layout/ScrollManager';
import { site } from '@/data/site';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const questrial = Questrial({ subsets: ['latin'], weight: '400', variable: '--font-questrial', display: 'swap' });
const script = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap' });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Furniture & Home Decor`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#060b12',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${questrial.variable} ${script.variable}`}>
      <body>
        <StoreProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <TopBar />
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <MobileMenu />
          <Toasts />
          <BackToTop />
          <ScrollManager />
        </StoreProvider>
      </body>
    </html>
  );
}
