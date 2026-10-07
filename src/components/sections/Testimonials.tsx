import { Star } from 'lucide-react';
import { testimonials } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function Testimonials() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Testimoni</SectionLabel>
          <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
            Cerita dari Mereka yang Telah Memilih Kami.
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`reveal reveal-delay-${i + 1} flex flex-col rounded-sm border border-cocoa/8 bg-beige/20 p-8 transition-all duration-500 hover:shadow-lg hover:shadow-cocoa/5 hover:-translate-y-1`}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                ))}
              </div>

              <blockquote className="mt-5 flex-1 font-serif text-lg italic leading-relaxed text-cocoa/80">
                "{t.review}"
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="font-medium text-cocoa">{t.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
