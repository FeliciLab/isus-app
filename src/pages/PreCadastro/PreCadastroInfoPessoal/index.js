import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { verificarCPFCadastrado } from '~/apis/apiCadastro';
import Alerta from '~/components/alerta';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import ControlledTextInput from '~/components/ControlledTextInput';
import ControlledTextInputMask from '~/components/ControlledTextInputMask';
import ValidationFieldIndicator from '~/components/ValidationFieldIndicator/index';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useMunicipios } from '~/hooks/useMunicipios';
import schema from './schema';
import { Container, RowButton } from './styles';
import { find } from 'lodash';

const PreCadastroInfoPessoal = () => {
  const navigation = useNavigation();

  const { user } = useAutenticacao();

  const [isLoading, setIsLoading] = useState(false);

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const { control, handleSubmit, setError, clearErrors } = useForm({
    defaultValues: {
      nomeCompleto: user?.name || '',
      email: user?.email || '',
      telefone: user?.telefone || '',
      cpf: '',
      municipioSelectedId: '',
    },
    resolver: yupResolver(schema),
  });

  const { municipios, fetchMunicipios } = useMunicipios();

  const [isValidatingCpfCadastrado, setIsValidatingCpfCadastrado] = useState(
    false,
  );

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

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  const handleOnPressButtonContinuar = async dataForm => {
    try {
      setIsLoading(true);
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
        municipio: find(municipios, [
          'id',
          Number(dataForm.municipioSelectedId),
        ]),
      };

      navigation.navigate(rotas.PRE_CADASTRO_INFO_PROFISSIONAL, {
        infoPessoal,
      });
    } catch (error) {
      mostrarAlerta('Algo inesperado aconteceu.');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMunicipios();
  }, []);

  return (
    <Container>
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="nomeCompleto"
        mode="outlined"
        placeholder="Nome Completo"
        label="Nome Completo"
      />

      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="email"
        mode="outlined"
        placeholder="email@email.com"
        keyboardType="email-address"
        label="E-mail"
        disabled
      />
      <ControlledTextInputMask
        style={{ marginVertical: 5 }}
        control={control}
        name="telefone"
        mode="outlined"
        placeholder="(99) 99999-9999"
        mask="([00]) [00000]-[0000]"
        keyboardType="phone-pad"
        label="Telefone"
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
      <RowButton>
        <BotaoLaranja
          onPress={handleSubmit(handleOnPressButtonContinuar)}
          disabled={isLoading}
          loading={isLoading}>
          Continuar
        </BotaoLaranja>
      </RowButton>
      <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      />
    </Container>
  );
};

export default PreCadastroInfoPessoal;
