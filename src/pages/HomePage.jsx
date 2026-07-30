import { useEffect } from 'react';
import HomeHero from '../components/hero/HomeHero';
import { siteConfig } from '../config/siteConfig';
import { usePageMeta } from '../hooks/usePageMeta';
import './HomePage.css';

function HomePage() {
  usePageMeta({
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    path: '/',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page home-page">
      <main id="contenido-principal">
        <HomeHero />
      </main>
    </div>
  );
}

export default HomePage;
