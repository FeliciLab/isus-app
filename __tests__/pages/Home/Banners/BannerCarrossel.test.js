import React from 'react';
import { render, fireEvent, act } from 'util-teste';
import BannerCarrossel from '~/pages/Home/Banners/BannerCarrossel';
import banners from '../../../../__mocks__/banners/bannersMock';
import { analyticsData } from '~/utils/analytics';

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

describe('Testes do Componente BannerCarrossel', () => {
  test('Deve renderizar o componente corretamente', () => {
    const banner = render(<BannerCarrossel banners={banners} />);

    expect(banner).toBeTruthy();
  });

  test('Deve renderizar o Cada um dos banners', () => {
    const { getByTestId } = render(<BannerCarrossel banners={banners} />);

    banners.forEach(item => {
      const banner = getByTestId(`banner-${item.id}`);
      expect(banner).toBeTruthy();
    });
  });

  test('Deve chamar o analitics quando precionar um banner', async () => {
    const { getByTestId } = render(<BannerCarrossel banners={banners} />);

    const firtBanner = getByTestId(`banner-${banners[0].id}`);

    await act(() => {
      fireEvent.press(firtBanner);
    });

    expect(analyticsData).toHaveBeenCalled();
  });

  test('Deve chamar o analitics quando precionar um banner com os parametros corretos', async () => {
    const { getByTestId } = render(<BannerCarrossel banners={banners} />);

    const firtBanner = getByTestId(`banner-${banners[0].id}`);

    await act(() => {
      fireEvent.press(firtBanner);
    });

    expect(analyticsData).toHaveBeenCalledWith(
      banners[0].options.labelAnalytics,
      'Click',
      'Home',
    );
  });
});
