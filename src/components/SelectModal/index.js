import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';

const SelectModal = props => {
  const { title, placeholder, items = [], value, setValue, ...rest } = props;

  const [open, setOpen] = useState(false);

  const handleOnPressItem = item => {
    setValue(old => (old === item.value ? undefined : item.value));
    setOpen(false);
  };

  return (
    <List.Section title={title}>
      <List.Accordion
        expanded={open}
        title={
          items.filter(item => item.value === value)[0]?.label || placeholder
        }
        onPress={() => setOpen(true)}
        {...rest}
      />
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
          renderItem={({ item }) => (
            <List.Item
              title={item.label}
              onPress={() => handleOnPressItem(item)}
              right={props => {
                const isSelected = item.value === value;

                return (
                  isSelected && (
                    <List.Icon {...props} icon="check" color={CORES.VERDE} />
                  )
                );
              }}
            />
          )}
          ItemSeparatorComponent={() => <Divider />}
        />
      </Modal>
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

export default SelectModal;
