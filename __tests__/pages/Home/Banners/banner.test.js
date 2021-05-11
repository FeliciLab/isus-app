import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render } from 'util-teste';
import BannerCarrossel from '../../../../src/pages/Home/Banners/BannerCarrossel';
import { bannersAutenticado, bannersNaoAutenticado } from '../../../../__mocks__/banners/bannersMock';
import { gerarListaBanners } from '../../../../src/pages/Home/Banners/listaDeBanners';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    setOptions: mockedNavigate,
  }),
  useFocusEffect: jest.fn(),
  useIsFocused: jest.fn()
}));

describe('Dado que tenho a lista de banners da API', () => {
  describe('Quando estou na home', () => {
    const width = 400;
    describe('E há autenticação VALIDA', () => {
      const bannersTestIds = bannersAutenticado.map(i => `home-banner-${i.ordem}`);
      test('Então exibir os banners com a API.', () => {
        const { getByTestId } = render(
          <BannerCarrossel
            sliderWidth={width}
            itemWidth={width}
            banners={gerarListaBanners(bannersAutenticado, true)}
          />
        );

        bannersTestIds.forEach(id => expect(getByTestId(id)).not.toBeNull());
      });
    });

    describe('E NÃO há autenticação efetuada', () => {
      const bannersTestIds = bannersNaoAutenticado.map(i => `home-banner-${i.ordem}`);
      test('Então exibir os banners com a API.', () => {
        const { getByTestId } = render(
          <BannerCarrossel
            sliderWidth={width}
            itemWidth={width}
            banners={gerarListaBanners(bannersNaoAutenticado, false)}
          />
        );

        bannersTestIds.forEach(id => expect(getByTestId(id)).not.toBeNull());
      });
    });
  });
});
