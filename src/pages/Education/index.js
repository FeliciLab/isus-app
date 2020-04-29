import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Title, Card, Caption } from 'react-native-paper';

export default function EducationScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ margin: 10 }}>
        <Title>Cursos Online</Title>
        <Card style={{ height: 200, width: 160 }}>
          <View style={{ height: 110, width: 160, backgroundColor: '#cccccc' }} />
          <View style={{ marginHorizontal: 15 }}>
            <Caption>Encontre informações do COVID-19 aqui!</Caption>
          </View>
        </Card>
      </View>

      <View style={{ margin: 10 }}>
        <Title>Cursos Online</Title>
        <Card style={{ height: 200, width: 160 }}>
          <View style={{ height: 110, width: 160, backgroundColor: '#cccccc' }} />
          <View style={{ marginHorizontal: 15 }}>
            <Caption>Encontre informações do COVID-19 aqui!</Caption>
          </View>
        </Card>
      </View>

      <View style={{ margin: 10 }}>
        <Title>Cursos Online</Title>
        <Card style={{ height: 200, width: 160 }}>
          <View style={{ height: 110, width: 160, backgroundColor: '#cccccc' }} />
          <View style={{ marginHorizontal: 15 }}>
            <Caption>Encontre informações do COVID-19 aqui!</Caption>
          </View>
        </Card>
      </View>

      <View style={{ margin: 10 }}>
        <Title>Cursos Online</Title>
        <Card style={{ height: 200, width: 160 }}>
          <View style={{ height: 110, width: 160, backgroundColor: '#cccccc' }} />
          <View style={{ marginHorizontal: 15 }}>
            <Caption>Encontre informações do COVID-19 aqui!</Caption>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   headerTop: {
//     paddingHorizontal: 10,
//     height: 60,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   }
// });
