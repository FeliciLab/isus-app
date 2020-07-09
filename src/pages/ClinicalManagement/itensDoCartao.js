import Estagio1SVG from '../../assets/icons/estagiosManejo/estagio01.svg';
import Estagio2SVG from '../../assets/icons/estagiosManejo/estagio02.svg';
import Estagio3SVG from '../../assets/icons/estagiosManejo/estagio03.svg';
import Estagio4SVG from '../../assets/icons/estagiosManejo/estagio04.png';
import Estagio1 from './estagios/estagio1';
import Estagio2 from './estagios/estagio2';
import Estagio3 from './estagios/estagio3';
import Estagio4 from './estagios/estagio4';

const pegarItensDoCartao = estados => [
  {
    id: 1,
    tituloEstagio: 'Estágio 01 (2-5 dias)',
    titulo: 'Orientações iniciais',
    subtitulo: 'Sintomas e sinais',
    Logo: Estagio1SVG,
    cor: '#4054B2',
    estaAberto: estados.cartaoEstagio1Aberto,
    metodoDeAbertura: estados.alternarAberturaCartaoEstagio1,
    alturaCard: 10000,
    conteudoOculto: Estagio1
  },
  {
    id: 2,
    tituloEstagio: 'Estágio 02 (5-7 dias)',
    titulo: 'UAPS/UPA/EMERGÊNCIA',
    subtitulo: 'Atendimento médico',
    Logo: Estagio2SVG,
    cor: '#87BA25',
    estaAberto: estados.cartaoEstagio2Aberto,
    metodoDeAbertura: estados.alternarAberturaCartaoEstagio2,
    alturaCard: 801,
    conteudoOculto: Estagio2
  },
  {
    id: 3,
    tituloEstagio: 'Estágio 03 (7-10 dias)',
    titulo: 'Internação Hospitalar',
    Logo: Estagio3SVG,
    cor: '#FF9800',
    estaAberto: estados.cartaoEstagio3Aberto,
    metodoDeAbertura: estados.alternarAberturaCartaoEstagio3,
    alturaCard: 738,
    conteudoOculto: Estagio3
  },
  {
    id: 4,
    tituloEstagio: 'Estágio 04 (11-20 dias)',
    titulo: 'UTI',
    subtitulo: 'Ventilação mecânica',
    Logo: Estagio4SVG,
    cor: '#F2453D',
    estaAberto: estados.cartaoEstagio4Aberto,
    metodoDeAbertura: estados.alternarAberturaCartaoEstagio4,
    alturaCard: 665,
    conteudoOculto: Estagio4
  }
];

export default pegarItensDoCartao;
