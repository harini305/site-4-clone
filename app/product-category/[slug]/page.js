import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ShopView from '@/components/shop/ShopView';
import { categories, getCategory } from '@/data/categories';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name}`,
    description: `Shop ${category.name.toLowerCase()} products at Shop Decoration.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <Suspense fallback={null}>
      <ShopView title={category.name} category={category.slug} />
    </Suspense>
  );
}
