import ArbovirosesIcon from '~/assets/icons/linhasDeCuidado/arboviroses-icon.svg';
import ManejoCovid19Icon from '~/assets/icons/linhasDeCuidado/manejo-covid-19-icon.svg';
import ManejoInfantilIcon from '~/assets/icons/linhasDeCuidado/manejo-infantil-icon.svg';
import MonkeyPoxIcon from '~/assets/icons/linhasDeCuidado/monkeypox-icon.svg';
import ProtocolosIcon from '~/assets/icons/linhasDeCuidado/protocolos-icon.svg';
import rotas from '~/constantes/rotas';

const listaLinhasDeCuidado = [
  {
    id: 'manejoCovid',
    titulo: 'Manejo Covid-19',
    ativo: true,
    icone: ManejoCovid19Icon,
    labelDoAnalytics: 'manejo_covid',
    navegacao: {
      componente: 'webview',
      titulo: 'Manejo Clínico',
      url: 'https://coronavirus.ceara.gov.br/profissional/manejoclinico/',
    },
  },
  {
    id: 'monkeypox',
    titulo: 'Monkeypox',
    ativo: true,
    icone: MonkeyPoxIcon,
    labelDoAnalytics: 'monkeypox',
    navegacao: {
      componente: rotas.MONKEYPOX,
    },
  },
  {
    id: 'arbovirosesDengue',
    titulo: 'Arboviroses',
    ativo: true,
    icone: ArbovirosesIcon,
    labelDoAnalytics: 'arboviroses',
    navegacao: {
      componente: rotas.ARBOVIROSES,
    },
  },
  {
    id: 'maternoInfantil',
    titulo: 'Materno-Infantil',
    ativo: true,
    icone: ManejoInfantilIcon,
    labelDoAnalytics: 'materno_infantil',
    navegacao: {
      componente: rotas.MATERNO_INFANTIL,
    },
  },
  {
    id: 'protocolos',
    titulo: 'Protocolos',
    ativo: true,
    icone: ProtocolosIcon,
    labelDoAnalytics: 'protocolos',
    navegacao: {
      componente: 'webview',
      titulo: 'Protocolos',
      url: 'https://coronavirus.ceara.gov.br/isus/protocolos/',
    },
  },
];

export default listaLinhasDeCuidado;
