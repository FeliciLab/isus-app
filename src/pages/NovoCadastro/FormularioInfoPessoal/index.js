import { yupResolver } from '@hookform/resolvers/yup';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { find } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import {
  verificarCPFCadastrado,
  verificarEmailCadastrado,
} from '~/apis/apiCadastro';
import Alerta from '~/components/alerta';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import ControlledTextInput from '~/components/ControlledTextInput';
import ControlledTextInputMask from '~/components/ControlledTextInputMask';
import ValidationFieldIndicator from '~/components/ValidationFieldIndicator';
import { useMunicipios } from '~/hooks/useMunicipios';
import schema from './schema';
import { Botao, Container, SubTitulo, Titulo } from './styles';

const theme = {
  colors: {
    primary: '#304FFE',
  },
};

function FormularioInfoPessoal() {
  const navigation = useNavigation();

  // TODO: rever essa lógica de esperiêcnia offline
  let estaConectado = false;

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const { municipios, fetchMunicipios } = useMunicipios();

  const { control, handleSubmit, errors, setError, clearErrors } = useForm({
    defaultValues: {
      nomeCompleto: '',
      email: '',
      telefone: '',
      cpf: '',
      municipioSelectedId: '',
    },
    resolver: yupResolver(schema),
  });

  const [isValidatingCpfCadastrado, setIsValidatingCpfCadastrado] = useState(
    false,
  );

  const [
    isValidatingEmailCadastrado,
    setIsValidatingEmailCadastrado,
  ] = useState(false);

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  const emailAlreadyRegistered = useCallback(async email => {
    try {
      if (email) {
        setIsValidatingEmailCadastrado(true);

        const { data } = await verificarEmailCadastrado(email);

        if (data?.email_existe) {
          setError('email', { type: 'custon', message: 'Email cadastrado.' });
          return true;
        }
      }
    } catch (error) {
      mostrarAlerta('Erro ao validar Email.');
      console.log(error);
    } finally {
      setIsValidatingEmailCadastrado(false);
    }
    return false;
  }, []);

  const cpfAlreadyRegistered = useCallback(async cpf => {
    try {
      if (cpf && cpf.length >= 11) {
        setIsValidatingCpfCadastrado(true);

        const { data } = await verificarCPFCadastrado(cpf);

        if (data?.cpf_existe) {
          setError('cpf', { type: 'custom', message: 'CPF cadastrado.' });
          return true;
        }
      }
    } catch (error) {
      mostrarAlerta('Erro ao validar CPF.');
      console.log(error);
    } finally {
      setIsValidatingCpfCadastrado(false);
    }
    return false;
  }, []);

  const handleOnPressNextButton = async dataForm => {
    if (await emailAlreadyRegistered(dataForm.email)) {
      return;
    } else {
      clearErrors('email');
    }

    if (await cpfAlreadyRegistered(dataForm.cpf.replace(/\D+/g, ''))) {
      return;
    } else {
      clearErrors('cpf');
    }

    // Informações para próxima página
    const infoPessoal = {
      nomeCompleto: dataForm.nomeCompleto,
      email: dataForm.email,
      telefone: dataForm.telefone.replace(/\D+/g, ''),
      cpf: dataForm.cpf.replace(/\D+/g, ''),
      municipio: find(municipios, ['id', Number(dataForm.municipioSelectedId)]),
    };

    navigation.navigate('FormularioInfoProfissional', { infoPessoal });
  };

  // TODO: rever essa lógica de esperiêcnia offline
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      estaConectado = state.isConnected;
    });

    if (!estaConectado) {
      Alert.alert(
        'Sem conexão com a internet',
        'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('LOGIN');
            },
          },
        ],
      );
    }
    return () => unsubscribe();
  });

  useEffect(() => {
    fetchMunicipios();
  }, []);

  return (
    <Container>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
      <Titulo>
        Vamos realizar seu cadastro, precisamos apenas de algumas informações:
      </Titulo>
      <SubTitulo>Informações Pessoais:</SubTitulo>
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="nomeCompleto"
        mode="outlined"
        placeholder="Nome Completo"
        label="Nome Completo"
        theme={theme}
      />
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="email"
        mode="outlined"
        placeholder="email@email.com"
        keyboardType="email-address"
        label="E-mail"
        theme={theme}
      />
      {isValidatingEmailCadastrado && (
        <ValidationFieldIndicator message="Validando Email" />
      )}
      <ControlledTextInputMask
        style={{ marginVertical: 5 }}
        control={control}
        name="telefone"
        mode="outlined"
        placeholder="(99) 99999-9999"
        mask="([00]) [00000]-[0000]"
        keyboardType="phone-pad"
        label="Telefone"
        theme={theme}
      />
      <ControlledTextInputMask
        style={{ marginVertical: 5 }}
        control={control}
        name="cpf"
        mode="outlined"
        placeholder="000.000.000-00"
        mask="[000].[000].[000]-[00]"
        keyboardType="numeric"
        label="CPF"
        theme={theme}
      />
      {isValidatingCpfCadastrado && (
        <ValidationFieldIndicator message="Validando CPF" />
      )}
      <ControlledSelectModal
        control={control}
        name="municipioSelectedId"
        mode="outlined"
        placeholder="Selecione o município de residência"
        title="Município de residência"
        items={municipios.map(item => ({
          value: String(item.id),
          label: String(item.nome),
        }))}
      />
      <Botao
        cor="#304FFE"
        disabled={
          !!errors || isValidatingEmailCadastrado || isValidatingCpfCadastrado
        }
        loading={isValidatingEmailCadastrado || isValidatingCpfCadastrado}
        label="Próximo"
        labelStyle={{ color: '#fff' }}
        mode="contained"
        onPress={handleSubmit(handleOnPressNextButton)}>
        Próximo
      </Botao>
      <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      />
    </Container>
  );
}

export default FormularioInfoPessoal;
