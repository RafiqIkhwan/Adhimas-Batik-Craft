import {
  Layers,
  PenTool,
  Droplet,
  Palette,
  Flame,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';
import { processSteps, processImages } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';

const iconMap: Record<string, LucideIcon> = {
  Layers,
  PenTool,
  Droplet,
  Palette,
  Flame,
  CheckCircle,
};

export function Process() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="proses" ref={ref} className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Proses Pembuatan</SectionLabel>
          <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
            Dibuat dengan Tangan, Bukan Sekadar Mesin.
          </h2>
        </div>

        {/* Featured image */}
        <div className="reveal mt-14 overflow-hidden rounded-sm">
          <img
            src={processImages.main}
            alt="Pengrajin batik sedang mencanting"
            className="h-64 w-full object-cover lg:h-80"
            loading="lazy"
          />
        </div>

        {/* Timeline */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon] ?? Layers;
            return (
              <div
                key={step.number}
                className={`reveal reveal-delay-${(i % 3) + 1} group relative border-l-2 border-gold/20 pl-6 transition-colors duration-500 hover:border-gold`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-maroon/8 text-maroon transition-colors duration-500 group-hover:bg-maroon group-hover:text-ivory">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="font-serif text-3xl font-medium text-gold/40">
                      {step.number}
                    </span>
                    <h3 className="mt-1 font-serif text-xl font-medium text-cocoa">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cocoa/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary detail image */}
        <div className="reveal mt-14 grid gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-sm lg:col-span-1">
            <img
              src={processImages.canting}
              alt="Detail proses mencanting dengan lilin panas"
              className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-2 lg:pl-8">
            <p className="font-serif text-2xl italic leading-relaxed text-cocoa/80 lg:text-3xl">
              "Setiap goresan canting adalah jejak kesabaran. Proses yang tidak
              bisa dipercepat, justru menjadi nilai yang membuat batik tulis
              begitu berharga."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
