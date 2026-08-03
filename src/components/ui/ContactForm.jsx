import { useState } from 'react';
import { Send } from 'lucide-react';
import { buildFormWhatsAppLink } from '../../utils/whatsapp';
import Button from './Button';

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Completá tu nombre y mensaje.');
      return;
    }
    setError('');
    window.open(buildFormWhatsAppLink(name.trim(), message.trim(), phone.trim()), '_blank');
  }

  return (
    <form className="contact-form surface-card" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-field">
        <label htmlFor="contact-name">Nombre</label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          autoComplete="name"
        />
      </div>
      <div className="contact-form-field">
        <label htmlFor="contact-phone">Teléfono (opcional)</label>
        <input
          id="contact-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+54 9 ..."
          autoComplete="tel"
        />
      </div>
      <div className="contact-form-field">
        <label htmlFor="contact-message">Mensaje</label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Contame qué necesitás para tu web..."
        />
      </div>
      {error && <p className="contact-form-error" role="alert">{error}</p>}
      <Button type="submit" variant="primary" className="btn--full" icon={Send}>
        Enviar por WhatsApp
      </Button>
    </form>
  );
}

export default ContactForm;
