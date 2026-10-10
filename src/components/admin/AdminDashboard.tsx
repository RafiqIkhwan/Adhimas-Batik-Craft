import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  FolderTree,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Plus,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { dbService } from '@/services/db';
import { Product, Category, GalleryItem, ContactInquiry } from '@/types/database';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [prods, cats, gal, inqs] = await Promise.all([
        dbService.getProducts(),
        dbService.getCategories(),
        dbService.getGallery(),
        dbService.getInquiries(),
      ]);
      setProducts(prods);
      setCategories(cats);
      setGallery(gal);
      setInquiries(inqs);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cocoa/10 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-cocoa">Dashboard Ringkasan</h1>
          <p className="text-xs text-cocoa/65 mt-1">
            Pantau statistik katalog produk, respon pesan, dan pembaruan sistem secara real-time.
          </p>
        </div>

        <button
          onClick={loadStats}
          disabled={loading}
          className="inline-flex items-center gap-2 border border-cocoa/20 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-cocoa hover:bg-cocoa hover:text-ivory transition-colors self-start sm:self-auto rounded-sm disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {/* Total Products */}
        <div className="border border-cocoa/10 bg-ivory p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cocoa/60">
              Total Produk
            </span>
            <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-bold text-cocoa">
            {loading ? '-' : products.length}
          </p>
          <Link
            to="/admin/products"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-maroon hover:underline"
          >
            <span>Kelola Produk</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Total Categories */}
        <div className="border border-cocoa/10 bg-ivory p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cocoa/60">
              Kategori
            </span>
            <div className="h-9 w-9 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-700">
              <FolderTree className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-bold text-cocoa">
            {loading ? '-' : categories.length}
          </p>
          <Link
            to="/admin/categories"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-maroon hover:underline"
          >
            <span>Kelola Kategori</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Total Gallery */}
        <div className="border border-cocoa/10 bg-ivory p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cocoa/60">
              Dokumentasi Galeri
            </span>
            <div className="h-9 w-9 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-700">
              <ImageIcon className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-bold text-cocoa">
            {loading ? '-' : gallery.length}
          </p>
          <Link
            to="/admin/gallery"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-maroon hover:underline"
          >
            <span>Kelola Galeri</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Total Inquiry */}
        <div className="border border-cocoa/10 bg-ivory p-5 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cocoa/60">
              Total Inquiry
            </span>
            <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-700">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-bold text-cocoa">
            {loading ? '-' : inquiries.length}
          </p>
          <Link
            to="/admin/inquiries"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-maroon hover:underline"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* New Inquiry (Highlighted) */}
        <div className="border border-maroon/30 bg-maroon/5 p-5 shadow-xs transition-shadow hover:shadow-md col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-maroon">
              Inquiry Baru
            </span>
            <div className="h-9 w-9 rounded-full bg-maroon text-ivory flex items-center justify-center font-bold text-xs">
              {newInquiriesCount}
            </div>
          </div>
          <p className="mt-3 font-serif text-3xl font-bold text-maroon">
            {loading ? '-' : newInquiriesCount}
          </p>
          <Link
            to="/admin/inquiries"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-maroon hover:underline"
          >
            <span>Respon Segera</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* QUICK ACTIONS & RECENT INQUIRIES GRID */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* RECENT INQUIRIES TABLE */}
        <div className="lg:col-span-8 border border-cocoa/10 bg-ivory p-6">
          <div className="flex items-center justify-between pb-4 border-b border-cocoa/10">
            <div>
              <h2 className="font-serif text-lg font-semibold text-cocoa">Inquiry Terbaru</h2>
              <p className="text-xs text-cocoa/60">Pesan dari pengunjung formulir kontak website publik</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-semibold uppercase tracking-wider text-maroon hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-cocoa/60">Memuat inquiry...</div>
          ) : inquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-cocoa/60">Belum ada inquiry masuk.</div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-cocoa/10 text-cocoa/50 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">Tanggal</th>
                    <th className="py-3 px-2">Nama</th>
                    <th className="py-3 px-2">Subjek</th>
                    <th className="py-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cocoa/10">
                  {inquiries.slice(0, 5).map((inq) => (
                    <tr key={inq.id} className="hover:bg-ivory-50 transition-colors">
                      <td className="py-3 px-2 text-cocoa/60 font-mono text-[11px]">
                        {inq.created_at
                          ? new Date(inq.created_at).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })
                          : '-'}
                      </td>
                      <td className="py-3 px-2 font-medium text-cocoa">
                        <div>{inq.name}</div>
                        <div className="text-[10px] text-cocoa/50 font-normal">{inq.whatsapp}</div>
                      </td>
                      <td className="py-3 px-2 text-cocoa/80 max-w-[200px] truncate">{inq.subject}</td>
                      <td className="py-3 px-2 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-xs ${
                            inq.status === 'new'
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : inq.status === 'read'
                              ? 'bg-blue-100 text-blue-700'
                              : inq.status === 'replied'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* QUICK SHORTCUTS & SYSTEM STATUS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-cocoa/10 bg-ivory p-6">
            <h2 className="font-serif text-lg font-semibold text-cocoa pb-3 border-b border-cocoa/10">
              Aksi Cepat
            </h2>
            <div className="mt-4 space-y-2.5">
              <Link
                to="/admin/products"
                className="flex items-center gap-3 p-3 border border-cocoa/10 bg-ivory-50 hover:bg-cocoa hover:text-ivory transition-colors text-xs font-semibold uppercase tracking-wider text-cocoa"
              >
                <Plus className="h-4 w-4 text-maroon" />
                <span>Tambah Produk Baru</span>
              </Link>
              <Link
                to="/admin/gallery"
                className="flex items-center gap-3 p-3 border border-cocoa/10 bg-ivory-50 hover:bg-cocoa hover:text-ivory transition-colors text-xs font-semibold uppercase tracking-wider text-cocoa"
              >
                <Plus className="h-4 w-4 text-maroon" />
                <span>Upload Foto Galeri</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center gap-3 p-3 border border-cocoa/10 bg-ivory-50 hover:bg-cocoa hover:text-ivory transition-colors text-xs font-semibold uppercase tracking-wider text-cocoa"
              >
                <Sparkles className="h-4 w-4 text-gold-dark" />
                <span>Ubah Pengaturan Website</span>
              </Link>
            </div>
          </div>

          <div className="border border-cocoa/10 bg-cocoa-dark text-ivory p-6">
            <h3 className="font-serif text-base font-medium text-ivory">Website Status</h3>
            <p className="text-xs text-ivory/70 mt-1 leading-relaxed">
              Website publik berjalan normal & terhubung dengan basis data.
            </p>
            <div className="mt-4 flex items-center justify-between text-xs border-t border-ivory/15 pt-3">
              <span className="text-gold-light font-semibold uppercase text-[10px] tracking-wider">
                Database System
              </span>
              <span className="flex items-center gap-1.5 text-green-400 font-medium text-[11px]">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Aktif & Terhubung
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
