type Props = {
  categories: readonly string[];
  active: string;
  onSelect: (cat: string) => void;
};

export function CategoryTabs({ categories, active, onSelect }: Props) {
  return (
    <div className="scrollbar-hide -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:px-0">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest-sm transition-all duration-300 ${
              isActive
                ? 'bg-maroon text-ivory'
                : 'border border-cocoa/15 text-cocoa/70 hover:border-cocoa/40 hover:text-cocoa'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
