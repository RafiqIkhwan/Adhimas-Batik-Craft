import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Check,
  Layers,
  PenTool,
  Droplet,
  Palette,
} from 'lucide-react';
import {
  collectionProducts,
  whatsappProductLink,
  brand,
} from '@/data/content';
import { Breadcrumb } from '@/components/collection/Breadcrumb';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { ProductBadge, ProductStatus } from '@/components/collection/ProductCard';
import { dbService } from '@/services/db';
import { useState } from 'react';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(
    () => collectionProducts.find((p) => p.slug === slug) || null
  );
  const [related, setRelated] = useState<any[]>(() => {
    const current = collectionProducts.find((p) => p.slug === slug);
    if (!current) return [];
    return collectionProducts
      .filter((p) => p.id !== current.id && p.motif === current.motif)
      .slice(0, 4);
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const allProducts = await dbService.getProducts();
        const mapped = allProducts.map((p) => ({
          ...p,
          category: p.category_name || 'Kain Batik',
          fabric: p.material || 'Katun',
          status: p.stock_status || 'Tersedia',
          image: p.images?.[0] || (p as any).image || '',
          priceDisplay: `Rp${Number(p.price).toLocaleString('id-ID')}`,
        }));
        const current = mapped.find((p) => p.slug === slug);
        if (current) {
          setProduct(current);
          setRelated(
            mapped.filter((p) => p.id !== current.id && p.motif === current.motif).slice(0, 4)
          );
        }
      } catch (e) {
        console.warn('Failed to load product detail from dbService:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (!product && !loading) {
    return <Navigate to="/koleksi" replace />;
  }

  if (!product) return null;

  const specs = [
    { icon: Layers, label: 'Kategori', value: product.category },
    { icon: PenTool, label: 'Motif', value: product.motif },
    { icon: Droplet, label: 'Jenis Kain', value: product.fabric },
    { icon: Palette, label: 'Teknik', value: product.technique || 'Batik Tulis Manual' },
  ];

  return (
    <>
      {/* Page header area */}
      <section className="bg-cocoa-dark pt-24 pb-8 lg:pt-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Breadcrumb
            items={[
              { label: 'Beranda', to: '/' },
              { label: 'Koleksi', to: '/koleksi' },
              { label: product.name },
            ]}
          />
        </div>
      </section>

      {/* Product main */}
      <section className="bg-ivory py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[3/4] w-full object-cover"
                  loading="eager"
                />
              </div>
              <ProductBadge badge={product.badge} />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <SectionLabel>{product.category}</SectionLabel>

              <h1 className="mt-5 font-serif text-3xl font-medium leading-tight text-cocoa text-balance lg:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <ProductStatus status={product.status} />
                <span className="text-cocoa/20">|</span>
                <span className="text-sm text-cocoa/60">{product.motif} · {product.fabric}</span>
              </div>

              <p className="mt-6 font-sans text-3xl font-semibold text-maroon">
                {product.priceDisplay}
              </p>

              <p className="mt-6 text-base leading-relaxed text-cocoa/70">
                {product.description}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="whatsapp"
                  href={whatsappProductLink(product.name)}
                  className="flex-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  Tanya via WhatsApp
                </Button>
                <Button variant="outline" to="/koleksi" className="flex-1">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Koleksi
                </Button>
              </div>

              {/* Specs */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-cocoa/10 pt-8">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3">
                    <spec.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs uppercase tracking-widest-sm text-cocoa/40">
                        {spec.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-cocoa">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust notes */}
              <ul className="mt-8 space-y-2.5">
                {[
                  '100% Batik tulis handmade oleh pengrajin Indonesia',
                  'Setiap karya melewati quality control sebelum dikirim',
                  'Konsultasi ukuran dan motif via WhatsApp',
                ].map((note) => (
                  <li key={note} className="flex items-start gap-2.5 text-sm text-cocoa/60">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" strokeWidth={2} />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-beige/30 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-end justify-between">
              <div>
                <SectionLabel>Koleksi Serupa</SectionLabel>
                <h2 className="mt-4 font-serif text-2xl font-medium text-cocoa lg:text-3xl">
                  Motif {product.motif} Lainnya
                </h2>
              </div>
              <Link
                to="/koleksi"
                className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-widest-sm text-maroon transition-colors hover:text-gold-dark sm:inline-flex"
              >
                Lihat Semua
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/koleksi/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-sm border border-cocoa/8 bg-ivory transition-all duration-500 hover:shadow-lg hover:shadow-cocoa/8 hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <ProductBadge badge={p.badge} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm font-medium text-cocoa">{p.name}</h3>
                    <p className="mt-1 text-xs text-cocoa/50">{p.motif} · {p.fabric}</p>
                    <p className="mt-2 text-sm font-semibold text-maroon">{p.priceDisplay}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-ivory py-20 lg:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif text-2xl font-medium text-cocoa lg:text-3xl">
            Punya Pertanyaan tentang Karya Ini?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cocoa/60">
            Tim {brand.name} siap membantu Anda. Hubungi kami via WhatsApp untuk
            informasi lebih lanjut.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="whatsapp" href={whatsappProductLink(product.name)}>
              <MessageCircle className="h-4 w-4" />
              Konsultasi via WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
