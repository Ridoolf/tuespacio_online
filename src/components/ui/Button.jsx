import { Link } from 'react-router-dom';
import './Button.css';

const ICON_SIZE = 17;

function Button({
  children,
  variant = 'primary',
  href,
  to,
  external = false,
  className = '',
  icon: Icon,
  iconRight: IconRight,
  ...props
}) {
  const classes = `btn btn--${variant} ${className}`.trim();

  const content = (
    <>
      {Icon && <Icon size={ICON_SIZE} strokeWidth={2.25} aria-hidden="true" />}
      {children}
      {IconRight && <IconRight size={ICON_SIZE} strokeWidth={2.25} aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = props;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

export default Button;
