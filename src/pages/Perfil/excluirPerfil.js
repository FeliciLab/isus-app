import React, {
  useLayoutEffect
} from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import {
  TextInput, DefaultTheme
} from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ExcluirPerfil() {
  const navigation = useNavigation();
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#FF9800',
      accent: '#fff',
      text: '#000000',
      background: '#fff',
      placeholder: '#000000'
    }
  };

  useFocusEffect(
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Exclusão de Perfil',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
    <View style={{ backgroundColor: '#FFF' }}>
        <Text style={estilos.title}>
        Para ter certeza de que você deseja excluir sua contar, por favor digite sua senha.
        </Text>
        <Text style={estilos.senha}>
            Senha:
        </Text>
        <TextInput
          secureTextEntry
          theme={theme}
          style={estilos.inputSenha}
          mode="outlined"
          label="Senha"
        />
    </View>
    </>
  );
}

const estilos = StyleSheet.create({
  title: {
    marginLeft: 16,
    marginRight: 16,
    fontWeight: '400',
    fontSize: 24
  },
  senha: {
    marginLeft: 16,
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 23
  },
  inputSenha: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderColor: '#FF9800'
  }
});
