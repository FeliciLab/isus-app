import React, {
  useState, useLayoutEffect, useEffect
} from 'react';

import {
  View, Dimensions, StyleSheet,
  ScrollView, Share, Alert, Linking
}
  from 'react-native';
import HTML from 'react-native-render-html';
import 'moment/locale/pt-br';
import { useNetInfo } from '@react-native-community/netinfo';

import {
  salvarDados, pegarDados, removerDados, converterImagemParaBase64
} from '../../../services/armazenamento';
import { pegarProjetosPorId } from '../../../apis/apiHome';
import BarraInferior from '../../../components/barraInferior';
import ImagemDePostagem from '../ImagemDePostagem';
import formatarDataPorExtenso from '../../../utils/dateUtils';
import BarraDeStatus from '../../../components/barraDeStatus';
import rotas from '../../../constantes/rotas';
import { cabecalhoVoltar } from '../../../components/layoutEffect/cabecalhoLayout';
import {
  AreaConteudo,
  CorpoPrincipal,
  Titulo,
  Espacador,
  CorpoConteudo,
  ConteudoHtml,
  Barra,
  TextoLateral
} from './style';

export default function ({ route, navigation }) {
  const { parametros, title } = route.params;

  useLayoutEffect(() => {
    cabecalhoVoltar({
      cor: 'verde',
      titulo: 'Descrição',
      navegador: navigation
    });
  });

  const estaConectado = useNetInfo().isConnected;

  // const { params } = route;
  const [postagem, alterarPostagem] = useState();
  const [visivel, alterarVisibilidade] = useState(false);
  const [textoDoFeedback, alterarTextoDoFeedback] = useState('');
  const [conteudoBaixado, alterarConteudoBaixado] = useState(!!parametros.offline);
  const dataDePostagem = postagem?.post_date || '';

  useEffect(() => {
    if (!estaConectado && estaConectado !== null) {
      navigation.navigate(rotas.SEM_CONEXAO);
      return;
    }
    if (conteudoBaixado) {
      pegarConteudoDoStorage();
    } else {
      pegarConteudoDaApi();
    }
  }, [estaConectado]);

  const pegarConteudoDoStorage = async () => {
    try {
      const resposta = await pegarDados(`@categoria_${parametros.categoria_id}_postagem_${parametros.id}`);
      alterarPostagem(resposta);
    } catch (err) {
      console.log(`Erro ao pegar conteudo do storage: ${err.message}`);
    }
  };

  const pegarConteudoDaApi = async () => {
    try {
      const resposta = await pegarProjetosPorId(parametros.id);
      console.log(resposta.data.post_content);
      alterarPostagem(resposta.data);
    } catch (err) {
      console.log(`Erro ao pegar conteudo da API: ${err.message}`);
    }
  };

  const aoCompartilhar = async () => {
    const messagTitle = postagem.post_title;
    const messagLink = ' -iSUS: https://coronavirus.ceara.gov.br/project/'.concat(postagem.slug);
    try {
      await Share.share({
        message: messagTitle + messagLink
      });
    } catch (error) {
      console.log(`Erro ao compartilhar: ${error.message}`);
    }
  };

  const aoClicarEmBaixar = () => {
    if (!conteudoBaixado) {
      baixarConteudo();
    } else {
      removerConteudo();
    }
  };

  const informacaoLateral = () => (
    <>
      <TextoLateral>
        postado em
      </TextoLateral>
      <TextoLateral>
        {formatarDataPorExtenso(dataDePostagem)}
      </TextoLateral>
    </>
  );

  const baixarConteudo = async () => {
    try {
      const imagembase64 = await converterImagemParaBase64(postagem.image);
      const postagemOffline = {
        ...postagem, image: imagembase64, categoria_id: parametros.categoria_id, offline: true
      };
      await salvarDados(`@categoria_${parametros.categoria_id}_postagem_${parametros.id}`, postagemOffline);
      alterarConteudoBaixado(true);
      alterarPostagem(postagemOffline);
      mostrarFeedback(`A página foi salva offline em "${title}"`);
    } catch (e) {
      console.log('Erro de armazenamento:', e.message);
      if (e.message.includes('SQLITE_FULL')) {
        Alert.alert(
          'Não foi possível baixar o conteúdo',
          'Já estamos trabalhando para que você possa ter mais leituras off-line. '
          + 'Acompanhe as próximas versões do iSUS.',
          [{
            text: 'OK',
            onPress: () => { }
          }]
        );
      } else {
        mostrarFeedback('Não foi possível realizar o donwload da imagem. Por favor, tente mais tarde.');
      }
    }
  };

  const removerConteudo = async () => {
    try {
      alterarConteudoBaixado(false);
      mostrarFeedback('A página foi excluida da leitura offline');
      await removerDados(`@categoria_${parametros.categoria_id}_postagem_${parametros.id}`);
    } catch (e) {
      mostrarFeedback('Não foi possível realizar a ação, Por favor, tente mais tarde.');
    }
  };

  const mostrarFeedback = (texto) => {
    alterarTextoDoFeedback(texto);
    alterarVisibilidade(true);
    setTimeout(() => {
      alterarVisibilidade(false);
    }, 3000);
  };

  const baixarPDF = (event, href) => {
    if (!estaConectado) {
      navigation.navigate(rotas.SEM_CONEXAO, {
        componente: 'webview',
        title: 'Acesso ao conteúdo',
        url: href
      });
      return;
    }

    Linking.openURL(href);
  };

  if (!postagem) {
    return <></>;
  }

  return (
    <AreaConteudo>
      <BarraDeStatus backgroundColor={route.params.cor} barStyle={route.params.estiloBarra} />
      <ScrollView>
        <CorpoPrincipal>
          <View>
            <Titulo>{postagem.post_title}</Titulo>
          </View>

          <Espacador />

          <ImagemDePostagem
            conteudoBaixado={conteudoBaixado}
            imagem={postagem.image}
            estilo={styles.imagemDePostagem}
          />

          <CorpoConteudo>
            <ConteudoHtml>
              <HTML
                html={postagem.post_content.replace('iframe', 'span')}
                onLinkPress={baixarPDF}
              />
            </ConteudoHtml>
          </CorpoConteudo>
        </CorpoPrincipal>
      </ScrollView>

      <Barra visible={visivel}>
        {textoDoFeedback}
      </Barra>

      <BarraInferior
        telaDeOrigem="descricao"
        barraVisivel
        informacaoLateral={informacaoLateral}
        aoClicarEmBaixar={aoClicarEmBaixar}
        aoCompartilhar={aoCompartilhar}
        conteudoBaixado={conteudoBaixado}
      />
    </AreaConteudo>
  );
}

const styles = StyleSheet.create({
  searchHeaderBack: {
    marginHorizontal: 19
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
  },
  imagemDePostagem: {
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width
  }
});
