export interface Settings {
  id: number;
  site_name: string;
  whatsapp_number: string;
  phone_display: string;
  location: string;
  hero_badge: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_image_url: string;
  about_title: string;
  about_paragraph1: string;
  about_paragraph2: string;
  stat_products: string;
  stat_clients: string;
  stat_years: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image_url: string;
  benefits: string[];
  accent_color: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface Banner {
  id: string;
  type: 'hero' | 'promo';
  image_url: string;
  title: string;
  subtitle: string;
  link_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  sort_order: number;
  is_active: boolean;
}

export interface SiteData {
  settings: Settings;
  products: Product[];
  banners: Banner[];
  testimonials: Testimonial[];
}
