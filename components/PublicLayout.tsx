'use client';

import { usePathname } from 'next/navigation';
import type { Settings, Product } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MobileBottomNav from '@/components/MobileBottomNav';
import SubpageBackBar from '@/components/SubpageBackBar';

export default function PublicLayout({
  settings,
  products,
  children,
}: {
  settings: Settings;
  products: Product[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSubpage = pathname !== '/';

  return (
    <>
      <Navbar settings={settings} />
      <SubpageBackBar />
      <div className={`pb-mobile-nav ${isSubpage ? 'subpage-content-offset' : ''}`}>{children}</div>
      <Footer settings={settings} products={products} />
      <WhatsAppFloat settings={settings} />
      <MobileBottomNav settings={settings} />
    </>
  );
}
