import type { Metadata } from 'next';
import { getSiteData } from '@/lib/data';
import { buildHomeMetadata } from '@/lib/seo/metadata';
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  itemListSchema,
  faqSchema,
} from '@/lib/seo/jsonld';
import { getSiteFaqs } from '@/lib/seo/product-content';
import JsonLd from '@/components/seo/JsonLd';
import HomePage from '@/components/HomePage';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  return buildHomeMetadata(data.settings);
}

export default async function Page() {
  const data = await getSiteData();
  const faqs = getSiteFaqs(data.settings.location);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(data.settings),
          websiteSchema(data.settings),
          localBusinessSchema(data.settings, data.testimonials),
          itemListSchema(data.products, data.settings),
          faqSchema(faqs),
        ]}
      />
      <HomePage data={data} faqs={faqs} />
    </>
  );
}
