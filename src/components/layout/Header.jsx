import { useEffect, useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import Logo from '../ui/Logo';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isOpen, toggleMenu } = useMenu();
  const hideNavbarToggle = isOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`header ${scrolled ? 'header--scrolled' : ''} ${isOpen ? 'header--menu-open' : ''}`}
    >
      <div className="container header-inner">
        <Logo />
        <button
          type="button"
          className={`header-menu-toggle ${hideNavbarToggle ? 'header-menu-toggle--hidden' : ''}`}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-hidden={hideNavbarToggle}
          tabIndex={hideNavbarToggle ? -1 : 0}
          onClick={toggleMenu}
        >
          <span className="header-menu-label">menú</span>
          <span className="header-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
