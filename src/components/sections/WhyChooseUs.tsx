import { Brush, Hand, Sparkles, Award } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

const features = [
  {
    icon: Brush,
    title: '100% Batik Tulis',
    desc: 'Setiap karya dibuat menggunakan teknik batik tulis secara manual.',
  },
  {
    icon: Hand,
    title: 'Handmade',
    desc: 'Dikerjakan langsung oleh pengrajin dengan proses yang membutuhkan ketelitian dan waktu.',
  },
  {
    icon: Sparkles,
    title: 'Motif Berkarakter',
    desc: 'Setiap motif memiliki detail dan karakter yang unik.',
  },
  {
    icon: Award,
    title: 'Kualitas Terpilih',
    desc: 'Menggunakan material dan proses produksi yang memperhatikan kualitas hingga tahap akhir.',
  },
];

export function WhyChooseUs() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-ivory-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">
            Keunggulan Kami
          </SectionLabel>
          <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
            Mengapa Memilih Batik Kami?
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`reveal reveal-delay-${i + 1} group rounded-sm border border-cocoa/8 bg-ivory p-8 text-center transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-cocoa/5 hover:-translate-y-1`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maroon/8 text-maroon transition-colors duration-500 group-hover:bg-maroon group-hover:text-ivory">
                <f.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-medium text-cocoa">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/60">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
