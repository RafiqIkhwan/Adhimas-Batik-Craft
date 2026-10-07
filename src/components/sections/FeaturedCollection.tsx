import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collectionProducts } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

const badgeStyles: Record<string, string> = {
  'Best Seller': 'bg-maroon text-ivory',
  'New': 'bg-gold text-cocoa-dark',
  'Limited': 'bg-cocoa text-ivory',
};

export function FeaturedCollection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="koleksi" ref={ref} className="bg-beige/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="reveal flex flex-col items-center text-center">
          <SectionLabel className="justify-center">
            Koleksi Pilihan
          </SectionLabel>
          <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
            Koleksi Pilihan Kami
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cocoa/60">
            Temukan karya batik yang memiliki karakter dan cerita untuk setiap
            kesempatan.
          </p>
        </div>

        {/* Product grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collectionProducts.slice(0, 4).map((p, i) => (
            <article
              key={p.id}
              className={`reveal reveal-delay-${i + 1} group flex flex-col overflow-hidden rounded-sm border border-cocoa/8 bg-ivory transition-all duration-500 hover:shadow-xl hover:shadow-cocoa/8 hover:-translate-y-1`}
            >
              {/* Image */}
              <Link to={`/koleksi/${p.slug}`} className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {p.badge && (
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest-sm ${
                      badgeStyles[p.badge] ?? 'bg-cocoa text-ivory'
                    }`}
                  >
                    {p.badge}
                  </span>
                )}
              </Link>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-medium text-cocoa">
                  {p.name}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-cocoa/50">
                  <span>Motif: {p.motif}</span>
                  <span className="text-gold">•</span>
                  <span>{p.fabric}</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="font-sans text-lg font-semibold text-maroon">
                    {p.priceDisplay}
                  </span>
                  <Link
                    to={`/koleksi/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest-sm text-cocoa transition-colors hover:text-gold-dark"
                  >
                    Lihat Detail
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-14 flex justify-center">
          <Button variant="primary" to="/koleksi">
            Lihat Semua Koleksi
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
