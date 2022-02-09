import React from 'react';
import { fireEvent, render } from 'util-teste';
import features from '../../../../src/constantes/features';
import { labelsAnalytics } from '../../../../src/constantes/labelsAnalytics';
import { urls } from '../../../../src/constantes/urls';
import { AppTrackTransparencyContext } from '../../../../src/context/AppTrackTransparencyContext';
import ForcaTarefa from '../../../../src/pages/Home/ForcaTarefa';
import { analyticsData } from '../../../../src/utils/analytics';
import estaAtiva from '../../../../src/utils/estaAtiva';

let item = null;

const navigation = {
  navigate: jest.fn(),
};

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  }),
}));

if (estaAtiva(features.VACINACOVID19)) {
  beforeEach(() => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <ForcaTarefa navigation={navigation} />
      </AppTrackTransparencyContext.Provider>,
    );
    item = getByTestId('cartaoHome-forcaTarefa-acao-vacinaCOVID19');
  });

  describe('testes do cartão da vacina covid19', () => {
    test('deve mostrar o cartão da vacina-covid19 quando renderizar componente de serviços ', () => {
      expect(item).not.toBeNull();
    });

    test('deve chamar o analytics data quando clicar em vacina-covid19', () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });

    test(`deve chamar o analytics data quando clicar em vacina-covid19 com o parâmetro do ${labelsAnalytics.CARTAO_VACINA_COVID19}`, () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalledWith(
        labelsAnalytics.CARTAO_VACINA_COVID19,
        'Click',
        'Home',
      );
    });

    test('deve chamar a função navigate contendo a url "http://coronavirus.ceara.gov.br/vacina" quando clicar em vacina-covid19 ', () => {
      fireEvent.press(item);
      expect(navigation.navigate).toHaveBeenCalledWith('webview', {
        title: 'Vacinação',
        url: urls.VACINA_COVID19,
      });
    });
  });
} else {
  test('teste de sucesso', () => {
    expect(true);
  });
}
