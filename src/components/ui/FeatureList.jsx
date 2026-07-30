import { Check } from 'lucide-react';
import './FeatureList.css';

function FeatureList({ items, className = '' }) {
  return (
    <ul className={`feature-list ${className}`.trim()}>
      {items.map((item) => (
        <li key={item}>
          <Check size={16} strokeWidth={2.5} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default FeatureList;
