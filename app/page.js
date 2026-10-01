import Hero from '@/components/sections/Hero';
import PromoGrid from '@/components/sections/PromoGrid';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import DealRow from '@/components/sections/DealRow';
import Features from '@/components/sections/Features';

export const metadata = {
  title: { absolute: 'Shop Decoration — Furniture & Home Decor' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoGrid />
      <FeaturedProducts />
      <DealRow />
      <Features />
    </>
  );
}
