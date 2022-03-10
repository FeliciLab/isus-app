import 'moment/locale/pt-br';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import HTML from 'react-native-render-html';
import { pegarDados } from '~/services/armazenamento';
import ImagemDePostagem from '../ImagemDePostagem';
import {
  ConteudoHtml,
  CorpoConteudo,
  CorpoPrincipal,
  Espacador,
  Titulo,
} from './style';

export default function({ route }) {
  const { parametros } = route.params;

  const conteudoBaixado = true;

  const [postagem, alterarPostagem] = useState();

  // TODO: aparentemente, essa funcionalidade de baixar pdf ainda não foi implementada
  const baixarPDF = async () => {
    return;
  };

  const pegarConteudoDoStorage = async () => {
    try {
      const resposta = await pegarDados(
        `@categoria_${parametros.categoria_id}_postagem_${parametros.id}`,
      );
      alterarPostagem(resposta);
    } catch (err) {
      console.log(`Erro ao pegar conteudo do storage: ${err.message}`);
    }
  };

  useEffect(() => {
    pegarConteudoDoStorage();
  }, []);

  return (
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
            <HTML html={postagem.post_content} onLinkPress={baixarPDF} />
          </ConteudoHtml>
        </CorpoConteudo>
      </CorpoPrincipal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagemDePostagem: {
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width,
  },
});
