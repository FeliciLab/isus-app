import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, DefaultTheme } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import FormContext from '~/context/FormContext';
import randomKey from '~/utils/randomKey';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(0, 0, 0, 0.6);',
    accent: CORES.LARANJA,
  },
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
        const check = !getValues(`${name}.${value}`);
        setValue(`${name}.${value}`, check);
        setChecked(getStatus(`${name}.${value}`));
        updateItems(check);
      }}
    />
  );
};

export default FormCheckboxListItem;
