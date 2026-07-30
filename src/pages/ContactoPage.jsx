import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ui/ContactForm';
import Button from '../components/ui/Button';
import { buildContactWhatsAppLink } from '../utils/whatsapp';
import { fadeIn } from '../config/motion';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';
import './ContactoPage.css';

function ContactoPage() {
  usePageMeta({ title: buildPageTitle('Contacto'), path: '/contacto' });
  const whatsappLink = buildContactWhatsAppLink();

  return (
    <div className="page page-canvas contacto-page">
      <section className="page-open contacto-open" aria-labelledby="contacto-title">
        <div className="container contacto-grid">
          <motion.div className="contacto-info" {...fadeIn}>
            <p className="page-kicker">Contacto</p>
            <h1 id="contacto-title" className="display-title">
              Escribime
            </h1>
            <p className="page-open-desc">
              Contame qué necesitás y coordinamos una llamada sin compromiso. Respondo por WhatsApp.
            </p>
            <div className="contacto-perks">
              <p>
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                Respuesta en el día
              </p>
              <p>
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                Sin compromiso ni presión
              </p>
            </div>
            <Button
              href={whatsappLink}
              external
              variant="outline"
              className="contacto-wa"
              iconRight={ArrowUpRight}
            >
              Abrir WhatsApp directo
            </Button>
          </motion.div>

          <motion.div
            className="contacto-form-wrap surface-card"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactoPage;
