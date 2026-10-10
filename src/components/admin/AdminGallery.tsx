import React, { useState, useEffect, FormEvent } from 'react';
import { Plus, Edit, Trash2, X, AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { dbService } from '@/services/db';
import { GalleryItem } from '@/types/database';

export const AdminGallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Delete confirm modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Notifications
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    category: 'Karya & Produk',
    image: '',
    alt: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const categoriesOptions = ['Karya & Produk', 'Pengrajin', 'Workshop & Studio', 'Proses Pembuatan'];

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await dbService.getGallery();
      setGallery(data);
    } catch (err: unknown) {
     showToast('error', err instanceof Error ? err.message : 'Gagal...');
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

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Karya & Produk',
      image: '',
      alt: '',
      description: '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      alt: item.alt || '',
      description: item.description || '',
    });
    setFormErrors({});
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('error', 'File yang dipilih harus berupa gambar.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'Ukuran file gambar maksimal 5MB.');
      return;
    }

    setUploadingImage(true);
    try {
      const url = await dbService.uploadImage(file, 'gallery');
      setFormData((prev) => ({ ...prev, image: url }));
      showToast('success', 'Gambar berhasil diupload.');
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Gagal mengupload gambar.');
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'Judul gambar wajib diisi';
    if (!formData.image.trim()) errors.image = 'URL atau file gambar wajib diisi';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        image: formData.image.trim(),
        alt: formData.alt.trim() || formData.title.trim(),
        description: formData.description.trim(),
      };

      if (editingItem) {
        await dbService.updateGalleryItem(editingItem.id, payload);
        showToast('success', `Item galeri "${payload.title}" berhasil diperbarui.`);
      } else {
        await dbService.createGalleryItem(payload);
        showToast('success', `Foto "${payload.title}" berhasil ditambahkan ke galeri.`);
      }

      setModalOpen(false);
     await  loadData();
    } catch (err: unknown) {
      showToast('error', err instanceof Error ? err.message : 'Gagal menyimpan foto galeri.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (item: GalleryItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setSubmitting(true);
    try {
      await dbService.deleteGalleryItem(itemToDelete.id);
      showToast('success', `Foto "${itemToDelete.title}" berhasil dihapus.`);
      setDeleteModalOpen(false);
      setItemToDelete(null);
     await  loadData();
   } catch (err: unknown) {
    showToast('error', err instanceof Error ? err.message : 'Gagal...');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredGallery =
    activeCategory === 'Semua' ? gallery : gallery.filter((g) => g.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cocoa/10 pb-5">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-cocoa">Pengelolaan Galeri Dokumentasi</h1>
          <p className="text-xs text-cocoa/65 mt-1">
            Upload foto karya, studio, pengrajin, dan proses pembuatan batik ke galeri publik.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-maroon px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Foto Baru</span>
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

      {/* CATEGORY TABS */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-cocoa/10 pb-3">
        {['Semua', ...categoriesOptions].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 ${
              activeCategory === cat ? 'bg-cocoa text-ivory' : 'bg-ivory border border-cocoa/15 text-cocoa hover:border-cocoa'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALLERY GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-cocoa/60">Memuat foto galeri...</div>
        ) : filteredGallery.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-cocoa/60">Belum ada foto galeri.</div>
        ) : (
          filteredGallery.map((item) => (
            <div
              key={item.id}
              className="border border-cocoa/10 bg-ivory overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="relative aspect-[4/3] bg-ivory-200 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.pexels.com/photos/35189098/pexels-photo-35189098.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-cocoa-dark/80 text-ivory text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-serif font-semibold text-cocoa text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-cocoa/65 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 text-blue-700 hover:bg-blue-50 rounded transition-colors"
                  title="Edit Foto"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => confirmDelete(item)}
                  className="p-1.5 text-red-700 hover:bg-red-50 rounded transition-colors"
                  title="Hapus Foto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-ivory border border-cocoa/20 shadow-2xl my-8 overflow-hidden">
            <div className="flex items-center justify-between bg-cocoa-dark text-ivory px-6 py-4">
              <h2 className="font-serif text-base font-semibold">
                {editingItem ? 'Edit Item Galeri' : 'Upload Foto Galeri'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-ivory/70 hover:text-ivory">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-cocoa mb-1">
                  Judul Foto / Dokumentasi <span className="text-maroon">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Goresan Halus Canting Tembokan"
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                />
                {formErrors.title && <p className="mt-1 text-red-600">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block font-semibold text-cocoa mb-1">Kategori Galeri</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                >
                  {categoriesOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-cocoa">
                    URL Gambar <span className="text-maroon">*</span>
                  </label>
                  <label className="cursor-pointer text-[11px] font-semibold text-maroon hover:underline flex items-center gap-1">
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {uploadingImage && <p className="text-[11px] text-maroon font-medium mb-1">Mengunggah gambar...</p>}
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.pexels.com/..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa font-mono outline-none focus:border-cocoa"
                />
                {formErrors.image && <p className="mt-1 text-red-600">{formErrors.image}</p>}
              </div>

              {formData.image && (
                <div className="h-28 w-full bg-ivory-200 border border-cocoa/10 overflow-hidden">
                  <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}

              <div>
                <label className="block font-semibold text-cocoa mb-1">Alt Text (Aksesibilitas / SEO)</label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  placeholder="Pengrajin batik senior membatik dengan canting"
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
                />
              </div>

              <div>
                <label className="block font-semibold text-cocoa mb-1">Deskripsi Singkat Dokumentasi</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan detail mengenai foto ini..."
                  className="w-full border border-cocoa/20 bg-ivory px-3 py-2 text-xs text-cocoa outline-none focus:border-cocoa"
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
                  {submitting ? 'Simpan...' : editingItem ? 'Perbarui Foto' : 'Simpan foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-ivory border border-red-200 shadow-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-cocoa">Konfirmasi Hapus Foto</h3>
                <p className="mt-1 text-xs text-cocoa/70 leading-relaxed">
                  Apakah Anda yakin ingin menghapus foto galeri <strong className="text-cocoa font-semibold">"{itemToDelete.title}"</strong>?
                </p>
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
                disabled={submitting}
                className="px-4 py-2 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? 'Menghapus...' : 'Ya, Hapus Foto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
