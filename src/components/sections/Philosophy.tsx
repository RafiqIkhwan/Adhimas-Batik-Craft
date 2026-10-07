import { ArrowRight } from 'lucide-react';
import { motifs } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function Philosophy() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-cocoa py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Filosofi</SectionLabel>
          <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-ivory text-balance lg:text-4xl">
            Satu Motif, Satu Makna.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/60">
            Di balik setiap motif batik terdapat filosofi yang diwariskan dari
            generasi ke generasi. Kami menjaga nilai tersebut sekaligus
            menghadirkannya dalam karya yang relevan untuk kehidupan modern.
          </p>
        </div>

        {/* Motif cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {motifs.map((m, i) => (
            <div
              key={m.name}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-sm`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={m.image}
                  alt={`Motif batik ${m.name}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/90 via-cocoa-dark/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-serif text-2xl font-medium text-ivory">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                  {m.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-14 flex justify-center">
          <a
            href="#galeri"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest-sm text-gold-light transition-colors hover:text-ivory"
          >
            Jelajahi Filosofi Batik
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
