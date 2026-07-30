import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { buildContactWhatsAppLink } from '../utils/whatsapp';
import { fadeIn } from '../config/motion';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';
import './SobreMiPage.css';

function SobreMiPage() {
  usePageMeta({ title: buildPageTitle('Sobre mí'), path: '/sobre-mi' });
  const whatsappLink = buildContactWhatsAppLink();

  return (
    <div className="page page-canvas sobre-page">
      <section className="page-open sobre-open" aria-labelledby="sobre-title">
        <div className="container sobre-grid">
          <motion.div className="sobre-content" {...fadeIn}>
            <p className="page-kicker">Sobre mí</p>
            <h1 id="sobre-title" className="display-title">
              Lucas <span className="accent">Ridolfi</span>
            </h1>
            <p className="page-open-desc">
              Desarrollador web freelance. Armo sitios claros, cercanos y pensados para que tu
              negocio se entienda online.
            </p>
            <div className="sobre-text">
              <p>
                Empecé en el mundo del desarrollo front-end y cada proyecto me enseña algo nuevo.
                Me gusta trabajar cerca del cliente: charlamos, definimos juntos y entrego una web
                que podés usar desde el día uno.
              </p>
              <p>
                Tu Espacio Online nació con una idea simple: webs con precio visible, entrega
                concreta y acompañamiento después de publicar — para que tu página no quede
                abandonada en Google.
              </p>
            </div>
            <Button href={whatsappLink} external variant="primary" iconRight={ArrowUpRight}>
              Escribime
            </Button>
          </motion.div>

          <div className="sobre-aside">
            <span className="page-pillar" aria-hidden="true" />
            <div className="sobre-photo" aria-hidden="true">
              <span>LR</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreMiPage;
