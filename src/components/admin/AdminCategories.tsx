import React, { useState, useEffect, FormEvent } from 'react';
import { Plus, Edit, Trash2, X, AlertCircle, CheckCircle2, FolderTree, Package } from 'lucide-react';
import { dbService } from '@/services/db';
import { Category, Product } from '@/types/database';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Delete Confirm Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [deleteWarning, setDeleteWarning] = useState('');

  // Alert Notifications
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        dbService.getCategories(),
        dbService.getProducts(),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      console.error('Failed to load categories:', err);
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
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', image: '' });
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      image: category.image || '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Nama kategori wajib diisi';
    if (!formData.slug.trim()) errors.slug = 'Slug wajib diisi';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
      };

      if (editingCategory) {
        await dbService.updateCategory(editingCategory.id, payload);
        showToast('success', `Kategori "${payload.name}" berhasil diperbarui.`);
      } else {
        await dbService.createCategory(payload);
        showToast('success', `Kategori "${payload.name}" berhasil ditambahkan.`);
      }

      setModalOpen(false);
      loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menyimpan kategori.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
    const usedProducts = products.filter(
      (p) => p.category_id === category.id || p.category_name === category.name
    );
    if (usedProducts.length > 0) {
      setDeleteWarning(
        `Kategori "${category.name}" saat ini digunakan oleh ${usedProducts.length} produk. Hapus atau pindahkan produk tersebut terlebih dahulu.`
      );
    } else {
      setDeleteWarning('');
    }
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    setSubmitting(true);
    try {
      await dbService.deleteCategory(categoryToDelete.id);
      showToast('success', `Kategori "${categoryToDelete.name}" berhasil dihapus.`);
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
      loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Gagal menghapus kategori.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cocoa/10 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-cocoa">Pengelolaan Kategori Produk</h1>
          <p className="text-xs text-cocoa/65 mt-1">
            Kelola struktur taksonomi dan kelompok koleksi kain/busana batik.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-maroon px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Kategori Baru</span>
        </button>
      </div>

      {/* ALERT TOAST */}
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

      {/* CATEGORIES GRID / TABLE */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-cocoa/60">Memuat data kategori...</div>
        ) : categories.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-cocoa/60">Belum ada kategori.</div>
        ) : (
          categories.map((cat) => {
            const productCount = products.filter(
              (p) => p.category_id === cat.id || p.category_name === cat.name
            ).length;

            return (
              <div
                key={cat.id}
                className="border border-cocoa/10 bg-ivory p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-cocoa">{cat.name}</h3>
                      <span className="text-[10px] text-cocoa/50 font-mono block mt-0.5">/{cat.slug}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-cocoa/5 text-cocoa text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      <Package className="h-3 w-3 text-gold-dark" />
                      {productCount} Produk
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-cocoa/70">
                    {cat.description || 'Tidak ada deskripsi kategori.'}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-cocoa/10 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:bg-blue-50 px-2.5 py-1.5 rounded transition-colors"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => confirmDeleteCategory(cat)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE / EDIT CATEGORY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-ivory border border-cocoa/20 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between bg-cocoa-dark text-ivory px-6 py-4">
              <h2 className="font-serif text-base font-semibold">
                {editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-ivory/70 hover:text-ivory">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-cocoa mb-1">
                  Nama Kategori <span className="text-maroon">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Kain Batik"
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                />
                {formErrors.name && <p className="mt-1 text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block font-semibold text-cocoa mb-1">
                  URL Slug <span className="text-maroon">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="kain-batik"
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa font-mono"
                />
                {formErrors.slug && <p className="mt-1 text-red-600">{formErrors.slug}</p>}
              </div>

              <div>
                <label className="block font-semibold text-cocoa mb-1">Deskripsi Kategori</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan ringkas mengenai kategori..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                />
              </div>

              <div>
                <label className="block font-semibold text-cocoa mb-1">URL Gambar Sampul (Opsional)</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa font-mono outline-none focus:border-cocoa"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-cocoa/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-cocoa/20 text-cocoa font-semibold uppercase text-[11px] tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-maroon text-ivory font-semibold uppercase text-[11px] tracking-wider hover:bg-maroon-dark disabled:opacity-50"
                >
                  {submitting ? 'Simpan...' : editingCategory ? 'Perbarui' : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-ivory border border-red-200 shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-cocoa">Konfirmasi Hapus Kategori</h3>
                <p className="mt-1 text-xs text-cocoa/70 leading-relaxed">
                  Apakah Anda yakin ingin menghapus kategori <strong className="text-cocoa font-semibold">"{categoryToDelete.name}"</strong>?
                </p>
                {deleteWarning && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xs">
                    {deleteWarning}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-cocoa/20 text-cocoa text-xs font-semibold uppercase tracking-wider"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting || !!deleteWarning}
                className="px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? 'Menghapus...' : 'Ya, Hapus Kategori'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
