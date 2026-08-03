import ProjectTimeline from '../components/ui/ProjectTimeline';
import SectionHeader from '../components/ui/SectionHeader';
import FaqAccordion from '../components/ui/FaqAccordion';
import Button from '../components/ui/Button';
import { projects } from '../config/projects';
import { proyectosFaq } from '../config/proyectosFaq';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';

function ProyectosPage() {
  usePageMeta({
    title: buildPageTitle('Proyectos'),
    description:
      'Proyectos reales con enfoque problema-solución. Recorré la línea de tiempo y abrí cada proyecto para ver el detalle.',
    path: '/proyectos',
  });

  return (
    <main>
      <section id="portfolio" aria-labelledby="proyectos-title">
        <h1 id="proyectos-title">Proyectos recientes</h1>
        <p>
          Recorré la línea de tiempo y tocá un proyecto para ver el sitio o entender cómo lo
          encaré.
        </p>
        <ProjectTimeline projects={projects} />
      </section>

      <section aria-labelledby="proyectos-faq-title">
        <SectionHeader
          title="Preguntas frecuentes"
          description="Lo que suelen preguntarme sobre el portfolio."
          titleId="proyectos-faq-title"
        />
        <FaqAccordion items={proyectosFaq} />
        <Button to="/contacto" variant="primary">
          Escribime
        </Button>
      </section>
    </main>
  );
}

export default ProyectosPage;
