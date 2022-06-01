import React from 'react';
import {
  // fireEvent,
  render,
} from 'util-teste';
import { TESTIDS } from '~/constantes/testIDs';
import { AppTrackTransparencyContext } from '~/context/AppTrackTransparencyContext';
import DemandaEducacaoFrom from '~/pages/FaleConosco/DemandaEducacaoFrom';
// import { labelsAnalytics } from '~/constantes/labelsAnalytics';
// import DemandaEducacao from '~/pages/FaleConoscoScreen/demandaEducacao';
// import { analyticsData } from '~/utils/analytics';

const mockedNavigate = jest.fn();

const showFeedBackMessage = jest.fn();

jest.mock('../../../src/utils/validadores.js', () => ({
  descricaoValida: jest.fn(() => true),
  unidadeDeSaudeValida: jest.fn(() => true),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn(),
}));

describe('descreve os testes de Fale conosco', () => {
  let BotaoDemandaEducacao = null;
  beforeEach(() => {
    const { getByTestId } = render(
      <AppTrackTransparencyContext.Provider
        value={{ trackingStatus: 'active', isTrackingAuthorized: true }}>
        <DemandaEducacaoFrom showFeedBackMessage={showFeedBackMessage} />
      </AppTrackTransparencyContext.Provider>,
    );

    BotaoDemandaEducacao = getByTestId(TESTIDS.BOTAO_DEMANDAEDUCACAO_ENVIAR);
  });

  test('deve renderizar o botão de enviar ao renderizar o alertaFaltaEPI', () => {
    expect(BotaoDemandaEducacao).not.toBeNull();
  });

  // TODO: ajustar os testes para poder usar as validações
  // Não conseguimos fazer esses testes pq o analitycis só é chamando quando se conclui o envio dos
  // dados
  // test('deve  chamar o analyticsData quando clicar no bota botão de enviar', () => {
  //   fireEvent.press(BotaoDemandaEducacao);
  //   expect(analyticsData).toHaveBeenCalled();
  // });

  // test('deve  chamar o analyticsData com os parâmetros corretos quando clicar no bota botão de enviar', () => {
  //   fireEvent.press(BotaoDemandaEducacao);
  //   expect(analyticsData).toHaveBeenCalledWith(
  //     labelsAnalytics.ENVIAR_DEMANDA_EDUCACAO,
  //     'Click',
  //     'Fale Conosco',
  //   );
  // });
});
