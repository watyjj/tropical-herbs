'use client';

import type { Settings, Product } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function PublicLayout({
  settings,
  products,
  children,
}: {
  settings: Settings;
  products: Product[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar settings={settings} />
      <div className="pb-mobile-nav">{children}</div>
      <Footer settings={settings} products={products} />
      <WhatsAppFloat settings={settings} />
      <MobileBottomNav settings={settings} />
    </>
  );
}
