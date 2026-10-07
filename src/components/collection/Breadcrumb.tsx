import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type Crumb = {
  label: string;
  to?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs tracking-wide-sm text-cocoa/50">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-gold-dark">
              {item.label}
            </Link>
          ) : (
            <span className="text-cocoa/80">{item.label}</span>
          )}
          {i < items.length - 1 && (
            <ChevronRight className="h-3 w-3 text-cocoa/30" />
          )}
        </span>
      ))}
    </nav>
  );
}
