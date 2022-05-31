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
import { Divider, List } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';

const SelectModal = props => {
  const {
    title,
    placeholder,
    items = [],
    value,
    setValue,
    deselectable = true,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);

  const handleOnPressItem = item => {
    if (deselectable) {
      setValue(item.value === value ? undefined : item.value);
    } else {
      setValue(item.value);
    }
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
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <ArrowLeftIcon ArrowLeftIcon size={22} color={CORES.VERDE} />
            </TouchableOpacity>
            <Text style={styles.modalHeaderText}>{title}</Text>
          </View>
          <FlatList
            data={items}
            keyExtractor={item => item.value.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.label}
                onPress={() => handleOnPressItem(item)}
                right={props =>
                  item.value === value ? (
                    <List.Icon {...props} icon="check" color={CORES.VERDE} />
                  ) : (
                    <List.Icon {...props} color={CORES.VERDE} />
                  )
                }
              />
            )}
            ItemSeparatorComponent={Divider}
          />
        </SafeAreaView>
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
