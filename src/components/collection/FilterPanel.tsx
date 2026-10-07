import { RotateCcw, X } from 'lucide-react';
import { priceRanges, motifOptions, fabricOptions, statusOptions } from '@/data/content';

export type FilterState = {
  priceRange: number;
  motifs: string[];
  fabrics: string[];
  statuses: string[];
};

export const defaultFilters: FilterState = {
  priceRange: 0,
  motifs: [],
  fabrics: [],
  statuses: [],
};

type Props = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  className?: string;
};

export function FilterPanel({ filters, onChange, onReset, className = '' }: Props) {
  const toggleArray = (key: keyof FilterState, val: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(val)
      ? arr.filter((v) => v !== val)
      : [...arr, val];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    (filters.priceRange !== 0 ? 1 : 0) +
    filters.motifs.length +
    filters.fabrics.length +
    filters.statuses.length;

  return (
    <div className={`space-y-7 ${className}`}>
      {/* Reset */}
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg font-medium text-cocoa">Filter</span>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest-sm text-maroon transition-colors hover:text-gold-dark"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filter
          </button>
        )}
      </div>

      {/* Price */}
      <FilterGroup title="Harga">
        <div className="space-y-2.5">
          {priceRanges.map((range, i) => (
            <label key={range.label} className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="price"
                checked={filters.priceRange === i}
                onChange={() => onChange({ ...filters, priceRange: i })}
                className="h-3.5 w-3.5 accent-maroon"
              />
              <span className="text-sm text-cocoa/70">{range.label}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Motif */}
      <FilterGroup title="Motif">
        <div className="flex flex-wrap gap-2">
          {motifOptions.map((m) => (
            <ChipToggle
              key={m}
              label={m}
              active={filters.motifs.includes(m)}
              onClick={() => toggleArray('motifs', m)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Fabric */}
      <FilterGroup title="Jenis Kain">
        <div className="flex flex-wrap gap-2">
          {fabricOptions.map((f) => (
            <ChipToggle
              key={f}
              label={f}
              active={filters.fabrics.includes(f)}
              onClick={() => toggleArray('fabrics', f)}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Status */}
      <FilterGroup title="Status">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((s) => (
            <ChipToggle
              key={s}
              label={s}
              active={filters.statuses.includes(s)}
              onClick={() => toggleArray('statuses', s)}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest-sm text-cocoa/50">
        {title}
      </h4>
      {children}
    </div>
  );
}

function ChipToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
        active
          ? 'bg-cocoa text-ivory'
          : 'border border-cocoa/15 text-cocoa/60 hover:border-cocoa/40'
      }`}
    >
      {label}
    </button>
  );
}

export function MobileFilterSheet({
  open,
  onClose,
  filters,
  onChange,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-cocoa-dark/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-lg bg-ivory px-6 py-6 transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-serif text-xl font-medium text-cocoa">Filter & Sort</span>
          <button onClick={onClose} aria-label="Tutup filter">
            <X className="h-6 w-6 text-cocoa" />
          </button>
        </div>

        <FilterPanel filters={filters} onChange={onChange} onReset={onReset} />

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-sm bg-maroon py-3.5 text-sm font-semibold uppercase tracking-widest-sm text-ivory transition-colors hover:bg-maroon-dark"
        >
          Tampilkan Hasil
        </button>
      </div>
    </div>
  );
}
