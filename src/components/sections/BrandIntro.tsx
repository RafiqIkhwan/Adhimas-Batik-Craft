import { ArrowRight } from 'lucide-react';
import { brandIntroImage } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function BrandIntro() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="tentang"
      ref={ref}
      className="bg-ivory py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Image */}
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={brandIntroImage}
              alt="Pengrajin batik tulis sedang mencanting"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          {/* Decorative frame offset */}
          <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-sm border border-gold/30" />
        </div>

        {/* Text */}
        <div className="reveal reveal-delay-2">
          <SectionLabel>Tentang Kami</SectionLabel>

          <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
            Lebih dari Sekadar Kain, Setiap Batik Memiliki Cerita.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-cocoa/70 lg:text-lg">
            Berangkat dari kecintaan terhadap budaya Indonesia, kami menghadirkan
            batik tulis yang dibuat dengan proses penuh ketelitian. Setiap motif,
            goresan canting, dan pilihan warna menjadi bagian dari perjalanan
            sebuah karya.
          </p>

          <a
            href="#proses"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest-sm text-maroon transition-colors hover:text-gold-dark"
          >
            Selengkapnya tentang kami
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
