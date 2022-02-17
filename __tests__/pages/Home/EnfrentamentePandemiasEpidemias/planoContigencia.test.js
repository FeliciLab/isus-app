import React from 'react';
import { fireEvent, render } from 'util-teste';
import features from '~/constantes/features';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { urls } from '~/constantes/urls';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import ForcaTarefa from '~/pages/Home/ForcaTarefa';
import listaForcaTarefa from '~/pages/Home/ForcaTarefa/listaForcaTarefaAntiCorona';
import { analyticsData } from '~/utils/analytics';
import estaAtiva from '~/utils/estaAtiva';

const navigation = {
  navigate: jest.fn(),
};

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  }),
}));

let item = null;

beforeEach(() => {
  const { getByTestId } = render(
    <AppTrackTransparencyContext.Provider
      value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
      <ForcaTarefa navigation={navigation} />
    </AppTrackTransparencyContext.Provider>,
  );
  item = getByTestId('cartaoHome-forcaTarefa-acao-plano-contigencia');
});

if (estaAtiva(features.PLANO_CONTIGENCIA)) {
  test('deve mostrar o cartão de Plano de Contigencia quando renderizar componente de força tarefa ', () => {
    expect(item).not.toBeNull();
  });

  test('deve chamar a função navigate quando clicar em vacina-covid19', () => {
    fireEvent.press(item);
    expect(navigation.navigate).toHaveBeenCalled();
  });

  test('deve retornar o Plano de Contigencia na terceira posição do vetor listaForcaTarefa', () => {
    expect(listaForcaTarefa[2].id).toBe('acao-plano-contigencia');
    expect(listaForcaTarefa[2].titulo).toBe('Plano de Contingência');
    expect(listaForcaTarefa[2].ativo).toBe(true);
  });

  test(`deve chamar a função navigate contendo a url ${urls.PLANO_CONTIGENCIA} quando clicar em Plano de Contigencia`, () => {
    fireEvent.press(item);
    expect(navigation.navigate).toHaveBeenCalledWith('webview', {
      title: 'Plano de Contingência',
      url: urls.PLANO_CONTIGENCIA,
    });
  });

  describe('Testes do Analytics em Cartões', () => {
    test('deve chamar o analytics data ao clicar em cartaoHome-forcaTarefa-acao-plano-contigencia', () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalled();
    });

    test('deve chamar o analytics data ao passar os parâmetros clicar em cartaoHome-forcaTarefa-acao-plano-contigencia', () => {
      fireEvent.press(item);
      expect(analyticsData).toHaveBeenCalledWith(
        labelsAnalytics.CARTAO_PLANO_CONTIGENCIA,
        'Click',
        'Home',
      );
    });
  });
} else {
  test('teste de sucesso', () => {
    expect(true);
  });
}
