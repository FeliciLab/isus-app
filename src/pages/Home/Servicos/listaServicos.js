import AcoesGovernoIcon from '~/assets/icons/servicos/acoes-governo-icon.svg';
import ElmoIcon from '~/assets/icons/servicos/elmo-icon.svg';
import EspIcon from '~/assets/icons/servicos/esp-icon.svg';
import EspVirtualIcon from '~/assets/icons/servicos/esp-virtual-icon.svg';
import FaleConoscoIcon from '~/assets/icons/servicos/fale-conosco-icon.svg';
import ForcaTrabalhoIcon from '~/assets/icons/servicos/forca-trabalho-icon.svg';
import IntegraSusIcon from '~/assets/icons/servicos/integra-sus-icon.svg';
import QualiquizIcon from '~/assets/icons/servicos/qualiquiz-icon.svg';
import ResidenciasIcon from '~/assets/icons/servicos/residencias-icon.svg';
import SusNoCeIcon from '~/assets/icons/servicos/sus-no-ce-icon.svg';
import rotas from '~/constantes/rotas';

const listaServicos = [
  {
    id: 'residencia_medica',
    titulo: 'Residências',
    ativo: true,
    icone: ResidenciasIcon,
    navegacao: {
      net: true,
      componente: rotas.RESIDENCIA_MEDICA,
    },
  },
  {
    id: 'qualiquiz',
    titulo: 'QualiQuiz',
    ativo: true,
    icone: QualiquizIcon,
    navegacao: {
      net: true,
      componente: 'QUALIQUIZ',
    },
  },
  {
    id: 'Integra_SUS',
    titulo: 'IntegraSUS',
    ativo: true,
    icone: IntegraSusIcon,
    navegacao: {
      net: true,
      componente: 'webview',
      titulo: 'IntegraSUS',
      url: 'https://integrasus.saude.ce.gov.br',
    },
  },
  {
    id: 'Forca_Trabalho_Saude_CE',
    titulo: 'Força Trabalho CE',
    ativo: true,
    icone: ForcaTrabalhoIcon,
    navegacao: {
      net: true,
      componente: 'browser',
      titulo: 'ForcaTrabalhoSaudeCE',
      url: 'https://cisec.esp.ce.gov.br/forca-de-trabalho',
    },
  },
  {
    id: 'elmo',
    titulo: 'Elmo',
    ativo: true,
    icone: ElmoIcon,
    navegacao: {
      net: true,
      componente: rotas.ELMO,
      titulo: 'Elmo',
    },
  },
  {
    id: 'SUS_no_Ceara',
    titulo: 'SUS no Ceará',
    ativo: true,
    icone: SusNoCeIcon,
    navegacao: {
      componente: rotas.SUS_NO_CEARA,
    },
  },
  // TODO: abilitar Acoes_do_governo ao fim do período eleitoral
  {
    id: 'Acoes_do_governo',
    titulo: 'Ações do governo',
    ativo: false, // desativado
    icone: AcoesGovernoIcon,
    navegacao: {
      net: true,
      componente: 'webview',
      titulo: 'Ações do governo',
      url: 'https://coronavirus.ceara.gov.br/isus/governo/',
    },
  },
  {
    id: 'ESP',
    titulo: 'Escola de Saúde Pública - ESP/CE',
    icone: EspIcon,
    ativo: true,
    navegacao: {
      net: true,
      componente: 'webview',
      titulo: 'ESP',
      url: 'https://www.esp.ce.gov.br/',
    },
  },
  {
    id: 'ESP_Virtual',
    titulo: 'ESP Virtual',
    ativo: true,
    icone: EspVirtualIcon,
    navegacao: {
      net: true,
      componente: 'browser',
      titulo: 'ESP Virtual',
      url: 'http://espvirtual.esp.ce.gov.br/',
    },
  },
  {
    id: 'Fale_Conosco',
    titulo: 'Fale Conosco',
    ativo: true,
    icone: FaleConoscoIcon,
    navegacao: {
      componente: rotas.FALE_CONOSCO,
    },
  },
];

export default listaServicos;
