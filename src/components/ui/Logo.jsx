import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Tu Espacio Online">
      <span className="logo-text">tu espacio online</span>
      <span className="logo-dot" aria-hidden="true" />
    </Link>
  );
}

export default Logo;
