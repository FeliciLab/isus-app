import React, { useState } from 'react';
import { List, Chip } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { CloseCircleoIcon } from '~/icons/index';
import { CORES } from '~/constantes/estiloBase';

const MultipleSelectAccordion = props => {
  const {
    title,
    values = [],
    setValues,
    placeholder,
    items = [],
    hasChips = true,
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
      {hasChips && (
        <View style={styles.chipContainer}>
          {items
            .filter(item => values.some(value => value === item.value))
            .map(item => (
              <Chip
                style={styles.chipItem}
                key={item.value}
                onClose={() => setValues(values.filter(v => v !== item.value))}
                closeIcon={props => <CloseCircleoIcon size={28} {...props} />}>
                {item.label}
              </Chip>
            ))}
        </View>
      )}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  chipItem: {
    marginRight: 4,
    marginVertical: 2,
  },
});

export default MultipleSelectAccordion;
