import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextInput, Button, Snackbar
} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { postFeedback } from '../../apis/apiHome';
import Tag from './Tag';
import Regex from '../../utils/regex';
import { vazio } from '../../utils/objectUtils';

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
  const navigation = useNavigation();

  React.useEffect(() => {
    if (vazio(responseDaBiblioteca)) {
      setImagem({});
    } else {
      setImagem(parsearResponse(responseDaBiblioteca));
    }
  }, [responseDaBiblioteca]);

  const onSubmit = async () => {
    try {
      const { data } = await postFeedback(tipoDeFeedback, feedback, email, imagem);
      if (data.errors) {
        setMensagemDeErro(extrairMensagemDeErro(data));
        setErroAoEnviar(true);
        setCarregando(false);
      } else {
        limparCampos();
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
    dados: response.data
  });

  const extrairMensagemDeErro = (response) => {
    if (response.errors['imagem.tipo']) return response.errors['imagem.tipo'][0];
    if (response.errors['imagem.tamanho']) return response.errors['imagem.tamanho'][0];
    return '';
  };

  const emailValido = () => Regex.EMAIL.test(email.toLowerCase());
  const feedbackValido = () => feedback.replace(/\s/g, '').length;

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
    let path = response.uri;
    if (Platform.OS === 'ios') path = extrairCaminhoDoArquivo(path);
    if (!response.fileName) setNomeImagem(extrairNomeDoArquivo(path));
    else setNomeImagem(response.fileName);
    setResponseDaBiblioteca(response);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#4CAF50',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'iSUS',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });
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
            problemas e melhorar o app rapidamendamente.
          </Text>

          <TextInput
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
                () => ImagePicker.launchImageLibrary(
                  {},
                  response => definirNomeDaImagem(response)
                )
              }
            >
                ANEXAR IMAGEM
            </Button>
            <Tag text={nomeImagem} onClose={() => limparArquivoDeImagem()} />
          </View>

          <TextInput
            mode="outlined"
            ref={emailInput}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text.trim())}
          />
        </View>
        <View>
        <Button
          disabled={!!(!feedbackValido() || !emailValido())}
          style={feedbackValido() && emailValido() ? styles.button : styles.buttonDisabled}
          labelStyle={{ color: '#fff' }}
          mode="contained"
          loading={carregando}
          onPress={() => {
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
          Seu feedback foi enviado, obrigado!
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
