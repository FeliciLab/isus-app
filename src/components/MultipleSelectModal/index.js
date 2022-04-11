import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from 'react-native';
import { Divider, List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';
import { sortBy } from 'lodash';
const MultipleSelectModal = props => {
  const {
    title,
    placeholder,
    items = [],
    values = [],
    setValues,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);

  const handleOnPressItem = useCallback((item, isSelected) => {
    if (isSelected) {
      setValues(old => old.filter(value => value !== item.value));
    } else {
      setValues(old => [...old, item.value].sort());
    }
  }, []);

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
        </Modal>
      </List.Accordion>
    </List.Section>
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
});

export default MultipleSelectModal;
