import React from 'react';
import { FormProvider } from '../../context/FormContext';
import CadastrarNovoBtn from './cadastrarNovoBtn';
import EsqueceuSenhaBtn from './esqueceuSenhaBtn';
import FormLogin from './formLogin';

// TODO: remover depois
const DefaultLogin = ({ rotaAposLogin }) => (
  <>
    <FormProvider>
      <FormLogin rotaAposLogin={rotaAposLogin || 'HOME'} />
    </FormProvider>
    <EsqueceuSenhaBtn style={{ marginTop: 20 }} />
    <CadastrarNovoBtn style={{ marginTop: 20 }} />
  </>
);

export default DefaultLogin;
