import SiteOficinaIcon from '~/assets/icons/oficinaDesign/site-oficina-icon.svg';
import FrequenciasIcon from '~/assets/icons/residenciaMedica/frequencias-icon.svg';
import rotas from '~/constantes/rotas';
import { urls } from '~/constantes/urls';

const listaOficinasCards = [
  {
    id: 'frequencias',
    titulo: 'Frequências',
    ativo: true,
    icone: FrequenciasIcon,
    navegacao: {
      componente: rotas.OFICINA_DESIGN_LISTAR_OFICINAS,
    },
  },
  {
    id: 'matriculas',
    titulo: 'Site da Oficina',
    ativo: true,
    icone: SiteOficinaIcon,
    navegacao: {
      componente: 'browser',
      titulo: 'Oficina de Design',
      url: urls.OFICINA_DESIGN,
    },
  },
];

export default listaOficinasCards;
