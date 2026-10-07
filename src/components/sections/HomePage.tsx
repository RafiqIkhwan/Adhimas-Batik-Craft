import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '@/components/sections/Hero';
import { BrandIntro } from '@/components/sections/BrandIntro';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { FeaturedCollection } from '@/components/sections/FeaturedCollection';
import { Philosophy } from '@/components/sections/Philosophy';
import { Process } from '@/components/sections/Process';
import { ArtisanStory } from '@/components/sections/ArtisanStory';
import { Testimonials } from '@/components/sections/Testimonials';
import { Gallery } from '@/components/sections/Gallery';
import { FinalCTA } from '@/components/sections/FinalCTA';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <BrandIntro />
      <WhyChooseUs />
      <FeaturedCollection />
      <Philosophy />
      <Process />
      <ArtisanStory />
      <Testimonials />
      <Gallery />
      <FinalCTA />
    </main>
  );
}
