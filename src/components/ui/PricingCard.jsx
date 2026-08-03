import { Check, ChevronDown } from 'lucide-react';
import { formatPrice, buildPlanWhatsAppLink } from '../../utils/whatsapp';
import { scrollToSection } from '../../utils/scrollToSection';
import Button from './Button';
import './PricingCard.css';

function PricingCard({ plan, variant = 'default', supportSectionId }) {
  const isIntro = variant === 'intro';
  const priceDisplay = plan.price !== null ? formatPrice(plan.price) : plan.priceLabel;
  const whatsappLink = buildPlanWhatsAppLink(plan.name, plan.price);
  const maintenanceLabel = `Plan de acompañamiento: ${formatPrice(plan.maintenance)}/mes`;

  const handleSupportClick = (event) => {
    if (!supportSectionId) return;
    event.preventDefault();
    scrollToSection(supportSectionId);
  };

  return (
    <article
      className={`pricing-card surface-card ${plan.featured ? 'pricing-card--featured' : ''} ${isIntro ? 'pricing-card--intro' : ''}`.trim()}
    >
      <div className="pricing-card-header">
        <h3 className="pricing-card-name">{plan.name}</h3>
        <p className="pricing-card-price">{priceDisplay}</p>
      </div>
      <p className="pricing-card-desc">{plan.description}</p>
      <ul className="pricing-card-list">
        {plan.highlights.map((item) => (
          <li key={item}>
            <Check size={15} strokeWidth={2.5} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {supportSectionId ? (
        <a
          href={`#${supportSectionId}`}
          className="pricing-card-support-link"
          onClick={handleSupportClick}
        >
          <span className="pricing-card-support-link-text">
            <span className="pricing-card-support-link-label">Plan de acompañamiento</span>
            <span className="pricing-card-support-link-price">
              {formatPrice(plan.maintenance)}/mes
            </span>
          </span>
          <ChevronDown size={15} strokeWidth={2.5} aria-hidden="true" />
        </a>
      ) : (
        <p className="pricing-card-maintenance">{maintenanceLabel}</p>
      )}
      <Button
        href={whatsappLink}
        external
        variant={plan.featured ? 'primary' : 'outline'}
        className="btn--full"
      >
        Elegir este plan
      </Button>
    </article>
  );
}

export default PricingCard;
