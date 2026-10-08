import { useState, useEffect, type FormEvent } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Send,
  CheckCircle2,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { Breadcrumb } from '@/components/collection/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { dbService } from '@/services/db';
import { useSiteConfig } from '@/context/SiteConfigContext';

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  whatsapp: '',
  subject: 'Tanya Ketersediaan Produk',
  message: '',
};

export function ContactPage() {
  const { config, whatsappLink } = useSiteConfig();
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = (): boolean => {
    const err: Partial<Record<keyof FormState, string>> = {};

    if (!formData.name.trim()) {
      err.name = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      err.email = 'Alamat email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      err.email = 'Format email tidak valid';
    }

    if (!formData.whatsapp.trim()) {
      err.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^[0-9+()-\s]{8,20}$/.test(formData.whatsapp)) {
      err.whatsapp = 'Nomor WhatsApp tidak valid';
    }

    if (!formData.message.trim()) {
      err.message = 'Pesan atau pertanyaan wajib diisi';
    } else if (formData.message.trim().length < 10) {
      err.message = 'Pesan minimal 10 karakter';
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      // Save directly to contact_inquiries table in database
      await dbService.createInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        whatsapp: formData.whatsapp.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
      });

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal mengirimkan pesan. Silakan coba beberapa saat lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    const text = `Halo ${config.brand_name},\n\nNama: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nSubjek: ${formData.subject}\n\nPesan:\n${formData.message}`;
    const url = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const instagramUrl = config.instagram?.startsWith('http')
    ? config.instagram
    : `https://instagram.com/${config.instagram?.replace('@', '')}`;

  const tiktokUrl = config.tiktok?.startsWith('http')
    ? config.tiktok
    : `https://tiktok.com/${config.tiktok?.startsWith('@') ? config.tiktok : `@${config.tiktok}`}`;

  const subjects = [
    'Tanya Ketersediaan Produk',
    'Pemesanan Kustom Jahit Busana',
    'Konsultasi Koleksi Sutra & Eksklusif',
    'Reservasi Kunjungan Workshop Sleman',
    'Kerjasama Korporat & Souvenir Budaya',
    'Lainnya',
  ];

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero Banner */}
      <section className="bg-cocoa-dark pt-20 pb-8 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[{ label: 'Beranda', to: '/' }, { label: 'Kontak' }]}
          />

          <div className="mt-5 max-w-2xl">
            <SectionLabel className="[&_span]:text-gold-light [&_.batik-divider]:bg-gold/40">
              Pelayanan & Komunikasi
            </SectionLabel>
            <h1 className="mt-3 font-serif text-2xl font-medium leading-tight text-ivory sm:text-4xl lg:text-5xl text-balance">
              Hubungi Tim {config.brand_name}
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-ivory/75 sm:mt-4 sm:text-base">
              Tim kurator dan pengrajin kami siap membantu pertanyaan seputar ketersediaan kain, pemesanan kustom, maupun reservasi kunjungan studio.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* LEFT COLUMN: Contact Information */}
            <div className="lg:col-span-5">
              <SectionLabel>Informasi Resmi</SectionLabel>
              <h2 className="mt-3 font-serif text-2xl font-medium text-cocoa sm:text-3xl">
                Alamat & Kontak Studio
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-cocoa/70">
                Pintu komunikasi kami terbuka setiap hari kerja. Silakan hubungi kontak berikut atau buat janji temu kunjungan langsung ke Sleman.
              </p>

              <div className="mt-6 space-y-4 text-xs">
                {/* WhatsApp */}
                <div className="flex items-start gap-3.5 border border-cocoa/10 bg-ivory-50 p-4">
                  <MessageCircle className="h-4 w-4 text-green-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-cocoa block">WhatsApp Resmi</span>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon font-medium hover:underline mt-0.5 block"
                    >
                      {config.whatsapp_display || config.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 border border-cocoa/10 bg-ivory-50 p-4">
                  <Mail className="h-4 w-4 text-maroon mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-cocoa block">Surel</span>
                    <a
                      href={`mailto:${config.email}`}
                      className="text-cocoa/80 hover:underline mt-0.5 block"
                    >
                      {config.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 border border-cocoa/10 bg-ivory-50 p-4">
                  <Phone className="h-4 w-4 text-gold-dark mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-cocoa block">Telepon Studio</span>
                    <a
                      href={`tel:${config.phone}`}
                      className="text-cocoa/80 hover:underline mt-0.5 block"
                    >
                      {config.phone}
                    </a>
                  </div>
                </div>

                {/* Address & Hours */}
                <div className="flex items-start gap-3.5 border border-cocoa/10 bg-ivory-50 p-4">
                  <MapPin className="h-4 w-4 text-cocoa mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-cocoa block">Alamat Galeri</span>
                    <p className="text-cocoa/75 mt-0.5 leading-relaxed">{config.address}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-cocoa/60">
                      <Clock className="h-3 w-3 text-gold-dark" />
                      <span>{config.opening_hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6 border-t border-cocoa/10 pt-5">
                <span className="text-[11px] font-semibold uppercase tracking-widest-sm text-cocoa/60 block">
                  Media Sosial
                </span>
                <div className="mt-2.5 flex items-center gap-3 text-xs">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 border border-cocoa/15 px-3 py-1.5 text-cocoa hover:border-cocoa transition-colors"
                  >
                    <Instagram className="h-3.5 w-3.5" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 border border-cocoa/15 px-3 py-1.5 text-cocoa hover:border-cocoa transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <div className="lg:col-span-7">
              <div className="border border-cocoa/10 bg-ivory p-6 sm:p-8">
                <SectionLabel>Formulir Inquiry</SectionLabel>
                <h3 className="mt-3 font-serif text-2xl font-medium text-cocoa">
                  Kirim Pesan atau Pertanyaan
                </h3>
                <p className="mt-1 text-xs text-cocoa/65">
                  Isi data di bawah ini, tim kami akan merespons dalam waktu 1×24 jam kerja.
                </p>

                {submitted ? (
                  <div className="mt-6 border border-green-200 bg-green-50/60 p-6 text-center">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-green-700" />
                    <h4 className="mt-3 font-serif text-lg font-medium text-green-950">
                      Pesan Anda Berhasil Terkirim
                    </h4>
                    <p className="mt-1.5 text-xs text-green-800 max-w-sm mx-auto">
                      Terima kasih <strong className="font-semibold">{formData.name}</strong>. Pesan Anda telah tersimpan di basis data kami. Tim kurator {config.brand_name} akan segera menghubungi Anda.
                    </p>

                    <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleSendViaWhatsApp}
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-4 py-2.5 text-xs font-semibold uppercase tracking-widest-sm text-white hover:bg-[#1EBE5D] transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Lanjutkan via WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData(initialForm);
                        }}
                        className="inline-flex items-center justify-center border border-cocoa/20 px-3.5 py-2 text-xs font-medium uppercase tracking-widest-sm text-cocoa hover:bg-ivory-50 transition-colors"
                      >
                        Kirim Pesan Baru
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                    {errorMsg && (
                      <div className="flex items-center gap-2 border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-cocoa">
                        Nama Lengkap <span className="text-maroon">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Nama Anda"
                        disabled={submitting}
                        className={`mt-1.5 w-full border bg-ivory px-3.5 py-2.5 text-sm text-cocoa outline-none transition-colors ${
                          errors.name
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-cocoa/15 focus:border-cocoa'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-cocoa">
                          Alamat Email <span className="text-maroon">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="email@anda.com"
                          disabled={submitting}
                          className={`mt-1.5 w-full border bg-ivory px-3.5 py-2.5 text-sm text-cocoa outline-none transition-colors ${
                            errors.email
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-cocoa/15 focus:border-cocoa'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-cocoa">
                          Nomor WhatsApp <span className="text-maroon">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) =>
                            setFormData({ ...formData, whatsapp: e.target.value })
                          }
                          placeholder="0812xxxxxxxx"
                          disabled={submitting}
                          className={`mt-1.5 w-full border bg-ivory px-3.5 py-2.5 text-sm text-cocoa outline-none transition-colors ${
                            errors.whatsapp
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-cocoa/15 focus:border-cocoa'
                          }`}
                        />
                        {errors.whatsapp && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.whatsapp}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-cocoa">
                        Subjek
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        disabled={submitting}
                        className="mt-1.5 w-full border border-cocoa/15 bg-ivory px-3.5 py-2.5 text-sm text-cocoa outline-none focus:border-cocoa"
                      >
                        {subjects.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-cocoa">
                        Pesan Anda <span className="text-maroon">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
                        disabled={submitting}
                        className={`mt-1.5 w-full border bg-ivory px-3.5 py-2.5 text-sm text-cocoa outline-none transition-colors ${
                          errors.message
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-cocoa/15 focus:border-cocoa'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 bg-maroon px-5 py-3 text-xs font-semibold uppercase tracking-widest-sm text-ivory hover:bg-maroon-dark transition-colors disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Menyimpan ke Database...</span>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Kirim Pesan</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
