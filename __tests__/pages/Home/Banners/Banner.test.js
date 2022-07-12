import { render } from 'util-teste';
import Banner from '~/pages/Home/Banners/Banner';
import React from 'react';
// import { analyticsData } from '~/utils/analytics';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
}));

jest.mock('../../../../src/hooks/useAppTrackTransparency', () =>
  jest.fn().mockReturnValue({
    isTrackingAuthorized: true,
  }),
);

const bannerDataMock = {
  id: 14,
  titulo: 'Protocolos e Fluxogramas',
  imagem:
    'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/01/unnamed-2.png',
  valor:
    'https://coronavirus.ceara.gov.br/project/esp-ce-desenvolve-fluxograma-para-orientar-sobre-atendimento-inicial-a-pacientes-com-sindrome-gripal/',
  tipo: 'webview',
  ordem: 1,
  ativo: true,
  options: {
    localImagem: 'web',
    labelAnalytics: 'banner_fluxograma',
  },
};

describe('Testes do Componente Banner', () => {
  test('Deve renderizar o componentes corretamente', () => {
    const banner = render(<Banner data={bannerDataMock} />);

    expect(banner).toBeTruthy();
  });
});
