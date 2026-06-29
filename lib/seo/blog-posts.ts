export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  readTime: string;
  category: string;
  sections: { heading: string; content: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'benefits-of-moringa',
    title: 'Benefits of Moringa: The Miracle Tree for Natural Wellness',
    description:
      'Discover the science-backed benefits of moringa — vitamins, minerals, energy support, and why this tropical superfood is a cornerstone of traditional herbal medicine.',
    datePublished: '2025-11-15',
    image: 'https://picsum.photos/seed/moringablog/1200/630',
    readTime: '6 min read',
    category: 'Superfoods',
    relatedSlugs: ['natural-remedies-immune-support', 'how-to-choose-herbal-supplements'],
    sections: [
      {
        heading: 'What Is Moringa?',
        content:
          'Moringa oleifera, often called the miracle tree, is a tropical plant prized in traditional healing across Africa and Asia. Its leaves are rich in vitamins A, C, and E, calcium, iron, and plant protein — making moringa one of the most nutrient-dense natural herbs available for daily wellness.',
      },
      {
        heading: 'Key Health Benefits',
        content:
          'Moringa supports natural energy without caffeine crashes, strengthens immunity with antioxidants, promotes healthy skin, and aids digestion. Traditional healers have used moringa for generations to support vitality, mental clarity, and overall balance — a trusted natural remedy for healthy living.',
      },
      {
        heading: 'How to Use Moringa',
        content:
          'Moringa is commonly taken as a powder, tea, or blended into herbal formulas like our Moringa Vitality Blend. Take in the morning for sustained energy. Combine with a balanced diet and hydration for best results. Always consult a professional if pregnant, nursing, or on medication.',
      },
      {
        heading: 'Moringa vs. Other Superfoods',
        content:
          'Compared to spirulina or wheatgrass, moringa offers a broader mineral profile and a milder taste. It fits naturally into traditional herbal medicine routines and modern natural wellness lifestyles — ideal for anyone seeking organic herbs and health supplements.',
      },
    ],
    faqs: [
      {
        question: 'Is moringa safe to take daily?',
        answer: 'Most people tolerate moringa well in moderate daily amounts. Start with recommended doses and consult a healthcare provider if you have medical conditions.',
      },
      {
        question: 'Can moringa help with energy?',
        answer: 'Yes. Moringa provides natural vitamins and minerals that support sustained energy — a popular reason it is used in traditional herbal blends.',
      },
    ],
  },
  {
    slug: 'natural-remedies-immune-support',
    title: 'Natural Remedies for Immune Support: Traditional Herbs That Work',
    description:
      'Learn how medicinal herbs and traditional blends strengthen immunity naturally. Expert guide to immune-support herbs, usage tips, and buying quality products online.',
    datePublished: '2025-12-01',
    image: 'https://picsum.photos/seed/immuneblog/1200/630',
    readTime: '7 min read',
    category: 'Immune Health',
    relatedSlugs: ['benefits-of-moringa', 'traditional-herbal-medicine-guide'],
    sections: [
      {
        heading: 'Why Immune Support Matters',
        content:
          'Your immune system defends against illness year-round. Natural herbs — used in traditional medicine for centuries — offer gentle, plant-based support without relying solely on synthetic supplements. Immune Warrior Mix and similar blends combine African medicinal roots and tropical botanicals.',
      },
      {
        heading: 'Top Herbs for Immunity',
        content:
          'Elderberry, moringa, ginger, turmeric, and traditional African immune roots are widely used in herbal medicine. These natural remedies provide antioxidants, anti-inflammatory compounds, and nutrients that help your body stay resilient during seasonal changes.',
      },
      {
        heading: 'Building a Natural Wellness Routine',
        content:
          'Combine immune herbs with adequate sleep, hydration, whole foods, and stress management. Consistency matters — traditional healers emphasize daily use during vulnerable seasons. Browse our Immune Support category for handcrafted options.',
      },
    ],
    faqs: [
      {
        question: 'What is the best herb for immune support?',
        answer: 'No single herb suits everyone. Moringa, ginger, and traditional African immune blends are popular. Personal consultation helps identify the best natural herbs for your needs.',
      },
      {
        question: 'Can children take immune herbs?',
        answer: 'Always consult a healthcare professional before giving herbal products to children. Dosages differ significantly from adult use.',
      },
    ],
  },
  {
    slug: 'traditional-herbal-medicine-guide',
    title: 'A Beginner\'s Guide to Traditional Herbal Medicine',
    description:
      'Understand traditional herbal medicine — how ancestral healing works, what makes quality medicinal herbs, and how to buy herbs online safely from trusted sources.',
    datePublished: '2026-01-10',
    image: 'https://picsum.photos/seed/traditionalblog/1200/630',
    readTime: '8 min read',
    category: 'Education',
    relatedSlugs: ['how-to-choose-herbal-supplements', 'benefits-of-moringa'],
    sections: [
      {
        heading: 'What Is Traditional Herbal Medicine?',
        content:
          'Traditional herbal medicine uses plants, roots, and natural ingredients passed down through generations of healers. Unlike mass-produced supplements, authentic remedies are often hand-prepared in small batches — preserving potency and cultural knowledge rooted in African and tropical healing traditions.',
      },
      {
        heading: 'How to Identify Quality Herbs',
        content:
          'Look for transparent sourcing, clear ingredient lists, traditional preparation methods, and personal guidance from the seller. Avoid products with vague claims. A trusted herbal shop provides consultation, honest advice, and consistent quality — like ordering via WhatsApp from an experienced traditional healer.',
      },
      {
        heading: 'Integrating Herbs Into Modern Life',
        content:
          'Traditional medicine complements modern healthcare — not replaces it. Use herbs for wellness support, consult professionals for serious conditions, and choose natural remedies that align with your goals: detox, sleep, immunity, digestion, or skin health.',
      },
    ],
    faqs: [
      {
        question: 'Is traditional herbal medicine effective?',
        answer: 'Many herbs have documented traditional use spanning centuries. Effectiveness varies by individual, product quality, and consistent use. Always combine herbal wellness with professional medical care when needed.',
      },
    ],
  },
  {
    slug: 'how-to-choose-herbal-supplements',
    title: 'How to Choose Herbal Supplements: A Practical Buying Guide',
    description:
      'Expert tips for choosing natural herbs and health supplements online — what to look for, red flags to avoid, and how to order from a trusted herbal shop.',
    datePublished: '2026-02-20',
    image: 'https://picsum.photos/seed/chooseherbs/1200/630',
    readTime: '5 min read',
    category: 'Buying Guide',
    relatedSlugs: ['traditional-herbal-medicine-guide', 'natural-remedies-immune-support'],
    sections: [
      {
        heading: 'Define Your Wellness Goal',
        content:
          'Start with a clear goal: better sleep, immune support, detox, joint comfort, or energy. Browse by category — Detox & Cleansing, Immune Support, Sleep & Relaxation — to find relevant medicinal herbs without overwhelm.',
      },
      {
        heading: 'Verify Seller Credibility',
        content:
          'Choose sellers with real testimonials, clear product descriptions, benefits listed, and responsive communication. Tropical Herbs offers WhatsApp ordering so you can ask questions before buying — a hallmark of trustworthy herbal shops.',
      },
      {
        heading: 'Read Labels and Benefits',
        content:
          'Quality herbal products list ingredients, benefits, usage guidance, and warnings. Compare products within the same category. Price reflects preparation quality — handcrafted traditional blends often outperform cheap mass-market supplements.',
      },
    ],
    faqs: [
      {
        question: 'Is it safe to buy herbs online?',
        answer: 'Yes, when buying from reputable sellers with clear product info and customer support. WhatsApp ordering allows direct communication before purchase.',
      },
      {
        question: 'How do I find a herbal shop near me?',
        answer: 'Search "herbal shop near me" or "buy herbs online" — many traditional healers now serve customers nationwide via WhatsApp with delivery across South Africa.',
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
