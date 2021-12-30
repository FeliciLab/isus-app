import Boletins from '../../../assets/icons/forcaTarefa/boletins.svg';
import NotificacaoDeCasos from '../../../assets/icons/forcaTarefa/notificacaoDeCasos.svg';
import FarmacoVigilancia from '../../../assets/icons/forcaTarefa/farmacoVigilancia.svg';
import Denuncias from '../../../assets/icons/forcaTarefa/denuncias.svg';
import VacinaCOVID19 from '../../../assets/icons/forcaTarefa/vacinaCovid19.svg';
import PlanoContigencia from '../../../assets/icons/forcaTarefa/planoDeContigencia.svg';
import rotas from '../../../constantes/rotas';
import { labelsAnalytics } from '../../../constantes/labelsAnalytics';
import { urls } from '../../../constantes/urls';

const listForcaTarefa = [
  {
    id: 'acao-boletins',
    titulo: 'Boletins',
    ativo: true,
    labelDoAnalytics: 'boletins',
    icone: Boletins,
    navegacao: {
      componente: 'webview',
      titulo: 'Boletins',
      url: urls.BOLETINS
    }
  },
  {
    id: 'acao-plano-contigencia',
    titulo: 'Plano de Contigência',
    labelDoAnalytics: labelsAnalytics.CARTAO_PLANO_CONTIGENCIA,
    ativo: true,
    icone: PlanoContigencia,
    navegacao: {
      componente: 'webview',
      titulo: 'Plano de Contigência',
      url: urls.PLANO_CONTIGENCIA
    }
  },
  {
    id: 'acao-vacinaCOVID19',
    titulo: 'Vacinação',
    labelDoAnalytics: labelsAnalytics.CARTAO_VACINA_COVID19,
    ativo: true,
    icone: VacinaCOVID19,
    navegacao: {
      componente: 'webview',
      titulo: 'Vacinação',
      url: urls.VACINA_COVID19
    }
  },
  {
    id: 'acao-notificacao',
    titulo: 'Notificação de casos',
    ativo: true,
    labelDoAnalytics: 'notificacao_de_casos',
    icone: NotificacaoDeCasos,
    navegacao: {
      componente: 'webview',
      titulo: 'Notificações de casos',
      url: urls.NOTIFICACAO_DE_CASOS
    }
  },
  {
    id: 'acao-farmaco-viligancia',
    titulo: 'Farmaco-vigilância',
    ativo: true,
    labelDoAnalytics: 'farmaco_vigilancia',
    icone: FarmacoVigilancia,
    navegacao: {
      componente: 'webview',
      titulo: 'Farmaco-vigilância',
      url: urls.FARMACO_VIGILANCIA
    }
  },
  {
    id: 'acao-denuncias',
    titulo: 'Denúncias',
    ativo: true,
    labelDoAnalytics: 'denuncias',
    icone: Denuncias,
    navegacao: {
      componente: rotas.DENUNCIAR,
      titulo: 'Denunciar'
    }
  }
];


export default listForcaTarefa;
