import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import TelaDeSucesso from '../TelaDeSucesso';

const FormSucesso = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(rotas.HOME);
    }, 4000);

    return clearTimeout(timer);
  }, []);

  return (
    <TelaDeSucesso
      texto="Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS."
      corBackground={CORES.VERDE}
    />
  );
};

export default FormSucesso;
