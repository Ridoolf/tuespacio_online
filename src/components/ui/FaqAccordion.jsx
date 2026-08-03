import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqStaggerContainer, faqStaggerItem, revealViewport } from '../../config/motion';
import './FaqAccordion.css';

function FaqItem({ item, isOpen, onToggle }) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <motion.div
      className={`faq-item surface-card ${isOpen ? 'faq-item--open' : ''}`}
      variants={faqStaggerItem}
    >
      <h3 className="faq-item-heading">
        <button
          id={buttonId}
          type="button"
          className="faq-item-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq-item-question">{item.question}</span>
          <span className="faq-item-icon-wrap" aria-hidden="true">
            <ChevronDown size={18} strokeWidth={2.5} className="faq-item-icon" />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="faq-item-panel"
      >
        <div className="faq-item-panel-inner">
          <div className="faq-item-panel-content">
            {item.steps ? (
              <ol className="faq-steps">
                {item.steps.map((step, index) => (
                  <li key={step.title} className="faq-step">
                    <span className="faq-step-num">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="faq-step-title">{step.title}</p>
                      <p className="faq-step-desc">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="faq-item-answer">{item.answer}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FaqAccordion({ items, className = '' }) {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <motion.div
      className={`faq-accordion ${className}`.trim()}
      variants={faqStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {items.map((item) => (
        <FaqItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </motion.div>
  );
}

export default FaqAccordion;
