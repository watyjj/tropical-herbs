'use client';

import type { SiteData } from '@/lib/types';
import Navbar from './Navbar';
import Hero from './Hero';
import Products from './Products';
import PromoBanners from './PromoBanners';
import About from './About';
import Testimonials from './Testimonials';
import WhatsAppCTA from './WhatsAppCTA';
import Contact from './Contact';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function HomePage({ data }: { data: SiteData }) {
  return (
    <>
      <Navbar settings={data.settings} />
      <main>
        <Hero settings={data.settings} />
        <PromoBanners banners={data.banners} settings={data.settings} />
        <Products products={data.products} settings={data.settings} />
        <About settings={data.settings} />
        <Testimonials testimonials={data.testimonials} />
        <WhatsAppCTA settings={data.settings} />
        <Contact settings={data.settings} />
      </main>
      <Footer settings={data.settings} products={data.products} />
      <WhatsAppFloat settings={data.settings} />
    </>
  );
}
