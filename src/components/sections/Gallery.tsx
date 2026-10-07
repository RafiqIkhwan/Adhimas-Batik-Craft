import { ArrowRight } from 'lucide-react';
import { galleryImages } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

const spanClass: Record<string, string> = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  normal: '',
};

export function Gallery() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="galeri" ref={ref} className="bg-ivory-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Galeri</SectionLabel>
          <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
            Potongan Cerita dari Perjalanan Kami.
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="reveal mt-16 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-sm ${spanClass[img.span] ?? ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-cocoa-dark/0 transition-colors duration-500 group-hover:bg-cocoa-dark/30" />
              <p className="absolute bottom-0 left-0 translate-y-4 p-4 text-sm font-medium text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {img.alt}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-14 flex justify-center">
          <a
            href="#galeri"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest-sm text-maroon transition-colors hover:text-gold-dark"
          >
            Lihat Galeri
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
