export const projects = [
  {
    id: 'ron',
    title: 'Soluciones Integrales RON',
    year: '2026',
    type: 'Sitio multipágina',
    description:
      'Web multipágina para mantenimiento, refacciones, obra y domótica. Servicios, nosotros y presupuesto por WhatsApp.',
    problem:
      'Crecían por referidos pero no tenían web propia para mostrar todos los servicios ni un canal claro para pedir presupuesto.',
    url: null,
    image: '/projects/ron.png',
    initials: 'RO',
  },
  {
    id: 'fr-consultorio',
    title: 'FR Consultorio',
    year: '2026',
    type: 'Web + SaaS a medida',
    description:
      'Presencia online para la Dra. Fanny Ruth y un panel interno para el día a día del consultorio odontológico.',
    problem:
      'Abría su consultorio y necesitaba llegar a pacientes nuevos online, pero también ordenar turnos, fichas y cobros sin depender de planillas sueltas.',
    image: '/projects/fannyruth.jpeg',
    thumbFit: 'contain',
    initials: 'FR',
    deliverables: [
      {
        id: 'web',
        label: 'Sitio web',
        description:
          'Consultorio, tratamientos, historia profesional y contacto por WhatsApp en un sitio multipágina.',
        url: 'https://fannyruth.vercel.app/',
      },
      {
        id: 'saas',
        label: 'Panel de gestión',
        description:
          'Software privado con agenda, pacientes, caja y odontograma. Solo lo usa la clienta en el consultorio.',
        problem:
          'Turnos anotados en WhatsApp y papel, fichas repartidas, cobros sin registro claro. Necesitaba un sistema único, seguro y hecho para su forma de trabajar.',
        privateDemo: true,
      },
    ],
  },
  {
    id: 'fumigaciones-paz',
    title: 'Control Total Fumigaciones Paz',
    year: '2026',
    type: 'Sitio en una página',
    description:
      'Sitio corporativo con servicios por rubro, reseñas visibles y contacto directo por WhatsApp.',
    problem:
      'Dependían del boca a boca y no tenían web donde explicar cada servicio ni facilitar el contacto desde el celular.',
    url: 'https://www.controltotalfumigacionespaz.com.ar/',
    image: '/projects/fumigaciones-paz.png',
    initials: 'FP',
  },
  {
    id: 'med-mistica',
    title: 'MED Mística',
    year: '2026',
    type: 'Landing de servicios',
    description:
      'Landing para coaching holístico y tarot, con sesiones online explicadas y contacto por WhatsApp.',
    problem:
      'Ofrecía varios servicios pero no había un lugar claro donde contarlos ni explicar cómo reservar.',
    url: 'https://medmistica.com.ar/',
    image: '/projects/med-mistica.png',
    initials: 'MM',
  },
  {
    id: 'aberturas-luxor',
    title: 'Aberturas Luxor',
    year: '2025',
    type: 'Sitio corporativo',
    description:
      'Web con catálogo de aberturas, formulario de consulta y ubicación para una empresa con más de 35 años de trayectoria.',
    problem:
      'Mucha experiencia en el rubro pero sin web propia: difícil mostrar el catálogo y recibir consultas ordenadas.',
    url: 'https://www.aberturasluxor.com.ar/',
    image: '/projects/aberturasluxor.png',
    initials: 'AL',
  },
];

export const PROJECTS_INITIAL_COUNT = 3;

export function projectHasLiveSite(project) {
  return Boolean(project?.url && project.url !== '#');
}

export function deliverableHasLiveSite(deliverable) {
  return Boolean(deliverable?.url && deliverable.url !== '#');
}
