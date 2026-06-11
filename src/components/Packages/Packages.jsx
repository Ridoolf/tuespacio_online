import { packages } from '../../config/quoteConfig';
import { formatPrice, buildContactWhatsAppLink, buildPackageWhatsAppLink } from '../../utils/whatsapp';
import './Packages.css';

function Packages() {
  const contactLink = buildContactWhatsAppLink();

  return (
    <section className="packages">
      <div className="container">
        <header className="section-header" id="paquetes">
          <h2 className="section-title">Paquetes</h2>
          <p className="section-subtitle">
            Precios claros para que sepas cuánto cuesta antes de escribirme.
          </p>
        </header>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <article key={pkg.id} className={`package-card ${pkg.id === 'completo' ? 'package-card--highlight' : ''}`}>
              <div className="package-card-top">
                <h3 className="package-card-name">{pkg.name}</h3>
                {pkg.price !== null ? (
                  <span className="package-card-amount">{formatPrice(pkg.price)}</span>
                ) : (
                  <span className="package-card-custom">Consultar</span>
                )}
              </div>

              <p className="package-card-description">{pkg.description}</p>

              <ul className="package-card-features">
                {pkg.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <div className="package-card-footer">
                {pkg.id === 'medida' ? (
                  <a href={contactLink} target="_blank" rel="noopener noreferrer" className="button-secondary package-card-button">
                    Escribime por WhatsApp
                  </a>
                ) : (
                  <a
                    href={buildPackageWhatsAppLink(pkg.name, pkg.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary package-card-button"
                  >
                    Elegir este paquete
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;
