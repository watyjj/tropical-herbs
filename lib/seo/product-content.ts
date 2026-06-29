import type { Product } from '@/lib/types';

export function getProductImageAlt(product: Product): string {
  return `${product.name} — ${product.category} natural herbal product from Tropical Herbs`;
}

export function getProductUsage(product: Product): string {
  const categoryUsage: Record<string, string> = {
    'Detox & Cleansing': 'Take as directed with warm water, preferably in the morning on an empty stomach. Use consistently for 2–4 weeks for best results.',
    'Body Regulation': 'Take daily with meals or as advised during your consultation. Consistency supports natural body balance over time.',
    'Energy & Strength': 'Take in the morning or early afternoon. Avoid late evening use if you are sensitive to energizing herbs.',
    'Sleep & Relaxation': 'Take 30–60 minutes before bedtime. Create a calm routine for deeper, more restful sleep.',
    'Blood Purification': 'Use as part of a balanced wellness routine. Stay hydrated and follow traditional dosage guidance.',
    'Pain & Inflammation': 'Use regularly as directed. Combine with gentle movement and adequate rest for joint and muscle support.',
    'Reproductive Health': 'Take consistently as advised. Results may vary; consult for personalized traditional guidance.',
    'Digestive Health': 'Enjoy after meals or when digestive discomfort arises. Warm preparation often enhances soothing effects.',
    'Immune Support': 'Use daily during seasonal changes or year-round for immune resilience. Pair with rest and hydration.',
    'Blood Sugar Control': 'Take with meals as directed. Monitor wellness goals alongside a balanced diet and lifestyle.',
    'Mental Wellness': 'Take during stressful periods or daily for calm focus. Avoid combining with excessive caffeine.',
    'Skin Health': 'Apply topically to clean skin as directed. Patch test first if you have sensitive skin.',
  };

  return (
    categoryUsage[product.category] ||
    'Follow the dosage guidance provided during your WhatsApp consultation. Use consistently as part of a natural wellness routine.'
  );
}

export const PRODUCT_WARNINGS = [
  'Herbal products are traditional natural remedies and are not intended to diagnose, treat, cure, or prevent any disease.',
  'Consult a healthcare professional before use if you are pregnant, nursing, taking medication, or have a medical condition.',
  'Discontinue use and seek advice if you experience any adverse reaction.',
  'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.',
  'Results vary by individual. These products complement — not replace — professional medical care.',
];

export function getProductSpecs(product: Product): { label: string; value: string }[] {
  return [
    { label: 'Product Name', value: product.name },
    { label: 'Category', value: product.category },
    { label: 'Price', value: product.price },
    { label: 'Availability', value: 'In Stock' },
    { label: 'Form', value: 'Traditional Herbal Blend' },
    { label: 'Origin', value: 'Hand-prepared with tropical & African medicinal herbs' },
    { label: 'Ordering', value: 'WhatsApp — fast personal service' },
  ];
}

export function getProductFaqs(product: Product): { question: string; answer: string }[] {
  const benefits = (product.benefits as string[]).join(', ');
  return [
    {
      question: `What is ${product.name} used for?`,
      answer: `${product.name} is a ${product.category.toLowerCase()} herbal product. ${product.description} Key benefits include: ${benefits}.`,
    },
    {
      question: `How much does ${product.name} cost?`,
      answer: `${product.name} is priced at ${product.price}. Order directly via WhatsApp for fast service and nationwide delivery across South Africa.`,
    },
    {
      question: `How do I order ${product.name} online?`,
      answer: `Click "Order on WhatsApp" on this page to message us with your product enquiry. We confirm availability, dosage guidance, and delivery details personally.`,
    },
    {
      question: `Is ${product.name} made from natural ingredients?`,
      answer: `Yes. ${product.name} is hand-prepared using traditional tropical herbs and natural ingredients, crafted in small batches to preserve potency and authenticity.`,
    },
    {
      question: `Who should not use ${product.name}?`,
      answer:
        'Pregnant or nursing women, children, and anyone on prescription medication should consult a healthcare professional before using herbal products. Stop use if any adverse reaction occurs.',
    },
  ];
}

export function getSiteFaqs(location: string): { question: string; answer: string }[] {
  return [
    {
      question: 'What is Tropical Herbs?',
      answer:
        'Tropical Herbs is a traditional herbal shop offering natural herbs, medicinal remedies, and handcrafted wellness products rooted in generations of African healing wisdom. We serve customers across South Africa and Africa.',
    },
    {
      question: 'How do I buy herbs online from Tropical Herbs?',
      answer:
        'Browse our products, then tap "Order on WhatsApp" on any product. We respond quickly with availability, personalized guidance, and delivery arrangements. It is the easiest way to buy natural herbs online.',
    },
    {
      question: 'Do you deliver herbal products nationwide?',
      answer: `Yes. We deliver herbal products across South Africa from ${location}. Contact us on WhatsApp for delivery details to your area, including major cities and towns.`,
    },
    {
      question: 'Are your products 100% natural?',
      answer:
        'Our herbal products are hand-prepared using pure natural ingredients — tropical herbs, roots, and traditional botanicals. No synthetic fillers. Every batch is crafted with care and traditional knowledge.',
    },
    {
      question: 'Can I get a free herbal consultation?',
      answer:
        'Yes. Message us on WhatsApp for a free consultation. We recommend personalized herbal products based on your wellness goals, using traditional healing approaches.',
    },
    {
      question: 'What types of herbal products do you sell?',
      answer:
        'We offer detox blends, immune support, sleep tonics, digestive teas, joint relief, skin oils, fertility blends, blood sugar support, mental wellness elixirs, and more — all categorized for easy browsing.',
    },
    {
      question: 'Is there a herbal shop near me?',
      answer: `Tropical Herbs operates from ${location} with online ordering via WhatsApp. Whether you search "herbal shop near me" or "buy herbs online", we make natural wellness accessible across South Africa and Africa.`,
    },
    {
      question: 'Do you ship herbs to Uganda and other African countries?',
      answer:
        'We primarily serve South Africa with nationwide delivery. For Uganda and other African countries, contact us on WhatsApp — we will advise on availability and shipping options for natural herbs and traditional remedies.',
    },
    {
      question: 'Are herbal medicines safe?',
      answer:
        'Traditional herbal medicine has been used for generations. Our products are natural, but individual responses vary. Always follow dosage guidance, consult a professional if you have health conditions, and discontinue use if you react adversely.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'Payment details are shared during your WhatsApp order. We aim to make ordering simple and personal — message us to confirm your preferred payment method and complete your herbal product purchase.',
    },
  ];
}
