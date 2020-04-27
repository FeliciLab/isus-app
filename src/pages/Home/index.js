import * as React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Linking
} from 'react-native';
import { Title, Card, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={styles.headerTop}>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ alignSelf: 'center', marginHorizontal: 5 }}
            name="heart"
            size={26}
            color="#106839"
          />
          <Title>iSUS</Title>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginHorizontal: 10 }}>
            <Icon name="magnify" size={26} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="menu" size={28} color="#111" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-evenly' }}>
        <Card
          style={{
            padding: 10,
            height: 120,
            width: 120,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => Linking.openURL('https://coronavirus.ceara.gov.br/profissional/')}
        >
          <Icon style={{ alignSelf: 'center' }} name="stethoscope" size={40} color="#111" />
          <Caption style={{ textAlign: 'center' }}>Visite o site do Profissional de Saúde</Caption>
        </Card>

        <Card
          style={{
            padding: 10,
            height: 120,
            width: 120,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => Linking.openURL('https://gestao-ventiladores.dev.org.br/')}
        >
          <Icon style={{ alignSelf: 'center' }} name="clipboard-plus" size={40} color="#111" />
          <Caption style={{ textAlign: 'center' }}>
            Visite o nosso Sistema Central de Ventiladores
          </Caption>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
