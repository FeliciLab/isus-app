import React from 'react';
import { CabecalhoVazio, SubCabecalhoVazio, ViewColumn } from './styles';

const LegendaNaoEncontrada = () => (
  <ViewColumn>
    <CabecalhoVazio> Nenhum resultado encontrado </CabecalhoVazio>
    <SubCabecalhoVazio> Tente novamente com outros termos. </SubCabecalhoVazio>
  </ViewColumn>
);

export default LegendaNaoEncontrada;
