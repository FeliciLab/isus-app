import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { pegarCategoriasArquitetura } from '~/apis/apiHome';
import { cabecalhoMenuBusca } from '~/components/layoutEffect/cabecalhoLayout';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { ConteudoContext } from '~/context/ConteudoContext';
import { pegarDados, salvarDados } from '~/services/armazenamento';
import randomKey from '~/utils/randomKey';
import TelaConteudo from '../TelaConteudo';

const Tab = createMaterialTopTabNavigator();

export default function({ navigation }) {
  const { titulo, categoria, categorias, alterarCategorias } = useContext(
    ConteudoContext,
  );

  useEffect(() => {
    pegarCategorias();
  }, []);

  const pegarCategorias = async () => {
    try {
      const resposta = await pegarCategoriasArquitetura();
      if (categoria === undefined) {
        console.log('Categorias undefined!');
        return;
      }

      if (!resposta.data[categoria]) {
        console.log('Resposta categorias sem dados');
        return;
      }

      await alterarCategorias(
        resposta.data[categoria].map(item => ({
          ...item,
          title_description: titulo,
        })),
      );
      salvarDados(`@categorias_${categoria}`, resposta.data[categoria]);
    } catch (err) {
      if (err.message === 'Network Error') {
        try {
          const resp = await pegarDados(`@categorias_${categoria}`);
          alterarCategorias(resp);
        } catch (err2) {
          navigation.navigate(rotas.SEM_CONEXAO, {
            goHome: true,
            componente: categoria,
          });
        }
      }
    }
    console.log('categorias', categorias);
  };

  useLayoutEffect(() => {
    cabecalhoMenuBusca({
      navegador: navigation,
      titulo,
      cor: 'verde',
    });
  }, []);

  if(!categoria) {
    return null;
  }

  if (categorias?.length === 0) {
    return <></>;
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
      {categorias && categorias.map(item => (
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
