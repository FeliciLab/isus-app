import * as React from 'react';
import {
  StyleSheet, Button, Text, View, TouchableOpacity
} from 'react-native';
import { Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={styles.headerTop}>
        <Title>iSUS</Title>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Icon name="settings" size={28} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="settings" size={28} color="#111" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home screen</Text>
        <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
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
