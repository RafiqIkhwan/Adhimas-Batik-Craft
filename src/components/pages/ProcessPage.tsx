import { useEffect } from 'react';
import {
  Clock,
  ArrowRight,
  MessageCircle,
  CheckCircle,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import {
  detailedProcesses,
  whatsappConsultationLink,
  brand,
} from '@/data/content';
import { Breadcrumb } from '@/components/collection/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export function ProcessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tools = [
    {
      name: 'Canting Tembaga',
      desc: 'Alat berpipa cucuk untuk menorehkan cairan lilin malam dengan presisi ukuran titik.',
    },
    {
      name: 'Lilin Malam Alami',
      desc: 'Campuran lilin lebah, getah damar, dan gondorukem yang memiliki titik leleh stabil.',
    },
    {
      name: 'Wajan & Anglo',
      desc: 'Wajan tembaga kecil di atas api stabil untuk menjaga kehangatan lilin tetap konstan.',
    },
    {
      name: 'Gawangan Kayu',
      desc: 'Penyangga kayu tempat membentangkan kain mori saat proses mencanting berlangsung.',
    },
    {
      name: 'Pewarna Alami Nabati',
      desc: 'Ekstrak kulit kayu tingi, tegeran, jambal, dan daun indigofera untuk rona alami.',
    },
    {
      name: 'Bejana Pelorodan',
      desc: 'Bejana perebusan air mendidih untuk melarutkan lilin malam dari serat kain.',
    },
  ];

  const comparison = [
    {
      criteria: 'Teknik Pembuatan',
      tulis: 'Goresan tangan langsung memakai canting & lilin malam',
      cap: 'Stempel canting tembaga berulang',
      printing: 'Mesin cetak tekstil / sablon',
    },
    {
      criteria: 'Tembusan Warna',
      tulis: 'Tembus 100% bolak-balik sama pekatnya di kedua sisi',
      cap: 'Tembus tetapi sisi belakang sedikit lebih pudar',
      printing: 'Hanya di permukaan, sisi belakang putih/pudar',
    },
    {
      criteria: 'Karakter Garis',
      tulis: 'Organik, bervariasi halus, dan bernilai seni tinggi',
      cap: 'Kaku, teratur, dan pola berulang simetris',
      printing: 'Sangat rapi seperti cetakan kertas, tanpa rasa',
    },
    {
      criteria: 'Aroma Kain',
      tulis: 'Harum khas lilin malam tawon dan rempah sogan',
      cap: 'Aroma minyak lilin bakar sedang',
      printing: 'Aroma tinta kimia pabrik atau sablon karet',
    },
    {
      criteria: 'Durasi Produksi',
      tulis: '4 hingga 12 minggu per lembar',
      cap: '2 hingga 4 hari per lembar',
      printing: 'Ratusan meter per jam',
    },
    {
      criteria: 'Status Karya',
      tulis: 'Karya seni bernilai koleksi tinggi (One of a kind)',
      cap: 'Produk kerajinan semi-massal',
      printing: 'Tekstil komersial massal (Bukan Batik)',
    },
  ];

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="bg-cocoa-dark pt-20 pb-8 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <Breadcrumb
            items={[{ label: 'Beranda', to: '/' }, { label: 'Proses Pembuatan' }]}
          />

          <div className="mt-5 max-w-2xl">
            <SectionLabel className="[&_span]:text-gold-light [&_.batik-divider]:bg-gold/40">
              Seni Ketekunan Tradisional
            </SectionLabel>
            <h1 className="mt-3 font-serif text-2xl font-medium leading-tight text-ivory sm:text-4xl lg:text-5xl text-balance">
              Perjalanan Sehelai Kain Batik Tulis
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-ivory/75 sm:mt-4 sm:text-base">
              Setiap helai batik tulis membutuhkan waktu 4 hingga 12 minggu pengerjaan cermat. Mengalirkan kesabaran, kepiawaian mengendalikan lilin malam, dan ketepatan rasa pengrajin.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Stages Grid / List */}
      <section className="py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-10">
          <div className="text-center">
            <SectionLabel className="justify-center">8 Tahapan Pembuatan</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl font-medium text-cocoa sm:text-4xl">
              Proses Tradisional {brand.name}
            </h2>
            <p className="mt-3 text-sm text-cocoa/65 max-w-lg mx-auto">
              Urutan proses baku yang diwariskan turun-temurun tanpa jalan pintas kimiawi instan.
            </p>
          </div>

          <div className="mt-14 space-y-12">
            {detailedProcesses.map((proc: any) => (
              <div
                key={proc.step}
                className="grid gap-6 border-b border-cocoa/10 pb-12 sm:grid-cols-12 sm:gap-8 items-center"
              >
                {/* Image */}
                <div className="sm:col-span-5">
                  <div className="aspect-[4/3] overflow-hidden border border-cocoa/10 bg-ivory-200">
                    <img
                      src={proc.image}
                      alt={`${proc.name} - ${proc.javaneseName}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="sm:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest-sm text-maroon">
                    <span>Tahap {proc.step}</span>
                    <span>·</span>
                    <span>{proc.javaneseName}</span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-medium text-cocoa">
                    {proc.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-cocoa/55">
                    <Clock className="h-3.5 w-3.5 text-gold-dark" />
                    <span>Waktu: {proc.duration}</span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-cocoa/75">
                    {proc.description}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-cocoa/60 border-l border-gold-dark/50 pl-3">
                    {proc.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Tools Section */}
      <section className="border-t border-cocoa/10 bg-ivory-50 py-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="text-center">
            <SectionLabel className="justify-center">Perkakas Tradisi</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl font-medium text-cocoa">
              Alat & Bahan Baku Tradisional
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, idx) => (
              <div
                key={tool.name}
                className="border border-cocoa/10 bg-ivory p-6"
              >
                <span className="font-serif text-xl font-bold text-gold-dark">
                  0{idx + 1}
                </span>
                <h4 className="mt-3 font-serif text-base font-medium text-cocoa">
                  {tool.name}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-cocoa/65">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8 sm:py-16 lg:py-20 border-t border-cocoa/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="text-center">
            <SectionLabel className="justify-center">Edukasi Konsumen</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl font-medium text-cocoa">
              Batik Tulis vs Cap vs Printing
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto border border-cocoa/10 bg-ivory">
            <table className="w-full min-w-[600px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-cocoa/15 bg-cocoa-dark text-ivory">
                  <th className="p-3.5 font-semibold">Kriteria</th>
                  <th className="p-3.5 font-semibold text-gold-light bg-cocoa">
                    Batik Tulis Asli
                  </th>
                  <th className="p-3.5 font-semibold">Batik Cap</th>
                  <th className="p-3.5 font-semibold text-cocoa-light">Kain Printing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cocoa/10">
                {comparison.map((row, i) => (
                  <tr key={row.criteria} className={i % 2 === 0 ? 'bg-ivory' : 'bg-ivory-50/60'}>
                    <td className="p-3.5 font-semibold text-cocoa">{row.criteria}</td>
                    <td className="p-3.5 font-medium text-maroon bg-gold/5">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-800" />
                        <span>{row.tulis}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-cocoa/70">
                      <div className="flex items-start gap-1.5">
                        <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
                        <span>{row.cap}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-cocoa/60">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cocoa/40" />
                        <span>{row.printing}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cocoa-dark text-ivory py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-3xl font-medium text-ivory">
            Ingin Mengamati Proses Pembuatan Secara Langsung?
          </h2>
          <p className="mt-3 text-sm text-ivory/70">
            Kami menerima kunjungan pemerhati budaya di sanggar Sleman dengan janji temu terlebih dahulu.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="whatsapp"
              href={whatsappConsultationLink('Kunjungan Workshop')}
            >
              <MessageCircle className="h-4 w-4" />
              Reservasi Kunjungan via WhatsApp
            </Button>
            <Button variant="outline" to="/koleksi" className="border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-cocoa">
              Lihat Koleksi Kami
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
