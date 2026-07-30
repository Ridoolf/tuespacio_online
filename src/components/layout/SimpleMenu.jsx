import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { navLinks } from '../../config/navLinks';
import { siteConfig } from '../../config/siteConfig';
import { buildContactWhatsAppLink } from '../../utils/whatsapp';
import { WhatsAppIcon, InstagramIcon } from '../SocialIcons/SocialIcons';
import './SimpleMenu.css';

/** Menú provisional fuera de Home hasta unificar el sistema del pilar. */
function SimpleMenu() {
  const location = useLocation();
  const { isPillarMode, simpleOpen, closeMenu } = useMenu();
  const whatsappLink = buildContactWhatsAppLink();

  if (isPillarMode) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {simpleOpen && (
        <>
          <motion.button
            type="button"
            className="simple-menu-overlay"
            aria-label="Cerrar menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
          <motion.aside
            id="site-menu"
            className="simple-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="simple-menu-head">
              <span className="simple-menu-label">Menú</span>
              <button type="button" className="simple-menu-close" onClick={closeMenu} aria-label="Cerrar menú">
                <X size={22} strokeWidth={2.25} />
              </button>
            </div>

            <nav className="simple-menu-nav" aria-label="Navegación principal">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`simple-menu-link ${location.pathname === link.to ? 'simple-menu-link--active' : ''}`}
                  onClick={closeMenu}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="simple-menu-footer">
              <p>Seguime</p>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="simple-menu-social">
                <InstagramIcon />
                Instagram
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="simple-menu-social">
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default SimpleMenu;
