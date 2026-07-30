function HeroLaptopCallout() {
  return (
    <aside className="home-laptop-callout" aria-hidden="true">
      <div className="home-laptop-callout-stack">
        <svg
          className="home-laptop-callout-arrow"
          viewBox="0 0 100 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M72 50 C73 36, 54 18, 12 16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16 L20 11"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16 L20 21"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="home-laptop-callout-text">
          <span className="home-laptop-callout-line">Algunos de</span>
          <span className="home-laptop-callout-line home-laptop-callout-line--indent">
            mis clientes
          </span>
        </p>
      </div>
    </aside>
  );
}

export default HeroLaptopCallout;
