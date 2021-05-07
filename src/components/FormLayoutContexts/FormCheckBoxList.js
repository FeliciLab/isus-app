import React, {
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
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
  const [placeholder, setPlaceholder] = useState('Selecione as opções');
  const [quantidadeSelecionados, definirQuantidadeSelecionados] = useState(0);

  const definirPlaceholder = (valor) => {
    const quantidade = valor || quantidadeSelecionados;
    if (quantidade === 0) {
      setPlaceholder('Selecione as opções');
    }

    if (quantidade === 1) {
      setPlaceholder(`${quantidade} item selecionado`);
    }

    if (quantidade > 1) {
      setPlaceholder(`${quantidade} itens selecionados`);
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) return;
    let quantidade = 0;
    data.forEach((item) => {
      const field = `${name}.${item.value}`;
      register(field, rules);
      setValue(field, defaultValue?.[item.value] || getValues(field) || false);
      if (getValues(field)) {
        quantidade += 1;
      }
    });

    definirQuantidadeSelecionados(quantidade);
    definirPlaceholder(quantidade);
  }, [data]);

  const updateItems = useCallback((check) => {
    const quantidade = (check ? quantidadeSelecionados + 1 : quantidadeSelecionados - 1);
    definirQuantidadeSelecionados(quantidade);
    definirPlaceholder(quantidade);
  });

  if (!data || data.length === 0) {
    return <></>;
  }

  return (
    <>
      <TitleText label={label} />
      <List.Accordion
        title={placeholder}
      >
        <View>
          {data.map(item => (
            <FormCheckboxListItem
              key={randomKey()}
              label={item.label}
              value={item.value}
              name={name}
              updateItems={updateItems}
            />
          ))}
        </View>
      </List.Accordion>
    </>
  );
};

export default FormCheckBoxList;
