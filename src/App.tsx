import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { Navbar } from '@/components/Navbar';
import { FloatingActions } from '@/components/FloatingActions';
import { Footer } from '@/components/sections/Footer';
import { HomePage } from '@/components/sections/HomePage';
import { CollectionPage } from '@/components/collection/CollectionPage';
import { ProductDetailPage } from '@/components/collection/ProductDetailPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ProcessPage } from '@/components/pages/ProcessPage';
import { GalleryPage } from '@/components/pages/GalleryPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { NotFoundPage } from '@/components/pages/NotFoundPage';

// Admin Components
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { PublicAdminRoute } from '@/components/admin/PublicAdminRoute';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminCategories } from '@/components/admin/AdminCategories';
import { AdminGallery } from '@/components/admin/AdminGallery';
import { AdminInquiries } from '@/components/admin/AdminInquiries';
import { AdminSettings } from '@/components/admin/AdminSettings';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <SiteConfigProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-ivory flex flex-col justify-between">
            <div>
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/beranda" element={<HomePage />} />
                <Route path="/koleksi" element={<CollectionPage />} />
                <Route path="/koleksi/:slug" element={<ProductDetailPage />} />
                <Route path="/tentang-kami" element={<AboutPage />} />
                <Route path="/proses" element={<ProcessPage />} />
                <Route path="/galeri" element={<GalleryPage />} />
                <Route path="/kontak" element={<ContactPage />} />

                {/* Admin Public Route (Login) */}
                <Route element={<PublicAdminRoute />}>
                  <Route path="/admin/login" element={<AdminLogin />} />
                </Route>

                {/* Admin Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/categories" element={<AdminCategories />} />
                    <Route path="/admin/gallery" element={<AdminGallery />} />
                    <Route path="/admin/inquiries" element={<AdminInquiries />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                  </Route>
                </Route>

                {/* 404 Catch-all */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
            <FloatingActions />
          </div>
        </BrowserRouter>
      </SiteConfigProvider>
    </AuthProvider>
  );
}

export default App;
