import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BarraDeStatus from '../../components/barraDeStatus';

function MeusConteudos() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#red',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000000',
      headerTitleAlign: 'center',
      headerTitle: 'Meus Conteúdos',
      headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              {/* <Icon name="arrow-left" size={28} color="#4CAF50" /> */}
            </TouchableOpacity>
      )
    });
  });

  return (
    <>
        <BarraDeStatus barStyle="dark-content" />
    </>
  );
}

export default MeusConteudos;
