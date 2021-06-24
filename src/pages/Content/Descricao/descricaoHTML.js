import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import HTML from 'react-native-render-html';
import 'moment/locale/pt-br';

import { pegarDados } from '../../../services/armazenamento';
import ImagemDePostagem from '../ImagemDePostagem';
import {
  CorpoPrincipal,
  Titulo,
  Espacador,
  CorpoConteudo,
  ConteudoHtml,
} from './style';

export default function ({ route }) {
  const { parametros } = route.params;
  const conteudoBaixado = true;
  const [postagem, alterarPostagem] = useState();

  useEffect(() => {
    pegarConteudoDoStorage();
  }, []);


  const baixarPDF = () => { };


  const pegarConteudoDoStorage = async () => {
    try {
      const resposta = await pegarDados(`@categoria_${parametros.categoria_id}_postagem_${parametros.id}`);
      alterarPostagem(resposta);
    } catch (err) {
      console.log(`Erro ao pegar conteudo do storage: ${err.message}`);
    }
  };

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
            <HTML
              html={postagem.post_content}
              onLinkPress={baixarPDF}
            />
          </ConteudoHtml>
        </CorpoConteudo>
      </CorpoPrincipal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagemDePostagem: {
    height: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width
  }
});
