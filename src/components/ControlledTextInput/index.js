import React from 'react';
import { Controller } from 'react-hook-form';
import { HelperText, TextInput } from 'react-native-paper';

// Componente de TextInput para ser usando com o react-hook-form
const ControlledTextInput = props => {
  const { control, name, errorTextStyle, helperTextProps, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <>
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            error={error}
            ref={ref}
            {...rest}
          />
          {error && error?.message && (
            <HelperText
              style={errorTextStyle}
              type="error"
              {...helperTextProps}>
              {error.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
};

export default ControlledTextInput;
