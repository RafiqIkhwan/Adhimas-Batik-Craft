import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

export function FloatingActions() {
  const location = useLocation();
  const { whatsappLink } = useSiteConfig();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className={`flex h-11 w-11 items-center justify-center rounded-full bg-cocoa text-ivory shadow-lg shadow-cocoa/20 transition-all duration-300 hover:bg-maroon ${
          showTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* WhatsApp */}
      <div className="group relative">
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-cocoa px-4 py-2 text-xs font-medium text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Chat via WhatsApp
        </span>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat via WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/30 transition-all duration-300 hover:scale-110 hover:bg-[#1EBE5D]"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>
    </div>
  );
}
