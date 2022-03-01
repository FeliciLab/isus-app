import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { cabecalhoVoltar } from '~/components/layoutEffect/cabecalhoLayout';
import DefaultLogin from '~/components/loginLayout/DefaultLogin';
import rotas from '~/constantes/rotas';

const LoginFrequencias = () => {
  const navigation = useNavigation();

  useLayoutEffect(() =>
    cabecalhoVoltar(
      {
        navegador: navigation,
        cor: 'verde',
        titulo: 'Frequências',
      },
      [],
    ),
  );

  return <DefaultLogin rotaAposLogin={rotas.LISTAR_OFERTAS} />;
};

export default LoginFrequencias;
