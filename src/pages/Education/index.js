import * as React from 'react';
import {
  View, FlatList, Image, Dimensions
} from 'react-native';
import { Caption } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getProjetosPorCategoria } from '../../apis/apiHome';

export default function EducationScreen(props) {
  console.tron.log(props);
  const { route } = props;
  const { params } = route;

  const [data, setData] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getProjetosPorCategoria(params.term_id).then((response) => {
        console.tron.log('response', response.data.data);
        setData(response.data.data);
      });
    }, [props])
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      numColumns={2}
      keyExtractor={item => item.id}
      style={{ flex: 1 }}
      renderItem={({ item }) => (
        <View
          style={{
            height: 200,
            width: Dimensions.get('window').width / 2.2,
            alignItems: 'center',
            margin: 5
          }}
        >
          <Image
            style={{ height: 110, width: Dimensions.get('window').width / 2.2 }}
            source={{ uri: `${item.image}` }}
            // resizeMode="contain"
          />
          <View style={{ marginHorizontal: 15 }}>
            <Caption numberOfLines={3}>{item.post_title}</Caption>
          </View>
        </View>
      )}
    />
    // <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
    //   <View style={{ margin: 10 }}>
    //     <Card style={{ height: 200, width: 160 }}>
    //       <View style={{ height: 110, width: 160, backgroundColor: '#cccccc' }} />
    //       <View style={{ marginHorizontal: 15 }}>
    //         <Caption>Encontre informações do COVID-19 aqui!</Caption>
    //       </View>
    //     </Card>
    //   </View>
    // </ScrollView>
  );
}
