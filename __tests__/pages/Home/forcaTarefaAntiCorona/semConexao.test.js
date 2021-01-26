import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { fireEvent, render } from 'util-teste';
import rotas from '../../../../src/constantes/rotas';
import ForcaTarefa from '../../../../src/pages/Home/ForcaTarefa';

const navigation = {
  navigate: jest.fn()
};

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: false,
  })
}));

describe('Teste de cenário de sem conexão do Força Tarefa', () => {
  test(`deve chamar a função navigate com o parâmetro
        sem conexao quando clicar no cartão "cartaoHome-forcaTarefa-acao-vacinaCOVID19"`, () => {
    const { getByTestId } = render(<ForcaTarefa navigation={navigation} />);
    const item = getByTestId('cartaoHome-forcaTarefa-acao-vacinaCOVID19');
    fireEvent.press(item);
    expect(navigation.navigate).toHaveBeenCalledWith(rotas.SEM_CONEXAO);
  });
});
