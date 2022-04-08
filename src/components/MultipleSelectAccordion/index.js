import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

const MultipleSelectAccordion = props => {
  const {
    title,
    values = [],
    setValues,
    placeholder,
    items = [],
    ...rest
  } = props;

  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(old => !old);

  return (
    <List.Section title={title}>
      <List.Accordion
        title={
          items
            .filter(item => values.includes(item.value))
            .map(item => item.label)
            .join(', ') || placeholder
        }
        expanded={expanded}
        onPress={handlePress}
        {...rest}>
        {items.map(item => {
          const isSelected = values.some(value => value === item.value);

          return (
            <List.Item
              key={item.value}
              title={item.label}
              onPress={() => {
                if (isSelected) {
                  setValues(values.filter(value => value !== item.value));
                } else {
                  setValues([...values, item.value].sort());
                }
                setExpanded(false);
              }}
              right={props => {
                return isSelected ? (
                  <List.Icon {...props} icon="check" color={CORES.VERDE} />
                ) : (
                  <List.Icon {...props} />
                );
              }}
            />
          );
        })}
      </List.Accordion>
    </List.Section>
  );
};

export default MultipleSelectAccordion;
