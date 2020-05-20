import * as React from 'react';
import {
  View, FlatList, TouchableOpacity, Image, TextInput
} from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBusca } from '../../apis/apiHome';

export default function SearchScreen() {
  const navigation = useNavigation();

  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([]);

  async function search() {
    const response = await getBusca(text);
    setData(response.data.data);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },

      headerTitle: () => (
        <TextInput
          autoFocus
          placeholder="Buscar"
          value={text}
          style={{ backgroundColor: 'transparent', width: 200, fontSize: 15 }}
          onChangeText={Text => setText(Text)}
        />
      ),

      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 18,
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 10
          }}
          mode="contained"
          onPress={() => search()}
        >
          <Caption>Buscar</Caption>
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  function createItem(item) {
    return (
      <>
        <TouchableOpacity
          style={{ margin: 10, padding: 10, backgroundColor: 'transparent' }}
          onPress={() => navigation.navigate('Buscar Description', { item })}
        >
          <Divider />
          <View style={{ flexDirection: 'row' }}>
            {item.image ? (
              <Image
                resizeMode="contain"
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 80,
                  margin: 10
                }}
                source={{ uri: `${item.image}` }}
              />
            ) : (
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 80,
                  margin: 10,
                  borderWidth: 40,
                  borderColor: '#fff'
                }}
              />
            )}
            <Caption style={{ justifyContent: 'center', alignSelf: 'center', maxWidth: 200 }}>
              {item.post_title}
            </Caption>
          </View>
          <Divider />
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {data.length === 0 ? (
        <Caption style={{ textAlign: 'center', marginTop: 20 }}>
          Nenhuma informação foi encontrada.
        </Caption>
      ) : (
        <FlatList
          // showsVerticalScrollIndicator={false}
          data={data}
          // numColumns={2}
          keyExtractor={item => item.ID}
          style={{ flex: 1 }}
          renderItem={({ item }) => createItem(item)}
        />
      )}
    </View>
  );
}
