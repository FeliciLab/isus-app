import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { getOptionsCabecalhoSemBotao } from '~/components/layoutEffect/cabecalhoLayout';
import rotas from '~/constantes/rotas';
import PreCadastroInfoPessoal from '~/pages/PreCadastro/PreCadastroInfoPessoal';
import PreCadastroInfoProfissional from '~/pages/PreCadastro/PreCadastroInfoProfissional';
import PreCadastroIntroducao from '~/pages/PreCadastro/PreCadastroIntroducao';
import PreCadastroSucesso from '~/pages/PreCadastro/PreCadastroSucesso';

const { Screen, Navigator } = createStackNavigator();

// Rotas para o cadastro para quando um usuário tem idSaude mas não se cadastrou ainda no iSUS
export default function PreCadastroRoutes() {
  const options = getOptionsCabecalhoSemBotao({
    titulo: 'Cadastro',
    cor: 'branco',
  });

  return (
    <Navigator>
      <Screen
        name={rotas.PRE_CADASTRO_INTRODUCAO}
        component={PreCadastroIntroducao}
        options={options}
      />
      <Screen
        name={rotas.PRE_CADASTRO_INFO_PESSOAL}
        component={PreCadastroInfoPessoal}
        options={options}
      />
      <Screen
        name={rotas.PRE_CADASTRO_INFO_PROFISSIONAL}
        component={PreCadastroInfoProfissional}
        options={options}
      />
      <Screen
        name={rotas.PRE_CADASTRO_SUCESSO}
        component={PreCadastroSucesso}
        options={{ ...options, headerShown: false }}
      />
    </Navigator>
  );
}
