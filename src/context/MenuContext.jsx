import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { MENU_TIMING, waitMenuAnimation } from '../utils/menuGsap';

const MenuContext = createContext(null);

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function MenuProvider({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [phase, setPhase] = useState('closed');
  const [anchorRect, setAnchorRect] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const pillarRef = useRef(null);
  const sequenceRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const registerPillarAnchor = useCallback((node) => {
    pillarRef.current = node;
  }, []);

  const resetMenu = useCallback(() => {
    setPhase('closed');
    setAnchorRect(null);
    setIsClosing(false);
    document.body.classList.remove('menu-open');
  }, []);

  useEffect(() => {
    sequenceRef.current += 1;
    resetMenu();
  }, [location.pathname, resetMenu]);

  const isOpen = phase !== 'closed';

  const openMenu = useCallback(async () => {
    if (phase !== 'closed') return;

    const seq = sequenceRef.current + 1;
    sequenceRef.current = seq;
    setIsClosing(false);
    document.body.classList.add('menu-open');

    if (isHome) {
      if (reducedMotionRef.current) {
        setAnchorRect(pillarRef.current?.getBoundingClientRect() ?? null);
        setPhase('open');
        return;
      }

      setPhase('forward');
      await sleep(MENU_TIMING.forward);
      if (sequenceRef.current !== seq) return;

      setAnchorRect(pillarRef.current?.getBoundingClientRect() ?? null);
      setPhase('expand');
      await waitMenuAnimation('expand');
      if (sequenceRef.current !== seq) return;

      setPhase('open');
      await waitMenuAnimation('contentIn');
      return;
    }

    setPhase('open');
  }, [isHome, phase]);

  const closeMenu = useCallback(async () => {
    if (phase === 'closed') return;

    const seq = sequenceRef.current + 1;
    sequenceRef.current = seq;
    setIsClosing(true);

    if (reducedMotionRef.current) {
      resetMenu();
      return;
    }

    if (isHome) {
      if (phase === 'forward') {
        await sleep(MENU_TIMING.forward);
        if (sequenceRef.current !== seq) return;
        resetMenu();
        return;
      }

      if (phase === 'open') {
        await waitMenuAnimation('contentOut');
        if (sequenceRef.current !== seq) return;
      }

      setAnchorRect(pillarRef.current?.getBoundingClientRect() ?? anchorRect);
      setPhase('expand');
      await waitMenuAnimation('expandClose');
      if (sequenceRef.current !== seq) return;

      setPhase('forward');
      setAnchorRect(null);
      await sleep(MENU_TIMING.forward);
      if (sequenceRef.current !== seq) return;

      resetMenu();
      return;
    }

    await sleep(380);
    if (sequenceRef.current !== seq) return;
    resetMenu();
  }, [anchorRect, isHome, phase, resetMenu]);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [closeMenu, isOpen, openMenu]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeMenu, isOpen]);

  const value = {
    phase,
    anchorRect,
    isOpen,
    isHome,
    isPillarMode: isHome,
    isClosing,
    registerPillarAnchor,
    openMenu,
    closeMenu,
    toggleMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
}
