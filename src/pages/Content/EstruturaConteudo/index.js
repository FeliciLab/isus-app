import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { uniqueId } from 'lodash';
import React, { useEffect, useLayoutEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { cabecalhoMenuBusca } from '~/components/layoutEffect/cabecalhoLayout';
import MessageErrorCard from '~/components/MessageErrorCard';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useConteudo from '~/hooks/useConteudo';
import TelaConteudo from '../TelaConteudo';

const Tab = createMaterialTopTabNavigator();

// Componente responsável pelas "Tabs" de navegação carregadas na barra superior
// Localizada dentro da Barra inferior: "Minha Saúde", "Educação" e "Pesquisa"
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
        title="Serviço indisponível"
        subtitle={erroCarregamento.message}
        iconColor={CORES.LARANJA}
        iconName="alert"
        textButton="Voltar"
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
          key={uniqueId('tab-screen')}
          component={TelaConteudo}
          initialParams={{ categoria: item }}
        />
      ))}
    </Tab.Navigator>
  );
}
