import React, { useState, useEffect, FormEvent } from 'react';
import { Save, AlertCircle, CheckCircle2, Upload, Building2, Phone, MapPin, Share2 } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { dbService } from '@/services/db';

export const AdminSettings: React.FC = () => {
  const { config, updateConfig, refreshConfig } = useSiteConfig();

  const [formData, setFormData] = useState({
    brand_name: config.brand_name || '',
    logo: config.logo || '',
    whatsapp: config.whatsapp || '',
    email: config.email || '',
    phone: config.phone || '',
    address: config.address || '',
    instagram: config.instagram || '',
    tiktok: config.tiktok || '',
    opening_hours: config.opening_hours || '',
  });

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    setFormData({
      brand_name: config.brand_name || '',
      logo: config.logo || '',
      whatsapp: config.whatsapp || '',
      email: config.email || '',
      phone: config.phone || '',
      address: config.address || '',
      instagram: config.instagram || '',
      tiktok: config.tiktok || '',
      opening_hours: config.opening_hours || '',
    });
  }, [config]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('error', 'File logo harus berupa gambar.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast('error', 'Ukuran file logo maksimal 2MB.');
      return;
    }

    setUploadingLogo(true);
    try {
      const url = await dbService.uploadImage(file, 'settings');
      setFormData((prev) => ({ ...prev, logo: url }));
      showToast('success', 'Logo berhasil diupload.');
    } catch (err: unknown) {
      showToast('error', (err as Error).message || 'Gagal mengupload logo.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const cleanWa = formData.whatsapp.replace(/[^0-9]/g, '');
      const formattedDisplay = cleanWa.startsWith('62')
        ? `+62 ${cleanWa.slice(2, 5)}-${cleanWa.slice(5, 9)}-${cleanWa.slice(9)}`
        : formData.whatsapp;

      await updateConfig({
        brand_name: formData.brand_name.trim(),
        logo: formData.logo.trim(),
        whatsapp: cleanWa,
        whatsapp_display: formattedDisplay,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        instagram: formData.instagram.trim(),
        tiktok: formData.tiktok.trim(),
        opening_hours: formData.opening_hours.trim(),
      });

      await refreshConfig();
      showToast('success', 'Pengaturan website berhasil diperbarui dan langsung aktif di publik.');
    } catch (err: unknown) {
      showToast('error', (err as Error).message || 'Gagal memperbarui pengaturan website.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* HEADER */}
      <div className="border-b border-cocoa/10 pb-5">
        <h1 className="font-serif text-2xl font-semibold text-cocoa">Pengaturan Identitas Website</h1>
        <p className="text-xs text-cocoa/65 mt-1">
          Kelola informasi nama brand, nomor kontak WhatsApp, alamat galeri, sosial media, dan jam operasional.
        </p>
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
        </div>
      )}

      {/* SETTINGS FORM */}
      <form onSubmit={handleSubmit} className="bg-ivory border border-cocoa/10 p-6 space-y-6 shadow-xs text-xs">
        {/* BRAND IDENTITY */}
        <div>
          <h2 className="font-serif text-base font-semibold text-cocoa pb-2 border-b border-cocoa/10 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gold-dark" />
            <span>Identitas Brand</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-semibold text-cocoa mb-1">
                Nama Brand / Perusahaan <span className="text-maroon">*</span>
              </label>
              <input
                type="text"
                value={formData.brand_name}
                onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                required
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-cocoa">URL Logo Brand</label>
                <label className="cursor-pointer text-[11px] font-semibold text-maroon hover:underline flex items-center gap-1">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={uploadingLogo}
                  />
                </label>
              </div>
              {uploadingLogo && <p className="text-[11px] text-maroon font-medium mb-1">Mengunggah logo...</p>}
              <input
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="https://..."
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa font-mono outline-none focus:border-cocoa"
              />
            </div>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div>
          <h2 className="font-serif text-base font-semibold text-cocoa pb-2 border-b border-cocoa/10 flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold-dark" />
            <span>Informasi Kontak Resmi</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block font-semibold text-cocoa mb-1">
                Nomor WhatsApp (Angka saja) <span className="text-maroon">*</span>
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="6285845987124"
                required
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa font-mono"
              />
              <p className="mt-1 text-[10px] text-cocoa/50">Gunakan format internasional tanpa simbol (e.g. 6285845987124)</p>
            </div>

            <div>
              <label className="block font-semibold text-cocoa mb-1">
                Alamat Email <span className="text-maroon">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa"
              />
            </div>

            <div>
              <label className="block font-semibold text-cocoa mb-1">Telepon Studio</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+62 858 45987124"
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa"
              />
            </div>
          </div>
        </div>

        {/* LOCATION & HOURS */}
        <div>
          <h2 className="font-serif text-base font-semibold text-cocoa pb-2 border-b border-cocoa/10 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold-dark" />
            <span>Alamat & Jam Operasional</span>
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block font-semibold text-cocoa mb-1">Alamat Lengkap Studio/Galeri</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa"
              />
            </div>

            <div>
              <label className="block font-semibold text-cocoa mb-1">Jam Operasional</label>
              <input
                type="text"
                value={formData.opening_hours}
                onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
                placeholder="Senin – Sabtu: 09.00 – 17.00 WIB (Minggu Tutup)"
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h2 className="font-serif text-base font-semibold text-cocoa pb-2 border-b border-cocoa/10 flex items-center gap-2">
            <Share2 className="h-4 w-4 text-gold-dark" />
            <span>Media Sosial</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-semibold text-cocoa mb-1">Instagram Handle</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@adhimasbatik"
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa"
              />
            </div>

            <div>
              <label className="block font-semibold text-cocoa mb-1">TikTok Handle</label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                placeholder="@adhimasbatik"
                className="w-full border border-cocoa/20 bg-ivory px-3.5 py-2.5 text-xs text-cocoa outline-none focus:border-cocoa"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-4 border-t border-cocoa/10">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-maroon px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ivory hover:bg-maroon-dark transition-colors disabled:opacity-50 shadow-xs"
          >
            <Save className="h-4 w-4" />
            <span>{submitting ? 'Menyimpan Perubahan...' : 'Simpan Pengaturan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
