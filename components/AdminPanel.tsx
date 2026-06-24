'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  LogOut, Plus, Trash2, Save, Package, ImageIcon, Settings as SettingsIcon,
  MessageSquare, Loader2, Sprout, Eye,
} from 'lucide-react';
import type { SiteData, Product, Banner, Testimonial, Settings } from '@/lib/types';

type Tab = 'products' | 'banners' | 'settings' | 'testimonials';

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  category: 'Detox & Cleansing',
  description: '',
  price: 'R0',
  image_url: '',
  benefits: ['', '', '', ''],
  accent_color: '#22c55e',
  sort_order: 0,
  is_active: true,
};

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState<Tab>('products');
  const [data, setData] = useState<SiteData | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingBanner, setEditingBanner] = useState<Partial<Banner> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/session');
      const json = await res.json();
      setAuthenticated(json.authenticated);
      if (json.authenticated) await loadData();
    } catch {
      setAuthenticated(false);
    } finally {
      setChecking(false);
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { checkSession(); }, [checkSession]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      await loadData();
    } else {
      setLoginError('Wrong password. Try again.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setAuthenticated(false);
    setData(null);
  };

  const handleSeed = async () => {
    if (!confirm('This will add all default products, testimonials, and settings. Continue?')) return;
    setSaving(true);
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    const json = await res.json();
    setSaving(false);
    if (res.ok) {
      showMsg('✅ ' + json.message);
      await loadData();
    } else {
      showMsg('❌ ' + json.error);
    }
  };

  const saveSettings = async (settings: Settings) => {
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    if (res.ok) {
      showMsg('✅ Settings saved!');
      await loadData();
    } else {
      showMsg('❌ Failed to save settings');
    }
  };

  const saveProduct = async () => {
    if (!editingProduct?.name) return showMsg('❌ Product name is required');
    setSaving(true);
    const benefits = (editingProduct.benefits as string[]).filter(Boolean);
    const payload = { ...editingProduct, benefits };

    const res = await fetch('/api/admin/products', {
      method: editingProduct.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      showMsg('✅ Product saved!');
      setEditingProduct(null);
      await loadData();
    } else {
      const json = await res.json();
      showMsg('❌ ' + json.error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    showMsg('✅ Product deleted');
    await loadData();
  };

  const saveBanner = async () => {
    if (!editingBanner) return;
    setSaving(true);
    const res = await fetch('/api/admin/banners', {
      method: editingBanner.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBanner),
    });
    setSaving(false);
    if (res.ok) {
      showMsg('✅ Banner saved!');
      setEditingBanner(null);
      await loadData();
    } else {
      showMsg('❌ Failed to save banner');
    }
  };

  const deleteBanner = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    await fetch('/api/admin/banners', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    showMsg('✅ Banner deleted');
    await loadData();
  };

  const saveTestimonial = async () => {
    if (!editingTestimonial?.name || !editingTestimonial?.text) return showMsg('❌ Name and text required');
    setSaving(true);
    const res = await fetch('/api/admin/testimonials', {
      method: editingTestimonial.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingTestimonial),
    });
    setSaving(false);
    if (res.ok) {
      showMsg('✅ Testimonial saved!');
      setEditingTestimonial(null);
      await loadData();
    } else {
      showMsg('❌ Failed to save');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch('/api/admin/testimonials', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    showMsg('✅ Testimonial deleted');
    await loadData();
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-herb-500" size={32} />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-[rgba(15,25,15,0.8)] border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-6">
            <span className="text-4xl">🌿</span>
            <h1 className="text-white font-bold text-xl mt-2">Tropical Herbs Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your password to manage the site</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-herb-500"
          />
          {loginError && <p className="text-red-400 text-sm mb-4">{loginError}</p>}
          <button type="submit" className="w-full bg-herb-600 hover:bg-herb-500 text-white font-semibold py-3 rounded-xl transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'banners', label: 'Banners', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'testimonials', label: 'Reviews', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 glass-nav px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <h1 className="text-white font-bold">Site Manager</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-gray-400 hover:text-herb-400 text-sm flex items-center gap-1">
              <Eye size={16} /> View Site
            </a>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 flex items-center gap-1 text-sm">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-herb-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium">
          {message}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* First-time setup */}
        {data && data.products.length === 0 && (
          <div className="bg-herb-950/50 border border-herb-700/30 rounded-2xl p-6 mb-6 text-center">
            <Sprout className="mx-auto text-herb-400 mb-3" size={32} />
            <h2 className="text-white font-bold text-lg mb-2">First Time Setup</h2>
            <p className="text-gray-400 text-sm mb-4">
              Your database is empty. Click below to load all 12 default herbal products, testimonials, and settings.
            </p>
            <button
              onClick={handleSeed}
              disabled={saving}
              className="bg-herb-600 hover:bg-herb-500 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50"
            >
              {saving ? 'Loading...' : 'Load Default Content'}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === t.id ? 'bg-herb-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-herb-500" size={32} />
          </div>
        ) : (
          <>
            {/* PRODUCTS TAB */}
            {tab === 'products' && data && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white font-bold text-lg">Products ({data.products.length})</h2>
                  <button
                    onClick={() => setEditingProduct({ ...emptyProduct, sort_order: data.products.length + 1 })}
                    className="flex items-center gap-2 bg-herb-600 hover:bg-herb-500 text-white text-sm font-semibold px-4 py-2 rounded-xl"
                  >
                    <Plus size={16} /> Add Product
                  </button>
                </div>

                {editingProduct && (
                  <ProductForm
                    product={editingProduct}
                    onChange={setEditingProduct}
                    onSave={saveProduct}
                    onCancel={() => setEditingProduct(null)}
                    saving={saving}
                  />
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {data.products.map((p) => (
                    <div key={p.id} className="bg-[rgba(15,25,15,0.6)] border border-white/5 rounded-2xl overflow-hidden">
                      <div className="relative h-36 bg-black/30">
                        {p.image_url && (
                          <Image src={p.image_url} alt={p.name} fill className="object-cover" unoptimized />
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-white font-semibold">{p.name}</h3>
                            <p className="text-herb-400 text-sm font-medium">{p.price}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_active ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                            {p.is_active ? 'Active' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">{p.category}</p>
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => setEditingProduct(p)} className="flex-1 text-sm bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg">
                            Edit
                          </button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BANNERS TAB */}
            {tab === 'banners' && data && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white font-bold text-lg">Banners ({data.banners.length})</h2>
                  <button
                    onClick={() => setEditingBanner({ type: 'promo', image_url: '', title: '', subtitle: '', link_url: '', sort_order: data.banners.length + 1, is_active: true })}
                    className="flex items-center gap-2 bg-herb-600 hover:bg-herb-500 text-white text-sm font-semibold px-4 py-2 rounded-xl"
                  >
                    <Plus size={16} /> Add Banner
                  </button>
                </div>

                {editingBanner && (
                  <BannerForm
                    banner={editingBanner}
                    onChange={setEditingBanner}
                    onSave={saveBanner}
                    onCancel={() => setEditingBanner(null)}
                    saving={saving}
                  />
                )}

                <div className="space-y-3 mt-4">
                  {data.banners.map((b) => (
                    <div key={b.id} className="flex items-center gap-4 bg-[rgba(15,25,15,0.6)] border border-white/5 rounded-2xl p-4">
                      {b.image_url && (
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={b.image_url} alt={b.title} fill className="object-cover" unoptimized />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate">{b.title || 'Untitled'}</h3>
                        <p className="text-gray-500 text-sm truncate">{b.subtitle}</p>
                        <span className="text-xs text-herb-400">{b.type}</span>
                      </div>
                      <button onClick={() => setEditingBanner(b)} className="text-sm text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg">Edit</button>
                      <button onClick={() => deleteBanner(b.id)} className="text-red-400 hover:bg-red-900/20 p-2 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {tab === 'settings' && data && (
              <SettingsForm settings={data.settings} onSave={saveSettings} saving={saving} />
            )}

            {/* TESTIMONIALS TAB */}
            {tab === 'testimonials' && data && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white font-bold text-lg">Testimonials ({data.testimonials.length})</h2>
                  <button
                    onClick={() => setEditingTestimonial({ name: '', location: '', rating: 5, text: '', sort_order: data.testimonials.length + 1, is_active: true })}
                    className="flex items-center gap-2 bg-herb-600 hover:bg-herb-500 text-white text-sm font-semibold px-4 py-2 rounded-xl"
                  >
                    <Plus size={16} /> Add Review
                  </button>
                </div>

                {editingTestimonial && (
                  <TestimonialForm
                    testimonial={editingTestimonial}
                    onChange={setEditingTestimonial}
                    onSave={saveTestimonial}
                    onCancel={() => setEditingTestimonial(null)}
                    saving={saving}
                  />
                )}

                <div className="space-y-3 mt-4">
                  {data.testimonials.map((t) => (
                    <div key={t.id} className="bg-[rgba(15,25,15,0.6)] border border-white/5 rounded-2xl p-4 flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-white font-semibold">{t.name} <span className="text-gray-500 font-normal text-sm">— {t.location}</span></h3>
                        <p className="text-gray-400 text-sm mt-1 italic line-clamp-2">&ldquo;{t.text}&rdquo;</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => setEditingTestimonial(t)} className="text-sm text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg">Edit</button>
                        <button onClick={() => deleteTestimonial(t.id)} className="text-red-400 hover:bg-red-900/20 p-2 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-forms ─── */

function ImagePreview({ url }: { url: string }) {
  if (!url) return null;
  return (
    <div className="relative w-full h-40 rounded-xl overflow-hidden bg-black/30 mt-2">
      <Image src={url} alt="Preview" fill className="object-cover" unoptimized onError={() => {}} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass = 'w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-herb-500';

function ProductForm({ product, onChange, onSave, onCancel, saving }: {
  product: Partial<Product>;
  onChange: (p: Partial<Product>) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const benefits = (product.benefits as string[]) || ['', '', '', ''];

  return (
    <div className="bg-[rgba(15,25,15,0.8)] border border-herb-700/30 rounded-2xl p-6 mb-4">
      <h3 className="text-white font-bold mb-4">{product.id ? 'Edit Product' : 'New Product'}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Product Name *">
          <input className={inputClass} value={product.name || ''} onChange={(e) => onChange({ ...product, name: e.target.value })} />
        </Field>
        <Field label="Price (e.g. R150)">
          <input className={inputClass} value={product.price || ''} onChange={(e) => onChange({ ...product, price: e.target.value })} />
        </Field>
        <Field label="Category">
          <input className={inputClass} value={product.category || ''} onChange={(e) => onChange({ ...product, category: e.target.value })} placeholder="e.g. Detox & Cleansing" />
        </Field>
        <Field label="Accent Color">
          <input type="color" className="w-full h-10 rounded-xl cursor-pointer" value={product.accent_color || '#22c55e'} onChange={(e) => onChange({ ...product, accent_color: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="📷 Product Image URL">
            <p className="text-xs text-gray-500 mb-2">
              Upload your photo to Imgur.com or Google Drive (make it public), then paste the direct image link here.
              Example: https://i.imgur.com/yourphoto.jpg
            </p>
            <input className={inputClass} value={product.image_url || ''} onChange={(e) => onChange({ ...product, image_url: e.target.value })} placeholder="https://i.imgur.com/example.jpg" />
            {product.image_url ? (
              <ImagePreview url={product.image_url} />
            ) : (
              <div className="mt-2 h-32 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-gray-600 text-sm">
                Image preview will appear here
              </div>
            )}
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea className={inputClass + ' h-20 resize-none'} value={product.description || ''} onChange={(e) => onChange({ ...product, description: e.target.value })} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-gray-400 text-sm mb-1.5">Benefits (one per line)</label>
          {benefits.map((b, i) => (
            <input
              key={i}
              className={inputClass + ' mb-2'}
              value={b}
              placeholder={`Benefit ${i + 1}`}
              onChange={(e) => {
                const updated = [...benefits];
                updated[i] = e.target.value;
                onChange({ ...product, benefits: updated });
              }}
            />
          ))}
        </div>
        <Field label="Visible on site?">
          <select className={inputClass} value={product.is_active ? 'true' : 'false'} onChange={(e) => onChange({ ...product, is_active: e.target.value === 'true' })}>
            <option value="true">Yes — Show on site</option>
            <option value="false">No — Hide</option>
          </select>
        </Field>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={onSave} disabled={saving} className="flex items-center gap-2 bg-herb-600 hover:bg-herb-500 text-white font-semibold px-5 py-2.5 rounded-xl disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Product'}
        </button>
        <button onClick={onCancel} className="text-gray-400 hover:text-white px-5 py-2.5">Cancel</button>
      </div>
    </div>
  );
}

function BannerForm({ banner, onChange, onSave, onCancel, saving }: {
  banner: Partial<Banner>;
  onChange: (b: Partial<Banner>) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <div className="bg-[rgba(15,25,15,0.8)] border border-herb-700/30 rounded-2xl p-6 mb-4">
      <h3 className="text-white font-bold mb-4">{banner.id ? 'Edit Banner' : 'New Banner'}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Type">
          <select className={inputClass} value={banner.type || 'promo'} onChange={(e) => onChange({ ...banner, type: e.target.value as 'hero' | 'promo' })}>
            <option value="promo">Promo Banner</option>
            <option value="hero">Hero Background</option>
          </select>
        </Field>
        <Field label="Title">
          <input className={inputClass} value={banner.title || ''} onChange={(e) => onChange({ ...banner, title: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Image URL">
            <input className={inputClass} value={banner.image_url || ''} onChange={(e) => onChange({ ...banner, image_url: e.target.value })} placeholder="https://..." />
            <ImagePreview url={banner.image_url || ''} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Subtitle">
            <input className={inputClass} value={banner.subtitle || ''} onChange={(e) => onChange({ ...banner, subtitle: e.target.value })} />
          </Field>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={onSave} disabled={saving} className="flex items-center gap-2 bg-herb-600 text-white font-semibold px-5 py-2.5 rounded-xl disabled:opacity-50">
          <Save size={16} /> Save Banner
        </button>
        <button onClick={onCancel} className="text-gray-400 px-5 py-2.5">Cancel</button>
      </div>
    </div>
  );
}

function SettingsForm({ settings, onSave, saving }: { settings: Settings; onSave: (s: Settings) => void; saving: boolean }) {
  const [form, setForm] = useState(settings);
  const set = (key: keyof Settings, value: string) => setForm({ ...form, [key]: value });

  return (
    <div className="bg-[rgba(15,25,15,0.6)] border border-white/5 rounded-2xl p-6">
      <h2 className="text-white font-bold text-lg mb-6">Site Settings</h2>

      <h3 className="text-herb-400 text-sm font-semibold uppercase tracking-wider mb-3">Contact & WhatsApp</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Field label="WhatsApp Number (no + or spaces, e.g. 27635987328)">
          <input className={inputClass} value={form.whatsapp_number} onChange={(e) => set('whatsapp_number', e.target.value)} />
        </Field>
        <Field label="Phone Display">
          <input className={inputClass} value={form.phone_display} onChange={(e) => set('phone_display', e.target.value)} />
        </Field>
        <Field label="Location">
          <input className={inputClass} value={form.location} onChange={(e) => set('location', e.target.value)} />
        </Field>
        <Field label="Site Name">
          <input className={inputClass} value={form.site_name} onChange={(e) => set('site_name', e.target.value)} />
        </Field>
      </div>

      <h3 className="text-herb-400 text-sm font-semibold uppercase tracking-wider mb-3">Hero Section</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Field label="Badge Text">
          <input className={inputClass} value={form.hero_badge} onChange={(e) => set('hero_badge', e.target.value)} />
        </Field>
        <Field label="Hero Background Image URL">
          <input className={inputClass} value={form.hero_image_url} onChange={(e) => set('hero_image_url', e.target.value)} />
          <ImagePreview url={form.hero_image_url} />
        </Field>
        <Field label="Title Line 1">
          <input className={inputClass} value={form.hero_title_line1} onChange={(e) => set('hero_title_line1', e.target.value)} />
        </Field>
        <Field label="Title Line 2 (green gradient)">
          <input className={inputClass} value={form.hero_title_line2} onChange={(e) => set('hero_title_line2', e.target.value)} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Subtitle">
            <textarea className={inputClass + ' h-20 resize-none'} value={form.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} />
          </Field>
        </div>
      </div>

      <h3 className="text-herb-400 text-sm font-semibold uppercase tracking-wider mb-3">About Section</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="sm:col-span-2">
          <Field label="About Image URL">
            <input className={inputClass} value={form.about_image_url} onChange={(e) => set('about_image_url', e.target.value)} />
            <ImagePreview url={form.about_image_url} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="About Title">
            <input className={inputClass} value={form.about_title} onChange={(e) => set('about_title', e.target.value)} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="About Paragraph 1">
            <textarea className={inputClass + ' h-24 resize-none'} value={form.about_paragraph1} onChange={(e) => set('about_paragraph1', e.target.value)} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="About Paragraph 2">
            <textarea className={inputClass + ' h-24 resize-none'} value={form.about_paragraph2} onChange={(e) => set('about_paragraph2', e.target.value)} />
          </Field>
        </div>
      </div>

      <h3 className="text-herb-400 text-sm font-semibold uppercase tracking-wider mb-3">Stats</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Field label="Products Stat">
          <input className={inputClass} value={form.stat_products} onChange={(e) => set('stat_products', e.target.value)} />
        </Field>
        <Field label="Clients Stat">
          <input className={inputClass} value={form.stat_clients} onChange={(e) => set('stat_clients', e.target.value)} />
        </Field>
        <Field label="Years Stat">
          <input className={inputClass} value={form.stat_years} onChange={(e) => set('stat_years', e.target.value)} />
        </Field>
      </div>

      <button onClick={() => onSave(form)} disabled={saving} className="flex items-center gap-2 bg-herb-600 hover:bg-herb-500 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50">
        <Save size={16} /> {saving ? 'Saving...' : 'Save All Settings'}
      </button>
    </div>
  );
}

function TestimonialForm({ testimonial, onChange, onSave, onCancel, saving }: {
  testimonial: Partial<Testimonial>;
  onChange: (t: Partial<Testimonial>) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <div className="bg-[rgba(15,25,15,0.8)] border border-herb-700/30 rounded-2xl p-6 mb-4">
      <h3 className="text-white font-bold mb-4">{testimonial.id ? 'Edit Review' : 'New Review'}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Customer Name *">
          <input className={inputClass} value={testimonial.name || ''} onChange={(e) => onChange({ ...testimonial, name: e.target.value })} />
        </Field>
        <Field label="City">
          <input className={inputClass} value={testimonial.location || ''} onChange={(e) => onChange({ ...testimonial, location: e.target.value })} placeholder="e.g. Johannesburg" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Review Text *">
            <textarea className={inputClass + ' h-24 resize-none'} value={testimonial.text || ''} onChange={(e) => onChange({ ...testimonial, text: e.target.value })} />
          </Field>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={onSave} disabled={saving} className="flex items-center gap-2 bg-herb-600 text-white font-semibold px-5 py-2.5 rounded-xl disabled:opacity-50">
          <Save size={16} /> Save Review
        </button>
        <button onClick={onCancel} className="text-gray-400 px-5 py-2.5">Cancel</button>
      </div>
    </div>
  );
}
