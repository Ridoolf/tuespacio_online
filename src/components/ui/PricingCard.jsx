import { Check } from 'lucide-react';
import { formatPrice, buildPlanWhatsAppLink } from '../../utils/whatsapp';
import Button from './Button';
import './PricingCard.css';

function PricingCard({ plan }) {
  const priceDisplay = plan.price !== null ? formatPrice(plan.price) : plan.priceLabel;
  const whatsappLink = buildPlanWhatsAppLink(plan.name, plan.price);

  return (
    <article className={`pricing-card surface-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
      {plan.featured && <span className="pricing-card-badge">Más elegido</span>}
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
      <p className="pricing-card-maintenance">
        Plan de acompañamiento: {formatPrice(plan.maintenance)}/mes
      </p>
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
