// import React from 'react';
import estaAtiva from '../utils/estaAtiva';
import features from '../constantes/features';
// import CartaoHome from '../pages/Home/cartaoHome';

if (estaAtiva(features.LISTA_CARDS)) {
  /* const definirCard = ({
    titulo,
    slug,
    imagem,
    valor,
    tipo,
    ordem,
    options
  }) => {
    if (tipo === 'webview') {
      return (
        <CartaoHome
          testID={`${titulo}-card-${slug}`}
          cor={cor}
          localImagem={imagem}
          login={login}
          labelAnalytics={labelAnalytics}
        />
      );
    }
    return <></>;
  }; */
}

// export default { definirCard };
