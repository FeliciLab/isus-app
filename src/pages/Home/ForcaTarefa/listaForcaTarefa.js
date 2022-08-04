import BoletinsIcon from '~/assets/icons/forcaTarefa/boletins-icon.svg';
import DenunciasIcon from '~/assets/icons/forcaTarefa/denuncias-icon.svg';
import DocumentosOficiaisIcon from '~/assets/icons/forcaTarefa/documentos-oficiais-icon.svg';
import FarmacoVigilanciaIcon from '~/assets/icons/forcaTarefa/farmaco-vigilancia-icon.svg';
import NotificacaoDeCasosIcon from '~/assets/icons/forcaTarefa/notificacao-de-casos-icon.svg';
import PlanoDeContingenciaIcon from '~/assets/icons/forcaTarefa/plano-de-contingencia-icon.svg';
import VacinacaoIcon from '~/assets/icons/forcaTarefa/vacinacao-icon.svg';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import rotas from '~/constantes/rotas';
import { urls } from '~/constantes/urls';

const listForcaTarefa = [
  {
    id: 'acao-notas-tecnicas',
    titulo: 'Documentos Oficiais',
    ativo: true,
    labelDoAnalytics: 'documentos_oficiais',
    icone: DocumentosOficiaisIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'Documentos Oficiais',
      url: urls.DOCUMENTOS_OFICIAIS,
    },
  },
  {
    id: 'acao-boletins',
    titulo: 'Boletins',
    ativo: true,
    labelDoAnalytics: 'boletins',
    icone: BoletinsIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'Boletins',
      url: urls.BOLETINS,
    },
  },
  {
    id: 'acao-plano-contigencia',
    titulo: 'Plano de Contingência',
    labelDoAnalytics: labelsAnalytics.CARTAO_PLANO_CONTIGENCIA,
    ativo: true,
    icone: PlanoDeContingenciaIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'Plano de Contingência',
      url: urls.PLANO_CONTIGENCIA,
    },
  },
  {
    id: 'acao-vacinaCOVID19',
    titulo: 'Vacinação',
    labelDoAnalytics: labelsAnalytics.CARTAO_VACINA_COVID19,
    ativo: true,
    icone: VacinacaoIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'Vacinação',
      url: urls.VACINA_COVID19,
    },
  },
  {
    id: 'acao-notificacao',
    titulo: 'Notificação de casos',
    ativo: true,
    labelDoAnalytics: 'notificacao_de_casos',
    icone: NotificacaoDeCasosIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'Notificações de casos',
      url: urls.NOTIFICACAO_DE_CASOS,
    },
  },
  {
    id: 'acao-farmaco-viligancia',
    titulo: 'Farmaco-vigilância',
    ativo: true,
    labelDoAnalytics: 'farmaco_vigilancia',
    icone: FarmacoVigilanciaIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'Farmaco-vigilância',
      url: urls.FARMACO_VIGILANCIA,
    },
  },
  {
    id: 'acao-denuncias',
    titulo: 'Denúncias',
    ativo: true,
    labelDoAnalytics: 'denuncias',
    icone: DenunciasIcon,
    navegacao: {
      componente: rotas.DENUNCIAR,
      titulo: 'Denunciar',
    },
  },
];

export default listForcaTarefa;
