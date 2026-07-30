import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../config/projects';
import HeroLaptopCallout from './HeroLaptopCallout';

const ROTATE_MS = 5000;
const slideEase = [0.16, 1, 0.3, 1];

function preloadProjectImage(project, onLoad, onError) {
  if (!project.image) return undefined;

  const img = new Image();
  img.onload = () => onLoad(project.id);
  img.onerror = () => onError(project.id);
  img.src = project.image;

  return img;
}

function HeroLaptopShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const [failedImages, setFailedImages] = useState(() => new Set());
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const priorityProjectId = useMemo(
    () => projects.find((item) => item.image)?.id ?? null,
    [],
  );

  const project = projects[activeIndex];
  const canRotate = !reducedMotion && !paused && projects.length > 1;

  const markLoaded = useCallback((projectId) => {
    setLoadedImages((prev) => {
      if (prev.has(projectId)) return prev;
      const next = new Set(prev);
      next.add(projectId);
      return next;
    });
  }, []);

  const handleImageError = useCallback((projectId) => {
    setFailedImages((prev) => {
      if (prev.has(projectId)) return prev;
      const next = new Set(prev);
      next.add(projectId);
      return next;
    });
  }, []);

  useEffect(() => {
    projects.forEach((item) => {
      if (!item.image) return;
      preloadProjectImage(item, markLoaded, handleImageError);
    });
  }, [handleImageError, markLoaded]);

  useEffect(() => {
    if (!canRotate) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [canRotate]);

  useEffect(() => {
    const nextProject = projects[(activeIndex + 1) % projects.length];
    if (
      !nextProject?.image
      || loadedImages.has(nextProject.id)
      || failedImages.has(nextProject.id)
    ) {
      return;
    }

    preloadProjectImage(nextProject, markLoaded, handleImageError);
  }, [activeIndex, failedImages, handleImageError, loadedImages, markLoaded]);

  const showFallback = !project.image || failedImages.has(project.id);
  const isImageReady = loadedImages.has(project.id);
  const showSkeleton = Boolean(project.image) && !showFallback && !isImageReady;
  const showImage = Boolean(project.image) && !showFallback;
  const slideReady = showFallback || isImageReady;

  return (
    <div className="home-laptop-unit">
      <div
        className="home-laptop"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="home-laptop-screen">
          <div className="home-laptop-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="home-laptop-viewport" aria-label={`Proyecto: ${project.title}`}>
            <AnimatePresence mode="wait">
              <motion.a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="home-laptop-slide"
                aria-label={`Visitar página: ${project.title}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: slideReady ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: slideEase }}
              >
                {showSkeleton && (
                  <span className="home-laptop-slide-skeleton" aria-hidden="true" />
                )}

                {showImage && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`home-laptop-slide-image${isImageReady ? ' home-laptop-slide-image--visible' : ''}`}
                    decoding="async"
                    fetchPriority={project.id === priorityProjectId ? 'high' : 'auto'}
                    onLoad={() => markLoaded(project.id)}
                    onError={() => handleImageError(project.id)}
                  />
                )}

                {showFallback && (
                  <span className="home-laptop-fallback">{project.initials}</span>
                )}

                <span className="home-laptop-slide-overlay" aria-hidden="true">
                  visitar página
                </span>
              </motion.a>
            </AnimatePresence>

            {!reducedMotion && projects.length > 1 && (
              <div className="home-laptop-dots" role="tablist" aria-label="Proyectos en pantalla">
                {projects.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    className={`home-laptop-dot${index === activeIndex ? ' home-laptop-dot--active' : ''}`}
                    aria-selected={index === activeIndex}
                    aria-label={item.title}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="home-laptop-base" aria-hidden="true" />
      </div>
      <HeroLaptopCallout />
    </div>
  );
}

export default HeroLaptopShowcase;
