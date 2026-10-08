import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { dbService } from '@/services/db';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { config } = useSiteConfig();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);

  useEffect(() => {
    const fetchInquiriesCount = async () => {
      try {
        const inquiries = await dbService.getInquiries();
        const count = inquiries.filter((i) => i.status === 'new').length;
        setNewInquiriesCount(count);
      } catch (e) {
        console.warn('Failed to load inquiries count:', e);
      }
    };
    fetchInquiriesCount();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      end: true,
      title: 'Dashboard Administrator',
      subtitle: 'Ringkasan statistik, produk terbaru, dan aktivitas toko',
    },
    {
      label: 'Produk',
      path: '/admin/products',
      icon: Package,
      title: 'Katalog Produk Batik',
      subtitle: 'Kelola busana, kain batik tulis, harga, dan stok',
    },
    {
      label: 'Kategori',
      path: '/admin/categories',
      icon: FolderTree,
      title: 'Kategori Produk',
      subtitle: 'Atur pengelompokan dan deskripsi kategori batik',
    },
    {
      label: 'Galeri',
      path: '/admin/gallery',
      icon: ImageIcon,
      title: 'Galeri & Dokumentasi',
      subtitle: 'Kelola foto karya, studio workshop, dan pengrajin',
    },
    {
      label: 'Inquiry',
      path: '/admin/inquiries',
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? newInquiriesCount : undefined,
      title: 'Inquiry Pelanggan',
      subtitle: 'Pesan masuk, konsultasi pesanan, dan pertanyaan',
    },
    {
      label: 'Pengaturan',
      path: '/admin/settings',
      icon: Settings,
      title: 'Pengaturan Situs',
      subtitle: 'Kelola informasi toko, kontak WhatsApp, dan jam buka',
    },
  ];

  // Find active header info
  const activeNavItem =
    navItems.find((item) =>
      item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
    ) || navItems[0];

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col lg:flex-row font-sans text-cocoa">
      {/* MOBILE HEADER */}
      <header className="lg:hidden flex items-center justify-between bg-cocoa-dark px-5 py-3.5 text-ivory sticky top-0 z-40 shadow-md border-b border-gold-dark/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md hover:bg-ivory/10 text-gold-light focus:outline-none transition-colors"
            aria-label="Buka Menu Sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <span className="font-serif text-base font-semibold block leading-none">
              {config.brand_name || 'Adhimas Batik'}
            </span>
            <span className="text-[10px] text-gold-light/90 uppercase tracking-widest font-medium">
              Admin Panel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Dot */}
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
              isSupabaseConfigured
                ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-950/60 border-amber-500/30 text-amber-300'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            {isSupabaseConfigured ? 'Supabase' : 'Lokal'}
          </span>

          <Link
            to="/"
            target="_blank"
            className="p-1.5 text-ivory/80 hover:text-gold-light transition-colors"
            title="Lihat Website Utama"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* BACKDROP FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-cocoa-dark/70 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-cocoa-dark text-ivory transition-transform duration-300 ease-in-out flex flex-col justify-between border-r border-cocoa/20 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* BRAND HEADER */}
          <div className="flex items-center justify-between p-6 border-b border-ivory/10 bg-cocoa-dark/50">
            <Link to="/admin" className="flex flex-col group">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-ivory group-hover:text-gold-light transition-colors">
                  {config.brand_name || 'Adhimas Batik'}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold mt-0.5">
                Panel Administrator
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-ivory/60 hover:text-ivory p-1 rounded-md hover:bg-ivory/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SYSTEM CONNECTION BADGE */}
          <div className="px-4 pt-4 pb-2">
            <div
              className={`flex items-center justify-between px-3 py-2 rounded-md text-[11px] font-medium border ${
                isSupabaseConfigured
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5 shrink-0" />
                <span>DB: {isSupabaseConfigured ? 'Supabase Active' : 'Local Storage Mode'}</span>
              </div>
              <span
                className={`h-2 w-2 rounded-full ${
                  isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="px-3 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between px-4 py-2.5 rounded-md text-xs uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'bg-maroon text-ivory shadow-sm'
                      : 'text-ivory/70 hover:bg-ivory/10 hover:text-ivory'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? 'text-gold-light' : 'text-ivory/60 group-hover:text-ivory'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive ? 'bg-gold text-cocoa-dark' : 'bg-maroon text-ivory'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Left Active Accent Line */}
                    {isActive && (
                      <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gold rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* FOOTER USER / LOGOUT */}
        <div className="p-4 border-t border-ivory/10 bg-cocoa-dark/30 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-ivory/5 rounded-md border border-ivory/5">
            <div className="h-8 w-8 rounded-full bg-gold-dark/30 border border-gold-light/30 flex items-center justify-center text-gold-light font-serif font-bold text-sm shrink-0">
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden min-w-0 flex-1">
              <p className="text-xs font-semibold truncate text-ivory" title={user?.email}>
                {user?.email}
              </p>
              <span className="text-[10px] text-gold-light/90 uppercase tracking-widest font-semibold block">
                {user?.role || 'Admin'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-ivory/80 hover:text-gold-light py-2 px-2 rounded bg-ivory/5 hover:bg-ivory/10 transition-colors border border-ivory/5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Lihat Web</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-red-300 hover:text-red-100 py-2 px-2 rounded bg-red-950/40 hover:bg-red-900/60 transition-colors border border-red-800/30"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* DESKTOP TOPBAR */}
        <header className="hidden lg:flex items-center justify-between bg-ivory border-b border-cocoa/10 px-8 py-4 sticky top-0 z-30 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl font-semibold text-cocoa">
                {activeNavItem.title}
              </h1>
              {activeNavItem.badge !== undefined && (
                <span className="bg-maroon text-ivory text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {activeNavItem.badge} Baru
                </span>
              )}
            </div>
            <p className="text-xs text-cocoa/60 mt-0.5">{activeNavItem.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status indicator pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              {isSupabaseConfigured ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Supabase Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                  <span>Local Storage Mode</span>
                </>
              )}
            </div>

            <div className="h-4 w-px bg-cocoa/15 my-auto" />

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 border border-cocoa/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cocoa hover:bg-cocoa hover:text-ivory transition-colors rounded-sm shadow-2xs"
            >
              <span>Lihat Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-maroon/10 text-maroon hover:bg-maroon hover:text-ivory px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* CONTENT VIEW */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

