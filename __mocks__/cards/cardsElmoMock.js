// import { listaImagensElmo } from '../../src/constantes/imagens';
import ROTAS from '../../src/constantes/rotas';

const cardsElmoMock = [
  {
    id: 'elmo-capacitacao',
    ordem: 1,
    ativo: true,
    titulo: 'Treinamento',
    imagem: 'SvgCapacitacao',
    categoria: 'elmo',
    sessao: 'conteudos',
    tipo: 'webview',
    valor: 'https://sus.ce.gov.br/elmo/faca-sua-capacitacao/',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_treinamento',
    }
  },
  {
    id: 'elmo-manual-uso',
    ordem: 2,
    ativo: true,
    titulo: 'Manual de Uso',
    imagem: 'SvgManualUso',
    categoria: 'elmo',
    sessao: 'conteudos',
    valor: 'https://sus.ce.gov.br/elmo/wp-content/uploads/sites/2/2021/01/Manual_Elmo_1.1_JAN2021.pdf',
    tipo: 'browser',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_manualdeuso'
    }
  },
  {
    id: 'elmo-fale-conosco',
    ordem: 3,
    ativo: true,
    titulo: 'Fale Conosco',
    imagem: 'SvgFaleConosco',
    categoria: 'elmo',
    sessao: 'conteudos',
    valor: ROTAS.DUVIDAS_ELMO,
    tipo: 'rota',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_faleconosco',
    }
  },
  {
    id: 'elmo-materiais',
    ordem: 4,
    ativo: true,
    titulo: 'Materiais',
    imagem: 'SvgFaleConosco',
    categoria: 'elmo',
    sessao: 'conteudos',
    valor: 'https://sus.ce.gov.br/elmo/materiais/',
    tipo: 'browser',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_materiais'
    }
  },
  {
    id: 'elmo-depoimentos',
    ordem: 5,
    ativo: true,
    titulo: 'Depoimentos',
    imagem: 'SvgFaleConosco',
    categoria: 'elmo',
    sessao: 'conteudos',
    valor: 'https://sus.ce.gov.br/elmo/depoimentos/',
    tipo: 'browser',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_depoimentos'
    }
  },
  {
    id: 'elmo-biblioteca',
    ordem: 6,
    ativo: true,
    titulo: 'Biblioteca',
    imagem: 'SvgFaleConosco',
    categoria: 'elmo',
    sessao: 'conteudos',
    valor: 'https://sus.ce.gov.br/elmo/biblioteca/',
    tipo: 'browser',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_biblioteca'
    }
  },
  {
    id: 'elmo-doacoes',
    ordem: 7,
    ativo: true,
    titulo: 'Doações',
    imagem: 'SvgFaleConosco',
    categoria: 'elmo',
    sessao: 'conteudos',
    valor: 'https://sus.ce.gov.br/elmo/doacoes/',
    tipo: 'browser',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_doacoes'
    }
  }
];

export default cardsElmoMock;
