import React, { useState, useContext, useEffect } from 'react';
import { Checkbox, DefaultTheme } from 'react-native-paper';
import randomKey from '../../utils/randomKey';
import { CORES } from '../../constantes/estiloBase';
import FormContext from '../../context/FormContext';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(0, 0, 0, 0.6);',
    accent: CORES.LARANJA
  }
};

const FormCheckboxListItem = ({ name, label, value, updateItems }) => {
  const [checked, setChecked] = useState('unchecked');

  const { setValue, getValues } = useContext(FormContext);

  const getStatus = item => (getValues(item) ? 'checked' : 'unchecked');

  useEffect(() => {
    setChecked(getStatus(`${name}.${value}`));
  }, [setChecked, getValues, name]);

  return (
    <Checkbox.Item
      key={randomKey()}
      status={checked}
      labelStyle={{ maxWidth: '70%' }}
      theme={theme}
      color={CORES.LARANJA}
      label={label}
      onPress={() => {
        setValue(`${name}.${value}`, !getValues(`${name}.${value}`));
        setChecked(getStatus(`${name}.${value}`));
        updateItems();
      }}
    />
  );
};

export default FormCheckboxListItem;
