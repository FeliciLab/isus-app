import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';

const { MONKEYPOX: LABEL_MONKEYPOX } = labelsAnalytics;
const { MONKEYPOX: TESTID_MONKEYPOX } = TESTIDS;

export const linkList = [
  {
    title: 'Documentos Oficiais',
    testId: TESTID_MONKEYPOX.DOCUMENTOS_OFICIAIS,
    analyticsId: LABEL_MONKEYPOX.DOCUMENTOS_OFICIAIS,
    url: 'https://www.saude.ce.gov.br/download/monkeypox/',
  },
  {
    title: 'Manejo Clinico e Prevencao de Controle de infecção para Monkeypox',
    testId: TESTID_MONKEYPOX.MANEJO_CLINICO,
    analyticsId: LABEL_MONKEYPOX.MANEJO_CLINICO,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/08/manejo_clinico_e_prevencao_de_controle_de_infeccao_para_monkeypox-1.pdf',
  },
];
