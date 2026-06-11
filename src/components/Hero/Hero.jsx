import { buildContactWhatsAppLink } from '../../utils/whatsapp';
import SectionLink from '../SectionLink/SectionLink';
import './Hero.css';

function Hero() {
  const whatsappLink = buildContactWhatsAppLink();

  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1 className="hero-title">
          Tu negocio, explicado en una web que funciona
        </h1>
        <p className="hero-description">
          Webs claras con precio visible, entrega concreta, sin sorpresas.
        </p>
        <div className="hero-actions">
          <SectionLink sectionId="paquetes" className="button-primary">
            Ver paquetes
          </SectionLink>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="button-secondary">
            Escribime por WhatsApp
          </a>
        </div>
        <p className="hero-note">
          Armo webs principalmente para negocios que recién arrancan o que necesitan ordenar lo que ya tienen online.{' '}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-link">
            Escribime por WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}

export default Hero;
