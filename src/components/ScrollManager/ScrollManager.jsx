import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scrollToSection';

function ScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    const sectionFromState = location.state?.scrollTo;

    if (sectionFromState) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSection(sectionFromState);
          window.history.replaceState(null, '', `#${sectionFromState}`);
        });
      });
      navigate(location.pathname, { replace: true, state: {} });
      previousPathname.current = location.pathname;
      return;
    }

    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(sectionId));
      });
      previousPathname.current = location.pathname;
      return;
    }

    if (previousPathname.current !== location.pathname) {
      window.scrollTo(0, 0);
    }

    previousPathname.current = location.pathname;
  }, [location.pathname, location.hash, location.key, navigate]);

  return null;
}

export default ScrollManager;
