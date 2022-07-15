import ManejoCovid19Icon from '~/assets/icons/linhasDeCuidado/manejo-covid-19-icon.svg';
import ManejoInfantilIcon from '~/assets/icons/linhasDeCuidado/manejo-infantil-icon.svg';
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
