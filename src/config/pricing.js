export const plans = [
  {
    id: 'una-pagina',
    name: 'Sitio en una página',
    price: 180000,
    maintenance: 35000,
    description: 'Hasta 5 secciones en una sola URL con scroll.',
    highlights: [
      'Formulario de contacto',
      'Botón de WhatsApp',
      'SEO base y responsive',
      'Entrega lista para compartir',
    ],
  },
  {
    id: 'multipagina',
    name: 'Sitio multipágina',
    price: 225000,
    maintenance: 35000,
    featured: true,
    description: 'Hasta 5 páginas con URL propia cada una.',
    highlights: [
      'Todo lo del plan anterior',
      'Hasta 5 URLs separadas',
      'Ideal para negocios con más contenido',
    ],
  },
  {
    id: 'medida',
    name: 'Proyecto a medida',
    price: null,
    priceLabel: 'Desde $400.000',
    maintenance: 50000,
    description: 'Alcance 100% personalizado según tu negocio.',
    highlights: [
      'Funcionalidades a medida',
      'Propuesta según alcance',
      'Ideal para proyectos complejos',
    ],
  },
];

export const supportPlan = {
  title: 'Plan de acompañamiento',
  duration: '6 meses',
  summary:
    'El primer mes está bonificado. Luego son 5 meses de seguimiento para que tu web quede bien indexada y funcionando.',
  includes: [
    'Corrección de errores y ajustes básicos de contenido (textos, precios, horarios)',
    'Seguimiento con Google Search Console y Google Analytics',
    'Soporte por WhatsApp durante el período',
    'No incluye secciones o páginas nuevas',
  ],
  referral:
    'Si recomendás a alguien que contrate dentro de esos 6 meses, un mes del plan se bonifica.',
  after:
    'Al finalizar los 6 meses, podés continuar con el mantenimiento y reportes mensuales de forma opcional.',
};

export const includedInAll = [
  'Formulario de contacto',
  'Botón de WhatsApp',
  'SEO base',
  'Adaptado a celular, tablet y computadora',
];
