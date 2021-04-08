import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { emailValido, cpfValido } from '../../utils/validadores';
import { INPUT_THEMES } from '../../constantes/estiloBase';
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
import { AutenticacaoContext } from '../../context/AutenticacaoContext';

export default function PreCadastroInfoPessoal() {
  const [emailSomenteLeitura, definirEmailSomenteLeitura] = useState(false);
  const { dadosUsuario } = useContext(AutenticacaoContext);
  const theme = INPUT_THEMES.LARANJA;
  const navigator = useNavigation();

  const {
    errors,
    setValues,
    trigger
  } = useContext(FormContext);

  useEffect(() => {
    if (dadosUsuario?.email) {
      definirEmailSomenteLeitura(true);
    }
    setValues({
      nomeCompleto: dadosUsuario?.name || '',
      email: dadosUsuario?.email || '',
      telefone: dadosUsuario?.telefone || '',
      cidadeId: dadosUsuario?.municipio_id ? parseInt(dadosUsuario.municipio_id, 10) : '',
      cpf: dadosUsuario?.cpf || ''
    });

    trigger([
      'nomeCompleto',
      'email',
      'telefone',
      'cpf',
      'cidadeId'
    ]);
  }, []);

  const hasErrors = errors.nome
    || errors.email
    || errors.telefone
    || errors.cpf
    || errors.cidadeId;

  return (
    <>
      <ContainerBody>
        <ScrollView>
          <ContainerForm>
            <Title>Informações pessoais</Title>
            <RowInput>
              <FormTextInput
                name="nomeCompleto"
                label="Nome Completo"
                theme={theme}
                rules={{ required: true }}
              />
              <FormError
                name="nomeCompleto"
                msg="O nome completo é obrigatório."
              />
            </RowInput>
            <RowInput>
              <FormTextInput
                readonly={emailSomenteLeitura}
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
              <FormTextInputMask
                name="telefone"
                label="Telefone"
                theme={theme}
                rules={{ required: true }}
                mask="([00]) [00000]-[0000]"
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
                name="cidadeId"
                msg="Escolha o município"
              />
            </RowInput>
          </ContainerForm>
        </ScrollView>
        <RowButton>
          <BotaoLaranja
            disabled={hasErrors}
            onPress={async () => {
              await trigger(['nome', 'email', 'telefone', 'cpf', 'cidadeId']);
              if (hasErrors) return;
              navigator.navigate(ROTAS.PRE_CADASTRO_PROFISSIONAL);
            }}
          >
            Continuar
          </BotaoLaranja>
        </RowButton>
      </ContainerBody>
    </>
  );
}
