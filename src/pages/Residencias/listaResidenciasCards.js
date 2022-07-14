import FrequenciasIcon from '~/assets/icons/residenciaMedica/frequencias-icon.svg';
import MatriculasIcon from '~/assets/icons/residenciaMedica/matriculas-icon.svg';
import SaguIcon from '~/assets/icons/residenciaMedica/sagu-icon.svg';
import SigResidenciasIcon from '~/assets/icons/residenciaMedica/sig-residencias-icon.svg';
import EspVirtualIcon from '~/assets/icons/servicos/esp-virtual-icon.svg';
import rotas from '~/constantes/rotas';
import { urls } from '~/constantes/urls';

const listaResidenciasCards = [
  {
    id: 'frequencias',
    titulo: 'Frequências',
    ativo: true,
    icone: FrequenciasIcon,
    navegacao: {
      componente: rotas.FREQUENCIAS,
    },
  },
  {
    id: 'matriculas',
    titulo: 'MATRÍCULAS',
    ativo: true,
    icone: MatriculasIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'MATRÍCULAS',
      url: urls.MATRICULA_RESIDENCIA,
    },
  },
  {
    id: 'sagu',
    titulo: 'SAGU',
    ativo: true,
    icone: SaguIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'SAGU',
      url: urls.SAGU,
    },
  },
  {
    id: 'esp-virtual',
    titulo: 'ESP Virtual',
    ativo: true,
    icone: EspVirtualIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'ESP Virtual',
      url: urls.ESP_VIRTUAL,
    },
  },
  {
    id: 'sig-residencias',
    titulo: 'SIG Residências',
    ativo: true,
    icone: SigResidenciasIcon,
    navegacao: {
      componente: 'webview',
      titulo: 'SIG Residências',
      url: urls.SIG_RESIDENCIAS,
    },
  },
];

export default listaResidenciasCards;
