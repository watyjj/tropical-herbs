-- Tropical Herbs — Supabase Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL → New query

-- Settings (single row)
CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'Tropical Herbs',
  whatsapp_number TEXT NOT NULL DEFAULT '27635987328',
  phone_display TEXT NOT NULL DEFAULT '+27 63 598 7328',
  location TEXT NOT NULL DEFAULT 'Johannesburg, South Africa',
  hero_badge TEXT NOT NULL DEFAULT 'Traditional Healing · Trusted for Generations',
  hero_title_line1 TEXT NOT NULL DEFAULT 'Tropical',
  hero_title_line2 TEXT NOT NULL DEFAULT 'Herbal Products',
  hero_subtitle TEXT NOT NULL DEFAULT '',
  hero_image_url TEXT NOT NULL DEFAULT '',
  about_image_url TEXT NOT NULL DEFAULT '',
  about_title TEXT NOT NULL DEFAULT 'Rooted in Tradition, Guided by Nature',
  about_paragraph1 TEXT NOT NULL DEFAULT '',
  about_paragraph2 TEXT NOT NULL DEFAULT '',
  stat_products TEXT NOT NULL DEFAULT '12+',
  stat_clients TEXT NOT NULL DEFAULT '5000+',
  stat_years TEXT NOT NULL DEFAULT '15+',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  benefits JSONB NOT NULL DEFAULT '[]',
  accent_color TEXT NOT NULL DEFAULT '#22c55e',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Banners (hero background, promo strips)
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('hero', 'promo')),
  image_url TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  link_url TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security: public can READ active content only
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read settings" ON settings;
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read active products" ON products;
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read active banners" ON banners;
CREATE POLICY "Public read active banners" ON banners FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read active testimonials" ON testimonials;
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (is_active = true);

-- Note: All writes go through Vercel API routes using SUPABASE_SERVICE_ROLE_KEY (bypasses RLS)
