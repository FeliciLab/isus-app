import * as React from 'react';
import {
  View, FlatList, TouchableOpacity, Image, TextInput, StyleSheet
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
          placeholderTextColor="#FFFFFF"
          value={text}
          style={style.inputTextPlace}
          returnKeyType="search"
          onBlur={() => search()}
          onChangeText={Text => setText(Text)}
        />
      ),

      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            // backgroundColor: '#fff',
            // padding: 5,
            // borderRadius: 10
          }}
          mode="contained"
          onPress={() => search()}
        >
          <Icon name="magnify" size={25} color="#DADADA" />
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
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableOpacity
          style={{ backgroundColor: '#fff' }}
          onPress={() => navigation.navigate('Buscar Description', { item })}
        >
          <View style={{ flexDirection: 'row' }}>
            {item.image ? (
              <Image
                resizeMode="contain"
                style={{
                  height: 80,
                  width: 80,
                  marginLeft: 32,
                }}
                source={{ uri: `${item.image}` }}
              />
            ) : (
              <View
                style={{
                  height: 80,
                  width: 80,
                  margin: 10,
                  borderWidth: 40,
                  borderColor: '#fff'
                }}
              />
            )}
            <Caption style={style.subTitle}>
              {item.post_title}
            </Caption>
          </View>
          <Divider />
        </TouchableOpacity>
      </View>
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
const style = StyleSheet.create({
  inputTextPlace: {
    backgroundColor: 'transparent',
    width: 200,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0.5,
    color: '#F2F2F2',
    opacity: 0.87
  },
  subTitle: {
    maxWidth: 200,
    height: 60,
    left: 16,
    right: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#00000099',
    marginTop: 13
  }

});
