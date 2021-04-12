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
      fontWeight: 'bold'
    }}
  >
    {label || 'Selecione as opções'}
  </Text>
);

const FormCheckBoxList = ({
  name, label, data, rules
}) => {
  const { register, setValue, getValues } = useContext(FormContext);

  useEffect(() => {
    if (!data || data.length === 0) return;

    data.forEach((item) => {
      register(`${name}.${item.value}`, rules);
      setValue(`${name}.${item.value}`, getValues(`${name}.${item.value}`) || false);
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
