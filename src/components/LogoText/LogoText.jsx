import './LogoText.css';

function LogoText({ variant = 'default', inline = false }) {
  const classNames = [
    'logo-text',
    variant !== 'default' ? `logo-text--${variant}` : '',
    inline ? 'logo-text--inline' : '',
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames} aria-label="Tu Espacio Online">
      <span className="logo-text-line logo-text-line--bold">tu espacio</span>
      <span className="logo-text-line">online</span>
    </span>
  );
}

export default LogoText;
