import { ArrowRight, MessageCircle } from 'lucide-react';
import { finalCtaImage, whatsappLink } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={finalCtaImage}
          alt="Pengrajin batik tulis"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-cocoa-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center lg:py-36">
        <div className="reveal">
          <h2 className="font-serif text-3xl font-medium leading-tight text-ivory text-balance lg:text-5xl">
            Temukan Batik yang Menceritakan Karaktermu.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/70 lg:text-lg">
            Jelajahi koleksi batik tulis kami dan temukan karya yang tepat
            untukmu.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="gold" to="/koleksi">
              Lihat Koleksi
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="whatsapp" href={whatsappLink}>
              <MessageCircle className="h-4 w-4" />
              Pesan via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
