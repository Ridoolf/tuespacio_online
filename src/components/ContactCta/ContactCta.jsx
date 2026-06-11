import { siteConfig } from '../../config/siteConfig';
import { buildContactWhatsAppLink } from '../../utils/whatsapp';
import { WhatsAppIcon, InstagramIcon } from '../SocialIcons/SocialIcons';
import './ContactCta.css';

function ContactCta() {
  const whatsappLink = buildContactWhatsAppLink();

  return (
    <section className="contact-cta">
      <div className="container">
        <div className="contact-cta-inner">
        <header className="section-header" id="contacto">
          <h2 className="section-title">¿Necesitás algo más complejo?</h2>
          <p className="section-subtitle">
            Si necesitás un sistema, integraciones o algo que no entra en estos paquetes,
            escribime directo y lo vemos juntos.
          </p>
        </header>

        <div className="contact-cta-actions">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary contact-cta-button"
          >
            <WhatsAppIcon />
            Escribime por WhatsApp
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary contact-cta-button"
          >
            <InstagramIcon />
            Instagram
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCta;
