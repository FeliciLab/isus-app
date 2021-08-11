import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import feature from '../../../src/constantes/features';
import { DadosUsuarioProfissional } from '../../../src/pages/Perfil/DadosUsuario';
import dadosUsuarioSemInfoProfissional from '../../../__mocks__/valores/dadosUsuarioSemInfoProfisisonal';
import estaAtiva from '../../../src/utils/estaAtiva';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));


if (estaAtiva(feature.EDICAO_DE_INFORMACOES_PROFISSIONAIS)) {
  let renderObject;
  beforeEach(() => {
    renderObject = render(
      <AppTrackTransparencyProvider mock>
        <DadosUsuarioProfissional dados={dadosUsuarioSemInfoProfissional} />
      </AppTrackTransparencyProvider>
    );
  });

  test('botao de adicao deve estar na tela', () => {
    const botao = renderObject.getByTestId('botao-dados-adicionar');
    expect(botao).not.toBeNull();
  });

  test('deve chamar navigate ao clicar no botao de adicionar', () => {
    const botao = renderObject.getByTestId('botao-dados-adicionar');
    fireEvent.press(botao);

    expect(mockedNavigate).toHaveBeenCalled();
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
