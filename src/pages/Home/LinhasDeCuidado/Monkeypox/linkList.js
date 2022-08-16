import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';

const { ARBOVIROSES: LABEL_ARBOVIROSES } = labelsAnalytics;
const { ARBOVIROSES: TESTID_ARBOVIROSES } = TESTIDS;

export const linkList = [
  {
    title: 'Manejo Clinico e Prevencao de Controle de infecção para Monkeypox',
    testId: TESTID_ARBOVIROSES.BOLETINS_EPIDEMIOLOGICOS,
    analyticsId: LABEL_ARBOVIROSES.BOLETINS_EPIDEMIOLOGICOS,
    url: 'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/08/manejo_clinico_e_prevencao_de_controle_de_infeccao_para_monkeypox-1.pdf',
  },
];
