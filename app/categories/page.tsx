import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/data';
import { getSiteUrl, SITE_NAME } from '@/lib/seo/config';
import { getCategorySlug, getUniqueCategories } from '@/lib/seo/slug';
import JsonLd from '@/components/seo/JsonLd';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { itemListSchema } from '@/lib/seo/jsonld';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Herbal Product Categories | ${SITE_NAME}`,
  description:
    'Browse natural herbs by category — detox, immune support, sleep, digestion, skin health, and more. Traditional medicinal herbs for every wellness goal.',
  alternates: { canonical: `${getSiteUrl()}/categories` },
};

export default async function CategoriesIndexPage() {
  const data = await getSiteData();
  const categories = getUniqueCategories(data.products);

  return (
    <PublicLayout settings={data.settings} products={data.products}>
      <JsonLd data={itemListSchema(data.products, data.settings)} />
      <main id="main-content" className="pt-4 sm:pt-6 lg:pt-24">
        <div className="container-app py-8 sm:py-12">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />
          <h1 className="text-display-md text-white mb-3">Herbal Product Categories</h1>
          <p className="text-body max-w-2xl mb-10">
            Find the right natural herbs for your wellness goals. Each category features hand-prepared traditional
            remedies for detox, immunity, sleep, pain relief, and healthy living.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = data.products.filter((p) => p.category === cat).length;
              const slug = getCategorySlug(cat);
              return (
                <Link
                  key={cat}
                  href={`/categories/${slug}`}
                  className="card-surface-interactive p-6 group"
                >
                  <h2 className="text-white font-bold text-lg group-hover:text-herb-400 transition-colors">{cat}</h2>
                  <p className="text-gray-500 text-sm mt-2">{count} herbal products</p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
