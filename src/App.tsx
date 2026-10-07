import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { FloatingActions } from '@/components/FloatingActions';
import { Footer } from '@/components/sections/Footer';
import { HomePage } from '@/components/sections/HomePage';
import { CollectionPage } from '@/components/collection/CollectionPage';
import { ProductDetailPage } from '@/components/collection/ProductDetailPage';

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
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-ivory">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/koleksi" element={<CollectionPage />} />
          <Route path="/koleksi/:slug" element={<ProductDetailPage />} />
        </Routes>
        <Footer />
        <FloatingActions />
      </div>
    </BrowserRouter>
  );
}

export default App;
