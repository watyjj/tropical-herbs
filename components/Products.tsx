'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, Settings } from '@/lib/types';
import RevealOnScroll from './RevealOnScroll';
import ProductCard from './ProductCard';

export default function Products({ products, settings }: { products: Product[]; settings: Settings }) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(
    () => (activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory)),
    [products, activeCategory]
  );

  return (
    <section id="products" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-herb-500 text-sm font-bold uppercase tracking-widest">Our Products</span>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
              Natural Healing Solutions
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Each remedy is hand-prepared using time-tested tropical herbs, roots, and natural ingredients
              passed down through generations of traditional healing.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-herb-600 text-white shadow-lg shadow-herb-600/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} settings={settings} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-12">No products in this category yet.</p>
        )}
      </div>
    </section>
  );
}
