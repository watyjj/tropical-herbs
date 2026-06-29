import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Product, Settings } from '@/lib/types';
import { getWhatsAppUrl, getOrderProductMessage } from '@/lib/whatsapp';
import { getProductSlug, getCategorySlug } from '@/lib/seo/slug';
import {
  getProductImageAlt,
  getProductUsage,
  PRODUCT_WARNINGS,
  getProductSpecs,
  getProductFaqs,
} from '@/lib/seo/product-content';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQSection from '@/components/seo/FAQSection';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailView({
  product,
  settings,
  relatedProducts,
}: {
  product: Product;
  settings: Settings;
  relatedProducts: Product[];
}) {
  const waUrl = getWhatsAppUrl(settings, getOrderProductMessage(product.name, product.price));
  const categorySlug = getCategorySlug(product.category);
  const faqs = getProductFaqs(product);
  const specs = getProductSpecs(product);
  const benefits = product.benefits as string[];

  return (
    <main id="main-content" className="pt-4 sm:pt-6 lg:pt-24">
      <article className="container-app py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/#products' },
            { label: product.category, href: `/categories/${categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden card-surface bg-herb-950">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={getProductImageAlt(product)}
                fill
                className="object-cover"
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-6xl" aria-hidden>
                🌿
              </div>
            )}
          </div>

          <div>
            <p className="label-section">{product.category}</p>
            <h1 className="text-display-md text-white mt-2 mb-3">{product.name}</h1>
            {product.price && (
              <p className="text-2xl sm:text-3xl font-black mb-4" style={{ color: product.accent_color }}>
                {product.price}
              </p>
            )}
            <p className="text-body mb-6">{product.description}</p>

            <ul className="space-y-2 mb-6" aria-label="Product benefits">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-gray-400">
                  <CheckCircle size={16} className="text-herb-500 shrink-0 mt-0.5" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary gap-2 px-6 py-3.5 flex-1">
                <MessageCircle size={20} aria-hidden />
                Order on WhatsApp
              </a>
              <Link href="/#products" className="btn-secondary gap-2 px-6 py-3.5 text-center flex-1">
                Browse All Products
              </Link>
            </div>

            <dl className="card-surface p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-gray-500 text-xs uppercase tracking-wider">{s.label}</dt>
                  <dd className="text-white font-medium mt-0.5">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <section className="mt-12 sm:mt-16 grid md:grid-cols-2 gap-6" aria-labelledby="usage-heading">
          <div className="card-surface p-6">
            <h2 id="usage-heading" className="text-white font-bold text-lg mb-3">
              Usage Instructions
            </h2>
            <p className="text-body text-sm">{getProductUsage(product)}</p>
          </div>
          <div className="card-surface p-6">
            <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" aria-hidden />
              Important Warnings
            </h2>
            <ul className="space-y-2">
              {PRODUCT_WARNINGS.map((w) => (
                <li key={w} className="text-body text-sm flex gap-2">
                  <span className="text-amber-500 shrink-0" aria-hidden>
                    •
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-12 sm:mt-16">
          <FAQSection
            faqs={faqs}
            title={`${product.name} — FAQ`}
            subtitle="Common questions about this herbal product."
          />
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-12 sm:mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="heading-section mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} settings={settings} index={i} />
              ))}
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          <Link href={`/products/${getProductSlug(product)}`} className="hover:text-herb-400 transition-colors">
            Permalink
          </Link>
          {' · '}
          <Link href="/blog" className="hover:text-herb-400 transition-colors">
            Herbal Wellness Blog
          </Link>
          {' · '}
          <Link href="/faq" className="hover:text-herb-400 transition-colors">
            Full FAQ
          </Link>
        </p>
      </article>
    </main>
  );
}
