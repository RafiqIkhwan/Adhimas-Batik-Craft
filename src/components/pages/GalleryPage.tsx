import { useState, useEffect } from 'react';
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  RefreshCw,
} from 'lucide-react';
import { galleryCategories, type GalleryCategory } from '@/data/content';
import { Breadcrumb } from '@/components/collection/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { dbService } from '@/services/db';
import { GalleryItem } from '@/types/database';
import { useSiteConfig } from '@/context/SiteConfigContext';

export function GalleryPage() {
  const { config } = useSiteConfig();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Semua');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await dbService.getGallery();
        setItems(data);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems =
    activeCategory === 'Semua'
      ? items
      : items.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev !== null
            ? prev === 0
              ? filteredItems.length - 1
              : prev - 1
            : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredItems.length]);

  const currentItem =
    activeImageIndex !== null ? filteredItems[activeImageIndex] : null;

  const waConsultation = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Halo ${config.brand_name}, saya tertarik dengan foto karya di galeri Anda.`
  )}`;

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero Banner */}
      <section className="bg-cocoa-dark pt-20 pb-8 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[{ label: 'Beranda', to: '/' }, { label: 'Galeri' }]}
          />

          <div className="mt-5 max-w-2xl">
            <SectionLabel className="[&_span]:text-gold-light [&_.batik-divider]:bg-gold/40">
              Dokumentasi Visual
            </SectionLabel>
            <h1 className="mt-3 font-serif text-2xl font-medium leading-tight text-ivory sm:text-4xl lg:text-5xl text-balance">
              Galeri Dokumentasi & Karya
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-ivory/75 sm:mt-4 sm:text-base">
              Rekaman visual bengkel kerja {config.brand_name} di Yogyakarta: dedikasi pengrajin, proses canting lilin malam, dan helai kain pusaka.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-6 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          
          {/* Filter Tabs */}
          <div className="scrollbar-hide -mx-6 flex gap-1 overflow-x-auto border-b border-cocoa/10 px-6 pb-px lg:mx-0 lg:px-0">
            {galleryCategories.map((cat: GalleryCategory) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveImageIndex(null);
                  }}
                  className={`shrink-0 border-b-2 px-4 py-3 text-xs font-medium uppercase tracking-widest-sm transition-colors -mb-px ${
                    isActive
                      ? 'border-maroon font-semibold text-maroon'
                      : 'border-transparent text-cocoa/60 hover:text-cocoa hover:border-cocoa/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Counter & Loading info */}
          <div className="mt-6 mb-6 flex items-center justify-between text-xs text-cocoa/60">
            <span>
              Menampilkan <strong className="text-cocoa font-semibold">{filteredItems.length}</strong> foto
            </span>
            {loading ? (
              <span className="flex items-center gap-1.5 text-maroon font-medium">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                Memuat data galeri...
              </span>
            ) : (
              <span className="hidden sm:inline">
                Klik gambar untuk melihat resolusi penuh
              </span>
            )}
          </div>

          {/* Grid — 2 col on mobile */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                onClick={() => setActiveImageIndex(index)}
                className="group cursor-pointer border border-cocoa/10 bg-ivory transition-colors duration-200 hover:border-cocoa/30"
              >
                {/* Image — compact on mobile */}
                <div className="relative aspect-[4/3] max-h-[200px] overflow-hidden bg-ivory-200 sm:max-h-none">
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.pexels.com/photos/35189098/pexels-photo-35189098.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-cocoa text-ivory px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest-sm">
                    {item.category}
                  </span>
                  <div className="absolute right-3 bottom-3 flex h-7 w-7 items-center justify-center rounded-xs bg-ivory/80 text-cocoa opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 sm:p-4">
                  <h3 className="font-serif text-[13px] font-medium leading-tight text-cocoa transition-colors group-hover:text-maroon sm:text-base">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-cocoa/65 sm:mt-1.5 sm:text-xs">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ivory-50 border-t border-cocoa/10 py-16 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="font-serif text-2xl font-medium text-cocoa sm:text-3xl">
            Ingin Mengamati Karya Kami Lebih Dekat?
          </h2>
          <p className="mt-3 text-sm text-cocoa/70">
            Konsultasikan karya yang Anda minati atau atur jadwal kunjungan bersama kurator kami.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="whatsapp"
              href={waConsultation}
            >
              <MessageCircle className="h-4 w-4" />
              Tanya via WhatsApp
            </Button>
            <Button variant="outline" to="/koleksi">
              Jelajahi Koleksi
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentItem && activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-dark/95 backdrop-blur-xs p-4">
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-ivory/80 hover:text-ivory"
            aria-label="Tutup pratinjau"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev !== null
                  ? prev === 0
                    ? filteredItems.length - 1
                    : prev - 1
                  : null
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center text-ivory/80 hover:text-ivory"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev !== null ? (prev + 1) % filteredItems.length : null
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center text-ivory/80 hover:text-ivory"
            aria-label="Foto berikutnya"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div className="max-h-[85vh] max-w-4xl text-center">
            <img
              src={currentItem.image}
              alt={currentItem.alt || currentItem.title}
              className="max-h-[72vh] w-auto mx-auto object-contain"
            />
            <div className="mt-3">
              <span className="text-[10px] uppercase tracking-widest-sm text-gold-light">
                {currentItem.category} · Foto {activeImageIndex + 1} dari {filteredItems.length}
              </span>
              <h3 className="mt-1 font-serif text-lg font-medium text-ivory">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="mt-1 text-xs text-ivory/70 max-w-md mx-auto">
                  {currentItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
