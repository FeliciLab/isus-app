import React from 'react';
import { Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import SelectAccordion from '../SelectAccordion/index';

function ControlledSelectAccordion(props) {
  const { control, items, name, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <SelectAccordion
            items={items}
            value={value}
            setValue={onChange}
            {...rest}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </>
      )}
    />
  );
}

export default ControlledSelectAccordion;
