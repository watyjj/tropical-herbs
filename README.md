# Tropical Herbs — Full-Stack Deployment Guide

Traditional herbal products landing page with admin panel, Supabase database, and WhatsApp ordering. Free to host on **Vercel** + **Supabase**.

---

## What You Get

- **Public site** — E-commerce style product cards with images, WhatsApp ordering
- **Hidden admin** — `/manage-x7k2p` — non-technical users can add/edit products, banners, reviews, and settings
- **WhatsApp** — All orders go to **+27 63 598 7328**
- **No paid hosting** — Vercel + Supabase free tiers

---

## Step 1: Create Supabase Database (Free)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** → choose a name and password
3. Once ready, go to **SQL Editor** → **New query**
4. Copy the entire contents of `supabase/schema.sql` and click **Run**
5. Go to **Project Settings** → **API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

---

## Step 2: Deploy to Vercel (Free)

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo
3. Add these **Environment Variables** in Vercel project settings:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `ADMIN_PASSWORD` | Password for admin panel |
| `ADMIN_SECRET` | Any random string |

4. Click **Deploy**

---

## Step 3: Load Default Content

1. Visit `https://your-site.vercel.app/manage-x7k2p`
2. Log in with your `ADMIN_PASSWORD`
3. Click **Load Default Content** — adds all 12 products, testimonials, and settings
4. Visit the homepage to see your live site

---

## Admin Panel

**URL:** `https://your-site.vercel.app/manage-x7k2p`

- **Products** — add/edit products with image URLs, prices, benefits
- **Banners** — promo banners between hero and products
- **Settings** — WhatsApp number, hero text, about section, contact info
- **Reviews** — customer testimonials

### Adding Images

Upload to Imgur or Google Drive (public link), copy the direct image URL, paste in admin.

---

## Local Development

```bash
npm install
cp .env.example .env.local
# Fill in Supabase keys in .env.local
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/manage-x7k2p
