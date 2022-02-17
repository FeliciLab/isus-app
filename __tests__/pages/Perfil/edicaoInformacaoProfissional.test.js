import React from 'react';
import { fireEvent, render } from 'util-teste';
import feature from '~/constantes/features';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import { DadosUsuarioProfissional } from '~/pages/Perfil/DadosUsuario';
import { analyticsData } from '~/utils/analytics';
import estaAtiva from '~/utils/estaAtiva';
import dadosUsuario from '../../../__mocks__/valores/dadosUsuario';

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
        <AppTrackTransparencyContext.Provider
          value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
          <DadosUsuarioProfissional dados={dadosUsuario} />
        </AppTrackTransparencyContext.Provider>,
      );
    });

    test('verifica se o botao de edicao esta na tela', () => {
      const botao = renderedObject.getByTestId(
        labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS,
      );
      expect(botao).not.toBeNull();
    });

    test('deve chamar navigate ao clicar no botao de editar', () => {
      const botao = renderedObject.getByTestId(
        labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS,
      );
      fireEvent.press(botao);
      expect(mockedNavigate).toHaveBeenCalled();
    });

    test(`deve chamar analytics ao clicar no botao de editar ${labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS}`, () => {
      const botao = renderedObject.getByTestId(
        labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS,
      );
      fireEvent.press(botao);

      expect(analyticsData).toHaveBeenCalled();
    });

    test(`deve chamar analytics ao clicar no botao de editar ${labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS} com parâmetros corretos`, () => {
      const botao = renderedObject.getByTestId(
        labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS,
      );
      fireEvent.press(botao);

      expect(analyticsData).toHaveBeenCalledWith(
        labelsAnalytics.EDITAR_INFORMACOES_PROFISSIONAIS,
        'Click',
        'Perfil',
      );
    });
  });
} else {
  test('teste de exemplo', () => {
    expect(true);
  });
}
