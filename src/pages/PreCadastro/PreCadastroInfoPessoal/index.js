import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { find } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alerta from '~/components/Alerta';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import ControlledTextInput from '~/components/ControlledTextInput';
import ControlledTextInputMask from '~/components/ControlledTextInputMask';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useMunicipios } from '~/hooks/useMunicipios';
import schema from './schema';
import { Container, RowButton } from './styles';

const PreCadastroInfoPessoal = () => {
  const navigation = useNavigation();

  const { user } = useAutenticacao();

  const [isLoading, setIsLoading] = useState(false);

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nomeCompleto: user?.name || '',
      email: user?.email || '',
      telefone: user?.telefone || '',
      cpf: user?.cpf || '',
      municipioSelectedId: '',
    },
    resolver: yupResolver(schema),
  });

  const { municipios, fetchMunicipios } = useMunicipios();

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  const handleOnPressButtonContinuar = async dataForm => {
    try {
      setIsLoading(true);

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
        disabled
      />
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
