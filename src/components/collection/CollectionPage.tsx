import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, SlidersHorizontal, ArrowRight } from 'lucide-react';
import {
  collectionProducts,
  productCategories,
  priceRanges,
  motifOptions,
  fabricOptions,
} from '@/data/content';
import { dbService } from '@/services/db';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Breadcrumb } from '@/components/collection/Breadcrumb';
import { CategoryTabs } from '@/components/collection/CategoryTabs';
import { SearchBar } from '@/components/collection/SearchBar';
import {
  FilterPanel,
  MobileFilterSheet,
  defaultFilters,
  type FilterState,
} from '@/components/collection/FilterPanel';
import { SortDropdown, type SortOption } from '@/components/collection/SortDropdown';
import { ProductCard } from '@/components/collection/ProductCard';
import { EmptyState } from '@/components/collection/EmptyState';
import { TrustSection } from '@/components/collection/TrustSection';
import { CollectionCTA } from '@/components/collection/CollectionCTA';

const sortOptions: SortOption[] = [
  { label: 'Produk Terbaru', value: 'newest' },
  { label: 'Paling Populer', value: 'popular' },
  { label: 'Harga Terendah', value: 'price-asc' },
  { label: 'Harga Tertinggi', value: 'price-desc' },
];

const PAGE_SIZE = 8;

export function CollectionPage() {
  const revealRef = useScrollReveal<HTMLElement>();

  const [products, setProducts] = useState<any[]>(collectionProducts);
  const [category, setCategory] = useState<string>('Semua');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await dbService.getProducts();
        if (data && data.length > 0) {
          setProducts(
            data.map((p) => ({
              id: p.id,
              slug: p.slug,
              name: p.name,
              category: p.category_name || 'Kain Batik',
              motif: p.motif,
              fabric: p.material || 'Katun',
              price: Number(p.price),
              priceDisplay: `Rp${Number(p.price).toLocaleString('id-ID')}`,
              status: p.stock_status || 'Tersedia',
              badge: p.badge,
              image: p.images?.[0] || (p as any).image || '',
              description: p.description || p.short_description || '',
              popularity: p.popularity || 80,
              createdAt: new Date(p.created_at || Date.now()).getTime(),
            }))
          );
        }
      } catch (err) {
        console.warn('Failed to fetch products from dbService:', err);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category
    if (category !== 'Semua') {
      result = result.filter((p) => p.category === category);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.motif.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Price
    const range = priceRanges[filters.priceRange];
    if (range) {
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    // Motif
    if (filters.motifs.length > 0) {
      result = result.filter((p) => {
        if (filters.motifs.includes('Lainnya')) {
          const known = motifOptions.filter((m) => m !== 'Lainnya');
          return (
            filters.motifs.includes(p.motif) ||
            !known.includes(p.motif)
          );
        }
        return filters.motifs.includes(p.motif);
      });
    }

    // Fabric
    if (filters.fabrics.length > 0) {
      result = result.filter((p) => {
        if (filters.fabrics.includes('Lainnya')) {
          const known = fabricOptions.filter((f) => f !== 'Lainnya');
          return (
            filters.fabrics.some((f) =>
              p.fabric.toLowerCase().includes(f.toLowerCase())
            ) || !known.some((k) => p.fabric.toLowerCase().includes(k.toLowerCase()))
          );
        }
        return filters.fabrics.some((f) =>
          p.fabric.toLowerCase().includes(f.toLowerCase())
        );
      });
    }

    // Status
    if (filters.statuses.length > 0) {
      result = result.filter((p) => filters.statuses.includes(p.status));
    }

    // Sort
    switch (sort) {
      case 'popular':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => a.createdAt - b.createdAt);
    }

    return result;
  }, [category, search, filters, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetAll = () => {
    setCategory('Semua');
    setSearch('');
    setFilters(defaultFilters);
    setSort('newest');
    setVisibleCount(PAGE_SIZE);
  };

  const activeFilterCount =
    (filters.priceRange !== 0 ? 1 : 0) +
    filters.motifs.length +
    filters.fabrics.length +
    filters.statuses.length;

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-cocoa-dark pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/37877554/pexels-photo-37877554.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Koleksi kain batik"
            className="h-full w-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-cocoa-dark/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <Breadcrumb items={[{ label: 'Beranda', to: '/' }, { label: 'Koleksi' }]} />

          <div className="mt-6 max-w-2xl">
            <SectionLabel className="[&_span]:text-gold-light [&_.batik-divider]:bg-gold/40">
              Koleksi Batik
            </SectionLabel>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-tight text-ivory text-balance lg:text-5xl">
              Koleksi Batik Tulis Pilihan
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/70 lg:text-lg">
              Jelajahi berbagai karya batik tulis yang dibuat dengan ketelitian,
              karakter, dan sentuhan tangan para pengrajin.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section ref={revealRef} className="bg-ivory py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Category tabs */}
          <CategoryTabs
            categories={productCategories}
            active={category}
            onSelect={(c) => {
              setCategory(c);
              setVisibleCount(PAGE_SIZE);
            }}
          />

          {/* Search + mobile filter + sort bar */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 lg:max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 rounded-sm border border-cocoa/15 bg-ivory px-4 py-3 text-xs font-semibold uppercase tracking-widest-sm text-cocoa transition-colors hover:border-gold/40 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-maroon text-[10px] text-ivory">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <SortDropdown options={sortOptions} value={sort} onChange={setSort} />
            </div>
          </div>

          {/* Layout: sidebar + grid */}
          <div className="mt-8 flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onChange={(f) => {
                    setFilters(f);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  onReset={() => setFilters(defaultFilters)}
                />
              </div>
            </aside>

            {/* Product grid + count */}
            <div className="flex-1">
              {/* Product count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-cocoa/60">
                  Menampilkan{' '}
                  <span className="font-semibold text-cocoa">{visible.length}</span>{' '}
                  dari{' '}
                  <span className="font-semibold text-cocoa">{filtered.length}</span>{' '}
                  koleksi
                </p>
              </div>

              {visible.length === 0 ? (
                <EmptyState onReset={resetAll} />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                    {visible.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </div>

                  {/* Load more */}
                  {hasMore && (
                    <div className="mt-12 flex justify-center">
                      <button
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="inline-flex items-center gap-2 rounded-sm border border-cocoa/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest-sm text-cocoa transition-all duration-300 hover:border-cocoa hover:bg-cocoa hover:text-ivory"
                      >
                        Muat Lebih Banyak
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      <CollectionCTA />

      {/* Mobile filter sheet */}
      <MobileFilterSheet
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setVisibleCount(PAGE_SIZE);
        }}
        onReset={() => setFilters(defaultFilters)}
      />
    </>
  );
}
