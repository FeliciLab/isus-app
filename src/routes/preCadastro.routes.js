import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from '../context/FormContext';
import rotas from '../constantes/rotas';
import { getOptionsCabecalhoSemBotao } from '../components/layoutEffect/cabecalhoLayout';
import PreCadastroInfoPessoal from '../pages/PreCadastro/PreCadastroInfoPessoal';
import PreCadastroProfissional from '../pages/PreCadastro/PreCadastroProfissional';
import PreCadastroSenha from '../pages/PreCadastro/PreCadastroSenha';

const PreCadastroStack = createStackNavigator();

const PreCadastroRoutes = () => {
  const opcoes = getOptionsCabecalhoSemBotao({
    titulo: 'Cadastro',
    cor: 'branco'
  });

  return (
    <FormProvider>
      <PreCadastroStack.Navigator>
        <PreCadastroStack.Screen
          name={rotas.PRE_CADASTRO_INFO_PESSOAL}
          component={PreCadastroInfoPessoal}
          options={opcoes}
        />

        <PreCadastroStack.Screen
          name={rotas.PRE_CADASTRO_PROFISSIONAL}
          component={PreCadastroProfissional}
          initialParams={{ tela_anterior: rotas.PRE_CADASTRO_INFO_PESSOAL }}
          options={opcoes}
        />

        <PreCadastroStack.Screen
          name={rotas.PRE_CADASTRO_SENHA}
          component={PreCadastroSenha}
          options={opcoes}
        />
      </PreCadastroStack.Navigator>
    </FormProvider>
  );
};

export default PreCadastroRoutes;
