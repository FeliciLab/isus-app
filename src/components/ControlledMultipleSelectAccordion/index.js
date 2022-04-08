import React from 'react';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import MultipleSelectAccordion from '../MultipleSelectAccordion';

function ControlledMultipleSelectAccordion(props) {
  const { control, items, name, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <MultipleSelectAccordion
            items={items}
            values={value}
            setValues={onChange}
            {...rest}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </>
      )}
    />
  );
}

export default ControlledMultipleSelectAccordion;
