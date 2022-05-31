import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

const SelectAccordion = props => {
  const {
    title,
    value,
    setValue,
    placeholder,
    items = [],
    deselectable = true,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(old => !old);

  const handleOnPressItem = item => {
    if (deselectable) {
      setValue(item.value === value ? undefined : item.value);
    } else {
      setValue(item.value);
    }
    setExpanded(false);
  };

  return (
    <List.Section title={title}>
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
            onPress={() => handleOnPressItem(item)}
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
