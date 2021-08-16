import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { render, fireEvent } from 'util-teste';
import BannerCarrossel from '../../../../src/pages/Home/Banners/BannerCarrossel';
import { bannersAutenticado, bannersNaoAutenticado, bannersRota } from '../../../../__mocks__/banners/bannersMock';
import { gerarListaBanners } from '../../../../src/pages/Home/Banners/listaDeBanners';
import { AppTrackTransparencyProvider } from '../../../../src/context/AppTrackTransparencyContext';

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

jest.mock('@react-native-community/netinfo', () => ({
  ...jest.requireActual('@react-native-community/netinfo'),
  useNetInfo: () => ({
    isConnected: true,
  })
}));

describe('Banner', () => {
  describe('Dado que tenho a lista de banners da API', () => {
    describe('Quando estou na home', () => {
      const width = 400;
      describe('E há autenticação VALIDA', () => {
        const bannersTestIds = bannersAutenticado.map(i => `home-banner-${i.ordem}`);
        test('Então exibir os banners com a API.', () => {
          const { getByTestId } = render(
            <AppTrackTransparencyProvider mock>
              <BannerCarrossel
                sliderWidth={width}
                itemWidth={width}
                banners={gerarListaBanners(bannersAutenticado, true)}
              />
            </AppTrackTransparencyProvider>
          );
          bannersTestIds.forEach(id => expect(getByTestId(id)).not.toBeNull());
        });
      });


      describe('E NÃO há autenticação efetuada', () => {
        const bannersTestIds = bannersNaoAutenticado.map(i => `home-banner-${i.ordem}`);
        test('Então exibir os banners com a API.', () => {
          const { getByTestId } = render(
            <AppTrackTransparencyProvider mock>
              <BannerCarrossel
                sliderWidth={width}
                itemWidth={width}
                banners={gerarListaBanners(bannersNaoAutenticado, false)}
              />
            </AppTrackTransparencyProvider>
          );
          bannersTestIds.forEach(id => expect(getByTestId(id)).not.toBeNull());
        });
      });
    });
  });

  describe('Dado que clico em um banner na home', () => {
    let ordem = 1;
    let bannerTestId;
    const width = 400;
    let banner;
    beforeEach(() => {
      const { getByTestId } = render(
        <AppTrackTransparencyProvider mock>
          <BannerCarrossel
            sliderWidth={width}
            itemWidth={width}
            banners={gerarListaBanners(bannersNaoAutenticado, false)}
          />
        </AppTrackTransparencyProvider>
      );
      bannerTestId = `home-banner-${ordem}`;
      banner = getByTestId(bannerTestId);
      ordem += 1;
    });
    describe('Quando o banner Vacina Covid está configurado para abrir uma webview', () => {
      describe('Então o componenete WebView com a URL é chamado', () => {
        test('deve chamar navigate ao clicar redirecionando para webview Vacina Covid', () => {
          fireEvent.press(banner);
          expect(mockedNavigate).toHaveBeenCalledWith('webview', {
            title: 'Vacina\u00e7\u00e3o',
            url: 'https://coronavirus.ceara.gov.br/vacina'
          });
        });
      });
    });
    describe('Quando o banner Guia assistencia está configurado para abrir uma webview', () => {
      describe('Então o componenete WebView com a URL é chamado', () => {
        test('deve chamar navigate ao clicar redirecionando para webview Guia assistencia Farmaceutica', () => {
          fireEvent.press(banner);
          expect(mockedNavigate).toHaveBeenCalledWith('webview', {
            title: 'Guia de Assist\u00eancia Farmac\u00eautica',
            url: 'https://coronavirus.ceara.gov.br/project/secretaria-de-saude-disponibiliza-guia-da-assistencia-farmaceutica-no-estado-do-ceara/'
          });
        });
      });
    });
  });

  const width = 400;
  describe('Dado que clico em um banner tipo rota', () => {
    describe('Quando o banner é IDSAÚDE', () => {
      describe('E fiz login', () => {
        test('Deve chamar a rota perfil', () => {
          const { getByTestId } = render(
            <AppTrackTransparencyProvider mock>
              <BannerCarrossel
                sliderWidth={width}
                itemWidth={width}
                banners={gerarListaBanners(bannersRota, true)}
              />
            </AppTrackTransparencyProvider>
          );
          const banner = getByTestId('home-banner-3');
          fireEvent.press(banner);
          expect(mockedNavigate).toHaveBeenCalledWith('PERFIL');
        });
      });
      describe('E não fiz login', () => {
        test('Deve chamar a rota LOGIN', () => {
          const { getByTestId } = render(
            <AppTrackTransparencyProvider mock>
              <BannerCarrossel
                sliderWidth={width}
                itemWidth={width}
                banners={gerarListaBanners(bannersRota, false)}
              />
            </AppTrackTransparencyProvider>
          );
          const banner = getByTestId('home-banner-3');
          fireEvent.press(banner);
          expect(mockedNavigate).toHaveBeenCalledWith('LOGIN');
        });
      });
    });
  });
});
