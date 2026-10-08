export type UserRole = 'admin';

export interface User {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

export type StockStatus = 'Tersedia' | 'Pre-order' | 'Limited Edition';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  category_name?: string; // joined or mapped
  motif: string;
  technique: string;
  material: string;
  color: string;
  size: string;
  price: number;
  stock_status: StockStatus;
  short_description: string;
  description: string;
  philosophy: string;
  story: string;
  production_time: string;
  images: string[];
  badge?: string;
  popularity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Karya & Produk' | 'Pengrajin' | 'Workshop & Studio' | 'Proses Pembuatan' | string;
  image: string;
  alt: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export type InquiryStatus = 'new' | 'read' | 'replied' | 'archived';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  created_at?: string;
}

export interface SiteConfig {
  id: string;
  brand_name: string;
  logo: string;
  whatsapp: string;
  whatsapp_display?: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  tiktok: string;
  opening_hours: string;
  updated_at?: string;
}
