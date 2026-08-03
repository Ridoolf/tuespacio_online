import ContactForm from '../components/ui/ContactForm';
import Button from '../components/ui/Button';
import { buildContactWhatsAppLink } from '../utils/whatsapp';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';

function ContactoPage() {
  usePageMeta({ title: buildPageTitle('Contacto'), path: '/contacto' });
  const whatsappLink = buildContactWhatsAppLink();

  return (
    <main>
      <section aria-labelledby="contacto-title">
        <h1 id="contacto-title">Escribime</h1>
        <p>
          Contame qué necesitás y coordinamos una llamada sin compromiso. Respondo por WhatsApp.
        </p>
        <ul>
          <li>Respuesta en el día</li>
          <li>Sin compromiso ni presión</li>
        </ul>
        <Button href={whatsappLink} external variant="outline">
          Abrir WhatsApp directo
        </Button>
        <ContactForm />
      </section>
    </main>
  );
}

export default ContactoPage;
