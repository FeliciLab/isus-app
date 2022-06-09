import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import { ArrowLeftIcon } from '~/icons/index';
import FormularioInfoPessoal from '~/pages/NovoCadastro/FormularioInfoPessoal';
import FormularioInfoProfissional from '~/pages/NovoCadastro/FormularioInfoProfissional';
import FormularioSenha from '~/pages/NovoCadastro/FormularioSenha';

const { Navigator, Screen } = createStackNavigator();

export default function RotasCadastro() {
  const navigation = useNavigation();

  const options = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: 'rgba(0, 0, 0, 0.87)',
    headerTitleAlign: 'center',
    headerTitle: 'Cadastro',
    headerLeft: () => (
      <TouchableOpacity
        style={{
          marginHorizontal: 19,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        <ArrowLeftIcon size={28} color={CORES.AZUL} />
      </TouchableOpacity>
    ),
  };

  return (
    <Navigator>
      <Screen
        name={rotas.FORMULARIO_PESSOAL}
        component={FormularioInfoPessoal}
        options={options}
      />
      <Screen
        name={rotas.FORMULARIO_PROFISSIONAL}
        component={FormularioInfoProfissional}
        initialParams={{ tela_anterior: rotas.FORMULARIO_PESSOAL }}
        options={options}
      />
      <Screen
        name={rotas.FORMULARIO_SENHA}
        component={FormularioSenha}
        options={options}
      />
    </Navigator>
  );
}
