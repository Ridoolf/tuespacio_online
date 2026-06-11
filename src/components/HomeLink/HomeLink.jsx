import { Link, useLocation, useNavigate } from 'react-router-dom';

function HomeLink({ className, children, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick(event) {
    onNavigate?.();

    if (location.pathname !== '/') {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate({ pathname: '/', hash: '' }, { replace: true });
  }

  return (
    <Link to="/" className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default HomeLink;
