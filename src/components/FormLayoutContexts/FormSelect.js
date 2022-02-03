import React, { useContext, useRef } from 'react';
import { Dropdown } from 'react-native-material-dropdown-v2';
import IconDropdown from 'react-native-vector-icons/MaterialIcons';
import { Controller } from 'react-hook-form';
import FormContext from '~/context/FormContext';
import { CORES } from '~/constantes/estiloBase';

const FormSelect = ({ data, name, rules, label }) => {
  const dropdown = useRef();
  const { control, setValue } = useContext(FormContext);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ onChange, onBlur, onFocus, value }) => (
        <>
          <Dropdown
            ref={dropdown}
            label={label}
            value={value}
            data={data}
            labelExtractor={labelExtractor => labelExtractor.label}
            valueExtractor={valueExtractor => valueExtractor.value}
            onChangeText={value => {
              setValue(`_hidden.${name}`, value);
              onChange(value);
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            baseColor={CORES.LARANJA}
          />
          <IconDropdown
            style={{
              position: 'absolute',
              right: 8,
              top: 30,
              fontSize: 25,
            }}
            name="arrow-drop-down"
            onPress={() => dropdown.current.focus()}
          />
        </>
      )}
    />
  );
};

export default FormSelect;
