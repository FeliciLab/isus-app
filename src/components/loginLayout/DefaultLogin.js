import React from 'react';
import { FormProvider } from '../../context/FormContext';
import FormLogin from './formLogin';
import EsqueceuSenhaBtn from './esqueceuSenhaBtn';
import CadastrarNovoBtn from './cadastrarNovoBtn';

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
