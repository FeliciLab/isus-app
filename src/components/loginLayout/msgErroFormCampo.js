import React, { useContext } from 'react';
import { Text } from 'react-native';
import FormContext from '../../context/FormContext';
import { cores } from '../../constantes/estiloBase';

const msgErroFormCampo = ({ campo }) => {
  const { errors } = useContext(FormContext);

  if (!errors[campo]) {
    return <></>;
  }

  return (
    <Text style={{ color: cores.laranja }}>
      {errors[campo].message}
    </Text>
  );
};

export default msgErroFormCampo;
