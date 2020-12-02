import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import FormContext from '../../context/FormContext';
import { cores } from '../estiloBase';

const BtnLogin = ({ acao, style, carregando }) => {
  const { handleSubmit } = useContext(FormContext);
  return (
    <Button
      dark
      loading={carregando}
      color={cores.laranja}
      mode="contained"
      onPress={handleSubmit(acao)}
      uppercase
      style={{
        borderRadius: 30,
        paddingTop: 5,
        paddingBottom: 5,
        ...style
      }}
    >
      Fazer Login
    </Button>
  );
};

export default BtnLogin;
