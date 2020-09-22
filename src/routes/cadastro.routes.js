import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FormularioInfoPessoal from '../pages/NovoCadastro/formularioInfoPessoal';
import FormularioInfoProfissional from '../pages/NovoCadastro/formularioInfoProfissional';
import FormularioSenha from '../pages/NovoCadastro/formularioSenha';
import { FormProvider } from '../context/FormContext';

const CadastroStack = createStackNavigator();

export default function RotasCadastro() {
  return (
        <FormProvider>
            <CadastroStack.Navigator>
                <CadastroStack.Screen name="FormularioInfoPessoal" component={FormularioInfoPessoal} options={{ headerShown: false }} />
                <CadastroStack.Screen name="FormularioInfoProfissional" component={FormularioInfoProfissional} options={{ headerShown: false }} />
                <CadastroStack.Screen name="FormularioSenha" component={FormularioSenha} options={{ headerShown: false }} />
            </CadastroStack.Navigator>
        </FormProvider>
  );
}
