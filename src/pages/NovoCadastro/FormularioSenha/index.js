import { yupResolver } from '@hookform/resolvers/yup';
import React, { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
// import { cadastrarUsuario } from '~/apis/apiCadastro';
// import Alerta from '~/components/alerta';
import BarraDeStatus from '~/components/barraDeStatus';
import ControlledTextInput from '~/components/ControlledTextInput/index';
// import { labelsAnalytics } from '~/constantes/labelsAnalytics';
// import FormContext from '~/context/FormContext';
// import useAnalytics from '~/hooks/useAnalytics';
// import useAutenticacao from '~/hooks/useAutenticacao';
import { ArrowLeftIcon } from '~/icons';
import schema from './schema';
// import {
//   analyticsCategoria,
//   analyticsUnidadeServico,
// } from '~/utils/funcoesAnalytics';
import { Botao, Container, Titulo, SubTitulo } from './styles';

export default function FormularioSenha({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  // const { analyticsData } = useAnalytics();

  // const [botaoAtivo, setBotaoAtivo] = useState(false);

  // const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  // const [cadastroRealizado, setCadastroRealizado] = useState(false);

  // const { signIn } = useAutenticacao();

  // const { register, setValue, trigger, errors, getValues } = useContext(
  //   FormContext,
  // );

  // const valores = getValues();

  // const { categoriaProfissional } = valores;

  // const uniServ = JSON.parse(valores.unidadeServico);

  // const now = Date.now();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnPressNextButton = dataForm => {
    setIsLoading(true);

    console.log(dataForm);

    setIsLoading(false);

    // navigation.navigate('FormularioSenha');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color="#304FFE" />
        </TouchableOpacity>
      ),
    });
  }, []);

  // const mostrarAlerta = mensagem => {
  //   setMensagemDoAlerta(mensagem);
  //   setCadastroRealizado(true);
  // };

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE',
    },
  };

  // const alteraValor = async (campo, valor) => {
  //   setValue(campo, valor);
  //   await trigger(['senha', 'repetirsenha']);
  //   setBotaoAtivo(Object.entries(errors).length === 0);
  // };

  // const tratarDadosCadastro = dadosCadastro => {
  //   const { cidade, cpf, telefone } = dadosCadastro;
  //   return {
  //     ...dadosCadastro,
  //     cidadeId: cidade.id,
  //     cidade: cidade.nome,
  //     cpf,
  //     telefone,
  //     termos: true,
  //   };
  // };

  // const realizarCadastroDoUsuario = async () => {
  //   const dados = tratarDadosCadastro(getValues());
  //   console.log({
  //     ...dados,
  //     unidadeServico: JSON.parse(dados?.unidadeServico || '[]'),
  //     especialidades: JSON.parse(dados?.especialidades || '[]'),
  //     categoriaProfissional: JSON.parse(dados?.categoriaProfissional || '{}'),
  //   });
  //   const resposta = await cadastrarUsuario({
  //     ...dados,
  //     unidadeServico: JSON.parse(dados?.unidadeServico || '[]'),
  //     especialidades: JSON.parse(dados?.especialidades || '[]'),
  //     categoriaProfissional: JSON.parse(dados?.categoriaProfissional || '{}'),
  //   });
  //   return resposta.data;
  // };

  // const aposCadastro = async resultado => {
  //   if (resultado.sucesso) {
  //     const dados = tratarDadosCadastro(getValues());

  //     await signIn(dados.email, dados.senha);

  //     navigation.navigate('TelaDeSucesso', {
  //       textoApresentacao:
  //         'Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS.',
  //       telaDeRedirecionamento: 'HOME',
  //       telaDeBackground: '#304FFE',
  //     });
  //     return;
  //   }

  //   let mensagemErro;
  //   if (resultado.erros.cpf) {
  //     const [mensagemErroCPF] = resultado.erros.cpf;
  //     mensagemErro = mensagemErroCPF;
  //   }
  //   if (resultado.erros.email) {
  //     const [mensagemErroEmail] = resultado.erros.email;
  //     mensagemErro = mensagemErroEmail;
  //   }
  //   if (resultado.erros.email && resultado.erros.cpf) {
  //     const [mensagemErroEmail] = resultado.erros.email;
  //     const [mensagemErroCPF] = resultado.erros.cpf;
  //     mostrarAlerta(mensagemErroEmail);
  //     mostrarAlerta(mensagemErroCPF);
  //     return;
  //   }
  //   mostrarAlerta(mensagemErro);
  // };

  // useEffect(() => {
  //   register('senha', {
  //     required: true,
  //     minLength: { value: 8, message: textos.formularioSenha.erroTamanho },
  //   });
  //   register('repetirsenha', {
  //     required: true,
  //     validate: repetirsenha =>
  //       repetirsenha === getValues('senha') ||
  //       textos.formularioSenha.erroIguais,
  //   });
  // }, [register]);

  return (
    <Container>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
      <Titulo>
        Para finalizar seu cadastro, precisamos apenas de mais uma informação:
      </Titulo>
      <SubTitulo>Defina uma senha:</SubTitulo>

      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="password"
        mode="outlined"
        label="Senha"
        placeholder="Senha"
        secureTextEntry
        theme={theme}
      />
      <ControlledTextInput
        style={{ marginVertical: 5 }}
        control={control}
        name="confirmPassword"
        mode="outlined"
        label="Confirmar Senha"
        placeholder="Confirmar Senha"
        secureTextEntry
        theme={theme}
      />

      {/* <CampoDeTexto
        label="Senha"
        name="senha"
        secureTextEntry
        onChangeText={text => alteraValor('senha', text)}
        mode="outlined"
        theme={theme}
      /> */}
      {/* {errors.senha && <TextoDeErro>{errors.senha.message}</TextoDeErro>} */}
      {/* <CampoDeTexto
        label="Confirmação de senha"
        name="repetirsenha"
        secureTextEntry
        underlineColor="#BDBDBD"
        onChangeText={text => alteraValor('repetirsenha', text)}
        mode="outlined"
        theme={theme}
      /> */}
      {/* {errors.repetirsenha && (
        <TextoDeErro>{errors.repetirsenha.message}</TextoDeErro>
      )} */}
      <Botao
        cor="#304FFE"
        // disabled={!botaoAtivo}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        onPress={handleSubmit(handleOnPressNextButton)}
        loading={isLoading}
        // onPress={async () => {
        //   setCarregando(true);
        //   try {
        //     const resultado = await realizarCadastroDoUsuario();
        //     aposCadastro(resultado);
        //     setCarregando(false);
        //     analyticsData(
        //       labelsAnalytics.FINALIZAR_MEU_CADASTRO,
        //       'Click',
        //       'Perfil',
        //     );
        //     analyticsCategoria(categoriaProfissional, now, 'Cadastro');
        //     analyticsUnidadeServico(uniServ, now, 'Cadastro');
        //   } catch (err) {
        //     console.log(err);
        //     setCarregando(false);
        //   }
        // }}
      >
        Finalizar
      </Botao>
      {/* <Alerta
        visivel={cadastroRealizado}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setCadastroRealizado(false)}
      /> */}
    </Container>
  );
}
