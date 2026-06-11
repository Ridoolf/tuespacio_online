import './Process.css';

const steps = [
  {
    number: '1',
    title: 'Charlamos',
    description: 'Entiendo tu negocio en una charla de 15 minutos por WhatsApp.',
  },
  {
    number: '2',
    title: 'Propuesta',
    description: 'Te confirmo el alcance y el precio final antes de arrancar.',
  },
  {
    number: '3',
    title: 'Desarrollo',
    description: 'Armo la web con el contenido que me pases (textos, fotos, logo).',
  },
  {
    number: '4',
    title: 'Entrega',
    description: 'Te la explico, hacemos ajustes y queda online.',
  },
];

function Process() {
  return (
    <section className="process">
      <div className="container">
        <header className="section-header" id="proceso">
          <h2 className="section-title">Cómo trabajo</h2>
          <p className="section-subtitle">
            Un proceso simple y transparente, de principio a fin.
          </p>
        </header>

        <ul className="process-timeline">
          {steps.map((step) => (
            <li key={step.number} className="process-step">
              <span className="process-marker" aria-hidden="true">{step.number}</span>
              <div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Process;
