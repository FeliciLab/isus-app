import React from 'react';
import { FlatList } from 'react-native';
import ManejoClinico from '../../../assets/icons/linhasDeCuidado/manejoClinico.svg';
import StyledTitulo from './styles';
import rotas from '../../../constantes/rotas';
import CartaoHome from '../cartaoHome';

export default function LinhasDeCuidado({ navigation }) {
  const listaLinhasDeCuidado = [
    {
      id: 'linha-1',
      titulo: 'Manejo Covid-19',
      ativo: true,
      icone: ManejoClinico,
      navegacao: {
        componente: rotas.MANEJO_CLINICO
      }
    }
  ];

  return (
    <>
      <StyledTitulo>Linhas de Cuidado e Protocolos</StyledTitulo>
      <FlatList
        horizontal
        data={listaLinhasDeCuidado}
        keyExtractor={(item, index) => `${index}`}
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start'
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartaoHome
            ativo={item.ativo}
            testID={`cartaoHome-linhasDeCuidado-${item.id}`}
            key={item.id}
            titulo={item.titulo}
            Icone={item.icone}
            onPress={() => navigation.navigate(item.navegacao.componente)}
          />
        )}
      />
    </>
  );
}
