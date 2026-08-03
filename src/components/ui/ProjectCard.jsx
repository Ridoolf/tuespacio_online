import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { revealProps } from '../../config/motion';
import { scrollToSection } from '../../utils/scrollToSection';

function ViewportChrome() {
  return (
    <div className="viewport-frame-chrome" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function ProjectCard({ project, index = 0, featured = false, variant = 'default' }) {
  const isIntro = variant === 'intro';
  const isFeatured = featured || project.featured;
  const caseSectionId = `proyecto-${project.id}`;

  const handleCaseClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    scrollToSection(caseSectionId);
  };

  const cardClasses = [
    'project-card',
    'surface-card',
    isFeatured ? 'project-card--featured' : '',
    isIntro ? 'project-card--intro' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const imageBlock = (
    <div className="project-card-viewport viewport-frame">
      <ViewportChrome />
      <div className="viewport-frame-body project-card-image-wrap">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-card-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.add('project-card-fallback--visible');
            }}
          />
        ) : null}
        <div
          className={`project-card-fallback ${project.image ? '' : 'project-card-fallback--visible'}`}
        >
          {project.initials}
        </div>
        {!isIntro && (
          <span className="project-card-overlay" aria-hidden="true">
            <ArrowUpRight size={22} strokeWidth={2} />
          </span>
        )}
      </div>
    </div>
  );

  if (isIntro) {
    return (
      <motion.article className={cardClasses} {...revealProps(index * 0.08)}>
        {imageBlock}
        <div className="project-card-body">
          <div className="project-card-meta">
            <h3 className="project-card-title">{project.title}</h3>
            <span className="project-card-year">{project.year}</span>
          </div>
          <p className="project-card-desc">{project.tagline || project.description}</p>
          <div className="project-card-actions">
            <button type="button" className="project-card-case-btn" onClick={handleCaseClick}>
              Ver caso
            </button>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-cta"
            >
              Ver sitio
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article className={cardClasses} {...revealProps(index * 0.08)}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card-link"
      >
        {imageBlock}
        <div className="project-card-body">
          <div className="project-card-meta">
            <h3 className="project-card-title">{project.title}</h3>
            <span className="project-card-year">{project.year}</span>
          </div>
          <p className="project-card-desc">{project.description}</p>
          <span className="project-card-cta">
            Ver proyecto
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </span>
        </div>
      </a>
    </motion.article>
  );
}

export default ProjectCard;
