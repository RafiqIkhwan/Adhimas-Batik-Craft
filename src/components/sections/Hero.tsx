import { ArrowRight } from 'lucide-react';
import { heroImage } from '@/data/content';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Batik tulis premium dengan motif tradisional Indonesia"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa-dark/85 via-cocoa-dark/55 to-cocoa-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/60 via-transparent to-cocoa-dark/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-10 lg:pt-32">
        <div className="max-w-2xl">
          <div className="reveal is-visible flex items-center gap-3">
            <span className="batik-divider" />
            <span className="text-gold-light text-xs font-semibold uppercase tracking-widest-sm">
              Batik Tulis Premium • Handmade
            </span>
          </div>

          <h1
            className="reveal is-visible reveal-delay-1 mt-6 font-serif text-4xl font-medium leading-[1.15] text-ivory text-balance sm:text-5xl lg:text-6xl"
          > 
          Warisan Batik Tulis, Dihadirkan dengan Karakter yang Tak Lekang Waktu.
          </h1>

          <p className="reveal is-visible reveal-delay-2 mt-7 max-w-xl text-base leading-relaxed text-ivory/80 lg:text-lg">
            Setiap lembar dikerjakan dengan tangan, ketelitian, dan cerita yang
            menjadikan setiap karya batik memiliki karakter yang istimewa.
          </p>

          <div className="reveal is-visible reveal-delay-3 mt-9 flex flex-col gap-4 sm:flex-row">
            <Button variant="gold" to="/koleksi">
              Lihat Koleksi
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              to="/#tentang"
              className="border-ivory/40 text-ivory hover:bg-ivory hover:text-cocoa"
            >
              Kenali Cerita Kami
            </Button>
          </div>

          <div className="reveal is-visible reveal-delay-4 mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-widest-sm text-ivory/60">
            <span>100% Handmade</span>
            <span className="text-gold">•</span>
            <span>Batik Tulis</span>
            <span className="text-gold">•</span>
            <span>Karya Pengrajin Indonesia</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-ivory/30 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold-light" />
        </div>
      </div>
    </section>
  );
}


