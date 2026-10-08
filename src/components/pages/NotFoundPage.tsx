import { useEffect } from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/collection/Breadcrumb';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-ivory">
      {/* Header Banner */}
      <section className="bg-cocoa-dark pt-28 pb-12 lg:pt-32 lg:pb-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Breadcrumb
            items={[
              { label: 'Beranda', to: '/' },
              { label: 'Halaman Tidak Ditemukan (404)' },
            ]}
          />
        </div>
      </section>

      {/* 404 Notice */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon/10 text-maroon">
            <HelpCircle className="h-8 w-8" strokeWidth={1.5} />
          </div>

          <span className="mt-6 inline-block font-sans text-xs font-semibold uppercase tracking-widest-sm text-gold-dark">
            Error 404 — Halaman Tidak Ditemukan
          </span>

          <h1 className="mt-3 font-serif text-3xl font-medium leading-tight text-cocoa sm:text-4xl">
            Tampaknya Jalur yang Anda Tuju Tidak Tersedia
          </h1>

          <p className="mt-4 text-base leading-relaxed text-cocoa/70">
            Halaman yang Anda tuju mungkin telah dipindahkan, tautan salah ketik, atau belum dipublikasikan.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="primary" to="/koleksi">
              Jelajahi Koleksi Batik
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" to="/">
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
