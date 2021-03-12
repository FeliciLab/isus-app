import React, { useContext } from 'react';
import { Text } from 'react-native';
import FormContext from '../../context/FormContext';
import { CORES } from '../../constantes/estiloBase';

const FormError = ({ name, msg }) => {
  const { errors } = useContext(FormContext);
  return (
    <>
      {errors[name] && (
        <Text style={{ color: CORES.VERMELHO }}>{msg}</Text>
      )}
    </>
  );
};

export default FormError;
