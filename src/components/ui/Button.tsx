import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'gold' | 'whatsapp';

type Props = {
  variant?: Variant;
  href?: string;
  to?: string;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-wide-sm transition-all duration-300 ease-out text-sm lg:text-base';

const variants: Record<Variant, string> = {
  primary:
    'bg-maroon text-ivory px-7 py-3.5 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 hover:-translate-y-0.5',
  secondary:
    'bg-cocoa text-ivory px-7 py-3.5 hover:bg-cocoa-dark hover:shadow-lg hover:shadow-cocoa/20 hover:-translate-y-0.5',
  outline:
    'border border-cocoa/30 text-cocoa px-7 py-3.5 hover:border-cocoa hover:bg-cocoa hover:text-ivory',
  gold:
    'bg-gold text-cocoa-dark px-7 py-3.5 hover:bg-gold-dark hover:text-ivory hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5',
  whatsapp:
    'bg-[#25D366] text-white px-7 py-3.5 hover:bg-[#1EBE5D] hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5',
};

export function Button({
  variant = 'primary',
  href,
  to,
  children,
  className = '',
  ...props
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
