import React, { useState, useEffect, FormEvent } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  AlertCircle,
  CheckCircle2,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { dbService } from '@/services/db';
import { Product, Category, StockStatus } from '@/types/database';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Delete Confirm Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Alert Notifications
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    motif: '',
    technique: '',
    material: '',
    color: '',
    size: '',
    price: 0,
    stock_status: 'Tersedia' as StockStatus,
    short_description: '',
    description: '',
    philosophy: '',
    story: '',
    production_time: '',
    imagesStr: '', // Line-separated or comma-separated image URLs
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        dbService.getProducts(),
        dbService.getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load products data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper slug generator
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const handleNameChange = (val: string) => {
    setFormData((prev) => {
      const nextSlug = prev.slug === '' || prev.slug === slugify(prev.name) ? slugify(val) : prev.slug;
      return { ...prev, name: val, slug: nextSlug };
    });
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      category_id: categories[0]?.id || '',
      motif: 'Parang',
      technique: 'Batik Tulis Canting 100% Manual',
      material: 'Katun Primisima Sanforized',
      color: 'Gradasi Sogan Senja & Cokelat Madu',
      size: '250 cm × 115 cm',
      price: 850000,
      stock_status: 'Tersedia',
      short_description: '',
      description: '',
      philosophy: '',
      story: '',
      production_time: '4-6 Minggu',
      imagesStr: '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      category_id: product.category_id || (categories.find((c) => c.name === product.category_name)?.id || categories[0]?.id || ''),
      motif: product.motif || '',
      technique: product.technique || '',
      material: product.material || '',
      color: product.color || '',
      size: product.size || '',
      price: product.price || 0,
      stock_status: product.stock_status || 'Tersedia',
      short_description: product.short_description || '',
      description: product.description || '',
      philosophy: product.philosophy || '',
      story: product.story || '',
      production_time: product.production_time || '',
      imagesStr: (product.images || []).join('\n'),
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          showToast('error', `File "${file.name}" bukan gambar.`);
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          showToast('error', `Ukuran file "${file.name}" melebihi 5MB.`);
          continue;
        }
        const url = await dbService.uploadImage(file, 'products');
        uploadedUrls.push(url);
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          imagesStr: prev.imagesStr ? `${prev.imagesStr}\n${uploadedUrls.join('\n')}` : uploadedUrls.join('\n'),
        }));
        showToast('success', `${uploadedUrls.length} gambar berhasil diupload.`);
      }
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Gagal mengupload gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Nama produk wajib diisi';
    if (!formData.slug.trim()) errors.slug = 'Slug wajib diisi';
    if (!formData.category_id) errors.category_id = 'Pilih kategori produk';
    if (formData.price <= 0 || isNaN(formData.price)) errors.price = 'Harga harus angka positif';
    if (!formData.motif.trim()) errors.motif = 'Motif wajib diisi';
    if (!formData.material.trim()) errors.material = 'Bahan/material wajib diisi';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const imageArray = formData.imagesStr
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const targetCategory = categories.find((c) => c.id === formData.category_id);

      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        category_id: formData.category_id,
        category_name: targetCategory?.name || 'Kain Batik',
        motif: formData.motif.trim(),
        technique: formData.technique.trim(),
        material: formData.material.trim(),
        color: formData.color.trim(),
        size: formData.size.trim(),
        price: Number(formData.price),
        stock_status: formData.stock_status,
        short_description: formData.short_description.trim(),
        description: formData.description.trim() || formData.short_description.trim(),
        philosophy: formData.philosophy.trim(),
        story: formData.story.trim(),
        production_time: formData.production_time.trim(),
        images: imageArray.length > 0 ? imageArray : ['https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=800'],
      };

      if (editingProduct) {
        await dbService.updateProduct(editingProduct.id, payload);
        showToast('success', `Produk "${payload.name}" berhasil diperbarui.`);
      } else {
        await dbService.createProduct(payload);
        showToast('success', `Produk "${payload.name}" berhasil ditambahkan.`);
      }

      setModalOpen(false);
      loadData();
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Gagal menyimpan produk.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    setSubmitting(true);
    try {
      await dbService.deleteProduct(productToDelete.id);
      showToast('success', `Produk "${productToDelete.name}" berhasil dihapus.`);
      setDeleteModalOpen(false);
      setProductToDelete(null);
      loadData();
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Gagal menghapus produk.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.motif.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === 'Semua' ||
      p.category_id === categoryFilter ||
      p.category_name === categoryFilter;

    const matchStatus = statusFilter === 'Semua' || p.stock_status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST NOTIFICATION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cocoa/10 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-cocoa">Pengelolaan Data Produk</h1>
          <p className="text-xs text-cocoa/65 mt-1">
            Tambah, ubah, dan hapus katalog produk batik yang tampil di website publik.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-maroon px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* ALERT NOTIFICATION TOAST */}
      {notification && (
        <div
          className={`flex items-center justify-between p-4 text-xs ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />}
            <span className="font-medium">{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-ivory border border-cocoa/10 p-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cocoa/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau motif..."
            className="w-full pl-9 pr-3 py-2 bg-ivory border border-cocoa/15 text-xs text-cocoa outline-none focus:border-cocoa"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-cocoa/15 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
          >
            <option value="Semua">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-cocoa/15 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
          >
            <option value="Semua">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Pre-order">Pre-order</option>
            <option value="Limited Edition">Limited Edition</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="border border-cocoa/10 bg-ivory overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-xs text-cocoa/60">Memuat data produk...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-xs text-cocoa/60">
            Tidak ada produk yang cocok dengan pencarian / filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-cocoa-dark text-ivory text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4">Gambar</th>
                  <th className="py-3 px-4">Nama Produk & Slug</th>
                  <th className="py-3 px-4">Kategori & Motif</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cocoa/10">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-ivory-50 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4 w-16">
                      <div className="h-12 w-12 bg-ivory-200 border border-cocoa/10 overflow-hidden shrink-0">
                        <img
                          src={p.images?.[0] || 'https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=800'}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=800';
                          }}
                        />
                      </div>
                    </td>

                    {/* Name & Slug */}
                    <td className="py-3 px-4">
                      <div className="font-serif font-semibold text-cocoa text-sm">{p.name}</div>
                      <div className="text-[10px] text-cocoa/50 font-mono mt-0.5">/{p.slug}</div>
                    </td>

                    {/* Category & Motif */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-cocoa">{p.category_name || 'Kain Batik'}</span>
                      <div className="text-[10px] text-cocoa/60">Motif: {p.motif}</div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-semibold text-maroon font-sans">
                      Rp{p.price.toLocaleString('id-ID')}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-xs ${
                          p.stock_status === 'Tersedia'
                            ? 'bg-green-100 text-green-800'
                            : p.stock_status === 'Pre-order'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {p.stock_status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/koleksi/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-cocoa/60 hover:text-cocoa hover:bg-cocoa/10 transition-colors rounded-xs"
                          title="Lihat Halaman Publik"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-blue-700 hover:bg-blue-50 transition-colors rounded-xs"
                          title="Edit Produk"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => confirmDeleteProduct(p)}
                          className="p-1.5 text-red-700 hover:bg-red-50 transition-colors rounded-xs"
                          title="Hapus Produk"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-ivory border border-cocoa/20 shadow-2xl my-8 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-cocoa-dark text-ivory px-6 py-4">
              <h2 className="font-serif text-lg font-semibold">
                {editingProduct ? 'Edit Data Produk' : 'Tambah Produk Baru'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-ivory/70 hover:text-ivory">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Product Name */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">
                    Nama Produk <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Batik Tulis Parang Senja"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  />
                  {formErrors.name && <p className="mt-1 text-red-600">{formErrors.name}</p>}
                </div>

                {/* Slug */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">
                    URL Slug <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="batik-tulis-parang-senja"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa font-mono"
                  />
                  {formErrors.slug && <p className="mt-1 text-red-600">{formErrors.slug}</p>}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Category */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">
                    Kategori <span className="text-maroon">*</span>
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">
                    Harga (Rp) <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="850000"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa font-sans"
                  />
                  {formErrors.price && <p className="mt-1 text-red-600">{formErrors.price}</p>}
                </div>

                {/* Stock Status */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">Status Ketersediaan</label>
                  <select
                    value={formData.stock_status}
                    onChange={(e) => setFormData({ ...formData, stock_status: e.target.value as StockStatus })}
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Pre-order">Pre-order</option>
                    <option value="Limited Edition">Limited Edition</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Motif */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">
                    Motif Utama <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.motif}
                    onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
                    placeholder="Parang / Kawung / Sido Mukti"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  />
                  {formErrors.motif && <p className="mt-1 text-red-600">{formErrors.motif}</p>}
                </div>

                {/* Material */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">
                    Material / Bahan <span className="text-maroon">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="Katun Primisima Sanforized"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  />
                  {formErrors.material && <p className="mt-1 text-red-600">{formErrors.material}</p>}
                </div>

                {/* Production Time */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">Waktu Pembuatan</label>
                  <input
                    type="text"
                    value={formData.production_time}
                    onChange={(e) => setFormData({ ...formData, production_time: e.target.value })}
                    placeholder="5 - 6 Minggu"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Technique */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">Teknik Pembuatan</label>
                  <input
                    type="text"
                    value={formData.technique}
                    onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                    placeholder="Batik Tulis Canting 100% Manual"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">Warna Dominan</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Gradasi Sogan & Terakota"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="block font-semibold text-cocoa mb-1">Ukuran / Dimensi</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="250 cm × 115 cm"
                    className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-cocoa mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Ringkasan singkat produk..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                />
              </div>

              {/* Philosophy */}
              <div>
                <label className="block font-semibold text-cocoa mb-1">Filosofi Motif</label>
                <textarea
                  rows={3}
                  value={formData.philosophy}
                  onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
                  placeholder="Makna dan doa filosofis di balik motif ini..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                />
              </div>

              {/* Story */}
              <div>
                <label className="block font-semibold text-cocoa mb-1">Cerita Pengerjaan Karya</label>
                <textarea
                  rows={3}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Kisah pengrajin & proses penciptaan batik..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                />
              </div>

              {/* Product Images & File Upload */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-cocoa">URL Foto Produk (Satu URL per baris)</label>
                  <label className="cursor-pointer text-[11px] font-semibold text-maroon hover:underline flex items-center gap-1">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {uploadingImage && <p className="text-[11px] text-maroon font-medium mb-1">Mengunggah gambar...</p>}
                <textarea
                  rows={3}
                  value={formData.imagesStr}
                  onChange={(e) => setFormData({ ...formData, imagesStr: e.target.value })}
                  placeholder="https://images.pexels.com/photos/..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa font-mono outline-none focus:border-cocoa"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-cocoa/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-cocoa/20 text-cocoa font-semibold hover:bg-ivory-50 transition-colors uppercase text-[11px] tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-maroon text-ivory font-semibold hover:bg-maroon-dark transition-colors uppercase text-[11px] tracking-wider disabled:opacity-50"
                >
                  {submitting ? 'Simpan Data...' : editingProduct ? 'Perbarui Produk' : 'Simpan Produk Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-ivory border border-red-200 shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-cocoa">Konfirmasi Hapus Produk</h3>
                <p className="mt-1 text-xs text-cocoa/70 leading-relaxed">
                  Apakah Anda yakin ingin menghapus produk <strong className="text-cocoa font-semibold">"{productToDelete.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-cocoa/20 text-cocoa text-xs font-semibold uppercase tracking-wider hover:bg-ivory-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? 'Menghapus...' : 'Ya, Hapus Produk'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
