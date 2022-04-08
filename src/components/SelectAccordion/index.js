import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

const SelectAccordion = props => {
  const { title, value, setValue, placeholder, items = [], ...rest } = props;

  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(old => !old);

  return (
    <List.Section title={title} {...rest}>
      <List.Accordion
        title={
          items
            .filter(item => item.value === value)
            .map(item => item.label)[0] || placeholder
        }
        expanded={expanded}
        onPress={handlePress}
        {...rest}>
        {items.map(item => (
          <List.Item
            key={item.value}
            title={item.label}
            onPress={() => {
              setValue(item.value === value ? undefined : item.value);
              setExpanded(false);
            }}
            right={props => {
              return item.value === value ? (
                <List.Icon {...props} icon="check" color={CORES.VERDE} />
              ) : (
                <List.Icon {...props} />
              );
            }}
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default SelectAccordion;
