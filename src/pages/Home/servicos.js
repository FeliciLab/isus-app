import Servico1 from '../../assets/icons/servicos/integrasus_icon.svg';
import Servico2 from '../../assets/icons/servicos/servico_2.svg';
import Servico3 from '../../assets/icons/servicos/servico_3.svg';
import Forca4 from '../../assets/icons/ceara_icon.svg';

const servicos = [
  {
    id: 'services-1',
    titulo: 'IntegraSUS',
    logo: Servico1,
    navegacao: {
      componente: 'webview',
      titulo: 'IntegraSUS',
      url: 'https://integrasus.saude.ce.gov.br'
    }
  },
  {
    id: 'services-2',
    titulo: 'Central de Ventiladores',
    logo: Servico2,
    navegacao: {
      componente: 'webview',
      titulo: 'Central de Ventiladores',
      url: 'https://coronavirus.ceara.gov.br/centraldeventiladores/'
    }
  },
  {
    id: 'services-3',
    titulo: 'TeleMedicina',
    logo: Servico3,
    navegacao: {
      componente: 'webview',
      titulo: 'TeleMedicina',
      url: 'https://coronavirus.ceara.gov.br/isus/telemedicina'
    }
  },
  {
    id: 'services-4',
    titulo: 'Ações do governo',
    logo: Forca4,
    navegacao: {
      componente: 'webview',
      titulo: 'Ações do governo',
      url: 'https://coronavirus.ceara.gov.br/isus/governo/'
    }
  }
];

export default servicos;
