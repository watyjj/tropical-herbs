import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/data';
import { getSiteUrl, SITE_NAME } from '@/lib/seo/config';
import { getProductSlug } from '@/lib/seo/slug';
import { itemListSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `All Herbal Products | Buy Natural Herbs Online | ${SITE_NAME}`,
  description:
    'Browse our full catalog of natural herbs and traditional herbal products. Detox, immunity, sleep, digestion & more. Order via WhatsApp with nationwide delivery.',
  alternates: { canonical: `${getSiteUrl()}/products` },
};

export default async function ProductsIndexPage() {
  const data = await getSiteData();
  const siteUrl = getSiteUrl();

  return (
    <PublicLayout settings={data.settings} products={data.products}>
      <JsonLd data={itemListSchema(data.products, data.settings)} />
      <main id="main-content" className="pt-4 sm:pt-6 lg:pt-24">
        <div className="container-app py-8 sm:py-12">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Products' }]} />
          <h1 className="text-display-md text-white mb-3">All Herbal Products</h1>
          <p className="text-body max-w-2xl mb-8">
            Shop our complete range of natural herbs, medicinal remedies, and traditional wellness products.
            Every item is hand-prepared and available to order via WhatsApp.
          </p>
          <div className="mb-8 flex flex-wrap gap-2">
            <Link href="/categories" className="btn-secondary text-sm px-4 py-2">
              Browse by Category
            </Link>
            <Link href="/blog" className="btn-secondary text-sm px-4 py-2">
              Herbal Wellness Blog
            </Link>
            <Link href="/faq" className="btn-secondary text-sm px-4 py-2">
              FAQ
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {data.products.map((p, i) => (
              <ProductCard key={p.id} product={p} settings={data.settings} index={i} />
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-600">
            {data.products.length} natural herbal products ·{' '}
            <Link href="/" className="text-herb-400 hover:underline">
              Back to homepage
            </Link>
          </p>
        </div>
      </main>
    </PublicLayout>
  );
}
