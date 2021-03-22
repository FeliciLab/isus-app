import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { emailValido, cpfValido } from '../../utils/validadores';
import { CORES, INPUT_THEMES } from '../../constantes/estiloBase';
import FormTextInput from '../../components/FormLayoutContexts/FormTextInput';
import FormTextInputMask from '../../components/FormLayoutContexts/FormTextInputMask';
import FormError from '../../components/FormLayoutContexts/FormError';
import InputMunicipios from './InputMunicipios';
import { BotaoLaranja } from '../../components/Botoes/BotoesCirculares';
import ROTAS from '../../constantes/rotas';
import {
  ContainerBody,
  ContainerForm,
  RowButton,
  RowInput,
  Title
} from './styles';
import FormContext from '../../context/FormContext';

export default function PreCadastroInfoPessoal() {
  const theme = INPUT_THEMES.LARANJA;
  const navigator = useNavigation();
  const {
    errors,
    fieldsEmpty,
    getValues,
    setValues,
    trigger
  } = useContext(FormContext);

  setValues({
    nome: 'Jeremias 420',
    email: 'email@teste.com',
    telefone: '(85) 98765-3212',
    municipio: ''
  });

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      keyboardOpeningTime={100}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}
      style={{ backgroundColor: CORES.BRANCO }}
    >
      <ContainerBody>
        <ContainerForm>
          <Title>Informações pessoais</Title>
          <RowInput>
            <FormTextInput
              name="nome"
              label="Nome Completo"
              theme={theme}
              rules={{ required: true }}
            />
            <FormError
              name="nome"
              msg="O nome completo é obrigatório."
            />
          </RowInput>
          <RowInput>
            <FormTextInput
              name="email"
              label="E-mail"
              theme={theme}
              rules={{ required: true, validate: { emailValido: value => emailValido(value) } }}
            />
            <FormError
              name="email"
              msg="Insira um e-mail válido."
            />
          </RowInput>
          <RowInput>

            <FormTextInput
              name="telefone"
              label="Telefone"
              theme={theme}
              rules={{ required: true }}
            />
            <FormError
              name="telefone"
              msg="O campo telefone é obrigatório."
            />
          </RowInput>
          <RowInput>
            <FormTextInputMask
              name="cpf"
              label="CPF"
              theme={theme}
              rules={{ required: true, validate: { cpfValido: value => cpfValido(value) } }}
              mask="[000].[000].[000]-[00]"
            />
            <FormError
              name="cpf"
              msg=" Insira um CPF válido. "
            />
          </RowInput>
          <RowInput>
            <InputMunicipios />
            <FormError
              name="municipio"
              msg="Escolha o município"
            />
          </RowInput>
        </ContainerForm>

        <RowButton>
          <BotaoLaranja
            disabled={fieldsEmpty(['nome', 'email', 'telefone', 'cpf', 'municipio']) || errors.nome || errors.email || errors.telefone || errors.cpf}
            onPress={async () => {
              await trigger(['nome', 'email', 'telefone', 'cpf']);
              if (errors.nome || errors.email || errors.telefone || errors.cpf) return;
              navigator.navigate(ROTAS.PRE_CADASTRO_PROFISSIONAL);
            }}
          >
            Continuar
          </BotaoLaranja>
          <BotaoLaranja
            onPress={() => console.log(
              'error', errors,
              'teste', fieldsEmpty(['nome', 'email', 'telefone', 'cpf', 'municipio']),
              'testes', getValues('municipio')
            )}
          >
            log
          </BotaoLaranja>
        </RowButton>
      </ContainerBody>
    </KeyboardAwareScrollView>
  );
}
