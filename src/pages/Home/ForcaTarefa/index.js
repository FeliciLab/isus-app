
import React from 'react';
import { Titulo } from '../styles';
import { analyticsData } from '../../../utils/analytics';
import listaForcaTarefaAntiCorona from './listaForcaTarefaAntiCorona';
import CartaoHome from '../cartaoHome';
import Carrossel from '../../../components/Carrossel';

function ForcaTarefa({ navigation }) {
  return (
    <>
      <Titulo>Força-tarefa Anticorona</Titulo>
      <Carrossel
        dados={listaForcaTarefaAntiCorona}
        aoRenderizarItem={({ item }) => (
          <CartaoHome
            testID={`cards-${item.id}`}
            key={item.id}
            ativo={item.ativo}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => {
              analyticsData(item.labelDoAnalytics, 'Click', 'Home');
              navigation.navigate(item.navegacao.componente, {
                title: item.navegacao.titulo,
                url: item.navegacao.url
              });
            }}
          />
        )}
      />
    </>
  );
}

export default ForcaTarefa;
