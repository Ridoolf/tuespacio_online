import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  deliverableHasLiveSite,
  projectHasLiveSite,
} from '@/config/projects';
import { motionEase, revealProps } from '../../config/motion';
import './ProjectShowcase.css';

function ViewportChrome() {
  return (
    <div className="viewport-frame-chrome" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function ProjectLink({ href, external, children, variant = 'primary' }) {
  return (
    <a
      href={href}
      className={cn('project-showcase-link', `project-showcase-link--${variant}`)}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
      <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
    </a>
  );
}

function ProjectVisual({ project }) {
  const isLogo = project.thumbFit === 'contain';

  return (
    <div className="project-showcase-visual viewport-frame">
      <ViewportChrome />
      <div className="viewport-frame-body project-showcase-visual-body">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            className={cn(
              'project-showcase-image',
              isLogo && 'project-showcase-image--contain',
            )}
            loading="lazy"
          />
        ) : (
          <div className="project-showcase-fallback">{project.initials}</div>
        )}
      </div>
    </div>
  );
}

function DeliverableToggles({ deliverables }) {
  const [activeId, setActiveId] = useState(null);
  const active = deliverables.find((item) => item.id === activeId);

  return (
    <div className="project-showcase-deliverable-toggles">
      <div className="project-showcase-deliverable-buttons" role="group" aria-label="Entregables del proyecto">
        {deliverables.map((deliverable) => {
          const isActive = activeId === deliverable.id;

          return (
            <button
              key={deliverable.id}
              type="button"
              className={cn(
                'project-showcase-deliverable-btn',
                isActive && 'project-showcase-deliverable-btn--active',
              )}
              onClick={() => setActiveId(isActive ? null : deliverable.id)}
              aria-expanded={isActive}
              aria-controls={`deliverable-panel-${deliverable.id}`}
            >
              {deliverable.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key={active.id}
            id={`deliverable-panel-${active.id}`}
            className="project-showcase-deliverable-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: motionEase }}
          >
            <p className="project-showcase-text">{active.description}</p>
            {active.problem && (
              <p className="project-showcase-text project-showcase-text--muted">
                <strong className="project-showcase-inline-label">El problema:</strong>{' '}
                {active.problem}
              </p>
            )}
            <div className="project-showcase-links">
              {deliverableHasLiveSite(active) && (
                <ProjectLink href={active.url} external>
                  Visitar sitio
                </ProjectLink>
              )}
              {active.privateDemo && (
                <span className="project-showcase-note">Sistema privado del cliente</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectDetails({ project, panelId }) {
  return (
    <div id={panelId} className="project-showcase-details">
      <div className="project-showcase-block">
        <p className="project-showcase-text">
          <strong className="project-showcase-inline-label">El problema.</strong>{' '}
          {project.problem}
        </p>
        <p className="project-showcase-text project-showcase-text--follow">
          {project.description}
        </p>
      </div>

      {project.deliverables ? (
        <DeliverableToggles deliverables={project.deliverables} />
      ) : (
        projectHasLiveSite(project) && (
          <div className="project-showcase-links">
            <ProjectLink href={project.url} external>
              Visitar sitio
            </ProjectLink>
          </div>
        )
      )}
    </div>
  );
}

function ProjectShowcaseRow({ project, index, motionVariant }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isReverse = index % 2 === 1;
  const motionProps = motionVariant ?? revealProps(index * 0.06);
  const detailsId = `project-details-${project.id}`;

  return (
    <motion.article
      className={cn(
        'project-showcase-row',
        isReverse && 'project-showcase-row--reverse',
        mobileOpen && 'project-showcase-row--open',
      )}
      {...motionProps}
    >
      <div className="project-showcase-panel">
        <div className="project-showcase-head">
          <p className="project-showcase-eyebrow">
            <span className="project-showcase-eyebrow-line" aria-hidden="true" />
            {project.type} · {project.year}
          </p>
          <h2 className="section-title project-showcase-title">{project.title}</h2>
        </div>

        <button
          type="button"
          className="project-showcase-mobile-toggle"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls={detailsId}
        >
          {mobileOpen ? 'Ver menos' : 'Ver más'}
          <ChevronDown
            size={16}
            strokeWidth={2.25}
            className={cn('project-showcase-mobile-toggle-icon', mobileOpen && 'is-open')}
            aria-hidden="true"
          />
        </button>

        <div className="project-showcase-details-desktop">
          <ProjectDetails project={project} panelId={`${detailsId}-desktop`} />
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              key="mobile-details"
              className="project-showcase-details-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: motionEase }}
            >
              <ProjectDetails project={project} panelId={detailsId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="project-showcase-media">
        <ProjectVisual project={project} />
      </div>
    </motion.article>
  );
}

const extraRowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: motionEase },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.3, ease: motionEase },
  },
};

function ProjectShowcase({ projects, initialCount = 3, expanded }) {
  const featured = projects.slice(0, initialCount);
  const extra = projects.slice(initialCount);

  return (
    <div className="project-showcase">
      {featured.map((project, index) => (
        <ProjectShowcaseRow key={project.id} project={project} index={index} />
      ))}

      {extra.length > 0 && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="project-showcase-extra"
              className="project-showcase-extra"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
                exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              {extra.map((project, offset) => (
                <ProjectShowcaseRow
                  key={project.id}
                  project={project}
                  index={initialCount + offset}
                  motionVariant={extraRowVariants}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default ProjectShowcase;
