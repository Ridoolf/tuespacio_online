import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectCaseStudyContent from './ProjectCaseStudyContent';
import Button from './Button';
import { revealProps } from '../../config/motion';

function ProjectCaseStudy({ project, alternate = false }) {
  const sectionId = `proyecto-${project.id}`;

  return (
    <section
      id={sectionId}
      className={`page-band ${alternate ? 'page-band--alt' : ''} project-case-study`}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="container">
        <motion.div className="project-case-study-inner" {...revealProps()}>
          <div className="project-case-study-content">
            <ProjectCaseStudyContent project={project} titleId={`${sectionId}-title`} />
            <div className="project-case-study-actions">
              <Button href={project.url} external variant="primary" iconRight={ArrowUpRight}>
                Ver sitio en vivo
              </Button>
              <Button to="/servicios" variant="outline">
                Ver servicios
              </Button>
            </div>
          </div>

          <div className="project-case-study-visual viewport-frame">
            <div className="viewport-frame-chrome" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="viewport-frame-body project-case-study-image-wrap">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`Captura de ${project.title}`}
                  className="project-case-study-image"
                  loading="lazy"
                />
              ) : (
                <div className="project-case-study-fallback">{project.initials}</div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectCaseStudy;
