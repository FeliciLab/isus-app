import * as React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text
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

  // eslint-disable-next-line no-shadow
  function runSearch(text) {
    setText(text);
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
          // eslint-disable-next-line no-shadow
          onChangeText={text => runSearch(text)}
        />
      ),

      headerRight: () => (
        <TouchableOpacity
          style={style.headerSearchIcon}
          mode="contained"
          onPress={() => search()}
        >
        {/* * <Icon name="magnify" size={25} color="#DADADA" /> * */}
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          style={style.searchHeaderBack}
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
    console.log(item);
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
  /* FUNÇÃO SOMENTE PARA MOSTRAR UM CONTEÚDO COM INFORMAÇÃO INICIAL OU CASO NÃO
  ENCONTRE NENHUM ARTIGO */
  // eslint-disable-next-line no-shadow
  function infoPreview(len, text) {
    // VERIFICANDO SE TEM TEXTO E SE TEM DADOS, CASO NÃO MOSTRA MENSAGEM INICIAL
    if (text.length === 0 && len === 0) {
      return (
        <Caption style={style.emptyText}>
          Busque por conteúdos em
            <Text style={style.textNegrito}> Educação Permanente </Text>
            e
            <Text style={style.textNegrito}> Pesquisas Científicas. </Text>
        </Caption>
      );
    }
    return (
      <Caption style={style.emptyText}>
        Nenhuma informação encontrada
      </Caption>
    );
  }

  return (
    <View style={style.emptyBackground}>
      {data.length === 0 ? (
        infoPreview(data.length, text)
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
    marginHorizontal: 20
  },
  searchHeaderText: {
    backgroundColor: 'transparent',
    width: 200,
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
    marginTop: 20,
    color: '#00000099',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 28,
    letterSpacing: 0.5,
    fontSize: 14,
    position: 'absolute',
    left: '3.89%',
    // right: '3.89%',
    top: '2.72%',
    // bottom: '85.42%',
  },
  textNegrito: {
    fontWeight: 'bold'
  }
});
