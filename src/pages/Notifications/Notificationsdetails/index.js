import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';
import { useRoute } from '@react-navigation/native';

// TODO: acho que isso pode ser uma webview
const Notificationsdetails = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const { data } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: 'rgba(0, 0, 0, 0.87)',
      headerTitleAlign: 'center',
      headerTitle: 'Notificações',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color={CORES.VERDE} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};

export default Notificationsdetails;
