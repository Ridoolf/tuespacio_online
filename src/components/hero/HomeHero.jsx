import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { WhatsAppIcon, InstagramIcon } from '../SocialIcons/SocialIcons';
import { siteConfig } from '../../config/siteConfig';
import { buildContactWhatsAppLink } from '../../utils/whatsapp';
import { useMenu } from '../../context/MenuContext';
import HeroLaptopShowcase from './HeroLaptopShowcase';

const brandTitle = (
  <>
    <span>Tu espacio </span>
    <span className="home-hero-brand-accent">online</span>
  </>
);

const brandMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.55, delay: 0.05 },
};

function HomeHero() {
  const whatsappLink = buildContactWhatsAppLink();
  const [ctaFocused, setCtaFocused] = useState(false);
  const { phase, isClosing, isOpen, registerPillarAnchor } = useMenu();

  const isMenuForward = phase === 'forward' && !isClosing;
  const isPillarHidden = phase === 'expand' || phase === 'open';

  return (
    <section
      className={`home-hero ${phase !== 'closed' ? 'home-hero--menu-active' : ''}`}
      aria-label={siteConfig.businessName}
      data-cta-focus={ctaFocused && !isOpen ? true : undefined}
    >
      <div className="home-hero-backdrop">
        <div className="home-hero-deco" aria-hidden="true">
          <span className="home-hero-shape home-hero-shape--1 home-hero-shape--solid" />
          <span className="home-hero-shape home-hero-shape--2 home-hero-shape--solid home-hero-shape--white" />
          <span className="home-hero-shape home-hero-shape--3 home-hero-shape--solid" />
        </div>

        <div className="home-hero-main">
          <motion.p
            id="hero-kicker"
            className="home-hero-kicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Diseño web claro, rápido y pensado para convertir
          </motion.p>

          <div className="home-hero-composition">
            <div className="home-hero-brand-stack home-hero-brand-stack--base home-hero-title-position">
              <motion.h1 className="home-hero-brand home-hero-brand--base" {...brandMotion}>
                {brandTitle}
              </motion.h1>
            </div>

            <div
              ref={registerPillarAnchor}
              className={`home-hero-pillar${isMenuForward ? ' home-hero-pillar--forward' : ''}${isPillarHidden ? ' home-hero-pillar--hidden' : ''}`}
              aria-hidden="true"
            >
              <div className="home-hero-bar" />
            </div>

            <div className="home-hero-brand-stack home-hero-brand-stack--overlay home-hero-title-position">
              <h1 className="home-hero-brand home-hero-brand--overlay" aria-hidden="true">
                {brandTitle}
              </h1>
            </div>

            <motion.div
              className="home-hero-laptop-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HeroLaptopShowcase />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.footer
        className="home-hero-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.4 }}
      >
        <p className="home-hero-footer-tagline">{siteConfig.tagline.toLowerCase()}</p>
        <span className="home-hero-footer-sep" aria-hidden="true">
          ·
        </span>
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="home-hero-footer-link"
        >
          <InstagramIcon />
          instagram
        </a>
        <span className="home-hero-footer-sep" aria-hidden="true">
          ·
        </span>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="home-hero-footer-link"
        >
          <WhatsAppIcon />
          whatsapp
        </a>
      </motion.footer>

      <div className="home-hero-cta-layer">
        <motion.div
          className="home-hero-cta-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.35 }}
        >
          <Button
            to="/servicios#planes"
            variant="outline"
            className="home-hero-cta"
            icon={ArrowRight}
            onMouseEnter={() => setCtaFocused(true)}
            onMouseLeave={() => setCtaFocused(false)}
            onFocus={() => setCtaFocused(true)}
            onBlur={() => setCtaFocused(false)}
          >
            Ver precios
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeHero;
