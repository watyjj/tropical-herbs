'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function SubpageBackBar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/') return null;

  let label = 'Back to home';
  let fallback = '/';

  if (pathname.startsWith('/products/')) {
    label = 'Back to products';
    fallback = '/products';
  } else if (pathname === '/products') {
    label = 'Back to home';
    fallback = '/';
  } else if (pathname.startsWith('/blog/')) {
    label = 'Back to blog';
    fallback = '/blog';
  } else if (pathname === '/blog') {
    label = 'Back to home';
    fallback = '/';
  } else if (pathname.startsWith('/categories')) {
    label = 'Back to categories';
    fallback = '/categories';
  } else if (pathname === '/faq') {
    label = 'Back to home';
    fallback = '/';
  }

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-[45] lg:hidden mobile-subpage-bar">
      <div className="container-app py-2">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 text-herb-400 font-semibold text-sm min-h-[44px] px-2 -ml-2 rounded-xl touch-manipulation active:bg-white/5"
          aria-label={label}
        >
          <ArrowLeft size={20} aria-hidden />
          {label}
        </button>
      </div>
    </div>
  );
}
