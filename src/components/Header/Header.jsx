import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoText from '../LogoText/LogoText';
import SectionLink from '../SectionLink/SectionLink';
import HomeLink from '../HomeLink/HomeLink';
import { buildContactWhatsAppLink } from '../../utils/whatsapp';
import './Header.css';

const sectionLinks = [
  { label: 'Servicios', sectionId: 'servicios' },
  { label: 'Proceso', sectionId: 'proceso' },
  { label: 'Contacto', sectionId: 'contacto' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const whatsappLink = buildContactWhatsAppLink();

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  function toggleMenu() {
    const willOpen = !menuOpen;
    setMenuOpen(willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
  }

  function closeMenu() {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <HomeLink className="header-logo" onNavigate={closeMenu}>
          <LogoText />
        </HomeLink>

        <nav className="header-nav" aria-label="Navegación principal">
          <ul className="header-nav-list">
            <li>
              <HomeLink className="header-nav-link">
                Inicio
              </HomeLink>
            </li>
            {sectionLinks.map((link) => (
              <li key={link.sectionId}>
                <SectionLink sectionId={link.sectionId} className="header-nav-link">
                  {link.label}
                </SectionLink>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-cta-subtle header-cta"
          >
            Escribime
          </a>
        </nav>

        <button
          className={`header-hamburger ${menuOpen ? 'header-hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className="header-hamburger-line" />
          <span className="header-hamburger-line" />
          <span className="header-hamburger-line" />
        </button>
      </div>

      {menuOpen && (
        <div className="header-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      <nav
        className={`header-mobile ${menuOpen ? 'header-mobile--open' : ''}`}
        aria-label="Menú móvil"
      >
        <ul className="header-mobile-list">
          <li>
            <HomeLink className="header-mobile-link" onNavigate={closeMenu}>
              Inicio
            </HomeLink>
          </li>
          {sectionLinks.map((link) => (
            <li key={link.sectionId}>
              <SectionLink
                sectionId={link.sectionId}
                className="header-mobile-link"
                onNavigate={closeMenu}
              >
                {link.label}
              </SectionLink>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="button-cta-subtle header-mobile-cta"
          onClick={closeMenu}
        >
          Escribime
        </a>
      </nav>
    </header>
  );
}

export default Header;
