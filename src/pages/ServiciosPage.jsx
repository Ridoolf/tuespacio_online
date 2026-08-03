import { CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import FeatureList from '../components/ui/FeatureList';
import PricingCard from '../components/ui/PricingCard';
import FaqAccordion from '../components/ui/FaqAccordion';
import Button from '../components/ui/Button';
import { plans, supportPlan } from '../config/pricing';
import { serviciosFaq } from '../config/serviciosFaq';
import { fadeIn, revealProps, staggerContainer, staggerItem } from '../config/motion';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';
import './ServiciosPage.css';

function ServiciosPage() {
  usePageMeta({
    title: buildPageTitle('Servicios'),
    description:
      'Diseño web con precio visible. Sitio en una página, multipágina o a medida. Incluye WhatsApp, formulario y plan de acompañamiento post-lanzamiento.',
    path: '/servicios',
  });

  return (
    <div className="page page-canvas servicios-page">
      <section
        id="planes"
        className="servicios-intro"
        aria-labelledby="servicios-title"
      >
        <div className="container servicios-intro-inner">
          <div className="servicios-intro-head">
            <span className="page-pillar servicios-intro-pillar" aria-hidden="true" />
            <motion.div className="servicios-intro-copy" {...fadeIn}>
              <p className="page-kicker">Servicios</p>
              <h1 id="servicios-title" className="display-title">
                Nuestros <span className="accent">servicios</span>
              </h1>
              <p className="page-open-desc">
                Tres formas de tener tu web online, con precio visible. Elegís, charlamos y
                arrancamos — sin vueltas.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="servicios-plans-grid"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan) => (
              <motion.div key={plan.id} variants={staggerItem}>
                <PricingCard plan={plan} variant="intro" supportSectionId="plan-acompanamiento" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="plan-acompanamiento"
        className="page-band page-band--alt servicios-support"
        aria-labelledby="plan-acompanamiento-title"
      >
        <div className="container">
          <motion.div className="servicios-support-inner" {...revealProps()}>
            <SectionHeader
              title={supportPlan.title}
              description={supportPlan.summary}
              titleId="plan-acompanamiento-title"
            />
            <FeatureList items={supportPlan.includes} className="servicios-support-list" />
            <p className="servicios-support-note">{supportPlan.referral}</p>
            <p className="servicios-support-note">{supportPlan.after}</p>
            <p className="servicios-support-duration">
              <CalendarClock size={18} strokeWidth={2} aria-hidden="true" />
              {supportPlan.duration} en total — 1 mes bonificado + 5 pagos mensuales
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-band servicios-faq">
        <div className="container">
          <SectionHeader
            title="Preguntas frecuentes"
            description="Lo que suelen preguntarme antes de arrancar."
          />
          <FaqAccordion items={serviciosFaq} />
          <motion.div className="servicios-faq-cta" {...revealProps(0.12)}>
            <Button to="/contacto" variant="primary">
              Escribime
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ServiciosPage;
