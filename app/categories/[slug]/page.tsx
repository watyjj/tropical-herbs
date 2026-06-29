import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteData } from '@/lib/data';
import { buildCategoryMetadata } from '@/lib/seo/metadata';
import { getCategorySlug, getUniqueCategories } from '@/lib/seo/slug';
import { categoryItemListSchema, breadcrumbSchema } from '@/lib/seo/jsonld';
import { getSiteUrl } from '@/lib/seo/config';
import JsonLd from '@/components/seo/JsonLd';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const data = await getSiteData();
  return getUniqueCategories(data.products).map((cat) => ({ slug: getCategorySlug(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getSiteData();
  const category = getUniqueCategories(data.products).find((c) => getCategorySlug(c) === params.slug);
  if (!category) return { title: 'Category Not Found' };
  const count = data.products.filter((p) => p.category === category).length;
  return buildCategoryMetadata(category, data.settings, count);
}

export default async function CategoryPage({ params }: Props) {
  const data = await getSiteData();
  const category = getUniqueCategories(data.products).find((c) => getCategorySlug(c) === params.slug);
  if (!category) notFound();

  const products = data.products.filter((p) => p.category === category);
  const siteUrl = getSiteUrl();

  return (
    <PublicLayout settings={data.settings} products={data.products}>
      <JsonLd
        data={[
          categoryItemListSchema(category, products),
          breadcrumbSchema([
            { name: 'Home', url: siteUrl },
            { name: 'Categories', url: `${siteUrl}/categories` },
            { name: category, url: `${siteUrl}/categories/${params.slug}` },
          ]),
        ]}
      />
      <main id="main-content" className="pt-20 sm:pt-24">
        <div className="container-app py-8 sm:py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/categories' },
              { label: category },
            ]}
          />
          <h1 className="text-display-md text-white mb-3">{category} Herbal Products</h1>
          <p className="text-body max-w-2xl mb-10">
            Explore {products.length} natural {category.toLowerCase()} remedies handcrafted with traditional herbs.
            Buy medicinal herbs online — order any product via WhatsApp for personal guidance and delivery.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} settings={data.settings} index={i} />
            ))}
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
