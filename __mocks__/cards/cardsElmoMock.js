import { CORES } from '../../src/constantes/estiloBase';
import ROTAS from '../../src/constantes/rotas';
import { listaImagensElmo } from '../../src/constantes/imagens';

const cardsElmoMock = [
  {
    id: 'elmo-capacitacao',
    titulo: 'Capacitação',
    ativo: true,
    icone: listaImagensElmo.SvgCapacitacao,
    navegacao: {
      componente: ROTAS.CAPACITACAO_ELMO,
      titulo: 'Elmo',
      background: CORES.INDIGO_DYE
    }
  },
  {
    id: 'elmo-manual-uso',
    titulo: 'Manual de Uso',
    ativo: true,
    icone: listaImagensElmo.SvgManualUso,
    navegacao: {
      componente: 'browser',
      url: 'https://sus.ce.gov.br/elmo/wp-content/uploads/sites/2/2021/01/Manual_Elmo_1.1_JAN2021.pdf'
    }
  },
  {
    id: 'elmo-fale-conosco',
    titulo: 'Fale Conosco',
    ativo: true,
    icone: listaImagensElmo.SvgFaleConosco,
    navegacao: {
      componente: ROTAS.DUVIDAS_ELMO,
    }
  }
];

export default cardsElmoMock;
