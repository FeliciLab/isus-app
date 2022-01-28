import React, { useContext } from 'react';
import { Text } from 'react-native';
import { CORES } from '~/constantes/estiloBase';
import FormContext from '~/context/FormContext';

const FormError = ({ name, msg, cor }) => {
  const { errors } = useContext(FormContext);

  return (
    <>
      {errors[name] && (
        <Text style={{ color: cor ?? CORES.VERMELHO }}>{msg}</Text>
      )}
    </>
  );
};

export default FormError;
