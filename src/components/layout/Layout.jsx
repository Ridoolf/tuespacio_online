import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { MenuProvider } from '../../context/MenuContext';
import Header from './Header';
import Footer from './Footer';
import PillarMenu from './PillarMenu';
import SimpleMenu from './SimpleMenu';

function Layout({ children }) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    if (isHome) {
      document.documentElement.classList.add('home-locked');
      return () => document.documentElement.classList.remove('home-locked');
    }
    return undefined;
  }, [isHome]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || isHome) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    document.documentElement.classList.add('lenis');

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, [isHome]);

  return (
    <MenuProvider>
      <Header />
      <PillarMenu />
      <SimpleMenu />
      {children}
      {!isHome && <Footer />}
    </MenuProvider>
  );
}

export default Layout;
