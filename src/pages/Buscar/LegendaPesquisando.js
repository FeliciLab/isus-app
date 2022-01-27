import React from 'react';
import { Legenda, Negrito } from './styles';

const LegendaPesquisando = ({ palavra }) => (
  <Legenda>
    Pesquisando por: <Negrito>{palavra}</Negrito>
  </Legenda>
);

export default LegendaPesquisando;
