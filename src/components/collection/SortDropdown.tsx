import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export type SortOption = {
  label: string;
  value: string;
};

type Props = {
  options: SortOption[];
  value: string;
  onChange: (val: string) => void;
};

export function SortDropdown({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-2 rounded-sm border border-cocoa/15 bg-ivory px-4 py-2.5 text-xs font-semibold uppercase tracking-widest-sm text-cocoa transition-colors hover:border-gold/40"
      >
        <span className="text-cocoa/40">Urutkan:</span>
        {current?.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-sm border border-cocoa/15 bg-ivory py-1 shadow-lg shadow-cocoa/10">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                onMouseDown={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  opt.value === value
                    ? 'bg-maroon/5 font-semibold text-maroon'
                    : 'text-cocoa/70 hover:bg-beige/30'
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
