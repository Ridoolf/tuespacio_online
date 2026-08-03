import { motion } from 'framer-motion';
import { revealProps } from '../../config/motion';
import './SectionHeader.css';

function SectionHeader({ title, description, align = 'left', eyebrow, index, titleId }) {
  return (
    <motion.header
      className={`section-header section-header--${align}`}
      {...revealProps()}
    >
      {(eyebrow || index) && (
        <div className="section-header-meta">
          {index && <span className="section-header-index">{index}</span>}
          {eyebrow && <span className="section-header-eyebrow">{eyebrow}</span>}
        </div>
      )}
      {title && (
        <h2 id={titleId} className="section-title section-header-title">
          {title}
        </h2>
      )}
      {description && <p className="section-header-desc">{description}</p>}
    </motion.header>
  );
}

export default SectionHeader;
