import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  TextInput, Button, Snackbar
} from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { postFeedback } from '../../apis/apiHome';
import Tag from './Tag';
import { feedbackValido, emailValido } from '../../utils/validadores';
import { vazio } from '../../utils/objectUtils';
import { TESTIDS } from '../../constantes/testIDs';
import { analyticsData } from '../../utils/analytics';
import { labelsAnalytics } from '../../constantes/labelsAnalytics';

export default function FeedbackScreen({ tipoDeFeedback }) {
  const feedbackInput = React.createRef();
  const emailInput = React.createRef();
  const [feedback, setFeedback] = React.useState('');
  const [imagem, setImagem] = React.useState({});
  const [nomeImagem, setNomeImagem] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sucessoAoEnviar, setSucessoAoEnviar] = React.useState(false);
  const [erroAoEnviar, setErroAoEnviar] = React.useState(false);
  const [mensagemDeErro, setMensagemDeErro] = React.useState('');
  const [carregando, setCarregando] = React.useState(false);
  const [responseDaBiblioteca, setResponseDaBiblioteca] = React.useState({});

  useFocusEffect(
    useCallback(() => () => {
      limparCampos();
      limparCampoEmail();
    }, [])
  );

  useEffect(() => {
    if (vazio(responseDaBiblioteca)) {
      setImagem({});
    } else {
      setImagem(parsearResponse(responseDaBiblioteca));
    }
  }, [responseDaBiblioteca]);

  const onSubmit = async () => {
    try {
      const { data } = await postFeedback(tipoDeFeedback.textoDoDropdown, feedback, email, imagem);
      if (data.errors) {
        setMensagemDeErro(extrairMensagemDeErro(data));
        setErroAoEnviar(true);
        setCarregando(false);
      } else {
        limparCampos();
        limparCampoEmail();
        setCarregando(false);
        setSucessoAoEnviar(true);
      }
    } catch (err) {
      if (err.message === 'Network Error') setMensagemDeErro('Erro na conexão com o servidor. Tente novamente mais tarde.');
      else setMensagemDeErro('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      setErroAoEnviar(true);
      setCarregando(false);
    }
  };

  const limparCampoEmail = () => setEmail('');

  const limparCampos = () => {
    setFeedback('');
    setImagem({});
    setNomeImagem('');
  };

  const limparArquivoDeImagem = () => {
    setNomeImagem('');
    setImagem({});
  };

  const extrairCaminhoDoArquivo = path => `~${path.substring(path.indexOf('/Documents'))}`;
  const extrairNomeDoArquivo = path => path.split('/').pop();

  const parsearResponse = response => ({
    nome: nomeImagem,
    tipo: response.type,
    tamanho: response.fileSize,
    dados: response.base64
  });

  const extrairMensagemDeErro = (response) => {
    if (response.errors['imagem.dados']) {
      return 'Falha no envio da imagem. Entre em contato com o suporte técnico para verificar o problema.';
    }

    if (response.errors['imagem.tipo']) return response.errors['imagem.tipo'][0];

    if (response.errors['imagem.tamanho']) return response.errors['imagem.tamanho'][0];

    return '';
  };

  const verificaErroDePermissao = erro => (erro === "Permissions weren't granted" ? 'Para anexar uma imagem, você deve permitir o acesso ao armazenamento.'
    : erro);

  const definirNomeDaImagem = (response) => {
    if (response.didCancel) return;
    if (response.error) {
      const erro = verificaErroDePermissao(response.error);
      setMensagemDeErro(erro);
      setErroAoEnviar(true);
      return;
    }

    let path = response.uri || response.assets[0].uri;
    if (Platform.OS === 'ios') path = extrairCaminhoDoArquivo(path);

    if (!response.fileName) {
      setNomeImagem(extrairNomeDoArquivo(path));
    } else {
      setNomeImagem(response.fileName);
    }

    setResponseDaBiblioteca(response);
  };

  return (
    <>
      <View style={{ flex: 1, padding: 15 }}>
        <Text
          style={{
            letterSpacing: 0.25,
            fontSize: 14,
            lineHeight: 20,
            color: '#828282',
            marginBottom: 18
          }}
        >
          Reporte erros, inconsistências e melhorias que encontrar para nos ajudar a resolver
          problemas e melhorar o app rapidamente.
        </Text>

        <TextInput
          testID="input-feedback-motivo"
          numberOfLines={5}
          mode="outlined"
          ref={feedbackInput}
          multiline
          value={feedback}
          label="Motivo"
          onChangeText={text => setFeedback(text)}
        />

        <Text
          style={{
            letterSpacing: 0.25,
            fontSize: 12,
            lineHeight: 20,
            color: '#828282',
            marginVertical: 10
          }}
        >
          Lembre-se de especificar a seção do app a que você se refere
        </Text>

        <View style={{ flexDirection: 'row', marginBottom: 18, marginTop: 8 }}>
          <Button
            mode="text"
            color="#FF9800"
            compact
            onPress={
              () => {
                launchImageLibrary(
                  {
                    mediaType: 'photo',
                    includeBase64: true
                  },
                  response => definirNomeDaImagem(response)
                );
              }
            }
          >
            ANEXAR IMAGEM
          </Button>
          <Tag text={nomeImagem} onClose={() => limparArquivoDeImagem()} />
        </View>

        <TextInput
          testID="input-feedback-email"
          mode="outlined"
          ref={emailInput}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text.trim())}
        />
      </View>
      <View>
        <Button
          testID={TESTIDS.BOTAO_FEEDBACK_ENVIAR}
          disabled={!!(!feedbackValido(feedback) || !emailValido(email))}
          style={feedbackValido(feedback) && emailValido(email)
            ? styles.button : styles.buttonDisabled}
          labelStyle={{ color: '#fff' }}
          mode="contained"
          loading={carregando}
          onPress={() => {
            analyticsData(labelsAnalytics.ENVIAR_FEEDBACK, 'Click', 'Fale Conosco');
            setCarregando(true);
            onSubmit();
          }}
        >
          Enviar
        </Button>

        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
          visible={sucessoAoEnviar}
          onDismiss={() => setSucessoAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setSucessoAoEnviar(false)
          }}
        >
          {`${tipoDeFeedback.feedback}, obrigado!`}
        </Snackbar>
        <Snackbar
          style={{ backgroundColor: '#1e1e1e' }}
          visible={erroAoEnviar}
          onDismiss={() => setErroAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setErroAoEnviar(false)
          }}
        >
          {mensagemDeErro}
        </Snackbar>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#FF9800'
  },
  buttonDisabled: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center'
  }
});
