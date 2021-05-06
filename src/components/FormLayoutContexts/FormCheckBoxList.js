import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { List } from 'react-native-paper';
import FormContext from '../../context/FormContext';
import FormCheckboxListItem from './FormCheckboxListItem';
import randomKey from '../../utils/randomKey';
import { CORES } from '../../constantes/estiloBase'

const TitleText = ({ label }) => (
  <Text
    style={{
      marginTop: 10,
      fontSize: 18,
      wordWrap: 'break-word',
      fontWeight: 'bold',
      textDecorationStyle: 'solid',
      textDecorationLines: 'underline',
      textDecorationColor: CORES.CINZA_INPUT
    }}
  >
    {label || 'Selecione as opções'}
  </Text>
);

const FormCheckBoxList = ({
  name, label, data, rules, defaultValue
}) => {
  const { register, setValue, getValues } = useContext(FormContext);
  const [itensList, setItensLista] = useState([]);

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
    <>
      <TitleText label={label} />
      <List.Accordion
        title="Selecione as opções"
      >
        <View>
          {data.map(item => (
            <FormCheckboxListItem
              key={randomKey()}
              label={item.label}
              value={item.value}
              name={name}
              updateItems={() => {
                const ieie = getValues();
                console.log(ieie[`${name}`]);
                setItensLista(getValues(name));
              }}
            />
          ))}
        </View>
      </List.Accordion>
    </>
  );
};

export default FormCheckBoxList;
