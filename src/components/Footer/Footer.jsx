import { siteConfig } from '../../config/siteConfig';
import { buildContactWhatsAppLink } from '../../utils/whatsapp';
import LogoText from '../LogoText/LogoText';
import SectionLink from '../SectionLink/SectionLink';
import HomeLink from '../HomeLink/HomeLink';
import { WhatsAppIcon, InstagramIcon } from './FooterIcons';
import './Footer.css';

const sectionLinks = [
  { label: 'Servicios', sectionId: 'servicios' },
  { label: 'Proceso', sectionId: 'proceso' },
  { label: 'Contacto', sectionId: 'contacto' },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappLink = buildContactWhatsAppLink();

  return (
    <footer className="footer">
      <div className="footer-accent" aria-hidden="true" />

      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <HomeLink className="footer-logo">
              <LogoText variant="light" inline />
            </HomeLink>
            <p className="footer-tagline">{siteConfig.tagline}</p>
          </div>

          <nav className="footer-nav" aria-label="Enlaces del sitio">
            <ul className="footer-nav-list">
              <li>
                <HomeLink className="footer-nav-link">
                  Inicio
                </HomeLink>
              </li>
              {sectionLinks.map((link) => (
                <li key={link.sectionId}>
                  <SectionLink sectionId={link.sectionId} className="footer-nav-link">
                    {link.label}
                  </SectionLink>
                </li>
              ))}
              <li>
                <SectionLink sectionId="paquetes" className="footer-nav-link">
                  Paquetes
                </SectionLink>
              </li>
            </ul>
          </nav>

          <div className="footer-social">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <p className="footer-copy">© {currentYear} {siteConfig.businessName}</p>
          <p className="footer-credit">
            Desarrollado por:{' '}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              {siteConfig.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
