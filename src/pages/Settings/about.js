import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
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
          <TouchableOpacity style={{ marginHorizontal: 19 }}>
            <Icon name="magnify" size={26} color="#111" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 19 }}>
            <Icon name="menu" size={28} color="#111" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
