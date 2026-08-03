import FeatureList from './FeatureList';
function ProjectCaseStudyContent({ project, compact = false, titleId }) {
  return (
    <div className={`project-case-content ${compact ? 'project-case-content--compact' : ''}`}>
      <p className="project-case-content-eyebrow">
        {project.type} · {project.year}
      </p>
      <h3 id={titleId} className="project-case-content-title">
        {project.title}
      </h3>
      <div className="project-case-content-block">
        <h4 className="project-case-content-label">El problema</h4>
        <p className="project-case-content-text">{project.problem}</p>
      </div>
      <div className="project-case-content-block">
        <h4 className="project-case-content-label">Cómo lo encaré</h4>
        <p className="project-case-content-text">{project.approach}</p>
      </div>
      <div className="project-case-content-block">
        <h4 className="project-case-content-label">Qué quedó resuelto</h4>
        <FeatureList items={project.outcomes} className="project-case-content-list" />
      </div>
    </div>
  );
}

export default ProjectCaseStudyContent;
