export const plans = [
  {
    id: 'una-pagina',
    name: 'Sitio en una página',
    price: 180000,
    maintenance: 35000,
    description: 'Tu negocio en una sola URL, con scroll entre secciones.',
    highlights: [
      'Hasta 5 secciones',
      'Formulario y WhatsApp',
      'Lista para compartir el día que entrego',
    ],
  },
  {
    id: 'multipagina',
    name: 'Sitio multipágina',
    price: 225000,
    maintenance: 35000,
    featured: true,
    description: 'Varias páginas con URL propia, ideal si tenés más que contar.',
    highlights: [
      'Hasta 5 páginas separadas',
      'Todo lo del plan de una página',
      'Mejor si tenés servicios o categorías distintas',
    ],
  },
  {
    id: 'medida',
    name: 'Proyecto a medida',
    price: null,
    priceLabel: 'Desde $400.000',
    maintenance: 50000,
    description: 'Cuando necesitás algo que no entra en un plan estándar.',
    highlights: [
      'Alcance a tu medida',
      'Propuesta según lo que necesites',
      'Para proyectos con más complejidad',
    ],
  },
];

export const supportPlan = {
  title: 'Plan de acompañamiento',
  duration: '6 meses',
  summary:
    'Después de publicar no te dejo solo: el primer mes va bonificado y seguimos 5 meses más para que todo funcione bien.',
  includes: [
    'Ajustes de textos, precios u horarios sin drama',
    'Seguimiento con Google Search Console y Analytics',
    'Soporte por WhatsApp mientras dure el plan',
    'No incluye páginas o secciones nuevas',
  ],
  referral:
    'Si recomendás a alguien que contrate dentro de esos 6 meses, te bonifico un mes del plan.',
  after:
    'Cuando terminan los 6 meses, podés seguir con mantenimiento y reportes mensuales si te sirve.',
};

export const includedInAll = [
  'Formulario de contacto',
  'Botón de WhatsApp',
  'SEO base',
  'Se ve bien en celular, tablet y computadora',
];
