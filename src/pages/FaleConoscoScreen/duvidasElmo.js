import React, {
  useState, useCallback, useRef, useContext, useEffect, useLayoutEffect
} from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { postDuvidasElmo } from '../../apis/apiHome';
import { CORES } from '../../constantes/estiloBase';
import BarraDeStatus from '../../components/barraDeStatus';
import Regex from '../../utils/regex';
import FormContext from '../../context/FormContext';
import MsgErroFormCampo from '../../components/loginLayout/msgErroFormCampo';
import {
  View, BotaoForm, AlertaBar, EntradaTexto
} from './sytles';


export default function DuvidasElmoScreen() {
  const [sucessoAoEnviar, setSucessoAoEnviar] = useState(false);
  const [erroAoEnviar, setErroAoEnviar] = useState(false);
  const [mensagemDeErro, setMensagemDeErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
  const botaoRef = useRef(null);
  const duvidaInput = useRef(null);
  const emailInput = useRef(null);
  const navigation = useNavigation();

  const emailValido = email => email && Regex.EMAIL.test(email.toLowerCase());

  const {
    register,
    setValue,
    trigger,
    errors,
    getValues
  } = useContext(FormContext);


  const limparCampos = () => {
    duvidaInput.current.clear();
    emailInput.current.clear();
    setBotaoDesabilitado(true);
    console.log(`botaoDesabilitado - Limpa: ${botaoDesabilitado}`);
  };

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    trigger(campo);
    const duvida = getValues('duvida');
    const email = getValues('email');
    if (duvida.length > 0 && email.length > 0) {
      if (emailValido(email)) {
        setBotaoDesabilitado(false);
        return;
      }
    }
    setBotaoDesabilitado(true);
  };

  const onSubmit = async () => {
    setTimeout(async () => {
      limparCampos();
    }, 8000);
    trigger();

    if (Object.keys(errors).length > 0) {
      console.log('erro');
      return;
    }
    await postDuvidasElmo(getValues('duvida'), getValues('email'))
      .then(async (response) => {
        console.log(`Sucesso ao enviar duvidas ${response.sucesso}`);
        limparCampos();
        setCarregando(false);
        setSucessoAoEnviar(true);
      })
      .catch((err) => {
        console.log(err.status);
        setErroAoEnviar(true);
        setCarregando(false);
        if (err.message === 'Network Error') {
          setMensagemDeErro(
            'Erro na conexão com o servidor. Tente novamente mais tarde.'
          );
        } else {
          setMensagemDeErro(
            'Ocorreu um erro inesperado. Tente novamente mais tarde.'
          );
        }
      });
  };

  useFocusEffect(
    useCallback(() => limparCampos(), [])
  );

  useEffect(() => {
    register('email', {
      required: 'O campo e-mail é obrigatório',
      validate: email => emailValido(email)
                || 'O e-mail deve ser no formato exemplo@exemplo.com'
    });

    register('duvida', {
      required: 'O campo dúvidas é obrigatório'
    });
  }, [register]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.VERDE,
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Dúvidas Sobre o Elmo',
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate('Buscar');
          }}
        >
          <Icon name="magnify" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            Keyboard.dismiss();
            navigation.toggleDrawer();
          }}
        >
          <Icon name="menu" size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      )
    });
  });
  return (
    <>
      <BarraDeStatus backgroundColor={CORES.VERDE} barStyle="light-content" />
      <View>
        <EntradaTexto
          numberOfLines={5}
          mode="outlined"
          ref={duvidaInput}
          multiline
          label="Dúvidas sobre o Elmo *"
          onChangeText={text => alteraValor('duvida', text.trim())}
        />
        <MsgErroFormCampo campo="duvida" />
        <EntradaTexto
          margintop="20px"
          mode="outlined"
          ref={emailInput}
          keyboardType="email-address"
          label="E-mail *"
          onChangeText={text => alteraValor('email', text.toLowerCase())}
        />
        <MsgErroFormCampo campo="email" />
      </View>
      <View>
        <BotaoForm
          ref={botaoRef}
          disabled={botaoDesabilitado}
          mode="contained"
          labelStyle={{ color: CORES.BRANCO }}
          loading={carregando}
          onPress={() => {
            setCarregando(true);
            onSubmit();
          }}
        >
          Enviar
        </BotaoForm>
        <AlertaBar
          visible={sucessoAoEnviar}
          onDismiss={() => setSucessoAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setSucessoAoEnviar(false)
          }}
        >
          Sua demanda foi enviada!
        </AlertaBar>
        <AlertaBar
          visible={erroAoEnviar}
          onDismiss={() => setErroAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setErroAoEnviar(false)
          }}
        >
          {mensagemDeErro}
        </AlertaBar>
      </View>
    </>
  );
}
