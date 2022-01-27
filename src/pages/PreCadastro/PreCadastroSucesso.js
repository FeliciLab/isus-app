import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import TelaDeSucesso from '~/components/TelaDeSucesso';
import { CORES } from '~/constantes/estiloBase';
import { AutenticacaoContext } from '~/context/AutenticacaoContext';
import { armazenarEstadoLogado } from '~/services/autenticacao';

const PreCadastroSucesso = ({ route }) => {
  const navigation = useNavigation();

  const { usuario } = route.params;

  const { alterarDadosUsuario, alterarEstaLogado, alterarPessoa } = useContext(
    AutenticacaoContext,
  );

  useEffect(() => {
    alterarDadosUsuario(usuario);
    alterarPessoa(usuario);
    alterarEstaLogado(true);
    armazenarEstadoLogado(true);

    // TODO: Por que esse timeout?
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

export default PreCadastroSucesso;
