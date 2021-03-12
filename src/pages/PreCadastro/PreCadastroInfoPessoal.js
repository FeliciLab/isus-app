import React, { useContext } from 'react';
import { Platform, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContext from '../../context/FormContext';
import { emailValido, cpfValido } from '../../utils/validadores';
import { CORES, INPUT_THEMES } from '../../constantes/estiloBase';
import FormTextInput from '../../components/FormLayoutContexts/FormTextInput';
import FormTextInputMask from '../../components/FormLayoutContexts/FormTextInputMask';
import FormError from '../../components/FormLayoutContexts/FormError';

export default function PreCadastroInfoPessoal() {
  const { errors } = useContext(FormContext);
  const theme = INPUT_THEMES.LARANJA;

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      keyboardOpeningTime={100}
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}
      style={{ backgroundColor: CORES.BRANCO }}
    >
      <View style={{ backgroundColor: CORES.BRANCO, marginHorizontal: 16 }}>
        <FormTextInput
          name="nome"
          label="Nome Completo"
          theme={theme}
          rules={{ required: true }}
        />
        <FormError name="nome" msg="O nome completo é obrigatório." />

        <FormTextInput
          name="email"
          label="E-mail"
          theme={theme}
          rules={{ required: true, validate: { emailValido: value => emailValido(value) } }}
        />
        <FormError name="email" msg="Insira um e-mail válido." />

        <FormTextInput
          name="telefone"
          label="Telefone"
          theme={theme}
          rules={{ required: true }}
        />
        <FormError name="telefone" msg="O campo telefone é obrigatório." />

        <FormTextInputMask
          name="cpf"
          label="CPF"
          theme={theme}
          rules={{ required: true, validate: { cpfValido: value => cpfValido(value) } }}
          mask="[000].[000].[000]-[00]"
        />
        <FormError name="cpf" msg=" Insira um CPF válido. " />
      </View>
    </KeyboardAwareScrollView>
  );
}
