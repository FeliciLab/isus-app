import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { cabecalhoMenuBusca } from '~/components/layoutEffect/cabecalhoLayout';
import MessageErrorCard from '~/components/MessageErrorCard/index';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useConteudo from '~/hooks/useConteudo';
import randomKey from '~/utils/randomKey';
import TelaConteudo from '../TelaConteudo';

const Tab = createMaterialTopTabNavigator();

export default function EstruturaConteudo({ navigation }) {
  const {
    titulo,
    categoria,
    categorias,
    pegarCategorias,
    isLoading,
    error: erroCarregamento,
  } = useConteudo();

  useLayoutEffect(() => {
    cabecalhoMenuBusca({
      navegador: navigation,
      titulo,
      cor: 'verde',
    });
  }, []);

  useEffect(() => {
    pegarCategorias();
  }, []);

  if (isLoading)
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  if (erroCarregamento)
    return (
      <MessageErrorCard
        title="Erro"
        subtitle={erroCarregamento.message}
        iconColor={CORES.LARANJA}
        iconName="alert"
        textButton="Volta"
        style={{ margin: 10 }}
        onPressButton={() => navigation.navigate(rotas.HOME_SCREEN_HOME)}
      />
    );

  if (categorias?.length === 0) {
    return null;
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        labelStyle: {
          fontSize: 14,
        },
        indicatorStyle: { backgroundColor: CORES.BRANCO },
        inactiveTintColor: CORES.PRETO54,
        activeTintColor: CORES.BRANCO,
        style: {
          backgroundColor: CORES.VERDE,
        },
      }}>
      {categorias.map(item => (
        <Tab.Screen
          options={{ title: item.name }}
          name={`${categoria}_${item.slug.replace('-', '_')}`}
          key={randomKey()}
          component={TelaConteudo}
          initialParams={{ categoria: item }}
        />
      ))}
    </Tab.Navigator>
  );
}
