export const packages = [
  {
    id: 'esencial',
    name: 'Esencial',
    description: 'Para quien recién arranca y necesita presencia online clara.',
    price: 115000,
  },
  {
    id: 'completo',
    name: 'Completo',
    description: 'Para negocios que necesitan mostrar más información.',
    price: 200000,
    highlight: true,
  },
  {
    id: 'medida',
    name: 'A medida',
    description: 'Proyectos con necesidades específicas que charlamos juntos.',
    price: null,
  },
];

/** Filas de la planilla comparativa. Valores: true | false | 'custom' */
export const comparisonRows = [
  {
    label: '1 página con secciones básicas',
    values: { esencial: true, completo: true, medida: true },
  },
  {
    label: 'Botón de contacto a WhatsApp o Instagram',
    values: { esencial: true, completo: true, medida: true },
  },
  {
    label: 'Diseño responsive (celular y computadora)',
    values: { esencial: true, completo: true, medida: true },
  },
  {
    label: 'Entrega lista para compartir',
    values: { esencial: true, completo: true, medida: true },
  },
  {
    label: 'Mapa de ubicación',
    values: { esencial: false, completo: true, medida: true },
  },
  {
    label: 'Formulario de contacto',
    values: { esencial: false, completo: true, medida: true },
  },
  {
    label: 'Funcionalidades a medida',
    values: { esencial: false, completo: false, medida: true },
  },
  {
    label: 'Presupuesto según lo que necesites',
    values: { esencial: false, completo: false, medida: true },
  },
];
