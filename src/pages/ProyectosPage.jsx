import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../config/projects';
import { fadeIn } from '../config/motion';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';
import './ProyectosPage.css';

function ProyectosPage() {
  usePageMeta({ title: buildPageTitle('Proyectos'), path: '/proyectos' });
  const [featured, ...rest] = projects;

  return (
    <div className="page page-canvas proyectos-page">
      <section className="page-open proyectos-open" aria-labelledby="proyectos-title">
        <div className="container">
          <motion.div className="page-open-copy" {...fadeIn}>
            <p className="page-kicker">Portfolio</p>
            <h1 id="proyectos-title" className="display-title">
              Proyectos <span className="accent">recientes</span>
            </h1>
            <p className="page-open-desc">
              Sitios reales para clientes reales. Cada uno pensado para convertir visitas en
              contactos.
            </p>
          </motion.div>

          {featured && (
            <motion.div className="proyectos-featured" {...fadeIn} transition={{ delay: 0.12 }}>
              <ProjectCard project={featured} featured />
            </motion.div>
          )}
        </div>
      </section>

      {rest.length > 0 && (
        <section className="page-band">
          <div className="container">
            <div className="proyectos-grid">
              {rest.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProyectosPage;
