import React from 'react';
import { fireEvent, render } from 'util-teste';
import { labelsAnalytics } from '../../../../src/constantes/labelsAnalytics';
import { analyticsData } from '../../../../src/utils/analytics';
import { urls } from '../../../../src/constantes/urls';
import estaAtiva from '../../../../src/utils/estaAtiva';
import features from '../../../../src/constantes/features';
import ForcaTarefa from '../../../../src/pages/Home/ForcaTarefa';
import listaForcaTarefa from '../../../../src/pages/Home/ForcaTarefa/listaForcaTarefaAntiCorona';
import { AppTrackTransparencyProvider } from '../../../../src/context/AppTrackTransparencyContext';

const navigation = {
  navigate: jest.fn()
};

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true
  })
}));

let item = null;

beforeEach(() => {
  const { getByTestId } = render(
    <AppTrackTransparencyProvider mock>
      <ForcaTarefa navigation={navigation} />
    </AppTrackTransparencyProvider>
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

  test('deve retornar o Plano de Contigencia na segunda posição do vetor listaForcaTarefa', () => {
    expect(listaForcaTarefa[1].id).toBe('acao-plano-contigencia');
    expect(listaForcaTarefa[1].titulo).toBe('Plano de Contigência');
    expect(listaForcaTarefa[1].ativo).toBe(true);
  });

  test(`deve chamar a função navigate contendo a url ${urls.PLANO_CONTIGENCIA} quando clicar em Plano de Contigencia`, () => {
    fireEvent.press(item);
    expect(navigation.navigate).toHaveBeenCalledWith('webview', {
      title: 'Plano de Contigência',
      url: urls.PLANO_CONTIGENCIA
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
        'Home'
      );
    });
  });
} else {
  test('teste de sucesso', () => {
    expect(true);
  });
}
