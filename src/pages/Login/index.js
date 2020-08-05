import React, { useLayoutEffect } from 'react';
import {
  View, Text, StatusBar, SafeAreaView, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Login() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#304FFE',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'ID Saúde',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
      <StatusBar backgroundColor="#304FFE" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#304FFE' }}>
        <View>
          <Text>
            Crie seu ID Saúde para ter acesso a conteúdos
            personalizados com seu perfil do iSUS!
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Login;
