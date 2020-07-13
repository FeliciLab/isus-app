/**
 * @format
 */
import { Share } from 'react-native';
import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import DescriptionScreen from '../src/pages/Content/Description';
import MockedNavigator from '../__mocks__/navigator/mocked-navigator';
import projetoMock from '../__mocks__/valores/projetoMock';
import Armazenamento from '../src/services/armazenamento';

jest.mock('react-native-vector-icons/SimpleLineIcons', () => ({
  loadFont: function loadFont() {
    return '';
  }
}));

jest.mock('../src/services/armazenamento', () => ({
  pegarDados: jest.fn(),
  salvarDados: jest.fn()
}));

jest.mock('../src/apis/apiHome', () => ({
  getProjectPorId: function getProjectPorId() {
    return new Promise(
      res => res,
      rej => rej
    );
  }
}));

const component = <MockedNavigator component={DescriptionScreen} params={{ object: projetoMock, title: 'Educação Permanente' }} />;

// Note: test renderer must be required after react-native.
describe('Description', () => {
  it('carrega corretamente', () => {
    const descriptionScreen = render(component).toJSON();
    expect(descriptionScreen).toMatchSnapshot();
  });

  it('chama biblioteca de compartilhamento quando clica no ícone de compartilhar', () => {
    const { getAllByA11yRole } = render(component);
    const share = jest.spyOn(Share, 'share');
    fireEvent.press(getAllByA11yRole('button')[0]);
    expect(share).toHaveBeenCalled();
  });

  it('baixa conteúdo para o celular quando clica no botão de download', () => {
    const { getAllByA11yRole } = render(component);
    const salvarDadosSpy = jest.spyOn(Armazenamento, 'salvarDados');
    fireEvent.press(getAllByA11yRole('button')[1]);
    expect(salvarDadosSpy).toHaveBeenCalled();
  });

  it('muda o ícone ao clicar em baixar conteúdo', () => {
    const app = render(component);
    expect(app.toJSON()).toMatchSnapshot();
    fireEvent.press(app.getAllByA11yRole('button')[1]);
    expect(app.toJSON()).toMatchSnapshot();
    fireEvent.press(app.getAllByA11yRole('button')[1]);
    expect(app.toJSON()).toMatchSnapshot();
  });
});
