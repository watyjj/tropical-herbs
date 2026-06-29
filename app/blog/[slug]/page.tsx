import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, BLOG_POSTS } from '@/lib/seo/blog-posts';
import { buildBlogPostMetadata } from '@/lib/seo/metadata';
import { getSiteData } from '@/lib/data';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/jsonld';
import { getSiteUrl } from '@/lib/seo/config';
import JsonLd from '@/components/seo/JsonLd';
import PublicLayout from '@/components/PublicLayout';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQSection from '@/components/seo/FAQSection';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Article Not Found' };
  return buildBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const data = await getSiteData();
  const siteUrl = getSiteUrl();
  const related = BLOG_POSTS.filter((p) => post.relatedSlugs.includes(p.slug));

  return (
    <PublicLayout settings={data.settings} products={data.products}>
      <JsonLd
        data={[
          articleSchema(post),
          faqSchema(post.faqs),
          breadcrumbSchema([
            { name: 'Home', url: siteUrl },
            { name: 'Blog', url: `${siteUrl}/blog` },
            { name: post.title, url: `${siteUrl}/blog/${post.slug}` },
          ]),
        ]}
      />
      <main id="main-content" className="pt-20 sm:pt-24">
        <article className="container-app py-8 sm:py-12 max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
          <header className="mb-8">
            <p className="label-section">{post.category}</p>
            <h1 className="text-display-md text-white mt-2 mb-4">{post.title}</h1>
            <p className="text-body">{post.description}</p>
            <div className="flex gap-4 mt-4 text-sm text-gray-600">
              <time dateTime={post.datePublished}>
                Published{' '}
                {new Date(post.datePublished).toLocaleDateString('en-ZA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>{post.readTime}</span>
            </div>
          </header>

          <nav aria-label="Table of contents" className="card-surface p-5 mb-10">
            <h2 className="text-white font-semibold text-sm mb-3">Table of Contents</h2>
            <ol className="space-y-2 text-sm">
              {post.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#section-${i}`} className="text-herb-400 hover:underline">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose-custom space-y-10">
            {post.sections.map((section, i) => (
              <section key={section.heading} id={`section-${i}`}>
                <h2 className="text-white font-bold text-xl sm:text-2xl mb-4">{section.heading}</h2>
                <p className="text-body leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 p-5 card-surface text-sm text-gray-400">
            <p>
              <strong className="text-white">Disclaimer:</strong> This article is for educational purposes. Herbal
              products are traditional natural remedies and do not replace professional medical advice. Consult a
              healthcare provider for personal health concerns.
            </p>
          </div>

          {post.faqs.length > 0 && (
            <div className="mt-12">
              <FAQSection faqs={post.faqs} title="Article FAQ" subtitle="" />
            </div>
          )}

          {related.length > 0 && (
            <section className="mt-12" aria-labelledby="related-articles">
              <h2 id="related-articles" className="text-white font-bold text-lg mb-4">
                Related Articles
              </h2>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="text-herb-400 hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary text-sm px-5 py-2.5">
              Shop Herbal Products
            </Link>
            <Link href="/faq" className="btn-secondary text-sm px-5 py-2.5">
              Read FAQ
            </Link>
          </div>
        </article>
      </main>
    </PublicLayout>
  );
}
