import * as React from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TextInput, Button, Snackbar
} from 'react-native-paper';
import { postFeedback } from '../../apis/apiHome';
import Regex from '../../utils/regex';

export default function AlertaFaltaDeEpiScreen() {
  const feedbackInput = React.createRef();
  const emailInput = React.createRef();
  const [feedback, setFeedback] = React.useState('');
  const [imagem, setImagem] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [sucessoAoEnviar, setSucessoAoEnviar] = React.useState(false);
  const [erroAoEnviar, setErroAoEnviar] = React.useState(false);
  const [mensagemDeErro, setMensagemDeErro] = React.useState('');
  const [carregando, setCarregando] = React.useState(false);
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      const { data } = await postFeedback(feedback, email, imagem);
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
    setEmail('');
    setImagem({});
  };

  const extrairMensagemDeErro = (response) => {
    if (response.errors['imagem.tipo']) return response.errors['imagem.tipo'][0];
    if (response.errors['imagem.tamanho']) return response.errors['imagem.tamanho'][0];
    return '';
  };

  const emailValido = () => Regex.EMAIL.test(email.toLowerCase());
  const feedbackValido = () => feedback.replace(/\s/g, '').length;

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
            Reporte a falta ou escassez dos equipamentos de EPI da
            sua Unidade de Saúde para nos ajudar a resolver o problema e melhorar a condição atual.
          </Text>

          <TextInput
            numberOfLines={5}
            mode="outlined"
            ref={feedbackInput}
            multiline
            value={feedback}
            label="Situação atual da sua unidade *"
            onChangeText={text => setFeedback(text)}
            style={{ marginBottom: 20 }}
          />

          <TextInput
            mode="outlined"
            ref={emailInput}
            label="Unidade de Saúde *"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{ marginBottom: 20 }}
          />

          <TextInput
            mode="outlined"
            ref={emailInput}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{ marginBottom: 20 }}
          />

          <Text
            style={{
              letterSpacing: 0.25,
              fontSize: 14,
              lineHeight: 20,
              color: '#828282',
              marginBottom: 18
            }}
          >
            Campo não obrigatório
          </Text>
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
            onSubmit(feedback, email, imagem);
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
          Enviado
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
