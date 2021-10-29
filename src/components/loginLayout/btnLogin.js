import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import FormContext from '../../context/FormContext';
import { CORES } from '../../constantes/estiloBase';

const BtnLogin = props => {
  const { acao, style, carregando, ...rest } = props;

  const { handleSubmit } = useContext(FormContext);

  return (
    <Button
      dark
      loading={carregando}
      color={CORES.LARANJA}
      mode="contained"
      onPress={handleSubmit(acao)}
      uppercase
      style={{
        borderRadius: 30,
        paddingTop: 5,
        paddingBottom: 5,
        ...style
      }}
      {...rest}
    >
      Fazer Login
    </Button>
  );
};

export default BtnLogin;
