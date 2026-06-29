'use client';

import { useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageOpen, Search } from 'lucide-react';
import type { Product, Settings } from '@/lib/types';
import { getCategorySlug } from '@/lib/seo/slug';
import RevealOnScroll from './RevealOnScroll';
import ProductCard from './ProductCard';
import SectionHeader from './ui/SectionHeader';

export default function Products({ products, settings }: { products: Product[]; settings: Settings }) {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim().toLowerCase();
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let list = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.benefits as string[]).some((b) => b.toLowerCase().includes(query))
      );
    }
    return list;
  }, [products, activeCategory, query]);

  return (
    <section id="products" className="section-padding relative" aria-labelledby="products-heading">
      <div className="container-app">
        <RevealOnScroll>
          <SectionHeader
            headingId="products-heading"
            label="Our Products"
            title="Natural Healing Solutions"
            description="Each remedy is hand-prepared using time-tested tropical herbs, roots, and natural ingredients passed down through generations of traditional healing."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={1}>
          <div className="mb-6 sm:mb-8 max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden />
            <form action="/products" method="get" role="search">
              <label htmlFor="product-search" className="sr-only">
                Search herbal products
              </label>
              <input
                id="product-search"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search herbs, remedies, categories…"
                className="w-full min-h-[48px] pl-11 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-gray-500 text-sm focus:border-herb-500/50 focus:outline-none"
                autoComplete="off"
              />
            </form>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-2 mb-8 sm:mb-12 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center sm:overflow-visible"
            role="tablist"
            aria-label="Product categories"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-herb-600 text-white shadow-lg shadow-herb-600/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <p className="text-center text-sm text-gray-600 mb-6">
          <Link href="/products" className="text-herb-400 hover:underline">
            View all products
          </Link>
          {' · '}
          <Link href="/categories" className="text-herb-400 hover:underline">
            Browse categories
          </Link>
          {' · '}
          <Link href="/blog" className="text-herb-400 hover:underline">
            Herbal guides
          </Link>
        </p>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} settings={settings} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="card-surface flex flex-col items-center justify-center py-16 px-6 text-center" role="status">
            <PackageOpen size={40} className="text-gray-600 mb-4" aria-hidden />
            <p className="text-white font-medium mb-1">
              {query ? `No products matching "${query}"` : 'No products in this category'}
            </p>
            <p className="text-gray-500 text-sm">Try a different search or category.</p>
          </div>
        )}

        {activeCategory !== 'All' && (
          <p className="text-center mt-8">
            <Link
              href={`/categories/${getCategorySlug(activeCategory)}`}
              className="text-herb-400 text-sm hover:underline"
            >
              View all {activeCategory} products →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
