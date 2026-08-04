import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectDetailModal from './ProjectDetailModal';
import { motionEase, revealViewport, staggerContainer } from '../../config/motion';
import { cn } from '@/lib/utils';
import './ProjectTimeline.css';

const TIMELINE_ORDER = [
  'ron',
  'fannyruth',
  'fr-consultorio',
  'fumigaciones-paz',
  'med-mistica',
  'aberturas-luxor',
];

const MOBILE_BREAKPOINT = 768;

const timelineStaggerItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: motionEase },
  },
};

function orderProjectsForTimeline(projects) {
  const byId = new Map(projects.map((project) => [project.id, project]));
  return TIMELINE_ORDER.map((id) => byId.get(id)).filter(Boolean);
}

function TimelineThumb({ project }) {
  const isLogoThumb = project.thumbFit === 'contain';

  return (
    <span
      className={cn('project-timeline-thumb', isLogoThumb && 'project-timeline-thumb--contain')}
      aria-hidden="true"
    >
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className={cn(
            'project-timeline-thumb-image',
            isLogoThumb && 'project-timeline-thumb-image--contain',
          )}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.hidden = true;
            event.currentTarget.nextElementSibling?.classList.add(
              'project-timeline-thumb-fallback--visible',
            );
          }}
        />
      ) : null}
      <span
        className={`project-timeline-thumb-fallback ${project.image ? '' : 'project-timeline-thumb-fallback--visible'}`}
      >
        {project.initials}
      </span>
    </span>
  );
}

function ProjectTimeline({ projects }) {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [lineInView, setLineInView] = useState(false);
  const [lineReady, setLineReady] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const lineRef = useRef(null);
  const timelineProjects = useMemo(() => orderProjectsForTimeline(projects), [projects]);
  const activeProject = timelineProjects.find((p) => p.id === activeProjectId) ?? null;

  const updateLayout = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!container || !track || !line) return;

    const markers = track.querySelectorAll('.project-timeline-marker');
    if (markers.length === 0) return;

    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
    const needsScroll = !isMobile && track.scrollWidth > container.clientWidth + 1;
    track.classList.toggle('project-timeline-track--scrollable', needsScroll);

    const trackRect = track.getBoundingClientRect();
    const first = markers[0].getBoundingClientRect();
    const last = markers[markers.length - 1].getBoundingClientRect();

    if (isMobile) {
      const lineLeft = first.left + first.width / 2 - trackRect.left;
      line.style.top = `${first.top + first.height / 2 - trackRect.top}px`;
      line.style.bottom = `${trackRect.bottom - (last.top + last.height / 2)}px`;
      line.style.left = `${lineLeft}px`;
      line.style.right = 'auto';
      line.style.width = '3px';
      line.style.height = 'auto';
      line.style.transform = 'translateX(-50%)';
    } else {
      line.style.top = `${first.top + first.height / 2 - trackRect.top}px`;
      line.style.left = `${first.left + first.width / 2 - trackRect.left}px`;
      line.style.right = `${trackRect.right - (last.left + last.width / 2)}px`;
      line.style.bottom = 'auto';
      line.style.width = 'auto';
      line.style.height = '3px';
      line.style.transform = 'translateY(-50%)';
    }

    setLineReady(true);
  }, []);

  useEffect(() => {
    setLineReady(false);
  }, [timelineProjects]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return undefined;

    updateLayout();

    const observer = new ResizeObserver(() => {
      updateLayout();
    });

    observer.observe(container);
    observer.observe(track);

    window.addEventListener('resize', updateLayout);

    if (document.fonts?.ready) {
      document.fonts.ready.then(updateLayout);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateLayout);
    };
  }, [timelineProjects, updateLayout]);

  useLayoutEffect(() => {
    if (!lineInView) return undefined;

    updateLayout();
    return undefined;
  }, [lineInView, updateLayout]);

  const openProject = (projectId) => {
    setActiveProjectId(projectId);
  };

  const closeProject = () => {
    setActiveProjectId(null);
  };

  return (
    <div
      ref={containerRef}
      className="project-timeline"
      aria-label="Línea de tiempo de proyectos"
    >
      <motion.ol
        ref={trackRef}
        className={`project-timeline-track ${lineInView ? 'project-timeline-track--inview' : ''} ${lineReady ? 'project-timeline-line-ready' : ''}`}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        onViewportEnter={() => setLineInView(true)}
        onAnimationComplete={updateLayout}
      >
        <div
          ref={lineRef}
          className={`project-timeline-line ${lineReady ? 'project-timeline-line--ready' : ''}`}
          aria-hidden="true"
        >
          <span className="project-timeline-line-fill" />
        </div>

        {timelineProjects.map((project) => (
          <motion.li key={project.id} className="project-timeline-item" variants={timelineStaggerItem}>
            <button
              type="button"
              className="project-timeline-point"
              aria-label={`Ver detalle de ${project.title}`}
              aria-haspopup="dialog"
              onClick={() => openProject(project.id)}
            >
              <span className="project-timeline-year">{project.year}</span>
              <TimelineThumb project={project} />
              <div className="project-timeline-axis">
                <span className="project-timeline-marker" aria-hidden="true">
                  <span className="project-timeline-dot" />
                </span>
              </div>
              <span className="project-timeline-label">
                <span className="project-timeline-name">{project.title}</span>
                <span className="project-timeline-tagline">{project.tagline}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ol>

      <ProjectDetailModal project={activeProject} isOpen={Boolean(activeProject)} onClose={closeProject} />
    </div>
  );
}

export default ProjectTimeline;
