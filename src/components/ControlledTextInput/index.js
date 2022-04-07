import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { Controller } from 'react-hook-form';

// Componente de TextInput para ser usando com o react-hook-form
const ControlledTextInput = props => {
  const { control, name, ...rest } = props;

  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={error}
            {...rest}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </>
      )}
      name={name}
    />
  );
};

export default ControlledTextInput;
