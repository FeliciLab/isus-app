import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import feature from '../../../src/constantes/features';
import { DadosUsuarioProfissional } from '../../../src/pages/Perfil/DadosUsuario';
import dadosUsuario from '../../../__mocks__/valores/dadosUsuario';
import estaAtiva from '../../../src/utils/estaAtiva';
import { labelsAnalytics } from '../../../src/constantes/labelsAnalytics';
import { analyticsData } from '../../../src/utils/analytics';
import { AppTrackTransparencyProvider } from '../../../src/context/AppTrackTransparencyContext';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

if (estaAtiva(feature.EDICAO_DE_INFORMACOES_PROFISSIONAIS)) {
  describe('EdicaoInformacaoProfissional', () => {
    let renderedObject;
    beforeEach(() => {
      renderedObject = render(
        <AppTrackTransparencyProvider mock>
          <DadosUsuarioProfissional dados={dadosUsuario} />
        </AppTrackTransparencyProvider>
      );
    });

    test('verifica se o botao de edicao esta na tela', () => {
      const botao = renderedObject.getByTestId(labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS);
      expect(botao).not.toBeNull();
    });

    test('deve chamar navigate ao clicar no botao de editar', () => {
      const botao = renderedObject.getByTestId(labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS);
      fireEvent.press(botao);
      expect(mockedNavigate).toHaveBeenCalled();
    });

    test(`deve chamar analytics ao clicar no botao de editar ${labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS}`, () => {
      const botao = renderedObject.getByTestId(labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS);
      fireEvent.press(botao);

      expect(analyticsData).toHaveBeenCalled();
    });

    test(`deve chamar analytics ao clicar no botao de editar ${labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS} com parâmetros corretos`, () => {
      const botao = renderedObject.getByTestId(labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS);
      fireEvent.press(botao);

      expect(analyticsData).toHaveBeenCalledWith(
        labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS,
        'Click',
        'Perfil'
      );
    });
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
