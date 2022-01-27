import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { postDuvidasElmo } from '~/apis/apiHome';
import BarraDeStatus from '~/components/barraDeStatus';
import MsgErroFormCampo from '~/components/loginLayout/msgErroFormCampo';
import { CORES } from '~/constantes/estiloBase';
import { labelsAnalytics } from '~/constantes/labelsAnalytics';
import { TESTIDS } from '~/constantes/testIDs';
import FormContext from '~/context/FormContext';
import useAnalytics from '~/hooks/useAnalytics';
import Regex from '~/utils/regex';
import { AlertaBar, BotaoForm, EntradaTexto, View } from './sytles';

export default function DuvidasElmoScreen() {
  const { analyticsData } = useAnalytics();

  const [sucessoAoEnviar, setSucessoAoEnviar] = useState(false);

  const [erroAoEnviar, setErroAoEnviar] = useState(false);

  const [mensagemDeErro, setMensagemDeErro] = useState('');

  const [carregando, setCarregando] = useState(false);

  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);

  const botaoRef = useRef(null);

  const duvidaInput = useRef(null);

  const emailInput = useRef(null);

  const emailValido = email => email && Regex.EMAIL.test(email.toLowerCase());

  const { register, setValue, trigger, errors, getValues } = useContext(
    FormContext,
  );

  const limparCampos = () => {
    duvidaInput.current.clear();
    emailInput.current.clear();
    setBotaoDesabilitado(true);
  };

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    trigger(campo);
    let duvida = getValues('duvida');
    let email = getValues('email');
    if (duvida === undefined) {
      duvida = '';
    }
    if (email === undefined) {
      email = '';
    }
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
      .then(async response => {
        console.log(`Sucesso ao enviar duvidas ${response.sucesso}`);
        limparCampos();
        setCarregando(false);
        setSucessoAoEnviar(true);
      })
      .catch(err => {
        console.log(err.status);
        setErroAoEnviar(true);
        setCarregando(false);
        if (err.message === 'Network Error') {
          setMensagemDeErro(
            'Erro na conexão com o servidor. Tente novamente mais tarde.',
          );
        } else {
          setMensagemDeErro(
            'Ocorreu um erro inesperado. Tente novamente mais tarde.',
          );
        }
      });
  };

  useFocusEffect(useCallback(() => limparCampos(), []));

  useEffect(() => {
    register('email', {
      required: 'O campo e-mail é obrigatório',
      validate: email =>
        emailValido(email) ||
        'O e-mail deve ser no formato exemplo@exemplo.com',
    });

    register('duvida', {
      required: 'O campo dúvidas é obrigatório',
    });
  }, [register]);

  return (
    <>
      <BarraDeStatus backgroundColor={CORES.VERDE} barStyle="light-content" />
      <View>
        <EntradaTexto
          testID={TESTIDS.ELMO.DUVIDAS.SOBRE_ELMO}
          numberOfLines={5}
          mode="outlined"
          ref={duvidaInput}
          multiline
          label="Dúvidas sobre o Elmo *"
          onChangeText={text => alteraValor('duvida', text.trim())}
        />
        <MsgErroFormCampo campo="duvida" />
        <EntradaTexto
          testID={TESTIDS.ELMO.DUVIDAS.EMAIL}
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
          testID={TESTIDS.ELMO.DUVIDAS.BOTAO_ENVIAR}
          ref={botaoRef}
          disabled={botaoDesabilitado}
          mode="contained"
          labelStyle={{ color: CORES.BRANCO }}
          loading={carregando}
          onPress={() => {
            analyticsData(
              labelsAnalytics.ENVIAR_DUVIDAS_ELMO,
              'Click',
              'Fale Conosco',
            );
            setCarregando(true);
            onSubmit();
          }}>
          Enviar
        </BotaoForm>
        <AlertaBar
          visible={sucessoAoEnviar}
          onDismiss={() => setSucessoAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setSucessoAoEnviar(false),
          }}>
          Sua demanda foi enviada!
        </AlertaBar>
        <AlertaBar
          visible={erroAoEnviar}
          onDismiss={() => setErroAoEnviar(false)}
          action={{
            label: 'ok',
            onPress: () => setErroAoEnviar(false),
          }}>
          {mensagemDeErro}
        </AlertaBar>
      </View>
    </>
  );
}
