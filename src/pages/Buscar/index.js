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

  function runSearch(Text) {
    setText(Text);
    search();
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
          style={style.searchHeaderText}
          onChangeText={Text => runSearch(Text)}
        />
      ),

      headerRight: () => (
        <TouchableOpacity
          style={style.headerSearchIcon}
          mode="contained"
          onPress={() => search()}
        >
          <Icon name="magnify" size={25} color="#DADADA" />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          style={style.headerBack}
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
      <View style={style.backgroundColor}>
        <TouchableOpacity
          style={style.backgroundColor}
          onPress={() => navigation.navigate('Descrição', { item })}
        >
          <View style={style.content}>
            {item.image ? (
              <Image
                resizeMode="contain"
                style={style.contentImage}
                source={{ uri: `${item.image}` }}
              />
            ) : (
              <View
                style={style.contentImage}
              />
            )}
            <Caption style={style.contentSubtitle}>
              {item.post_title}
            </Caption>
          </View>
          <Divider style={style.divider} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={style.emptyBackground}>
      {data.length === 0 ? (
        <Caption style={style.emptyText}>
          Nenhuma informação foi encontrada.
        </Caption>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.ID.toString()}
          style={style.emptyBackground}
          renderItem={({ item }) => createItem(item)}
        />
      )}
    </View>
  );
}
const style = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#fff'
  },
  searchHeaderBack: {
    marginHorizontal: 19
  },
  searchHeaderText: {
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
  searchHeaderIcon: {
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13
  },
  contentSubtitle: {
    maxWidth: 200,
    height: 60,
    left: 16,
    right: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    textAlignVertical: 'center',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#00000099',
  },
  contentImage: {
    height: 80,
    width: 80,
    marginLeft: 32,
  },
  emptyBackground: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20
  },
});
