import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { Caption, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBusca } from '../../apis/apiHome';

const baseURL = 'https://api.github.com';
const searchTerm = 'react';
const perPage = 20;

export default class Buscar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      data: [],
      page: 1,
      loading: false,
      text: '',
    };
  }

  componentDidMount() {
    this.loadRepositories();
    //this.search();
  }

  loadRepositories = async () => {
    if (this.state.loading) return;

    const { page } = this.state;

    this.setState({ loading: true });

    const response = await fetch(`${baseURL}/search/repositories?q=${searchTerm}&per_page=${perPage}&page=${page}`);
    const repositories = await response.json();

    this.setState({
      data: [ ...this.state.data, ...repositories.items ],
      page: page + 1,
      loading: false,
    });
  }

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.full_name}</Text>
    </View>
  );

  createItem(item) {
    console.log(item);
    return (
      <View style={styles.backgroundColor}>
        <TouchableOpacity
          style={styles.backgroundColor}
          onPress={() => navigation.navigate('Descrição', { object: { id: item.ID } })}
        >
          <View style={styles.content}>
            {item.image ? (
              <Image
                resizeMode="contain"
                style={styles.contentImage}
                source={{ uri: `${item.image}` }}
              />
            ) : (
              <View
                style={styles.contentImage}
              />
            )}
            <Caption style={styles.contentSubtitle}>
              {item.post_title}
            </Caption>
          </View>
          <Divider style={styles.divider} />
        </TouchableOpacity>
      </View>
    );
  }
  /* FUNÇÃO SOMENTE PARA MOSTRAR UM CONTEÚDO COM INFORMAÇÃO INICIAL OU CASO NÃO
  ENCONTRE NENHUM ARTIGO */
  // eslint-disable-next-line no-shadow
  infoPreview(len, text) {
    // VERIFICANDO SE TEM TEXTO E SE TEM DADOS, CASO NÃO MOSTRA MENSAGEM INICIAL
    if (this.state.text.length === 0 && len === 0) {
      return (
        <Caption style={styles.emptyText}>
          Busque por conteúdos em
            <Text style={styles.textNegrito}> Educação Permanente </Text>
            e
            <Text style={styles.textNegrito}> Pesquisas Científicas. </Text>
        </Caption>
      );
    }
    return (
      <Caption style={styles.emptyText}>
        Nenhuma informação encontrada
      </Caption>
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#468A04" size="large" />
      </View>
    );
  };
  
  async search() {
    const { page } = this.state;
    const response = await getBusca(this.state.text, this.state.page);
    console.log(response.data.data);
    this.setState({
      data: [ ...this.state.data, ...response.data.data ],
      page: page + 1,
      loading: false,
    });
    // setData(response.data.data);
    // console.log({ page });
    // const numberPage = (page + 1);
    // setPage(numberPage);
    // setLoad(false);
    // console.log('load depois ');
    // console.log({ load });
  }
  runSearch(text) {
    console.log({text})
    this.setState({ text: text})
    console.log(this.state.text)
    this.search()
  }

  createItem(item, navigation) {
    console.log(item);
    return (
      <View style={styles.backgroundColor}>
        <TouchableOpacity
          style={styles.backgroundColor}
          onPress={() => navigation.navigate('Descrição', { object: { id: item.ID } })}
        >
          <View style={styles.content}>
            {item.image ? (
              <Image
                resizeMode="contain"
                style={styles.contentImage}
                source={{ uri: `${item.image}` }}
              />
            ) : (
              <View
                style={styles.contentImage}
              />
            )}
            <Caption style={styles.contentSubtitle}>
              {item.post_title}
            </Caption>
          </View>
          <Divider style={styles.divider} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
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
          value={this.state.text}
          style={styles.searchHeaderText}
          // eslint-disable-next-line no-shadow
          onChangeText={text => this.runSearch(text)}
        />
      ),

      headerLeft: () => (
        <TouchableOpacity
          style={styles.searchHeaderBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
    
    return (
      <FlatList
        // contentContainerStyle={styles.list}
        data={this.state.data}
        // keyExtractor={item => item.ID.toString()}
        keyExtractor={item => item.id}
        //renderItem={({ item }) => this.createItem(item, navigation)}
        renderItem={this.renderItem}
        //onEndReached={this.search}
        onEndReached={this.loadRepositories}
        onEndReachedThreshold={0.1}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
  },
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
