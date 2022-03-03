import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import TelaDeSucesso from '~/components/TelaDeSucesso';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';

const PreCadastroSucesso = ({ route }) => {
  const navigation = useNavigation();

  const { usuario } = route.params;

  const { setUser, alterarPessoa } = useAutenticacao();

  useEffect(() => {
    setUser(usuario);
    alterarPessoa(usuario);

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
