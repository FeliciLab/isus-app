import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from '../context/FormContext';
import rotas from '../constantes/rotas';
import { getOptionsCabecalhoSemBotao } from '../components/layoutEffect/cabecalhoLayout';
import PreCadastroInfoPessoal from '../pages/PreCadastro/PreCadastroInfoPessoal';
import PreCadastroProfissional from '../pages/PreCadastro/PreCadastroProfissional';
import PreCadastroSenha from '../pages/PreCadastro/PreCadastroSenha';
import PreCadastroSucesso from '../pages/PreCadastro/PreCadastroSucesso';
import { AutenticacaoContext } from '../context/AutenticacaoContext';

const PreCadastroStack = createStackNavigator();

const PreCadastroRoutes = () => {
  const opcoes = getOptionsCabecalhoSemBotao({
    titulo: 'Cadastro',
    cor: 'branco'
  });
  const { pessoa } = useContext(AutenticacaoContext);

  return (
    <FormProvider initValues={pessoa}>
      <PreCadastroStack.Navigator>
        <PreCadastroStack.Screen
          name={rotas.PRE_CADASTRO_INFO_PESSOAL}
          component={PreCadastroInfoPessoal}
          options={opcoes}
        />
        <PreCadastroStack.Screen
          name={rotas.PRE_CADASTRO_PROFISSIONAL}
          component={PreCadastroProfissional}
          options={opcoes}
        />
        <PreCadastroStack.Screen
          name={rotas.PRE_CADASTRO_SENHA}
          component={PreCadastroSenha}
          options={opcoes}
        />
        <PreCadastroStack.Screen
          name={rotas.PRE_CADASTRO_SUCESSO}
          component={PreCadastroSucesso}
          options={{ ...opcoes, headerShown: false }}
        />
      </PreCadastroStack.Navigator>
    </FormProvider>
  );
};

export default PreCadastroRoutes;
