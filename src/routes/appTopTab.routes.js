import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { pegarCategoriasArquitetura } from '~/apis/apiHome';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { pegarDados, salvarDados } from '~/services/armazenamento';

const Tab = createMaterialTopTabNavigator();

const indexComponent = 0;

const indexTitle = 1;

export default function appTopTabScreen({ route, navigation }) {
  const genericComponent = route.params[indexComponent].type;
  const title = route.params[indexTitle];
  const [categorias, setCategorias] = useState([
    {
      name: ' ',
      slug: ' ',
      term_group: 0,
      term_id: 0,
    },
  ]);

  useEffect(() => {
    pegarCategorias();
  }, []);

  const pegarCategorias = async () => {
    try {
      const resposta = await pegarCategoriasArquitetura();
      if (route.name === undefined) {
        return;
      }
      if (!resposta.data[route.name]) {
        return;
      }

      setCategorias(resposta.data[route.name]);
      salvarDados(`@categorias_${route.name}`, resposta.data[route.name]);
    } catch (err) {
      if (err.message === 'Network Error') {
        try {
          const resp = await pegarDados(`@categorias_${route.name}`);
          setCategorias(resp);
        } catch (err2) {
          navigation.navigate(rotas.SEM_CONEXAO, {
            goHome: true,
            componente: route.name,
          });
        }
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE_AMARELO,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: title,
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}>
          <Icon name="magnify" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  function addTitle(item) {
    item.title_description = title;
    return item;
  }
  return (
    <>
      {categorias !== null && (
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
              key={item.term_id}
              name={item.name}
              component={genericComponent}
              initialParams={addTitle(item)}
            />
          ))}
        </Tab.Navigator>
      )}
    </>
  );
}
