import React, { useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import useApiHooks from '../hooks/apiHooks';
import { CORES } from '../constantes/estiloBase';

const Tab = createMaterialTopTabNavigator();
const indexComponent = 0;
const indexTitle = 1;


export default function EducationTabScreen(props) {
  const { route } = props;
  const genericComponent = route.params[indexComponent].type;
  const title = route.params[indexTitle];
  const navigation = useNavigation();
  const useApi = useApiHooks(props);
  let estaConectado;

  NetInfo.addEventListener((state) => {
    estaConectado = state.isConnected;
  });

  useFocusEffect(() => {
    useCallback(() => {
      useApi.pegarCategorias();
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE_AMARELO,
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: title,
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      )
    });
  });

  function addTitle(item) {
    item.title_description = title;
    return item;
  }

  return (
    <>
      {(useApi.categorias !== null) && estaConectado ? (
        <Tab.Navigator
          tabBarOptions={{
            scrollEnabled: true,
            labelStyle: {
              fontSize: 14
            },
            indicatorStyle: { backgroundColor: CORES.BRANCO },
            inactiveTintColor: CORES.PRETO54,
            activeTintColor: CORES.BRANCO,
            style: {
              backgroundColor: CORES.VERDE
            }
          }}
        >
          {useApi.categorias.map(item => (
            <Tab.Screen
              key={item.term_id}
              name={item.name}
              component={genericComponent}
              initialParams={addTitle(item)}
            />
          ))}
        </Tab.Navigator>
      ) : (<></>)
      }
    </>
  );
}
