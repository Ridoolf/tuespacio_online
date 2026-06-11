import './Features.css';

const features = [
  {
    number: '1',
    title: 'Claridad',
    description: 'Tu cliente entiende qué vendés sin tener que escribirte.',
  },
  {
    number: '2',
    title: 'Contacto directo',
    description: 'WhatsApp, Instagram o formulario integrado en tu web.',
  },
  {
    number: '3',
    title: 'Lista para usar',
    description: 'Responsive, rápida y lista para compartir desde el día uno.',
  },
];

function Features() {
  return (
    <section className="features">
      <div className="container">
        <header className="section-header" id="servicios">
          <h2 className="section-title">Qué incluye tu web</h2>
          <p className="section-subtitle">
            Cada proyecto se entrega con lo necesario para que tu negocio se entienda online.
          </p>
        </header>

        <ul className="features-grid">
          {features.map((feature) => (
            <li key={feature.number} className="features-card">
              <span className="features-card-index">{feature.number}</span>
              <div className="features-card-body">
                <h3 className="features-title">{feature.title}</h3>
                <p className="features-description">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
