import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { List } from 'react-native-paper';
import FormContext from '../../context/FormContext';
import FormCheckboxListItem from './FormCheckboxListItem';
import randomKey from '../../utils/randomKey';

const TitleText = ({ label }) => (
  <Text
    style={{
      marginTop: 10,
      fontSize: 18,
      wordWrap: 'break-word',
      fontWeight: 'bold'
    }}
  >
    {label || 'Selecione as opções'}
  </Text>
);

const FormCheckBoxList = ({
  name, label, data, rules, defaultValue
}) => {
  const { register, setValue, getValues } = useContext(FormContext);

  useEffect(() => {
    if (!data || data.length === 0) return;
    data.forEach((item) => {
      const field = `${name}.${item.value}`;
      register(field, rules);
      setValue(field, defaultValue?.[item.value] || getValues(field) || false);
    });
  }, [data]);

  if (!data || data.length === 0) {
    return <></>;
  }

  return (
    <List.Accordion
      titleStyle={{ color: 'black' }}
      title={<TitleText label={label} />}
    >
      <View>
        {data.map(item => (
          <FormCheckboxListItem
            key={randomKey()}
            label={item.label}
            value={item.value}
            name={name}
          />
        ))}
      </View>
    </List.Accordion>

  );
};

export default FormCheckBoxList;
