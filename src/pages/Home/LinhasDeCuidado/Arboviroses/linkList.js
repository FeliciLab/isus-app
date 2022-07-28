import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';

const { ARBOVIROSES: LABEL_ARBOVIROSES } = labelsAnalytics;
const { ARBOVIROSES: TESTID_ARBOVIROSES } = TESTIDS;

export const linkList = [
  {
    title: 'Boletins Epidemiológicos',
    testId: TESTID_ARBOVIROSES.BOLETINS_EPIDEMIOLOGICOS,
    analyticsId: LABEL_ARBOVIROSES.BOLETINS_EPIDEMIOLOGICOS,
    url: 'https://www.saude.ce.gov.br/download/boletins/',
  },
  {
    title: 'Vigilância Entomológica',
    testId: TESTID_ARBOVIROSES.VIGILANCIA_ENTOMOLOGICA,
    analyticsId: LABEL_ARBOVIROSES.VIGILANCIA_ENTOMOLOGICA,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/07/A3-arbovirose-vigilancia-entomologica-periodo-eleitoral-2022.pdf',
  },
  {
    title: 'Vigilância Epidemiológica',
    testId: TESTID_ARBOVIROSES.VIGILANCIA_EPIDEMIOLOGICA,
    analyticsId: LABEL_ARBOVIROSES.VIGILANCIA_EPIDEMIOLOGICA,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/07/A3-dengue-chicungunya-zica-periodo-eleitoral-2022.pdf',
  },
  {
    title: 'Diagnóstico Laboratorial de Arboviroses',
    testId: TESTID_ARBOVIROSES.DIAGNOSTICO_LAB_ARBOVIROSES,
    analyticsId: LABEL_ARBOVIROSES.DIAGNOSTICO_LAB_ARBOVIROSES,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/07/A3-diagnostico-arbovirose-periodo-eleitoral-2022.pdf',
  },
  {
    title: 'Arboviroses - Controle de vetor',
    testId: TESTID_ARBOVIROSES.CONTROLE_VETOR,
    analyticsId: LABEL_ARBOVIROSES.CONTROLE_VETOR,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/07/A3-arbovirose-controle-vetor-periodo-eleitoral-2022.pdf',
  },
  {
    title: 'A melhor defesa é a prevenção',
    testId: TESTID_ARBOVIROSES.MELHOR_DEFESA_PREVENCAO,
    analyticsId: LABEL_ARBOVIROSES.MELHOR_DEFESA_PREVENCAO,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/07/folder-A5-O_PERIGO_CAMUFLADO-Impressao-30062022.pdf',
  },
  {
    title: 'Jogo de Tabuleiro sobre Arboviroses',
    testId: TESTID_ARBOVIROSES.JOGO_TABULEIRO,
    analyticsId: LABEL_ARBOVIROSES.JOGO_TABULEIRO,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/07/impressao-jogo-tabuleiro-dengue-36x21-05072022.pdf',
  },
  {
    title:
      'Manual Medidas de Proteção à Saúde dos Agentes de Combate às Endemias',
    testId: TESTID_ARBOVIROSES.MANUAL_PROTECAO_AGENTES_ENDEMIAS,
    analyticsId: LABEL_ARBOVIROSES.MANUAL_PROTECAO_AGENTES_ENDEMIAS,
    url:
      'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/07/manual_protecao_agentes_endemias.pdf',
  },
];
