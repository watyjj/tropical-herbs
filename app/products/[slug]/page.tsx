import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteData } from '@/lib/data';
import { buildProductMetadata } from '@/lib/seo/metadata';
import { findProductBySlug, getProductSlug, getCategorySlug } from '@/lib/seo/slug';
import { productSchema, breadcrumbSchema, faqSchema } from '@/lib/seo/jsonld';
import { getSiteUrl } from '@/lib/seo/config';
import { getProductFaqs } from '@/lib/seo/product-content';
import JsonLd from '@/components/seo/JsonLd';
import PublicLayout from '@/components/PublicLayout';
import ProductDetailView from '@/components/seo/ProductDetailView';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const data = await getSiteData();
  return data.products.map((p) => ({ slug: getProductSlug(p) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getSiteData();
  const product = findProductBySlug(data.products, params.slug);
  if (!product) return { title: 'Product Not Found' };
  return buildProductMetadata(product, data.settings);
}

export default async function ProductPage({ params }: Props) {
  const data = await getSiteData();
  const product = findProductBySlug(data.products, params.slug);
  if (!product) notFound();

  const siteUrl = getSiteUrl();
  const categorySlug = getCategorySlug(product.category);
  const related = data.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  const faqs = getProductFaqs(product);

  return (
    <PublicLayout settings={data.settings} products={data.products}>
      <JsonLd
        data={[
          productSchema(product, data.settings),
          breadcrumbSchema([
            { name: 'Home', url: siteUrl },
            { name: 'Products', url: `${siteUrl}/products` },
            { name: product.category, url: `${siteUrl}/categories/${categorySlug}` },
            { name: product.name, url: `${siteUrl}/products/${params.slug}` },
          ]),
          faqSchema(faqs),
        ]}
      />
      <ProductDetailView product={product} settings={data.settings} relatedProducts={related} />
    </PublicLayout>
  );
}
