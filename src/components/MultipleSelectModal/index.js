import { sortBy } from 'lodash';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Chip, Divider, List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon, CloseCircleoIcon } from '~/icons';

const MultipleSelectModal = props => {
  const {
    title,
    placeholder,
    items = [],
    values = [],
    setValues,
    hasChips = true,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);

  const handleOnPressItem = (item, isSelected) => {
    if (isSelected) {
      setValues(values.filter(value => value !== item.value));
    } else {
      setValues([...values, item.value].sort());
    }
  };

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
        expanded={open}
        onPress={() => setOpen(true)}
        {...rest}>
        <Modal
          animationType="slide"
          visible={open}
          onRequestClose={() => setOpen(false)}>
          <SafeAreaView>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <ArrowLeftIcon ArrowLeftIcon size={22} color={CORES.VERDE} />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>{title}</Text>
            </View>
            <FlatList
              data={items}
              keyExtractor={item => item.value}
              renderItem={({ item }) => {
                const isSelected = values.some(value => value === item.value);
                return (
                  <List.Item
                    title={item.label}
                    onPress={() => handleOnPressItem(item, isSelected)}
                    right={props =>
                      isSelected ? (
                        <List.Icon {...props} icon="check" color={CORES.VERDE} />
                      ) : (
                        <List.Icon {...props} color={CORES.VERDE} />
                      )
                    }
                  />
                );
              }}
              ItemSeparatorComponent={() => <Divider />}
            />
          </SafeAreaView>
        </Modal>
      </List.Accordion>
      {
        hasChips && (
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
        )
      }
    </List.Section >
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
  },
  modalHeaderText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
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

export default MultipleSelectModal;
