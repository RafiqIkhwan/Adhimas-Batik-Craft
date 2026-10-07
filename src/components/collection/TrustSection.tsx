import { Brush, Hand, Award } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

const points = [
  {
    icon: Brush,
    title: '100% Batik Tulis',
    desc: 'Dikerjakan menggunakan teknik batik tulis secara manual.',
  },
  {
    icon: Hand,
    title: 'Dibuat oleh Pengrajin Lokal',
    desc: 'Setiap karya melibatkan tangan dan keterampilan pengrajin Indonesia.',
  },
  {
    icon: Award,
    title: 'Kualitas Terpilih',
    desc: 'Setiap produk melewati proses pemeriksaan sebelum sampai kepada pelanggan.',
  },
];

export function TrustSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-ivory-50 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="reveal text-center">
          <SectionLabel className="justify-center">Komitmen Kami</SectionLabel>
          <h2 className="mt-6 font-serif text-2xl font-medium text-cocoa lg:text-3xl">
            Setiap Karya Dibuat dengan Ketelitian
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon/8 text-maroon">
                <p.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-serif text-lg font-medium text-cocoa">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa/60">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
