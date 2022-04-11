import React from 'react';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import SelectModal from '../SelectModal/index';

const ControlledSelectModal = props => {
  const { control, name, items, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <>
          <SelectModal
            value={value}
            items={items}
            setValue={onChange}
            placeholder="Município"
            {...rest}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </>
      )}
    />
  );
};

export default ControlledSelectModal;
