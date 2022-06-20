import React from 'react';
import { render } from '@testing-library/react-native';
import { AutenticacaoProvider } from '~/context/AutenticacaoContext';
import { CaixaDialogoProvider } from '~/context/CaixaDialogoContext';

const TodosProviders = ({ children }) => (
  <AutenticacaoProvider>
    <CaixaDialogoProvider>{children}</CaixaDialogoProvider>
  </AutenticacaoProvider>
);

const renderizacaoCustomizavel = (ui, options) =>
  render(ui, { wrapper: TodosProviders, ...options });

export * from '@testing-library/react-native';

export { renderizacaoCustomizavel as render };
