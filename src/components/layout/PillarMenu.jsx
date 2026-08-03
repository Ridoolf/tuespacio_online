import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { navLinks } from '../../config/navLinks';
import { siteConfig } from '../../config/siteConfig';
import { buildContactWhatsAppLink } from '../../utils/whatsapp';
import {
  applyPanelRect,
  completeMenuAnimation,
  fadeOverlay,
  hideMenuContent,
  killMenuTimelines,
  morphPanel,
  revealMenuContent,
} from '../../utils/menuGsap';
import { WhatsAppIcon, InstagramIcon } from '../SocialIcons/SocialIcons';
import './PillarMenu.css';

function getHeaderHeight() {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 76;
}

function getTargetRect() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isPhone = vw <= 767;
  const isTablet = vw <= 1023 && !isPhone;
  const headerHeight = getHeaderHeight();
  const headerGap = 12;
  const topInset = headerHeight + headerGap;
  const bottomInset = isTablet ? 12 : 24;
  const sideInset = isTablet ? 12 : Math.max(16, vw * 0.04);

  if (isPhone) {
    return {
      top: headerHeight,
      left: 0,
      width: vw,
      height: Math.max(0, vh - headerHeight),
      borderRadius: 0,
    };
  }

  if (isTablet) {
    const width = vw - sideInset * 2;
    const height = Math.max(0, vh - topInset - bottomInset);

    return {
      top: topInset,
      left: sideInset,
      width,
      height,
      borderRadius: 20,
    };
  }

  let width = Math.min(940, vw - sideInset * 2);
  let height = Math.min(720, vh * 0.82, vh - topInset - bottomInset);
  let top = Math.max(topInset, (vh - height) / 2);

  if (top + height > vh - bottomInset) {
    height = Math.max(0, vh - topInset - bottomInset);
    top = topInset;
  }

  return {
    top,
    left: (vw - width) / 2,
    width,
    height,
    borderRadius: 28,
  };
}

function rectFromAnchor(anchor) {
  return {
    top: anchor.top,
    left: anchor.left,
    width: anchor.width,
    height: anchor.height,
    borderRadius: 999,
  };
}

function PillarMenu() {
  const location = useLocation();
  const { phase, anchorRect, isHome, isClosing, closeMenu } = useMenu();
  const whatsappLink = buildContactWhatsAppLink();
  const [targetRect, setTargetRect] = useState(getTargetRect);
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const timelinesRef = useRef([]);

  useEffect(() => {
    const update = () => setTargetRect(getTargetRect());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    return () => killMenuTimelines(...timelinesRef.current);
  }, []);

  const showPanelHome = (phase === 'expand' || phase === 'open') && anchorRect;
  const showPanelUI = phase === 'open';
  const overlayVisible = phase !== 'closed' && phase !== 'forward';

  useEffect(() => {
    if (!overlayRef.current) return;

    const tl = fadeOverlay(overlayRef.current, overlayVisible, reducedMotion);
    timelinesRef.current.push(tl);

    return () => tl.kill();
  }, [overlayVisible, reducedMotion]);

  useEffect(() => {
    if (!showPanelHome || !panelRef.current) return;

    if (phase === 'expand' && !isClosing) {
      const fromRect = rectFromAnchor(anchorRect);
      const tl = morphPanel(panelRef.current, fromRect, targetRect, reducedMotion);
      timelinesRef.current.push(tl);

      if (reducedMotion) {
        completeMenuAnimation('expand');
      } else {
        tl.eventCallback('onComplete', () => completeMenuAnimation('expand'));
      }

      return () => tl.kill();
    }

    if (phase === 'open' && !isClosing) {
      applyPanelRect(panelRef.current, targetRect);
    }

    return undefined;
  }, [anchorRect, isClosing, phase, reducedMotion, showPanelHome, targetRect]);

  useEffect(() => {
    if (!showPanelHome || !panelRef.current) return;

    if (phase === 'expand' && isClosing) {
      const toRect = rectFromAnchor(anchorRect);
      const tl = morphPanel(panelRef.current, targetRect, toRect, reducedMotion);
      timelinesRef.current.push(tl);

      if (reducedMotion) {
        completeMenuAnimation('expandClose');
      } else {
        tl.eventCallback('onComplete', () => completeMenuAnimation('expandClose'));
      }

      return () => tl.kill();
    }

    return undefined;
  }, [anchorRect, isClosing, phase, reducedMotion, showPanelHome, targetRect]);

  useEffect(() => {
    if (!contentRef.current || phase !== 'open' || isClosing) return;

    const tl = revealMenuContent(contentRef.current, reducedMotion);
    timelinesRef.current.push(tl);

    if (reducedMotion) {
      completeMenuAnimation('contentIn');
    } else {
      tl.eventCallback('onComplete', () => completeMenuAnimation('contentIn'));
    }

    return () => tl.kill();
  }, [isClosing, phase, reducedMotion]);

  useEffect(() => {
    if (!contentRef.current || !isClosing || phase !== 'open') return;

    const tl = hideMenuContent(contentRef.current, reducedMotion);
    timelinesRef.current.push(tl);

    if (reducedMotion) {
      completeMenuAnimation('contentOut');
    } else {
      tl.eventCallback('onComplete', () => completeMenuAnimation('contentOut'));
    }

    return () => tl.kill();
  }, [isClosing, phase, reducedMotion]);

  if (!isHome || phase === 'closed') {
    return null;
  }

  return createPortal(
    <>
      <button
        ref={overlayRef}
        type="button"
        className="pillar-menu-overlay"
        aria-label="Cerrar menú"
        style={{ opacity: 0, pointerEvents: overlayVisible ? 'auto' : 'none' }}
        onClick={closeMenu}
      />

      {showPanelHome && (
        <div
          ref={panelRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="pillar-menu-panel"
        >
          <div className="pillar-menu-panel-inner">
            {showPanelUI && (
              <div ref={contentRef} className="pillar-menu-panel-content">
                <div className="pillar-menu-head">
                  <span className="pillar-menu-head-label">Menú</span>
                  <button
                    type="button"
                    className="pillar-menu-close"
                    onClick={closeMenu}
                    aria-label="Cerrar menú"
                  >
                    <span>Cerrar</span>
                    <X size={20} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                </div>

                <div className="pillar-menu-body">
                  <aside className="pillar-menu-side">
                    <p className="pillar-menu-side-label">Seguime</p>
                    <div className="pillar-menu-socials">
                      <a
                        href={siteConfig.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pillar-menu-social"
                        aria-label="Instagram"
                      >
                        <InstagramIcon />
                        <span className="pillar-menu-social-label">Instagram</span>
                      </a>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pillar-menu-social"
                        aria-label="WhatsApp"
                      >
                        <WhatsAppIcon />
                        <span className="pillar-menu-social-label">WhatsApp</span>
                      </a>
                    </div>
                    <p className="pillar-menu-side-text">
                      {siteConfig.tagline}. Coordinamos sin compromiso por WhatsApp.
                    </p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pillar-menu-side-cta"
                      onClick={closeMenu}
                    >
                      Escribime
                      <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
                    </a>
                  </aside>

                  <nav className="pillar-menu-nav" aria-label="Navegación principal">
                    {navLinks.map((link, index) => (
                      <div key={link.to} className="pillar-menu-nav-item">
                        <Link
                          to={link.to}
                          className={`pillar-menu-link ${location.pathname === link.to ? 'pillar-menu-link--active' : ''}`}
                          onClick={closeMenu}
                        >
                          <span className="pillar-menu-link-index">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="pillar-menu-link-text-wrap">
                            <span className="pillar-menu-link-text">{link.label}</span>
                          </span>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>,
    document.body,
  );
}

export default PillarMenu;
