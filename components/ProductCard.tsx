'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, MessageCircle, ShoppingBag, Star } from 'lucide-react';
import type { Product, Settings } from '@/lib/types';
import { getWhatsAppUrl, getOrderProductMessage } from '@/lib/whatsapp';
import { getProductSlug } from '@/lib/seo/slug';
import { getProductImageAlt } from '@/lib/seo/product-content';

export default function ProductCard({
  product,
  settings,
  index,
}: {
  product: Product;
  settings: Settings;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduced = useReducedMotion();
  const waUrl = getWhatsAppUrl(settings, getOrderProductMessage(product.name, product.price));
  const productHref = `/products/${getProductSlug(product)}`;

  return (
    <motion.article
      layout
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: reduced ? 0 : index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group card-surface-interactive overflow-hidden flex flex-col"
      style={{
        boxShadow:
          hovered && !reduced
            ? `0 12px 48px ${product.accent_color}25, 0 0 0 1px ${product.accent_color}30`
            : undefined,
      }}
    >
      <Link href={productHref} className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-gradient-to-br from-herb-950 to-black block">
        {product.image_url && !imgError ? (
          <motion.div
            animate={{ scale: hovered && !reduced ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={product.image_url}
              alt={getProductImageAlt(product)}
              fill
              className="object-cover"
              unoptimized
              loading="lazy"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-herb-800" role="img" aria-label="Product image placeholder">
            <span className="text-5xl" aria-hidden>
              🌿
            </span>
            <span className="text-xs text-gray-600 px-4 text-center">Image coming soon</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" aria-hidden />

        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-herb-600 text-white px-2.5 py-1 rounded-full">
            In Stock
          </span>
        </div>
        <span
          className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full backdrop-blur-md border"
          style={{
            color: product.accent_color,
            borderColor: `${product.accent_color}50`,
            backgroundColor: 'rgba(0,0,0,0.65)',
          }}
        >
          {product.category}
        </span>
      </Link>

      <div className="relative z-10 p-4 sm:p-5 flex flex-col flex-1 -mt-4 sm:-mt-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-bold text-base sm:text-lg leading-tight flex-1">
            <Link href={productHref} className="group-hover:text-herb-400 transition-colors">
              {product.name}
            </Link>
          </h3>
          {product.price && (
            <span
              className="text-lg sm:text-xl font-black whitespace-nowrap shrink-0"
              style={{ color: product.accent_color }}
            >
              {product.price}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-3" aria-label="Rated 4.9 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" aria-hidden />
          ))}
          <span className="text-gray-600 text-xs ml-1">(4.9)</span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>

        <ul className="space-y-1.5 mb-4" aria-label="Product benefits">
          {(product.benefits as string[]).slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-xs text-gray-400">
              <CheckCircle size={12} style={{ color: product.accent_color }} className="shrink-0" aria-hidden />
              <span className="line-clamp-1">{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 mt-auto">
          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full gap-2 py-3.5 text-sm"
            whileHover={reduced ? undefined : { scale: 1.01 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            <MessageCircle size={18} aria-hidden />
            Order on WhatsApp
          </motion.a>
          <Link
            href={productHref}
            className="btn-secondary w-full gap-2 py-2.5 text-xs border-white/10 text-center"
          >
            <ShoppingBag size={14} className="inline mr-1" aria-hidden />
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
