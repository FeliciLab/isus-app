import { render } from 'util-teste';
import React from 'react';
import BannerImagem from '~/pages/Home/Banners/BannerImagem';

const propsMock = {
  imagem:
    'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/01/BANNER-ISUS.png',
  localImagem: 'web',
};

describe('Testes do Componente BannerImagem', () => {
  test('Deve renderizar o componentes corretamente', () => {
    const banner = render(<BannerImagem {...propsMock} />);

    expect(banner).toBeTruthy();
  });

  test('Quando a imagem é web', () => {
    const banner = render(<BannerImagem {...propsMock} />);

    const bannerJSON = banner.toJSON();

    expect(bannerJSON.type).toEqual('Image');

    expect(bannerJSON.props.source).toEqual({ uri: propsMock.imagem });
  });
});
