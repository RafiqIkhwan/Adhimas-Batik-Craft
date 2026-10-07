import { RotateCcw, SearchX } from 'lucide-react';

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-beige/40">
        <SearchX className="h-7 w-7 text-cocoa/40" strokeWidth={1.5} />
      </div>
      <h3 className="mt-6 font-serif text-2xl font-medium text-cocoa">
        Koleksi Tidak Ditemukan
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-cocoa/50">
        Coba gunakan kata kunci atau filter yang berbeda.
      </p>
      <button
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-sm bg-maroon px-7 py-3.5 text-sm font-semibold uppercase tracking-widest-sm text-ivory transition-colors hover:bg-maroon-dark"
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filter
      </button>
    </div>
  );
}
