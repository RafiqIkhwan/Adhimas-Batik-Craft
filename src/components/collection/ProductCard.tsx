import { collectionProducts } from '@/data/content';

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
  product: (typeof collectionProducts)[number];
  index: number;
}) {
  return (
    <article
      className={`reveal reveal-delay-${(index % 4) + 1} group flex flex-col overflow-hidden rounded-sm border border-cocoa/8 bg-ivory transition-all duration-500 hover:shadow-xl hover:shadow-cocoa/8 hover:-translate-y-1`}
    >
      {/* Image */}
      <a
        href={`/koleksi/${product.slug}`}
        className="relative aspect-[3/4] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <ProductBadge badge={product.badge} />
        {/* Hover overlay CTA */}
        <div className="absolute inset-0 flex items-end justify-center bg-cocoa-dark/0 pb-6 opacity-0 transition-all duration-500 group-hover:bg-cocoa-dark/25 group-hover:opacity-100">
          <span className="rounded-full bg-ivory/95 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest-sm text-cocoa">
            Lihat Detail
          </span>
        </div>
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-base font-medium leading-snug text-cocoa">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs text-cocoa/50">
          {product.motif} · {product.fabric}
        </p>

        <div className="mt-3">
          <ProductStatus status={product.status} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-sans text-base font-semibold text-maroon">
            {product.priceDisplay}
          </span>
          <a
            href={`/koleksi/${product.slug}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest-sm text-cocoa transition-colors hover:text-gold-dark"
          >
            Detail
          </a>
        </div>
      </div>
    </article>
  );
}
