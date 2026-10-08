import { useEffect } from 'react';
import {
  Heart,
  Award,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  Quote,
} from 'lucide-react';
import {
  brand,
  brandValues,
  brandMilestones,
  artisan,
  whatsappLink,
} from '@/data/content';
import { Breadcrumb } from '@/components/collection/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: '15+', label: 'Tahun Merawat Tradisi' },
    { value: '100%', label: 'Batik Tulis Canting Asli' },
    { value: '35+', label: 'Pengrajin Perempuan Binaan' },
    { value: '1.200+', label: 'Karya Otentik Terlahir' },
  ];

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero Banner */}
      <section className="bg-cocoa-dark pt-20 pb-8 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[{ label: 'Beranda', to: '/' }, { label: 'Tentang Kami' }]}
          />

          <div className="mt-5 max-w-2xl">
            <SectionLabel className="[&_span]:text-gold-light [&_.batik-divider]:bg-gold/40">
              Identitas & Filosofi
            </SectionLabel>
            <h1 className="mt-3 font-serif text-2xl font-medium leading-tight text-ivory sm:text-4xl lg:text-5xl text-balance">
              Menjaga Nyala Warisan Melalui Setiap Goresan Canting
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-ivory/75 sm:mt-4 sm:text-base">
              {brand.name} lahir dari penghormatan mendalam pada keluhuran seni batik tulis tradisional Jawa. Bagi kami, sehelai batik adalah pusaka hidup yang memuat doa, rasa, dan ketekunan para pengrajin.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Profile & Story */}
      <section className="py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-16">

            {/* Visual Image */}
            <div className="lg:col-span-6">
              <div className="aspect-[16/11] max-h-[320px] overflow-hidden border border-cocoa/10 bg-ivory-200 sm:aspect-[4/5] sm:max-h-none">
                <img
                  src="https://images.pexels.com/photos/35243545/pexels-photo-35243545.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Pengrajin senior Batik Sembagi"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6">
              <SectionLabel>Profil & Makna Sembagi</SectionLabel>
              <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-cocoa sm:text-4xl">
                Kisah di Balik Nama {brand.name}
              </h2>
              
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-cocoa/75">
                <p>
                  Kata <strong className="font-semibold text-cocoa">"Sembagi"</strong> terinspirasi dari nama kain pusaka nusantara berhias motif bunga-bunga anggun yang melambangkan kemakmuran, martabat, dan keindahan budi pekerti yang abadi melintasi zaman.
                </p>
                <p>
                  Didirikan di Sleman, D.I. Yogyakarta, {brand.name} berkomitmen mempertahankan tradisi batik tulis yang kian langka di tengah gempuran tekstil bermotif cetak pabrikan. Kami meyakini bahwa nilai tertinggi sebuah wastra terletak pada ketulusan proses buatan tangan (handmade).
                </p>
                <p>
                  Setiap karya kami melewati perjalanan panjang: perendaman serat mori primisima, penggambaran pola geometris rumit, pencantingan lilin malam panas, pencelupan warna alami bertingkat, hingga pelorodan air panas.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-cocoa/10 pt-6 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-serif text-2xl font-bold text-maroon">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-cocoa/60">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-t border-cocoa/10 bg-ivory-50 py-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <div className="border border-cocoa/10 bg-ivory p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-medium text-cocoa">
                Visi Kami
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/75">
                Menjadi barometer keaslian dan keluhuran seni batik tulis Indonesia yang diakui secara nasional maupun mancanegara, membuktikan bahwa kemurnian proses tradisional memiliki nilai adi luhung yang tak tergantikan oleh otomasi modern.
              </p>
            </div>

            {/* Mission */}
            <div className="border border-cocoa/10 bg-ivory p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-medium text-cocoa">
                Misi Kami
              </h3>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-cocoa/75">
                {[
                  'Menjaga 100% kemurnian teknik canting lilin malam tradisional tanpa toleransi terhadap metode cetak sablon.',
                  'Memberdayakan pengrajin perempuan desa melalui sistem upah adil, jaminan kesehatan, dan ruang kerja yang terhormat.',
                  'Mengedukasi publik dan generasi muda tentang kekayaan filosofi simbolis di balik setiap corak motif batik tulis.',
                  'Menerapkan praktik ramah lingkungan dengan pemanfaatan pewarna alami nabati dan daur ulang lilin malam.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-8 sm:py-16 lg:py-20 border-t border-cocoa/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="text-center">
            <SectionLabel className="justify-center">Prinsip Kerja</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl font-medium text-cocoa">
              Nilai Utama {brand.name}
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {brandValues.map((val: { title: string; description: string }, idx: number) => (
              <div
                key={val.title}
                className="border border-cocoa/10 bg-ivory p-6 transition-colors hover:border-cocoa/30"
              >
                <span className="font-serif text-xl font-bold text-gold-dark">
                  0{idx + 1}
                </span>
                <h4 className="mt-3 font-serif text-base font-medium text-cocoa">
                  {val.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-cocoa/70">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="border-t border-cocoa/10 bg-ivory-50 py-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-10">
          <div className="text-center">
            <SectionLabel className="justify-center">Perjalanan Waktu</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl font-medium text-cocoa">
              Tonggak Sejarah Kami
            </h2>
          </div>

          <div className="mt-12 border-l border-cocoa/20 pl-6 space-y-8 ml-3">
            {brandMilestones.map((m: { year: string | number; title: string; description: string }) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-maroon" />
                <span className="text-xs font-semibold text-maroon">
                  Tahun {m.year}
                </span>
                <h3 className="mt-1 font-serif text-lg font-medium text-cocoa">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-cocoa/70">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="py-8 sm:py-16 lg:py-20 border-t border-cocoa/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-14">

            <div className="lg:col-span-5">
              <div className="aspect-[16/11] max-h-[320px] overflow-hidden border border-cocoa/10 bg-ivory-200 sm:aspect-[4/5] sm:max-h-none">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionLabel>Sosok Pengrajin</SectionLabel>
              <h2 className="mt-3 font-serif text-3xl font-medium text-cocoa">
                {artisan.name}
              </h2>
              <p className="mt-1 text-xs text-cocoa/60 font-medium">
                {artisan.experience}
              </p>

              <div className="mt-6 border-l-2 border-gold-dark/60 pl-5 py-1">
                <blockquote className="font-serif text-lg italic text-cocoa/85">
                  "{artisan.quote}"
                </blockquote>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-cocoa/75">
                {artisan.name} memimpin para pengrajin perempuan di sanggar Sleman kami. Beliau memastikan setiap goresan canting dan ramuan lilin malam alami memenuhi kaidah keluhuran wastra nusantara.
              </p>

              <div className="mt-8 flex gap-3">
                <Button variant="primary" to="/koleksi">
                  Jelajahi Karya Kami
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" href={whatsappLink}>
                  <MessageCircle className="h-4 w-4" />
                  Konsultasi WhatsApp
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
