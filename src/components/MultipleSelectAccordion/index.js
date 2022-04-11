import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import { CloseCircleoIcon } from '~/icons/index';
import { sortBy } from 'lodash';

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
          sortBy(
            items.filter(item => values.includes(item.value)),
            ['label'],
          )
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
              right={props =>
                isSelected ? (
                  <List.Icon {...props} icon="check" color={CORES.VERDE} />
                ) : (
                  <List.Icon {...props} color={CORES.VERDE} />
                )
              }
            />
          );
        })}
      </List.Accordion>
      {hasChips && (
        <View style={styles.chipContainer}>
          {sortBy(
            items.filter(item => values.some(value => value === item.value)),
            ['label'],
          ).map(item => (
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
