import { listaImagensElmo } from '../../src/constantes/imagens';

const cardsElmoMock = [
  {
    id: 1,
    id_publico: 'elmo_treinamento',
    ativo: true,
    categoria: 'elmo',
    imagem: listaImagensElmo.SvgCapacitacao,
    ordem: 1,
    sessao: 'conteudos',
    tipo: 'webview',
    titulo: 'Treinamento',
    valor: 'https://sus.ce.gov.br/elmo/faca-sua-capacitacao/',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_treinamento'
    }
  },
  {
    id: 2,
    id_publico: 'elmo_manual_uso',
    ativo: true,
    categoria: 'elmo',
    imagem: listaImagensElmo.SvgManualUso,
    ordem: 2,
    sessao: 'conteudos',
    tipo: 'browser',
    titulo: 'Manual de Uso',
    valor: 'https://sus.ce.gov.br/elmo/wp-content/uploads/sites/2/2021/01/Manual_Elmo_1.1_JAN2021.pdf',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_manualdeuso'
    }
  },
  {
    id: 3,
    id_publico: 'elmo_fale_conosco',
    ativo: true,
    categoria: 'elmo',
    imagem: listaImagensElmo.SvgFaleConosco,
    ordem: 3,
    sessao: 'conteudos',
    tipo: 'rota',
    titulo: 'Fale Conosco',
    valor: 'DUVIDAS_ELMO',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_faleconosco'
    }
  },
  {
    id: 4,
    id_publico: 'elmo_materiais',
    ativo: true,
    categoria: 'elmo',
    imagem: listaImagensElmo.SvgFaleConosco,
    ordem: 4,
    sessao: 'conteudos',
    tipo: 'browser',
    titulo: 'Materiais',
    valor: 'https://sus.ce.gov.br/elmo/materiais/',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_materiais'
    }
  },
  {
    id: 5,
    id_publico: 'elmo_depoimentos',
    ativo: true,
    categoria: 'elmo',
    imagem: listaImagensElmo.SvgFaleConosco,
    ordem: 5,
    sessao: 'conteudos',
    tipo: 'browser',
    titulo: 'Depoimentos',
    valor: 'https://sus.ce.gov.br/elmo/depoimentos/',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_depoimentos'
    }
  },
  {
    id: 6,
    id_publico: 'elmo_biblioteca',
    ativo: true,
    categoria: 'elmo',
    imagem: listaImagensElmo.SvgFaleConosco,
    ordem: 6,
    sessao: 'conteudos',
    tipo: 'browser',
    titulo: 'Biblioteca',
    valor: 'https://sus.ce.gov.br/elmo/biblioteca/',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_biblioteca'
    }
  },
  {
    id: 7,
    id_publico: 'elmo_doacoes',
    ativo: true,
    categoria: 'elmo',
    imagem: listaImagensElmo.SvgFaleConosco,
    ordem: 7,
    sessao: 'conteudos',
    tipo: 'browser',
    titulo: 'Doações',
    valor: 'https://sus.ce.gov.br/elmo/doacoes/',
    opcoes: {
      localImagem: 'app',
      labelAnalytics: 'elmo_card_doacoes'
    }
  }
];

export default cardsElmoMock;
