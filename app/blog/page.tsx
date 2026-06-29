import type { Metadata } from 'next';
import Link from 'next/link';
import { buildBlogIndexMetadata } from '@/lib/seo/metadata';
import { BLOG_POSTS } from '@/lib/seo/blog-posts';
import { getSiteData } from '@/lib/data';
import JsonLd from '@/components/seo/JsonLd';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { getSiteUrl } from '@/lib/seo/config';
import { breadcrumbSchema } from '@/lib/seo/jsonld';

export const metadata: Metadata = buildBlogIndexMetadata();

export default async function BlogIndexPage() {
  const data = await getSiteData();
  const siteUrl = getSiteUrl();

  return (
    <PublicLayout settings={data.settings} products={data.products}>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: siteUrl },
          { name: 'Blog', url: `${siteUrl}/blog` },
        ])}
      />
      <main id="main-content" className="pt-4 sm:pt-6 lg:pt-24">
        <div className="container-app py-8 sm:py-12">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
          <h1 className="text-display-md text-white mb-3">Herbal Wellness Blog</h1>
          <p className="text-body max-w-2xl mb-10">
            Educational guides on natural herbs, traditional medicine, moringa benefits, immune support, and how to
            choose quality herbal supplements for healthy living.
          </p>
          <div className="grid gap-6">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="card-surface-interactive p-6 sm:p-8">
                <p className="label-section">{post.category}</p>
                <h2 className="text-white font-bold text-xl sm:text-2xl mt-2 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-herb-400 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-body text-sm mb-4">{post.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <time dateTime={post.datePublished}>
                    {new Date(post.datePublished).toLocaleDateString('en-ZA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className="text-herb-400 font-medium hover:underline ml-auto">
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
