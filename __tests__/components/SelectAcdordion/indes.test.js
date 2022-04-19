import { render } from '@testing-library/react-native';
import React from 'react';
import SelectAccordion from '~/components/SelectAccordion';

const setValueMock = jest.fn();

const items = [
  { value: '1', label: 'Teste 01' },
  { value: '2', label: 'Teste 02' },
  { value: '3', label: 'Teste 03' },
  { value: '4', label: 'Teste 04' },
];

describe('Testes do Componente Select Acordion', () => {
  let selectAccordionRendered;

  beforeEach(() => {
    selectAccordionRendered = render(
      <SelectAccordion
        title="title"
        value=""
        setValue={setValueMock}
        placeholder="placeholder"
        items={items}
      />,
    );
  });

  it('Deve renderizar quando chamado', () => {
    const { container } = selectAccordionRendered;

    expect(container).toBeTruthy();
  });

  it('Deve ter o texto do title', () => {
    const { getByText } = selectAccordionRendered;

    const title = getByText('title');

    expect(title).toBeTruthy();
  });

  it('Deve ter o placeholder', () => {
    const { getByText } = selectAccordionRendered;

    const placeholder = getByText('placeholder');

    expect(placeholder).toBeTruthy();
  });
});
