import type { Product } from '@/lib/types';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getProductSlug(product: Product): string {
  return slugify(product.name);
}

export function getCategorySlug(category: string): string {
  return slugify(category);
}

export function findProductBySlug(products: Product[], slug: string): Product | undefined {
  const matches = products.filter((p) => getProductSlug(p) === slug);
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) {
    return matches.find((p) => p.id.endsWith(slug)) ?? matches[0];
  }
  return products.find((p) => p.id === slug);
}

export function getUniqueCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export function parsePrice(price: string): { value: number; currency: string } | null {
  const zar = price.match(/R\s*([\d,.]+)/i);
  if (zar) return { value: parseFloat(zar[1].replace(',', '')), currency: 'ZAR' };
  const usd = price.match(/\$\s*([\d,.]+)/i);
  if (usd) return { value: parseFloat(usd[1].replace(',', '')), currency: 'USD' };
  const num = price.match(/([\d,.]+)/);
  if (num) return { value: parseFloat(num[1].replace(',', '')), currency: 'ZAR' };
  return null;
}
