import React, { useContext } from 'react';
import { Text } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import FormContext from '~/context/FormContext';

const msgErroFormCampo = ({ campo }) => {
  const { errors } = useContext(FormContext);

  if (!errors[campo]) {
    return <></>;
  }

  return <Text style={{ color: CORES.LARANJA }}>{errors[campo].message}</Text>;
};

export default msgErroFormCampo;
