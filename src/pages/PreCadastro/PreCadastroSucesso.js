import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TelaDeSucesso from '../../components/TelaDeSucesso';
import { CORES } from '../../constantes/estiloBase';

const PreCadastroSucesso = ({ route }) => {
  const { usuario } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    console.log(usuario);
    setTimeout(() => {
      console.log('vou *mudar*, desculpe mais eu vou *mudar*.....');
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
