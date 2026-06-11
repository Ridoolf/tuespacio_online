import { packages, comparisonRows } from '../../config/quoteConfig';
import { formatPrice, buildPackageWhatsAppLink } from '../../utils/whatsapp';
import './Packages.css';

function CellValue({ value }) {
  if (value === true) {
    return (
      <span className="packages-cell packages-cell--yes" aria-label="Incluido">
        <CheckIcon />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="packages-cell packages-cell--no" aria-label="No incluido">
        <CrossIcon />
      </span>
    );
  }

  return (
    <span className="packages-cell packages-cell--custom" aria-label="A definir en charla">
      —
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12l5 5L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Packages() {
  return (
    <section className="packages">
      <div className="container">
        <header className="section-header" id="paquetes">
          <h2 className="section-title">Paquetes</h2>
          <p className="section-subtitle">
            Precios claros para que sepas cuánto cuesta antes de escribirme.
          </p>
        </header>

        <div className="packages-table-wrap">
          <table className="packages-table">
            <caption className="packages-table-caption">
              Comparación de paquetes Tu Espacio Online
            </caption>
            <thead>
              <tr>
                <th scope="col" className="packages-table-corner">
                  <span className="packages-table-corner-label">Qué incluye</span>
                </th>
                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    scope="col"
                    className={`packages-table-plan ${pkg.highlight ? 'packages-table-plan--highlight' : ''}`}
                  >
                    <span className="packages-table-plan-name">{pkg.name}</span>
                    <span className="packages-table-plan-desc">{pkg.description}</span>
                  </th>
                ))}
              </tr>
              <tr className="packages-table-price-row">
                <th scope="row" className="packages-table-feature">
                  Precio
                </th>
                {packages.map((pkg) => (
                  <td
                    key={pkg.id}
                    className={`packages-table-price ${pkg.highlight ? 'packages-table-plan--highlight' : ''}`}
                  >
                    {pkg.price !== null ? (
                      <span className="packages-table-amount">{formatPrice(pkg.price)}</span>
                    ) : (
                      <span className="packages-table-custom">Consultar</span>
                    )}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="packages-table-feature">
                    {row.label}
                  </th>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={pkg.highlight ? 'packages-table-plan--highlight' : ''}
                    >
                      <CellValue value={row.values[pkg.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="packages-table-feature packages-table-footer-label">
                  Elegí tu paquete
                </td>
                {packages.map((pkg) => (
                  <td
                    key={pkg.id}
                    className={`packages-table-cta ${pkg.highlight ? 'packages-table-plan--highlight' : ''}`}
                  >
                    {pkg.id === 'medida' ? (
                      <a
                        href={buildPackageWhatsAppLink(pkg.name, pkg.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-secondary packages-table-button"
                      >
                        Escribime
                      </a>
                    ) : (
                      <a
                        href={buildPackageWhatsAppLink(pkg.name, pkg.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-primary packages-table-button"
                      >
                        Elegir
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="packages-table-hint">Deslizá horizontalmente para comparar en celular.</p>
      </div>
    </section>
  );
}

export default Packages;
