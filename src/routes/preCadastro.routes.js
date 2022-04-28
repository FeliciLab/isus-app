import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { getOptionsCabecalhoSemBotao } from '~/components/layoutEffect/cabecalhoLayout';
import rotas from '~/constantes/rotas';
import PreCadastroInfoPessoal from '~/pages/PreCadastro/PreCadastroInfoPessoal';
import PreCadastroIntroducao from '~/pages/PreCadastro/PreCadastroIntroducao';
import PreCadastroInfoProfissional from '~/pages/PreCadastro/PreCadastroInfoProfissional';
import PreCadastroSucesso from '~/pages/PreCadastro/PreCadastroSucesso';

const PreCadastroStack = createStackNavigator();

// Rotas para o cadastro para quando um usuário tem idSaude mas não se cadastrou ainda no iSUS
export default function PreCadastroRoutes() {
  const options = getOptionsCabecalhoSemBotao({
    titulo: 'Cadastro',
    cor: 'branco',
  });

  return (
    <PreCadastroStack.Navigator>
      <PreCadastroStack.Screen
        name={rotas.PRE_CADASTRO_INTRODUCAO}
        component={PreCadastroIntroducao}
        options={options}
      />
      <PreCadastroStack.Screen
        name={rotas.PRE_CADASTRO_INFO_PESSOAL}
        component={PreCadastroInfoPessoal}
        options={options}
      />
      <PreCadastroStack.Screen
        name={rotas.PRE_CADASTRO_INFO_PROFISSIONAL}
        component={PreCadastroInfoProfissional}
        options={options}
      />
      <PreCadastroStack.Screen
        name={rotas.PRE_CADASTRO_SUCESSO}
        component={PreCadastroSucesso}
        options={{ ...options, headerShown: false }}
      />
    </PreCadastroStack.Navigator>
  );
}
