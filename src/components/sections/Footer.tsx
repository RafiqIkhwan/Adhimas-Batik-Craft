import { Link, useLocation } from 'react-router-dom';
import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useSiteConfig } from '@/context/SiteConfigContext';

export function Footer() {
  const location = useLocation();
  const { config, whatsappLink } = useSiteConfig();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer id="kontak" className="bg-cocoa-dark text-ivory/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-semibold text-ivory">
                {config.brand_name}
              </span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-widest-sm text-gold">
                Warisan Batik Tulis Handmade
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Batik tulis handmade premium yang dibuat dengan ketelitian oleh
              pengrajin Indonesia. Setiap karya memiliki karakter dan cerita.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg font-medium text-ivory">
              Navigasi
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium text-ivory">Kontak</h4>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-gold-light"
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  {config.whatsapp_display || config.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-gold-light"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  {config.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${(config.instagram || '').replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-gold-light"
                >
                  <Instagram className="h-4 w-4 text-gold" />
                  {config.instagram}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {config.address}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg font-medium text-ivory">
              Ikuti Kami
            </h4>
            <div className="mt-5 flex gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-cocoa-dark"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={`https://instagram.com/${(config.instagram || '').replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-cocoa-dark"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${config.email}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-cocoa-dark"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-ivory/10 pt-8">
          <p className="text-center text-xs tracking-wide-sm text-ivory/40">
            &copy; 2026 {config.brand_name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
