import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '@/types/database';
import { dbService } from '@/services/db';

interface SiteConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<SiteConfig>;
  refreshConfig: () => Promise<void>;
  whatsappLink: string;
  whatsappProductLink: (name: string) => string;
}

const defaultSiteConfig: SiteConfig = {
  id: 'sc-1',
  brand_name: 'Adhimas Batik',
  logo: '',
  whatsapp: '6285845987124',
  whatsapp_display: '+62 858-4598-7124',
  email: 'halo@adhimasbatik.id',
  phone: '+62 858 45987124',
  address: 'Jl. Mlati Tromol Pos 2, Sleman, D.I. Yogyakarta 55281',
  instagram: '@adhimasbatik',
  tiktok: '@adhimasbatik',
  opening_hours: 'Senin – Sabtu: 09.00 – 17.00 WIB (Minggu Tutup)',
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = async () => {
    try {
      const data = await dbService.getSiteConfig();
      setConfig(data);
    } catch (err) {
      console.warn('Failed to load site config:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    const updated = await dbService.updateSiteConfig(newConfig);
    setConfig(updated);
    return updated;
  };

  const cleanWaNumber = (config.whatsapp || '6285845987124').replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    `Halo ${config.brand_name}, saya tertarik dengan koleksi batik tulis Anda.`
  )}`;

  const whatsappProductLink = (productName: string) => {
    const msg = `Halo, saya tertarik dengan produk ${productName}. Saya ingin mengetahui ketersediaan dan detail pemesanannya.`;
    return `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        isLoading,
        updateConfig,
        refreshConfig: loadConfig,
        whatsappLink,
        whatsappProductLink,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
