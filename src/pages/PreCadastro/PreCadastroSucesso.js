import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import TelaDeSucesso from '~/components/TelaDeSucesso';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';

const PreCadastroSucesso = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(rotas.HOME);
    }, 4000);
  }, []);

  return (
    <TelaDeSucesso
      texto="Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS."
      corBackground={CORES.VERDE}
    />
  );
};

export default PreCadastroSucesso;
