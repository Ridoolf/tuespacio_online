import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/scrollToSection';

function SectionLink({ sectionId, className, children, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    onNavigate?.();

    if (location.pathname === '/') {
      scrollToSection(sectionId);
      window.history.replaceState(null, '', `#${sectionId}`);
      return;
    }

    navigate('/', { state: { scrollTo: sectionId } });
  }

  return (
    <a
      href={`/#${sectionId}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

export default SectionLink;
