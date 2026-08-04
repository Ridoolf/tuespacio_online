import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectShowcase from '../components/ui/ProjectShowcase';
import SectionHeader from '../components/ui/SectionHeader';
import FaqAccordion from '../components/ui/FaqAccordion';
import Button from '../components/ui/Button';
import { projects, PROJECTS_INITIAL_COUNT } from '../config/projects';
import { proyectosFaq } from '../config/proyectosFaq';
import { fadeIn, revealProps } from '../config/motion';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';
import './ProyectosPage.css';

function ProyectosPage() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = projects.length > PROJECTS_INITIAL_COUNT;

  usePageMeta({
    title: buildPageTitle('Proyectos'),
    description:
      'Proyectos reales con enfoque problema-solución. Casos de webs y software a medida para negocios locales.',
    path: '/proyectos',
  });

  return (
    <div className="page page-canvas proyectos-page">
      <section id="portfolio" className="proyectos-intro" aria-labelledby="proyectos-title">
        <div className="container proyectos-intro-inner">
          <div className="proyectos-intro-head">
            <span className="page-pillar proyectos-intro-pillar" aria-hidden="true" />
            <motion.div className="proyectos-intro-copy" {...fadeIn}>
              <h1 id="proyectos-title" className="display-title">
                Proyectos <span className="accent">recientes</span>
              </h1>
              <p className="page-open-desc">
                Casos reales: qué necesitaba cada cliente, qué armé y cómo se ve hoy online.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="proyectos-showcase" aria-label="Listado de proyectos">
        <div className="container proyectos-showcase-inner">
          <ProjectShowcase
            projects={projects}
            initialCount={PROJECTS_INITIAL_COUNT}
            expanded={expanded}
          />

          {hasMore && (
            <div className="proyectos-toggle-wrap">
              <Button
                type="button"
                variant="outline"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
              >
                {expanded ? 'Ver menos' : 'Ver todos los proyectos'}
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="page-band servicios-faq proyectos-faq" aria-labelledby="proyectos-faq-title">
        <div className="container">
          <SectionHeader
            title="Preguntas frecuentes"
            description="Lo que suelen preguntarme sobre el portfolio."
            titleId="proyectos-faq-title"
          />
          <FaqAccordion items={proyectosFaq} />
          <motion.div className="servicios-faq-cta proyectos-faq-cta" {...revealProps(0.12)}>
            <Button to="/contacto" variant="primary" className="btn--hover-black">
              Escribime
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ProyectosPage;
