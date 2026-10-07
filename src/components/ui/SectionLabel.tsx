type Props = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="batik-divider" />
      <span className="text-gold-dark text-xs font-semibold uppercase tracking-widest-sm">
        {children}
      </span>
    </div>
  );
}
