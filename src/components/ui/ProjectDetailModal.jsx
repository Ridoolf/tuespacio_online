import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import ProjectCaseStudyContent from './ProjectCaseStudyContent';
import Button from './Button';
import { motionEase } from '../../config/motion';
import { lockPageScroll } from '../../utils/scrollToSection';

function ProjectDetailModal({ project, isOpen, onClose }) {
  const modalId = useId();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const unlockScroll = lockPageScroll();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.focus();

    return () => {
      unlockScroll();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="project-detail-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: motionEase }}
        >
          <button
            type="button"
            className="project-detail-modal-backdrop"
            aria-label="Cerrar detalle del proyecto"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            className="project-detail-modal-panel surface-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${modalId}-title`}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            <button
              type="button"
              className="project-detail-modal-close"
              aria-label="Cerrar"
              onClick={onClose}
            >
              <X size={20} strokeWidth={2.25} />
            </button>
            <div className="project-detail-modal-grid">
              <div className="project-detail-modal-visual viewport-frame">
                <div className="viewport-frame-chrome" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="viewport-frame-body project-detail-modal-image-wrap">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Captura de ${project.title}`}
                      className="project-detail-modal-image"
                    />
                  ) : (
                    <div className="project-detail-modal-fallback">{project.initials}</div>
                  )}
                </div>
              </div>
              <div className="project-detail-modal-content">
                <ProjectCaseStudyContent
                  project={project}
                  compact
                  titleId={`${modalId}-title`}
                />
                <div className="project-detail-modal-actions">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button href={project.url} external variant="primary" iconRight={ArrowUpRight}>
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
  );

  return createPortal(modalContent, document.body);
}

export default ProjectDetailModal;
