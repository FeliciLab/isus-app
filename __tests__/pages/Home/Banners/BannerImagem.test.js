import { render } from 'util-teste';
import React from 'react';
import BannerImagem from '~/pages/Home/Banners/BannerImagem';

const propsInWebMock = {
  imagem:
    'https://coronavirus.ceara.gov.br/wp-content/uploads/2022/01/BANNER-ISUS.png',
  localImagem: 'web',
};

const propsInAppMock = {
  imagem: 'images/banners/IDSaude.png',
  localImagem: 'app',
};

describe('Testes do Componente BannerImagem', () => {
  test('Deve renderizar o componentes corretamente', () => {
    const banner = render(<BannerImagem {...propsInWebMock} />);

    expect(banner).toBeTruthy();
  });

  test('Quando a imagem está web', () => {
    const banner = render(<BannerImagem {...propsInWebMock} />);

    const bannerJSON = banner.toJSON();

    expect(bannerJSON.type).toEqual('Image');

    expect(bannerJSON.props.source).toEqual({ uri: propsInWebMock.imagem });
  });

  test('Quando a imagem está app', () => {
    const banner = render(<BannerImagem {...propsInAppMock} />);

    const bannerJSON = banner.toJSON();

    console.log(bannerJSON);

    expect(bannerJSON.type).toEqual('Image');

    expect(bannerJSON.props.source.process).toBeInstanceOf(Function);
  });
});
