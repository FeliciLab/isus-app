import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Divider, List, Searchbar, Text } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';
import useDebounce from '~/hooks/useDebounce';
import { ArrowLeftIcon } from '~/icons';

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

  const [searchTerm, setSearchTerm] = useState('');

  const searchTermDebounced = useDebounce(searchTerm, 300);

  const getItemsFiltered = useMemo(() => {
    return items.filter(item =>
      item.label.toLowerCase().includes(searchTermDebounced.toLowerCase()),
    );
  }, [items, searchTermDebounced]);

  const handleOnPressItem = item => {
    if (deselectable) {
      setValue(item.value === value ? '' : item.value);
    } else {
      setValue(item.value);
    }
    setOpen(false);
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.listEmpty}>
        <Text>Nada encontrado</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
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
    );
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
          {items.length >= 25 && (
            <View style={styles.wraperSearch}>
              <Searchbar
                placeholder="Campo de busca"
                onChangeText={setSearchTerm}
                value={searchTerm}
              />
            </View>
          )}
          <FlatList
            data={getItemsFiltered}
            keyExtractor={item => item.value.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            ListEmptyComponent={ListEmptyComponent}
            initialNumToRender={5}
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
    borderBottomColor: CORES.CINZA_INPUT_DARK,
  },
  modalHeaderText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  wraperSearch: {
    padding: 8,
    borderBottomColor: CORES.CINZA_INPUT_DARK,
    borderBottomWidth: 0.5,
  },
  listEmpty: {
    padding: 8,
  },
});

export default SelectModal;
