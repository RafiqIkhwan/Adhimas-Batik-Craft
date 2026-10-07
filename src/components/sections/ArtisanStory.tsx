import { Quote } from 'lucide-react';
import { artisan } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function ArtisanStory() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-beige/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="reveal relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-sm">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-sm border border-gold/30" />
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-2 order-1 lg:order-2">
            <SectionLabel>Para Pengrajin</SectionLabel>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
              Dibuat oleh Tangan-Tangan yang Berdedikasi.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cocoa/70 lg:text-lg">
              Di balik setiap karya terdapat pengrajin yang mencurahkan waktu,
              keterampilan, dan pengalaman untuk menghasilkan batik yang memiliki
              karakter.
            </p>

            <div className="mt-8 border-l-2 border-gold/40 pl-6">
              <Quote className="h-8 w-8 text-gold/40" />
              <p className="mt-3 font-serif text-xl italic leading-relaxed text-cocoa/80 lg:text-2xl">
                {artisan.quote}
              </p>
              <div className="mt-4">
                <p className="font-semibold text-cocoa">{artisan.name}</p>
                <p className="text-sm text-cocoa/50">{artisan.experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
