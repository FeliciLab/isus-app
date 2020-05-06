import * as React from 'react';
import {
  StyleSheet, View, TouchableOpacity, ScrollView
} from 'react-native';
import {
  Title, Card, Caption, Headline, Paragraph
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
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
          <TouchableOpacity
            style={{ marginHorizontal: 19 }}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Icon name="menu" size={28} color="#111" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <Card style={{ margin: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ height: 120, width: 120, backgroundColor: '#cccccc' }} />
            <View style={{ marginHorizontal: 15 }}>
              <Headline>COVID-19</Headline>
              <Caption style={{ maxWidth: 200 }}>Encontre informações do COVID-19 aqui!</Caption>
            </View>
          </View>
        </Card>

        <View>
          <Title style={{ marginHorizontal: 30 }}>Destaques do dia</Title>
          <Card style={{ margin: 30 }}>
            <View>
              <View style={{ height: 200, backgroundColor: '#cccccc' }} />
              <View style={{ padding: 15 }}>
                <Headline>COVID-19</Headline>
                <Paragraph>body</Paragraph>
                <Caption>Encontre informações do COVID-19 aqui!</Caption>
              </View>
            </View>
          </Card>
        </View>

        <View>
          <Title style={{ marginHorizontal: 30 }}>Painel IntegraSUS</Title>
          <Card style={{ margin: 30 }}>
            <View>
              <View style={{ height: 200, backgroundColor: '#cccccc' }} />
              <View style={{ padding: 15 }}>
                <Headline>COVID-19</Headline>
                <Paragraph>body</Paragraph>
                <Caption>Encontre informações do COVID-19 aqui!</Caption>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    paddingHorizontal: 10,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
