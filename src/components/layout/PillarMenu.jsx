import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { navLinks } from '../../config/navLinks';
import { siteConfig } from '../../config/siteConfig';
import { buildContactWhatsAppLink } from '../../utils/whatsapp';
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

const panelEase = [0.16, 1, 0.3, 1];

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: panelEase } },
};

function PillarMenu() {
  const location = useLocation();
  const { phase, anchorRect, isPillarMode, isClosing, closeMenu } = useMenu();
  const whatsappLink = buildContactWhatsAppLink();
  const [targetRect, setTargetRect] = useState(getTargetRect);
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const panelDuration = reducedMotion ? 0 : 0.75;

  useEffect(() => {
    const update = () => setTargetRect(getTargetRect());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const showPortal = isPillarMode && (phase === 'expand' || phase === 'open');
  const showPanelUI = phase === 'open' && !isClosing;

  const panelAnimate = useMemo(() => {
    if (!anchorRect) return targetRect;

    if (phase === 'open') {
      return targetRect;
    }

    if (phase === 'expand' && isClosing) {
      return rectFromAnchor(anchorRect);
    }

    if (phase === 'expand') {
      return targetRect;
    }

    return rectFromAnchor(anchorRect);
  }, [anchorRect, isClosing, phase, targetRect]);

  if (!isPillarMode || phase === 'closed') {
    return null;
  }

  const overlayVisible = phase !== 'closed' && phase !== 'forward';

  return createPortal(
    <>
      <AnimatePresence>
        {overlayVisible && (
          <motion.button
            type="button"
            className="pillar-menu-overlay"
            aria-label="Cerrar menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPortal && anchorRect && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="pillar-menu-panel"
            initial={rectFromAnchor(anchorRect)}
            animate={panelAnimate}
            exit={rectFromAnchor(anchorRect)}
            transition={{ duration: panelDuration, ease: panelEase }}
          >
            <div
              className={`pillar-menu-panel-inner${showPanelUI ? '' : ' pillar-menu-panel-inner--hidden'}`}
            >
              <AnimatePresence>
                {showPanelUI && (
                  <motion.div
                    className="pillar-menu-panel-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
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

                    <motion.div
                      className="pillar-menu-body"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.aside className="pillar-menu-side" variants={itemVariants}>
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
                      </motion.aside>

                      <nav className="pillar-menu-nav" aria-label="Navegación principal">
                        {navLinks.map((link, index) => (
                          <motion.div key={link.to} variants={itemVariants}>
                            <Link
                              to={link.to}
                              className={`pillar-menu-link ${location.pathname === link.to ? 'pillar-menu-link--active' : ''}`}
                              onClick={closeMenu}
                            >
                              <span className="pillar-menu-link-index">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="pillar-menu-link-text">{link.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </nav>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}

export default PillarMenu;
