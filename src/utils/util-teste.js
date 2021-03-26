import React from 'react';
import { FeatureToggles } from '@paralleldrive/react-feature-toggles';
import { render } from '@testing-library/react-native';
import { AutenticacaoProvider } from '../context/AutenticacaoContext';
import { CaixaDialogoProvider } from '../context/CaixaDialogoContext';
import featureAtivas from '../featureAtivas';

const TodosProviders = ({ children }) => (
  <FeatureToggles features={featureAtivas}>
    <AutenticacaoProvider>
      <CaixaDialogoProvider>
        {children}
      </CaixaDialogoProvider>
    </AutenticacaoProvider>
  </FeatureToggles>
);

const renderizacaoCustomizavel = (ui, options) => (
  render(ui, { wrapper: TodosProviders, ...options }));


export * from '@testing-library/react-native';

export { renderizacaoCustomizavel as render };
