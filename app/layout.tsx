import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Tropical Herbs | Traditional Herbal Healing',
  description:
    'Tropical Herbs — Traditional healing with premium tropical herbal products. Natural remedies trusted for generations. Order via WhatsApp.',
};

export const viewport: Viewport = {
  themeColor: '#0a0f0a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
