# Tropical Herbs — START HERE

## You are probably opening the WRONG file!

The old single-page `index.html` has been renamed to `index-OLD-standalone.html`.

The NEW full-stack app (e-commerce + admin) runs with Next.js.

---

## Run the site locally

```bash
npm install
npm run dev
```

Then open in your browser:

| Page | URL |
|------|-----|
| **Shop (public site)** | http://localhost:3000 |
| **Admin (add images & products)** | http://localhost:3000/manage-x7k2p |

---

## Admin — how to add product images

1. Go to **http://localhost:3000/manage-x7k2p**
2. Log in with your admin password (set in `.env.local` — see `.env.example`)
3. Click the **Products** tab
4. Click **Add Product** or **Edit** on an existing product
5. In **Image URL**, paste a direct link to your photo (from Imgur, Google Drive public link, etc.)
6. A preview appears below the field
7. Click **Save Product** — the image shows on the shop immediately

> Admin saves to Supabase database. You must set up Supabase first (see README.md).

---

## WhatsApp orders go to: +27 63 598 7328
