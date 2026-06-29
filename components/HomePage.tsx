'use client';

import type { SiteData } from '@/lib/types';
import { Suspense } from 'react';
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
import MobileBottomNav from './MobileBottomNav';
import FAQSection from './seo/FAQSection';

export default function HomePage({
  data,
  faqs,
}: {
  data: SiteData;
  faqs: { question: string; answer: string }[];
}) {
  return (
    <>
      <Navbar settings={data.settings} />
      <main id="main-content" className="pb-mobile-nav">
        <Hero settings={data.settings} />
        <PromoBanners banners={data.banners} settings={data.settings} />
        <Suspense fallback={null}>
          <Products products={data.products} settings={data.settings} />
        </Suspense>
        <About settings={data.settings} />
        <Testimonials testimonials={data.testimonials} />
        <FAQSection faqs={faqs.slice(0, 6)} />
        <p className="text-center pb-8 -mt-4">
          <a href="/faq" className="text-herb-400 text-sm hover:underline">
            View all frequently asked questions →
          </a>
        </p>
        <WhatsAppCTA settings={data.settings} />
        <Contact settings={data.settings} />
      </main>
      <Footer settings={data.settings} products={data.products} />
      <WhatsAppFloat settings={data.settings} />
      <MobileBottomNav settings={data.settings} />
    </>
  );
}
