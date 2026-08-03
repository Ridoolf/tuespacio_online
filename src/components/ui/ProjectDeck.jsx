import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProjectCaseStudyContent from './ProjectCaseStudyContent';
import Button from './Button';
import { motionEase } from '../../config/motion';

const STACK_OFFSETS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: -22, y: 10, rotate: -4, scale: 0.97, opacity: 0.88 },
  { x: 22, y: 20, rotate: 4, scale: 0.94, opacity: 0.85 },
];

function getStackOrder(activeIndex, total) {
  return Array.from({ length: total }, (_, i) => (activeIndex + i) % total);
}

function ProjectPreview({ project }) {
  return (
    <div className="project-deck-card-preview viewport-frame">
      <div className="viewport-frame-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="viewport-frame-body project-deck-card-screenshot">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className="project-deck-card-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.add('project-deck-card-fallback--visible');
            }}
          />
        ) : null}
        <div
          className={`project-deck-card-fallback ${project.image ? '' : 'project-deck-card-fallback--visible'}`}
        >
          {project.initials}
        </div>
      </div>
    </div>
  );
}

function ProjectDeck({ projects }) {
  const deckId = useId();
  const expandedRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const total = projects.length;
  const activeProject = projects[activeIndex];
  const expandedProject = projects.find((p) => p.id === expandedProjectId);
  const isExpanded = Boolean(expandedProjectId);
  const stackOrder = getStackOrder(activeIndex, total);

  const goTo = useCallback(
    (index) => {
      if (isExpanded) return;
      setActiveIndex(index);
    },
    [isExpanded],
  );

  const goPrev = useCallback(() => {
    if (isExpanded) return;
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [isExpanded, total]);

  const goNext = useCallback(() => {
    if (isExpanded) return;
    setActiveIndex((current) => (current + 1) % total);
  }, [isExpanded, total]);

  const closeExpanded = useCallback(() => {
    setExpandedProjectId(null);
  }, []);

  const openExpanded = useCallback((projectId) => {
    setExpandedProjectId(projectId);
  }, []);

  useEffect(() => {
    if (!isExpanded) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeExpanded();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    expandedRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, closeExpanded]);

  const handleStackKeyDown = (event) => {
    if (isExpanded) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div className="project-deck" aria-label="Portfolio de proyectos">
      {!isExpanded && (
        <>
          <div
            className="project-deck-stack"
            role="group"
            aria-roledescription="Baraja de proyectos"
            aria-label={`Proyecto activo: ${activeProject.title}`}
            tabIndex={0}
            onKeyDown={handleStackKeyDown}
          >
            {stackOrder.map((projectIndex, stackPosition) => {
              const project = projects[projectIndex];
              const offset = STACK_OFFSETS[stackPosition] ?? STACK_OFFSETS[2];
              const isFront = stackPosition === 0;

              return (
                <motion.article
                  key={project.id}
                  className={`project-deck-card surface-card ${project.featured && isFront ? 'project-deck-card--featured' : ''} ${isFront ? 'project-deck-card--front' : 'project-deck-card--back'}`}
                  style={{ zIndex: total - stackPosition }}
                  initial={false}
                  animate={{
                    x: offset.x,
                    y: offset.y,
                    rotate: offset.rotate,
                    scale: offset.scale,
                    opacity: offset.opacity,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  onClick={() => {
                    if (!isFront) setActiveIndex(projectIndex);
                  }}
                  aria-hidden={!isFront}
                >
                  <ProjectPreview project={project} />
                  {isFront && (
                    <div className="project-deck-card-body">
                      <div className="project-deck-card-header">
                        <div className="project-deck-card-meta">
                          <p className="project-deck-card-type">{project.type}</p>
                          <h2 className="project-deck-card-title">{project.title}</h2>
                        </div>
                        <span className="project-deck-card-year">{project.year}</span>
                      </div>
                      <p className="project-deck-card-tagline">{project.tagline}</p>
                      <div className="project-deck-card-actions">
                        <Button
                          href={project.url}
                          external
                          variant="outline"
                          iconRight={ArrowUpRight}
                        >
                          Visitar sitio
                        </Button>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            openExpanded(project.id);
                          }}
                        >
                          Ver plan de acción
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>

          {total > 1 && (
            <div className="project-deck-controls">
              <button
                type="button"
                className="project-deck-nav-btn"
                onClick={goPrev}
                aria-label="Proyecto anterior"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <div className="project-deck-dots" role="tablist" aria-label="Seleccionar proyecto">
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    className={`project-deck-dot ${index === activeIndex ? 'project-deck-dot--active' : ''}`}
                    aria-selected={index === activeIndex}
                    aria-label={project.title}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="project-deck-nav-btn"
                onClick={goNext}
                aria-label="Proyecto siguiente"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {isExpanded && expandedProject && (
          <motion.div
            className="project-deck-expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: motionEase }}
          >
            <button
              type="button"
              className="project-deck-expanded-backdrop"
              aria-label="Cerrar plan de acción"
              onClick={closeExpanded}
            />
            <motion.div
              ref={expandedRef}
              className="project-deck-expanded-panel surface-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${deckId}-expanded-title`}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <button
                type="button"
                className="project-deck-expanded-close"
                aria-label="Volver a la baraja"
                onClick={closeExpanded}
              >
                <X size={20} strokeWidth={2.25} />
              </button>
              <div className="project-deck-expanded-grid">
                <div className="project-deck-expanded-visual viewport-frame">
                  <div className="viewport-frame-chrome" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="viewport-frame-body project-deck-expanded-image-wrap">
                    {expandedProject.image ? (
                      <img
                        src={expandedProject.image}
                        alt={`Captura de ${expandedProject.title}`}
                        className="project-deck-expanded-image"
                      />
                    ) : (
                      <div className="project-deck-card-fallback project-deck-card-fallback--visible">
                        {expandedProject.initials}
                      </div>
                    )}
                  </div>
                </div>
                <div className="project-deck-expanded-content">
                  <ProjectCaseStudyContent
                    project={expandedProject}
                    compact
                    titleId={`${deckId}-expanded-title`}
                  />
                  <div className="project-deck-expanded-actions">
                    <Button type="button" variant="outline" onClick={closeExpanded}>
                      Volver
                    </Button>
                    <Button
                      href={expandedProject.url}
                      external
                      variant="primary"
                      iconRight={ArrowUpRight}
                    >
                      Visitar sitio
                    </Button>
                    <Button to="/contacto" variant="ghost">
                      Me interesa algo así
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectDeck;
