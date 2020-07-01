import React, { useState, useCallback, useLayoutEffect } from 'react';

import {
  // eslint-disable-next-line no-unused-vars
  View, Image, Dimensions, StyleSheet,
  ScrollView, Share, TouchableOpacity
}
  from 'react-native';
import {
  Title
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import 'moment/locale/pt-br';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { salvarDados, pegarDados } from '../../services/armazenamento';
import { getProjectPorId } from '../../apis/apiHome';
import BarraInferior from './barraInferior';

export default function DescriptionScreen(props) {
  const navigation = useNavigation();
  const { route } = props;
  const { params } = route;
  const [postagem, alterarPostagem] = useState([]);
  const [conteudoBaixado, alterarConteudoBaixado] = useState(false);
  // const postagem = params.object;
  console.log('id', params.object);


  useFocusEffect(
    useCallback(() => {
      if (conteudoBaixado) {
        pegarDados(`@postagem_${params.object.id}`).then((response) => {
          alterarPostagem(response.data);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        getProjectPorId(params.object.id).then((response) => {
          alterarPostagem(response.data);
        }).catch((err) => {
          console.log(err);
        });
      }
    }, [props])
  );
  // console.log(postagem);
  const aoCompartilhar = async () => {
    const messagTitle = postagem.post_title;
    const messagLink = ' -iSUS: https://coronavirus.ceara.gov.br/project/'.concat(postagem.slug);
    try {
      await Share.share({
        message: messagTitle + messagLink
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const aoBaixarConteudo = async () => {
    console.log(postagem);
    await salvarDados(`@postagem_${postagem.id}`, postagem);
    alterarConteudoBaixado(true);
    // Fazer o Feedbacks (snackbar)
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: '#FFF',
      headerTitle: route.params.title,
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTitleAlign: 'center',
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
  });

  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View>
            <Title style={styles.textTitleDetail}>{postagem.post_title}</Title>
          </View>
          <View style={styles.sub} />
          <Image
            resizeMode="contain"
            style={{
              height: Dimensions.get('window').width / 1.5,
              width: Dimensions.get('window').width
            }}
            source={{ uri: `${postagem.image}` }}
          />
          <View
            style={{
              // height: Dimensions.get('window').width / 1.5,
              width: Dimensions.get('window').width
            }}
          >
            <View style={{
              padding: 10,
              alignContent: 'center'
            }}
            >
              <HTML
                html={postagem.post_content}
                onLinkPress={(event, href) => {
                  navigation.navigate('webview', {
                    title: 'Acesso ao conteúdo',
                    url: href
                  });
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <BarraInferior
        aoBaixarConteudo={aoBaixarConteudo}
        aoCompartilhar={aoCompartilhar}
        dataDePostagem={postagem.post_date}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    // color: 'rgba(0, 0, 0, 0.6)'
  },
  searchHeaderBack: {
    marginHorizontal: 19
  },
  textTitleDetail: {
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: 28,
    color: '#00000099',
    fontStyle: 'normal',
  },
  sub: {
    flexDirection: 'row',
    margin: 1,
    justifyContent: 'space-between',
    marginTop: 12,
  },
  textData: {
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#0000008A'
  },
  contentText: {
    marginLeft: 16,
    backgroundColor: 'red',
  },
  subShare: {
    marginRight: 20,
    marginTop: 12,
    marginBottom: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: '#EEEEEE'
  }
});
