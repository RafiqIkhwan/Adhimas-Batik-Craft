import { Link } from 'react-router-dom';
import type { Product } from '@/types/database';

export function ProductBadge({ badge }: { badge?: string }) {
  if (!badge) return null;

  const styles: Record<string, string> = {
    'Best Seller': 'bg-maroon text-ivory',
    'New': 'bg-gold text-cocoa-dark',
    'Limited': 'bg-cocoa text-ivory',
    'Pre-order': 'bg-cocoa/60 text-ivory',
  };

  return (
    <span
      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest-sm ${
        styles[badge] ?? 'bg-cocoa text-ivory'
      }`}
    >
      {badge}
    </span>
  );
}

const statusStyles: Record<string, string> = {
  'Tersedia': 'text-green-700',
  'Pre-order': 'text-gold-dark',
  'Limited Edition': 'text-maroon',
};

export function ProductStatus({ status }: { status: string }) {
  return (
    <span className={`text-xs font-medium ${statusStyles[status] ?? 'text-cocoa/60'}`}>
      {status}
    </span>
  );
}

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const image = product.images?.find((url) => url.trim()) || '';
  const priceDisplay = `Rp${Number(product.price).toLocaleString('id-ID')}`;

  return (
    <article
      className={`reveal reveal-delay-${(index % 4) + 1} group flex flex-col overflow-hidden rounded-sm border border-cocoa/8 bg-ivory transition-all duration-500 hover:shadow-xl hover:shadow-cocoa/8 hover:-translate-y-1`}
    >
      {/* Image */}
      <Link
        to={`/koleksi/${product.slug}`}
        className="relative aspect-[3/4] overflow-hidden bg-ivory-200"
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-xs text-cocoa/50">
            Gambar produk belum tersedia
          </div>
        )}
        <ProductBadge badge={product.badge} />
        {/* Hover overlay CTA */}
        <div className="absolute inset-0 flex items-end justify-center bg-cocoa-dark/0 pb-6 opacity-0 transition-all duration-500 group-hover:bg-cocoa-dark/25 group-hover:opacity-100">
          <span className="rounded-full bg-ivory/95 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest-sm text-cocoa">
            Lihat Detail
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-base font-medium leading-snug text-cocoa">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs text-cocoa/50">
          {[product.motif, product.material].filter(Boolean).join(' · ')}
        </p>

        <div className="mt-3">
          <ProductStatus status={product.stock_status} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-sans text-base font-semibold text-maroon">
            {priceDisplay}
          </span>
          <Link
            to={`/koleksi/${product.slug}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest-sm text-cocoa transition-colors hover:text-gold-dark"
          >
            Detail
          </Link>
        </div>
      </div>
    </article>
  );
}
