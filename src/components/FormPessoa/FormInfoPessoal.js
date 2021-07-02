import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { emailValido, cpfValido, cpfNaoCadastrado } from '../../utils/validadores';
import { INPUT_THEMES } from '../../constantes/estiloBase';
import FormTextInput from '../FormLayoutContexts/FormTextInput';
import FormTextInputMask from '../FormLayoutContexts/FormTextInputMask';
import FormError from '../FormLayoutContexts/FormError';
import InputMunicipios from './InputMunicipios';
import { BotaoLaranja } from '../Botoes/BotoesCirculares';
import {
  ContainerBody,
  ContainerForm,
  RowButton,
  RowInput,
  Title
} from './styles';
import FormContext from '../../context/FormContext';
import { AutenticacaoContext } from '../../context/AutenticacaoContext';
import { formularioPessoal } from '../../constantes/erroFormMsg';
import PessoaModel from '../../models/pessoa';

export default function FormInfoPessoal({
  actionPress,
  labelButton,
  hiddenActionButton
}) {
  const [carregando, definirCarregando] = useState(false);
  const [emailSomenteLeitura, definirEmailSomenteLeitura] = useState(false);
  const [cpfAntigo, definirCpfAntigo] = useState(false);
  const { pessoa } = useContext(AutenticacaoContext);
  const theme = INPUT_THEMES.LARANJA;

  const {
    errors,
    setValues,
    trigger
  } = useContext(FormContext);

  useEffect(() => {
    if (pessoa?.email) {
      definirEmailSomenteLeitura(true);
    }

    definirCpfAntigo(pessoa?.cpf);
    setValues(PessoaModel.criar(pessoa));

    trigger([
      'nomeCompleto',
      'email',
      'telefone',
      'cpf',
      'cidadeId'
    ]);
  }, [pessoa]);

  const hasErrors = errors.nomeCompleto
  || errors.email
  || errors.telefone
  || errors.cpf
  || errors.cidadeId;

  const validarCpfCadastrado = async (cpf) => {
    if (cpfAntigo === false || (cpfAntigo && cpfAntigo === cpf)) {
      return true;
    }

    return cpfNaoCadastrado(cpf.replace(/\D/g, ''));
  };

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
                rules={{
                  required: true,
                  validate: {
                    emailValido: value => emailValido(value) || formularioPessoal.emailValido
                  }
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
                    cpfValido: value => cpfValido(value) || formularioPessoal.cpfInvalido,
                    cpfCadastrado: async cpf => await validarCpfCadastrado(cpf.replace(/\D/g, '')) || formularioPessoal.cpfCadastrado
                  }
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
              <FormError
                name="cidadeId"
                msg="Escolha o município"
              />
            </RowInput>
          </ContainerForm>
          {
            !hiddenActionButton && (
              <RowButton>
                <BotaoLaranja
                  loading={carregando}
                  disabled={hasErrors || carregando}
                  onPress={async () => {
                    await trigger(['nome', 'email', 'telefone', 'cpf', 'cidadeId']);
                    if (hasErrors) return;
                    definirCarregando(true);

                    try {
                      await actionPress();
                    } finally {
                      definirCarregando(false);
                    }
                  }}
                >
                  {labelButton || 'Continuar'}
                </BotaoLaranja>
              </RowButton>
            )
          }
        </ScrollView>
      </ContainerBody>
    </>
  );
}
