import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { formularioPessoal } from '~/constantes/erroFormMsg';
import { INPUT_THEMES } from '~/constantes/estiloBase';
import FormContext from '~/context/FormContext';
import useAutenticacao from '~/hooks/useAutenticacao';
import PessoaModel from '~/models/pessoa';
import { cpfNaoCadastrado, cpfValido, emailValido } from '~/utils/validadores';
import { BotaoLaranja } from '../Botoes/BotoesCirculares';
import FormError from '../FormLayoutContexts/FormError';
import FormTextInput from '../FormLayoutContexts/FormTextInput';
import FormTextInputMask from '../FormLayoutContexts/FormTextInputMask';
import InputMunicipios from './InputMunicipios';
import {
  ContainerBody,
  ContainerForm,
  RowButton,
  RowInput,
  Title,
} from './styles';

// TODO: possivel remoção
export default function FormInfoPessoal({
  actionPress,
  labelButton,
  hiddenActionButton,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [emailSomenteLeitura, setEmailSomenteLeitura] = useState(false);

  const [cpfAntigo, setCpfAntigo] = useState(false);

  const { pessoa } = useAutenticacao();

  const theme = INPUT_THEMES.LARANJA;

  const { errors, setValues, trigger } = useContext(FormContext);

  useEffect(() => {
    if (pessoa?.email) {
      setEmailSomenteLeitura(true);
    }

    setCpfAntigo(pessoa?.cpf);
    setValues(PessoaModel.criar(pessoa));

    trigger(['nomeCompleto', 'email', 'telefone', 'cpf', 'cidadeId']);
  }, [pessoa]);

  const hasErrors =
    errors.nomeCompleto ||
    errors.email ||
    errors.telefone ||
    errors.cpf ||
    errors.cidadeId;

  const validarCpfCadastrado = async cpf => {
    if (cpfAntigo === false || (cpfAntigo && cpfAntigo === cpf)) {
      return true;
    }

    return cpfNaoCadastrado(cpf.replace(/\D/g, ''));
  };

  return (
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
              rules={{
                required: true,
                validate: {
                  emailValido: value =>
                    emailValido(value) || formularioPessoal.emailValido,
                },
              }}
            />
            <FormError
              name="email"
              msg={errors.email?.message || 'Insira um e-mail válido.'}
            />
          </RowInput>
          <RowInput>
            <FormTextInputMask
              name="telefone"
              label="Telefone"
              theme={theme}
              rules={{ required: true }}
              mask="(##) #####-####"
              numero
            />
            <FormError
              name="telefone"
              msg={formularioPessoal.telefoneObrigatorio}
            />
          </RowInput>
          <RowInput>
            <FormTextInputMask
              name="cpf"
              label="CPF"
              theme={theme}
              rules={{
                required: true,
                validate: {
                  cpfValido: value =>
                    cpfValido(value) || formularioPessoal.cpfInvalido,
                  cpfCadastrado: async cpf =>
                    (await validarCpfCadastrado(cpf.replace(/\D/g, ''))) ||
                    formularioPessoal.cpfCadastrado,
                },
              }}
              mask="###.###.###-##"
              numero
            />
            <FormError
              name="cpf"
              msg={errors.cpf?.message || 'Insira um CPF válido'}
            />
          </RowInput>
          <RowInput>
            <InputMunicipios />
            <FormError name="cidadeId" msg="Escolha o município" />
          </RowInput>
        </ContainerForm>
        {!hiddenActionButton && (
          <RowButton>
            <BotaoLaranja
              loading={isLoading}
              disabled={hasErrors || isLoading}
              onPress={async () => {
                await trigger(['nome', 'email', 'telefone', 'cpf', 'cidadeId']);
                if (hasErrors) return;
                setIsLoading(true);

                try {
                  await actionPress();
                } finally {
                  setIsLoading(false);
                }
              }}>
              {labelButton || 'Continuar'}
            </BotaoLaranja>
          </RowButton>
        )}
      </ScrollView>
    </ContainerBody>
  );
}
