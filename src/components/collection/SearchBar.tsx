import { Search, X } from 'lucide-react';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari produk atau motif batik..."
        className="w-full rounded-sm border border-cocoa/15 bg-ivory py-3 pl-11 pr-10 text-sm text-cocoa placeholder:text-cocoa/40 transition-colors focus:border-gold focus:outline-none"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa/40 transition-colors hover:text-cocoa"
          aria-label="Hapus pencarian"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
