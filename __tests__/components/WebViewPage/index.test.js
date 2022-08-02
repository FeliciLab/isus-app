import WebViewPage from '~/pages/WebViewPage';
import { render } from '~/utils/util-teste';
import React from 'react';

const paramsMock = {
  url: 'Alguma coisa aqui',
  title: 'WebViewPage',
  barraDeStatusProps: { backgroundColor: '#000' },
  activityIndicatorProps: {
    color: '#000',
  },
};

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useIsFocused: jest.fn(),
  useRoute: jest.fn().mockReturnValue({
    params: paramsMock,
  }),
}));

describe('WebViewPage', () => {
  test('Deve conseguir renderizar o component', () => {
    const webViewPage = render(<WebViewPage />);

    expect(webViewPage).toBeTruthy();
  });
});
