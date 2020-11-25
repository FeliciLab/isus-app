import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import featuresAtivas from '../../../src/featureAtivas';
import feature from '../../../src/constantes/features';
import ExcluirPerfil from '../../../src/pages/Perfil/excluirPerfil';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: jest.fn(),
  }),
  useIsFocused: jest.fn(),
}));

if (featuresAtivas.includes(feature.EXCLUSAO_USUARIO)) {
  test('verificar se botao de excluir perfil existe', () => {
    const { getByTestId } = render(<ExcluirPerfil />);
    const botao = getByTestId('botao-excluir-perfil');
    expect(botao).not.toBeNull();
  });

  test('verificar se o nome do botão existe', () => {
    const { getByText } = render(<ExcluirPerfil />);
    const element = getByText('EXCLUIR CONTA');
    expect(element).not.toBeNull();
  });

  test('verifica o click do botao excluir conta', async () => {
    const { findByText } = render(<ExcluirPerfil />);
    const toClick = await findByText('EXCLUIR CONTA');
    fireEvent.press(toClick);
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
