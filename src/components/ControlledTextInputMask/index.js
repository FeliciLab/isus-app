import React from 'react';
import TextInputMask from 'react-native-text-input-mask';
import ControlledTextInput from '../ControlledTextInput/index';

// Componente de TextInput para ser usando com o react-hook-form com máscaras
// Por exemplo campos de CPF
const ControlledTextInputMask = props => {
  const { mask, ...rest } = props;

  return (
    <ControlledTextInput
      render={props => <TextInputMask mask={mask} {...props} />}
      {...rest}
    />
  );
};

export default ControlledTextInputMask;
