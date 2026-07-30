import { CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import FeatureList from '../components/ui/FeatureList';
import PricingCard from '../components/ui/PricingCard';
import Button from '../components/ui/Button';
import { includedInAll, plans, supportPlan } from '../config/pricing';
import { fadeIn, revealProps, staggerContainer, staggerItem } from '../config/motion';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';
import './ServiciosPage.css';

const processSteps = [
  {
    number: '01',
    title: 'Charlamos',
    description: 'Entiendo tu negocio en una charla de 15 minutos por WhatsApp.',
  },
  {
    number: '02',
    title: 'Propuesta',
    description: 'Te confirmo el alcance y el precio final antes de arrancar.',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description: 'Armo la web con el contenido que me pases (textos, fotos, logo).',
  },
  {
    number: '04',
    title: 'Entrega',
    description: 'Te la explico, hacemos ajustes y queda online.',
  },
];

function ServiciosPage() {
  usePageMeta({
    title: buildPageTitle('Servicios'),
    description:
      'Servicios de diseño web con precios claros. Planes en una página, multipágina o a medida. Incluye formulario, WhatsApp, SEO base y plan de acompañamiento.',
    path: '/servicios',
  });

  return (
    <div className="page page-canvas servicios-page">
      <section className="page-open servicios-open" aria-labelledby="servicios-title">
        <div className="container page-open-inner">
          <motion.div className="page-open-copy" {...fadeIn}>
            <p className="page-kicker">Servicios</p>
            <h1 id="servicios-title" className="display-title">
              Precios <span className="accent">visibles</span>
            </h1>
            <p className="page-open-desc">
              Sabés cuánto cuesta antes de escribirme. Formulario incluido, entrega concreta y
              acompañamiento post-lanzamiento.
            </p>
          </motion.div>
          <span className="servicios-open-shape" aria-hidden="true" />
        </div>
      </section>

      <section className="page-band">
        <div className="container">
          <SectionHeader
            index="01"
            eyebrow="Incluido"
            title="Qué incluye tu web"
            description="Un solo enfoque: que tu negocio se entienda online y sea fácil contactarte."
          />
          <FeatureList items={includedInAll} className="servicios-included" />
        </div>
      </section>

      <section id="planes" className="page-band page-band--alt servicios-plans">
        <div className="container">
          <SectionHeader
            index="02"
            eyebrow="Planes"
            title="Precios claros"
            description="Elegí el plan que mejor se adapte a tu negocio. Todos incluyen WhatsApp, SEO base y diseño responsive."
          />

          <motion.div
            className="servicios-plans-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {plans.map((plan) => (
              <motion.div key={plan.id} variants={staggerItem}>
                <PricingCard plan={plan} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="page-band servicios-support">
        <div className="container">
          <div className="servicios-support-inner surface-card">
            <SectionHeader title={supportPlan.title} description={supportPlan.summary} />
            <FeatureList items={supportPlan.includes} className="servicios-support-list" />
            <p className="servicios-support-note">{supportPlan.referral}</p>
            <p className="servicios-support-note">{supportPlan.after}</p>
            <p className="servicios-support-duration">
              <CalendarClock size={18} strokeWidth={2} aria-hidden="true" />
              Duración total: {supportPlan.duration} (1 mes bonificado + 5 pagos)
            </p>
          </div>
        </div>
      </section>

      <section className="page-band page-band--alt servicios-process">
        <div className="container">
          <SectionHeader
            index="03"
            eyebrow="Proceso"
            title="Cómo trabajo"
            description="Simple y transparente, de principio a fin."
          />
          <ol className="servicios-steps">
            {processSteps.map((step, index) => (
              <motion.li
                key={step.number}
                className="servicios-step"
                {...revealProps(index * 0.08)}
              >
                <span className="servicios-step-num">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
          <motion.div {...revealProps(0.2)}>
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
