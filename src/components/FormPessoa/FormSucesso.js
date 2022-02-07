import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { CORES } from '~/constantes/estiloBase';
import useAutenticacao from '~/hooks/useAutenticacao';
import TelaDeSucesso from '../TelaDeSucesso';

const FormSucesso = ({ route }) => {
  const navigation = useNavigation();

  const { usuario } = route.params;

  const { setUser } = useAutenticacao();

  useEffect(() => {
    setUser(usuario);

    setTimeout(() => {
      navigation.navigate('HOME');
    }, 4000);
  }, []);

  return (
    <TelaDeSucesso
      texto="Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS."
      corBackground={CORES.VERDE}
    />
  );
};

export default FormSucesso;
