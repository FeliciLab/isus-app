import { render } from '@testing-library/react-native';
import React from 'react';
import HistoricoEmBranco from '~/components/HistoricoEmBranco';

describe('Testes do Componente HistoricoEmBranco', () => {
  let selectAccordionRendered;

  beforeEach(() => {
    selectAccordionRendered = render(<HistoricoEmBranco />);
  });

  it('Deve ter os textos corretamente', () => {
    const { getByText } = selectAccordionRendered;

    const title = getByText('Histórico em branco');
    const subTitle = getByText(
      'Ainda não há frequências lançadas para o evento selecionado.',
    );

    expect(title).toBeTruthy();
    expect(subTitle).toBeTruthy();
  });
});
