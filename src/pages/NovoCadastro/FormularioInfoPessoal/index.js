// import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledSelectModal from '~/components/ControlledSelectModal';
import ControlledTextInput from '~/components/ControlledTextInput';
import ControlledTextInputMask from '~/components/ControlledTextInputMask/index';
import { useMunicipios } from '~/hooks/useMunicipios';
// import schema from './schema';
import { Botao, Container, SubTitulo, Titulo } from './styles';

// import NetInfo from '@react-native-community/netinfo';
// import { salvarDados } from '~/services/armazenamento';

const theme = {
  colors: {
    primary: '#304FFE',
  },
};

function FormularioInfoPessoal() {
  const navigation = useNavigation();

  const { municipios, fetchMunicipios } = useMunicipios();

  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      nomeCompleto: '',
      email: '',
      telefone: '',
      cpf: '',
      cidade: '',
    },
    // TODO: voltar a validação depois dos testes
    // resolver: yupResolver(schema),
  });

  // TODO: colocar validação do cpf já existente usando a API
  const handleOnPressNextButton = dataForm => {
    console.log({ dataForm });
    navigation.navigate('FormularioInfoProfissional', { ...dataForm });
  };

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setEstaConectado(state.isConnected);
  //   });

  //   if (!estaConectado) {
  //     Alert.alert(
  //       'Sem conexão com a internet',
  //       'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
  //       [
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             navigation.navigate('LOGIN');
  //           },
  //         },
  //       ],
  //     );
  //   }
  //   return () => unsubscribe();
  // });

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
      <ControlledSelectModal
        control={control}
        name="cidade"
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
        disabled={!!errors}
        label="Próximo"
        labelStyle={{ color: '#fff' }}
        mode="contained"
        onPress={handleSubmit(handleOnPressNextButton)}>
        Próximo
      </Botao>
    </Container>
  );
}

export default FormularioInfoPessoal;
