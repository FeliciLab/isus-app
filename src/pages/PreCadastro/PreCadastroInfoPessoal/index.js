import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BotaoLaranja } from '~/components/Botoes/BotoesCirculares';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import ControlledTextInput from '~/components/ControlledTextInput';
import ControlledTextInputMask from '~/components/ControlledTextInputMask';
import rotas from '~/constantes/rotas';
import useAutenticacao from '~/hooks/useAutenticacao';
import { useMunicipios } from '~/hooks/useMunicipios';
import schema from './schema';
import { Container } from './styles';

const PreCadastroInfoPessoal = () => {
  const navigation = useNavigation();

  const { user } = useAutenticacao();

  console.log(user);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nomeCompleto: user.name || '',
      email: user.email || '',
      telefone: user.telefone || '',
      cpf: '',
      municipioSelectedId: '',
    },
    resolver: yupResolver(schema),
  });

  const { municipios, fetchMunicipios } = useMunicipios();

  const handleOnPressButtonContinuar = dataFrom => {
    console.log(dataFrom);
    navigation.navigate(rotas.PRE_CADASTRO_PROFISSIONAL);
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

      <BotaoLaranja
        onPress={handleSubmit(handleOnPressButtonContinuar)}
        // onPress={async () => {
        //   await trigger(['nome', 'email', 'telefone', 'cpf', 'cidadeId']);
        //   if (hasErrors) return;
        //   navigator.navigate(ROTAS.PRE_CADASTRO_PROFISSIONAL);
        // }}
      >
        Continuar
      </BotaoLaranja>
    </Container>
  );
};

export default PreCadastroInfoPessoal;
