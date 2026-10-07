import { MessageCircle, ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/Button';

export function CollectionCTA() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-beige/30 py-24 lg:py-28">
      <div className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
          Tidak Menemukan Batik yang Kamu Cari?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cocoa/60">
          Hubungi kami untuk mendapatkan rekomendasi koleksi yang sesuai dengan
          kebutuhanmu.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="whatsapp" href={whatsappLink}>
            <MessageCircle className="h-4 w-4" />
            Konsultasi via WhatsApp
          </Button>
          <Button variant="outline" to="/#tentang">
            Tentang Kami
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
