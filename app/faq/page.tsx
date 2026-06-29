import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteData } from '@/lib/data';
import { buildFaqMetadata } from '@/lib/seo/metadata';
import { faqSchema, breadcrumbSchema } from '@/lib/seo/jsonld';
import { getSiteFaqs } from '@/lib/seo/product-content';
import { getSiteUrl } from '@/lib/seo/config';
import JsonLd from '@/components/seo/JsonLd';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQSection from '@/components/seo/FAQSection';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  return buildFaqMetadata(data.settings);
}

export default async function FaqPage() {
  const data = await getSiteData();
  const faqs = getSiteFaqs(data.settings.location);
  const siteUrl = getSiteUrl();

  return (
    <PublicLayout settings={data.settings} products={data.products}>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', url: siteUrl },
            { name: 'FAQ', url: `${siteUrl}/faq` },
          ]),
        ]}
      />
      <main id="main-content" className="pt-4 sm:pt-6 lg:pt-24">
        <div className="container-app py-8 sm:py-12 max-w-3xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
          <h1 className="text-display-md text-white mb-3">Herbal Products FAQ</h1>
          <p className="text-body mb-8">
            Answers about natural herbs, traditional remedies, ordering, delivery, and safe herbal use at{' '}
            {data.settings.site_name}. Serving {data.settings.location} and customers across South Africa and Africa.
          </p>
          <FAQSection faqs={faqs} title="Common Questions" subtitle="" />
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="/products" className="btn-primary text-sm px-5 py-2.5">
              Browse Products
            </Link>
            <Link href="/blog" className="btn-secondary text-sm px-5 py-2.5">
              Read Our Blog
            </Link>
            <Link href="/#contact" className="btn-secondary text-sm px-5 py-2.5">
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
