import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/content';
import { Button } from '@/components/ui/Button';
import { useSiteConfig } from '@/context/SiteConfigContext';

function isHome(location: ReturnType<typeof useLocation>) {
  return location.pathname === '/';
}

export function Navbar() {
  const location = useLocation();
  const { config, whatsappLink } = useSiteConfig();
  const home = isHome(location);
  const [scrolled, setScrolled] = useState(!home);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!home) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isKoleksi = location.pathname.startsWith('/koleksi');

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-sm shadow-cocoa/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span
            className={`font-serif text-2xl font-semibold tracking-wide-sm transition-colors duration-500 ${
              scrolled ? 'text-cocoa' : 'text-ivory'
            }`}
          >
            {config.brand_name}
          </span>
          <span
            className={`text-[10px] font-medium uppercase tracking-widest-sm transition-colors duration-500 ${
              scrolled ? 'text-gold-dark' : 'text-gold-light'
            }`}
          >
            Warisan Batik Tulis Handmade
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              (link.href === '/koleksi' && isKoleksi) ||
              (link.href === '/' && home);
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`text-sm font-medium tracking-wide-sm transition-colors duration-300 hover:text-gold-dark ${
                    active
                      ? 'text-gold-dark'
                      : scrolled
                        ? 'text-cocoa'
                        : 'text-ivory/90'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            variant={scrolled ? 'whatsapp' : 'gold'}
            href={whatsappLink}
          >
            Pesan via WhatsApp
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Buka menu"
        >
          <Menu
            className={`h-7 w-7 transition-colors ${scrolled ? 'text-cocoa' : 'text-ivory'}`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-cocoa-dark/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-ivory px-8 py-6 shadow-2xl transition-transform duration-400 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl font-semibold text-cocoa">
              {config.brand_name}
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Tutup menu">
              <X className="h-6 w-6 text-cocoa" />
            </button>
          </div>

          <ul className="mt-10 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={handleNavClick}
                  className="block py-3 font-serif text-xl text-cocoa transition-colors hover:text-gold-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button variant="whatsapp" href={whatsappLink} className="w-full">
              Pesan via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
