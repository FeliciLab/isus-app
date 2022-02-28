export const componentes = ['Comunitário', 'Hospitalar'];

const municipios = [
  'Acaraú',
  'Aracati',
  'Camocim',
  'Caucaia',
  'Crateús',
  'Fortaleza',
  'Guaiúba',
  'Horizonte',
  'Icapuí',
  'Iguatu',
  'Morada Nova',
  'Quixadá',
  'Quixeramobim',
  'Santa Quitéria',
  'São Gonçalo do Amarante',
  'Tauá',
  'Milagres',
  'Limoeiro do Norte',
  'Tianguá',
  'Itapipoca',
];

const programasResidenciasPorComponentes = {
  Comunitário: [
    'Saúde da Família e Comunidade',
    'Saúde Mental Coletiva',
    'Saúde Coletiva',
  ],
  Hospitalar: [
    'Cancerologia',
    'Cardiopneumologia',
    'Enfermagem Obstétrica',
    'Infectologia',
    'Neonatologia',
    'Neurologia e Neurocirurgia',
    'Pediatria',
    'Urgência e Emergência',
  ],
};

const municipiosPorProgramasResidencias = {
  'Saúde da Família e Comunidade': municipios,
  'Saúde Mental Coletiva': municipios,
  'Saúde Coletiva': municipios,
  Cancerologia: ['Fortaleza', 'Sobral'],
  Cardiopneumologia: [],
  'Enfermagem Obstétrica': [],
  Infectologia: [],
  Neonatologia: [],
  'Neurologia e Neurocirurgia': ['Fortaleza', 'Juazeiro', 'Quixeramobim'],
  Pediatria: [],
  'Urgência e Emergência': [],
};

export const getProgramasResidencias = componente => {
  return programasResidenciasPorComponentes[componente]
    ? programasResidenciasPorComponentes[componente]
    : [];
};

export const getResidenciaMunicipios = programaResidencia => {
  return municipiosPorProgramasResidencias[programaResidencia]
    ? municipiosPorProgramasResidencias[programaResidencia]
    : [];
};

console.log(getResidenciaMunicipios('Saúde da Família e Comunidade'));
