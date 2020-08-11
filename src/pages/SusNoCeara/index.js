import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { TextoSobreSUS, TextoSobreSESA, TextoSobreESP } from './textos';

export default function SusNoCearaScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'SUS no Ceará',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <ScrollView style={{ backgroundColor: '#ffffff', flex: 1, padding: 15 }}>

      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>SUS no Ceará</Text>}>
        <List.Item
          titleNumberOfLines={80}
          title={<TextoSobreSUS />}
        />
      </List.Accordion>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>O iSUS é ESP</Text>}>
        <List.Item
          titleNumberOfLines={80}
          title={<TextoSobreSESA />}
        />
      </List.Accordion>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>A ESP é SESA</Text>}>
        <List.Item
          titleNumberOfLines={80}
          title={<TextoSobreESP />}
        />
      </List.Accordion>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 18
  }
});
