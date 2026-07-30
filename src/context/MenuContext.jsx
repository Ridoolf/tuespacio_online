import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

const MenuContext = createContext(null);

const TIMING = {
  forward: 400,
  expand: 750,
  open: 350,
  contentOut: 200,
};

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function MenuProvider({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [phase, setPhase] = useState('closed');
  const [simpleOpen, setSimpleOpen] = useState(false);
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
    setSimpleOpen(false);
    setAnchorRect(null);
    setIsClosing(false);
    document.body.classList.remove('menu-open');
  }, []);

  useEffect(() => {
    sequenceRef.current += 1;
    resetMenu();
  }, [location.pathname, resetMenu]);

  const isOpen = isHome ? phase !== 'closed' : simpleOpen;

  const openMenu = useCallback(async () => {
    if (isHome) {
      if (phase !== 'closed') return;

      const seq = sequenceRef.current + 1;
      sequenceRef.current = seq;
      setIsClosing(false);
      document.body.classList.add('menu-open');

      if (reducedMotionRef.current) {
        setAnchorRect(pillarRef.current?.getBoundingClientRect() ?? null);
        setPhase('open');
        return;
      }

      setPhase('forward');
      await sleep(TIMING.forward);
      if (sequenceRef.current !== seq) return;

      setAnchorRect(pillarRef.current?.getBoundingClientRect() ?? null);
      setPhase('expand');
      await sleep(TIMING.expand);
      if (sequenceRef.current !== seq) return;

      setPhase('open');
    } else {
      setSimpleOpen(true);
      document.body.classList.add('menu-open');
    }
  }, [isHome, phase]);

  const closeMenu = useCallback(async () => {
    if (isHome) {
      if (phase === 'closed') return;

      const seq = sequenceRef.current + 1;
      sequenceRef.current = seq;
      setIsClosing(true);

      if (reducedMotionRef.current) {
        resetMenu();
        return;
      }

      if (phase === 'forward') {
        await sleep(TIMING.forward);
        if (sequenceRef.current !== seq) return;
        resetMenu();
        return;
      }

      // Fase A: fade-out de UI (phase permanece 'open')
      if (phase === 'open') {
        await sleep(TIMING.contentOut);
        if (sequenceRef.current !== seq) return;
      }

      // Fase B: shrink panel vacío
      setAnchorRect(pillarRef.current?.getBoundingClientRect() ?? anchorRect);
      setPhase('expand');
      await sleep(TIMING.expand);
      if (sequenceRef.current !== seq) return;

      // Fase C: vuelta al hero
      setPhase('forward');
      setAnchorRect(null);
      await sleep(TIMING.forward);
      if (sequenceRef.current !== seq) return;

      resetMenu();
    } else {
      resetMenu();
    }
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
    simpleOpen,
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
