import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  Product,
  Category,
  GalleryItem,
  ContactInquiry,
  SiteConfig,
  InquiryStatus,
} from '@/types/database';
import {
  collectionProducts,
  galleryItems,
  brand,
} from '@/data/content';

const STORAGE_KEYS = {
  PRODUCTS: 'adhimas_products_v1',
  CATEGORIES: 'adhimas_categories_v1',
  GALLERY: 'adhimas_gallery_v1',
  INQUIRIES: 'adhimas_inquiries_v1',
  SITE_CONFIG: 'adhimas_site_config_v1',
};

// INITIAL SEED DATA FOR LOCALSTORAGE
const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Kain Batik',
    slug: 'kain-batik',
    description: 'Koleksi kain batik tulis lembaran kualitas tinggi',
    image: 'https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cat-2',
    name: 'Kemeja Batik',
    slug: 'kemeja-batik',
    description: 'Kemeja batik tulis pria bespoke matched pattern',
    image: 'https://images.pexels.com/photos/35243199/pexels-photo-35243199.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cat-3',
    name: 'Dress Batik',
    slug: 'dress-batik',
    description: 'Gaun dan dress batik wanita anggun kontemporer',
    image: 'https://images.pexels.com/photos/20672197/pexels-photo-20672197.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cat-4',
    name: 'Outer Batik',
    slug: 'outer-batik',
    description: 'Cardigan dan outer batik kasual modern',
    image: 'https://images.pexels.com/photos/35189098/pexels-photo-35189098.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cat-5',
    name: 'Batik Eksklusif',
    slug: 'batik-eksklusif',
    description: 'Mahakarya batik tulis kraton istimewa',
    image: 'https://images.pexels.com/photos/13002518/pexels-photo-13002518.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'cat-6',
    name: 'Limited Edition',
    slug: 'limited-edition',
    description: 'Edisi terbatas bernomor seri kurasi museum',
    image: 'https://images.pexels.com/photos/32027613/pexels-photo-32027613.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const INITIAL_SITE_CONFIG: SiteConfig = {
  id: 'sc-1',
  brand_name: brand.name,
  logo: '',
  whatsapp: brand.whatsappNumber,
  whatsapp_display: brand.whatsappDisplay,
  email: brand.email,
  phone: brand.phone,
  address: brand.address,
  instagram: brand.instagram,
  tiktok: brand.tiktok,
  opening_hours: brand.openingHours,
};

const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    whatsapp: '081234567890',
    subject: 'Konsultasi Koleksi Sutra & Eksklusif',
    message: 'Halo, saya ingin menanyakan apakah Batik Tulis Sido Mukti Sutra masih ready stok untuk dikirim ke Jakarta?',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'inq-2',
    name: 'Siti Rahmawati',
    email: 'siti.rahma@example.com',
    whatsapp: '085712345678',
    subject: 'Pemesanan Kustom Jahit Busana',
    message: 'Apakah melayani pemesanan seragam kemeja batik tulis untuk acara pernikahan keluarga?',
    status: 'read',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

// Helper to map collectionProducts from content.ts to Product interface
const INITIAL_PRODUCTS: Product[] = collectionProducts.map((p) => {
  const cat = INITIAL_CATEGORIES.find((c) => c.name === p.category);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category_id: cat ? cat.id : 'cat-1',
    category_name: p.category,
    motif: p.motif,
    technique: 'Batik Tulis Canting 100% Manual',
    material: p.fabric,
    color: 'Gradasi Sogan & Terakota',
    size: '250 cm × 115 cm',
    price: p.price,
    stock_status: p.status,
    short_description: p.description,
    description: p.description,
    philosophy: 'Harmoni keindahan dan nilai filosofis leluhur.',
    story: 'Dikerjakan dengan ketelitian penuh oleh pengrajin berpengalaman.',
    production_time: '4-6 Minggu',
    images: [p.image],
    badge: p.badge,
    popularity: p.popularity,
    created_at: new Date().toISOString(),
  };
});

const INITIAL_GALLERY: GalleryItem[] = galleryItems.map((g) => ({
  id: g.id,
  title: g.title,
  category: g.category,
  image: g.image,
  alt: g.alt,
  description: g.description,
  created_at: new Date().toISOString(),
}));

// LocalStorage Helper
function getLocal<T>(key: string, initial: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(item);
  } catch (err) {
    console.error('LocalStorage error:', err);
    return initial;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

export const dbService = {
  // --- SITE CONFIG ---
  async getSiteConfig(): Promise<SiteConfig> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('site_config').select('*').single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase site_config error, using fallback:', e);
      }
    }
    return getLocal<SiteConfig>(STORAGE_KEYS.SITE_CONFIG, INITIAL_SITE_CONFIG);
  },

  async updateSiteConfig(config: Partial<SiteConfig>): Promise<SiteConfig> {
    const current = await this.getSiteConfig();
    const updated = { ...current, ...config, updated_at: new Date().toISOString() };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .update(updated)
          .eq('id', current.id)
          .select()
          .single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase update site_config error:', e);
      }
    }

    setLocal(STORAGE_KEYS.SITE_CONFIG, updated);
    return updated;
  },

  // --- CATEGORIES ---
  async getCategories(options: { strict?: boolean } = {}): Promise<Category[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (error) {
          throw error;
        }
        if (options.strict) {
          return data ?? [];
        }
        if (data && data.length > 0) {
          return data;
        }
      } catch (error) {
        if (options.strict) {
          throw error;
        }
        console.warn('Supabase categories fetch error:', error);
      }
    }
    return getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  async createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
    const id = `cat-${Date.now()}`;
    const newCat: Category = {
      ...category,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('categories').insert([category]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase create category error:', e);
      }
    }

    const categories = await this.getCategories();
    categories.push(newCat);
    setLocal(STORAGE_KEYS.CATEGORIES, categories);
    return newCat;
  },

  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('categories')
          .update({ ...category, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase update category error:', e);
      }
    }

    const categories = await this.getCategories();
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Category not found');

    const updated = { ...categories[idx], ...category, updated_at: new Date().toISOString() };
    categories[idx] = updated;
    setLocal(STORAGE_KEYS.CATEGORIES, categories);
    return updated;
  },

  async deleteCategory(id: string): Promise<void> {
    // Check if used by products
    const products = await this.getProducts();
    const isUsed = products.some((p) => p.category_id === id);
    if (isUsed) {
      throw new Error('Kategori ini masih digunakan oleh produk. Hapus atau pindahkan produk terlebih dahulu.');
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (!error) return;
      } catch (e) {
        console.warn('Supabase delete category error:', e);
      }
    }

    const categories = await this.getCategories();
    const filtered = categories.filter((c) => c.id !== id);
    setLocal(STORAGE_KEYS.CATEGORIES, filtered);
  },

  // --- PRODUCTS ---
  async getProducts(): Promise<Product[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('created_at', { ascending: false });
      if (error) {
        throw error;
      }

      return (data ?? []).map((item: Product & { categories: Pick<Category, 'name'> | null }) => ({
        ...item,
        category_name: item.categories?.name || 'Kain Batik',
      }));
    }

    const categories = getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const products = getLocal<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    
    // Attach category_name for display
    return products.map((p) => {
      const cat = categories.find((c) => c.id === p.category_id || c.name === p.category_name);
      return {
        ...p,
        category_name: cat ? cat.name : p.category_name || 'Kain Batik',
      };
    });
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find((p) => p.slug === slug) || null;
  },

  async createProduct(
    productData: Omit<
      Product,
      'id' | 'created_at' | 'updated_at' | 'category_name' | 'badge' | 'popularity'
    >
  ): Promise<Product> {
    // Validate slug uniqueness
    const existing = await this.getProducts();
    if (existing.some((p) => p.slug === productData.slug)) {
      throw new Error(`Slug "${productData.slug}" sudah digunakan oleh produk lain.`);
    }

    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select('*, categories(name)')
        .single();
      if (error) {
        throw error;
      }

      return {
        ...data,
        category_name: data.categories?.name || 'Kain Batik',
      };
    }

    existing.unshift(newProduct);
    setLocal(STORAGE_KEYS.PRODUCTS, existing);
    return newProduct;
  },

  async updateProduct(
    id: string,
    productData: Partial<
      Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category_name' | 'badge' | 'popularity'>
    >
  ): Promise<Product> {
    const existing = await this.getProducts();
    if (productData.slug) {
      const duplicate = existing.find((p) => p.slug === productData.slug && p.id !== id);
      if (duplicate) {
        throw new Error(`Slug "${productData.slug}" sudah digunakan oleh produk lain.`);
      }
    }

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .update({ ...productData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*, categories(name)')
        .single();
      if (error) {
        throw error;
      }

      return {
        ...data,
        category_name: data.categories?.name || 'Kain Batik',
      };
    }

    const idx = existing.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Produk tidak ditemukan');

    const updated = { ...existing[idx], ...productData, updated_at: new Date().toISOString() };
    existing[idx] = updated;
    setLocal(STORAGE_KEYS.PRODUCTS, existing);
    return updated;
  },

  async deleteProduct(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .select('id')
        .single();
      if (error) {
        throw error;
      }

      return;
    }

    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    setLocal(STORAGE_KEYS.PRODUCTS, filtered);
  },

  // --- GALLERY ---
  async getGallery(): Promise<GalleryItem[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase gallery fetch error:', e);
      }
    }
    return getLocal<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  },

  async createGalleryItem(item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryItem> {
    const id = `g-${Date.now()}`;
    const newItem: GalleryItem = {
      ...item,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('gallery').insert([item]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase create gallery error:', e);
      }
    }

    const items = await this.getGallery();
    items.unshift(newItem);
    setLocal(STORAGE_KEYS.GALLERY, items);
    return newItem;
  },

  async updateGalleryItem(id: string, item: Partial<GalleryItem>): Promise<GalleryItem> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .update({ ...item, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase update gallery error:', e);
      }
    }

    const items = await this.getGallery();
    const idx = items.findIndex((g) => g.id === id);
    if (idx === -1) throw new Error('Item galeri tidak ditemukan');

    const updated = { ...items[idx], ...item, updated_at: new Date().toISOString() };
    items[idx] = updated;
    setLocal(STORAGE_KEYS.GALLERY, items);
    return updated;
  },

  async deleteGalleryItem(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (!error) return;
      } catch (e) {
        console.warn('Supabase delete gallery error:', e);
      }
    }

    const items = await this.getGallery();
    const filtered = items.filter((g) => g.id !== id);
    setLocal(STORAGE_KEYS.GALLERY, filtered);
  },

  // --- CONTACT INQUIRIES ---
  async getInquiries(): Promise<ContactInquiry[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase inquiries fetch error:', e);
      }
    }
    return getLocal<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  },

  async createInquiry(inquiry: Omit<ContactInquiry, 'id' | 'status' | 'created_at'>): Promise<ContactInquiry> {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('contact_inquiries').insert([newInquiry]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase create inquiry error:', e);
      }
    }

    const inquiries = await this.getInquiries();
    inquiries.unshift(newInquiry);
    setLocal(STORAGE_KEYS.INQUIRIES, inquiries);
    return newInquiry;
  },

  async updateInquiryStatus(id: string, status: InquiryStatus): Promise<ContactInquiry> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('contact_inquiries')
          .update({ status })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase update inquiry error:', e);
      }
    }

    const inquiries = await this.getInquiries();
    const idx = inquiries.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Inquiry tidak ditemukan');

    inquiries[idx].status = status;
    setLocal(STORAGE_KEYS.INQUIRIES, inquiries);
    return inquiries[idx];
  },

  async deleteInquiry(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
        if (!error) return;
      } catch (e) {
        console.warn('Supabase delete inquiry error:', e);
      }
    }

    const inquiries = await this.getInquiries();
    const filtered = inquiries.filter((i) => i.id !== id);
    setLocal(STORAGE_KEYS.INQUIRIES, filtered);
  },

  // --- FILE UPLOAD HELPER ---
  async uploadImage(file: File, folder: 'products' | 'gallery' | 'settings' = 'products'): Promise<string> {
    if (isSupabaseConfigured) {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
      
      // Targetkan ke bucket 'products' secara dinamis sesuai parameter folder
      const { data, error } = await supabase.storage.from(folder).upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage.from(folder).getPublicUrl(data.path);
      if (!publicUrlData.publicUrl) {
        throw new Error('URL publik gambar tidak tersedia.');
      }
      return publicUrlData.publicUrl;
    }

    // Fallback to Data URL for LocalStorage
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  },
};
