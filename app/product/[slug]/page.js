import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import { products } from '@/data/products';
import { getProduct, getRelatedProducts } from '@/lib/catalog';
import styles from './page.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="container">
      <div className={styles.top}>
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>
      <ProductTabs product={product} />
      <RelatedProducts products={getRelatedProducts(product, 8)} />
    </div>
  );
}
