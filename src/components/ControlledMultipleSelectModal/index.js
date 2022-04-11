import React from 'react';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import MultipleSelectModal from '../MultipleSelectModal';

const ControlledMultipleSelectModal = props => {
  const { control, items, name, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <MultipleSelectModal
            values={value}
            items={items}
            setValues={onChange}
            {...rest}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </>
      )}
    />
  );
};

export default ControlledMultipleSelectModal;
