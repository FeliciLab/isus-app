import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import TelaDeSucesso from '../TelaDeSucesso';
import { CORES } from '../../constantes/estiloBase';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import { armazenarEstadoLogado } from '../../services/autenticacao';

const FormSucesso = ({ route }) => {
  const navigation = useNavigation();
  const { usuario } = route.params;
  const {
    alterarDadosUsuario,
    alterarEstaLogado
  } = useContext(AutenticacaoContext);

  useEffect(() => {
    alterarDadosUsuario(usuario);
    alterarEstaLogado(true);
    armazenarEstadoLogado(true);

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
