import Button from '../components/ui/Button';
import { buildContactWhatsAppLink } from '../utils/whatsapp';
import { buildPageTitle, usePageMeta } from '../hooks/usePageMeta';

function SobreMiPage() {
  usePageMeta({ title: buildPageTitle('Sobre mí'), path: '/sobre-mi' });
  const whatsappLink = buildContactWhatsAppLink();

  return (
    <main>
      <section aria-labelledby="sobre-title">
        <h1 id="sobre-title">Lucas Ridolfi</h1>
        <p>
          Desarrollador web freelance. Armo sitios claros, cercanos y pensados para que tu negocio
          se entienda online.
        </p>
        <p>
          Empecé en el mundo del desarrollo front-end y cada proyecto me enseña algo nuevo. Me
          gusta trabajar cerca del cliente: charlamos, definimos juntos y entrego una web que podés
          usar desde el día uno.
        </p>
        <p>
          Tu Espacio Online nació con una idea simple: webs con precio visible, entrega concreta y
          acompañamiento después de publicar — para que tu página no quede abandonada en Google.
        </p>
        <Button href={whatsappLink} external variant="primary">
          Escribime
        </Button>
      </section>
    </main>
  );
}

export default SobreMiPage;
