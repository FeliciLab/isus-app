import { yupResolver } from '@hookform/resolvers/yup';
import { useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { cadastrarUsuario } from '~/apis/apiCadastro';
import BarraDeStatus from '~/components/BarraDeStatus';
import ControlledTextInput from '~/components/ControlledTextInput/index';
import { CORES } from '~/constantes/estiloBase';
import rotas from '~/constantes/rotas';
// import { labelsAnalytics } from '~/constantes/labelsAnalytics';
// import useAnalytics from '~/hooks/useAnalytics';
import useAutenticacao from '~/hooks/useAutenticacao';
import { ArrowLeftIcon } from '~/icons';
import {
  // analyticsCategoria,
  analyticsUnidadeServico,
} from '~/utils/funcoesAnalytics';
import schema from './schema';
import { Botao, Container, SubTitulo, Titulo } from './styles';

export default function FormularioSenha({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();

  const { infoPessoal, infoProfissional } = route.params;

  // const { analyticsData } = useAnalytics();

  const { signIn } = useAutenticacao();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnPressNextButton = async dataForm => {
    try {
      setIsLoading(true);

      const newUserData = {
        nomeCompleto: infoPessoal.nomeCompleto,
        email: infoPessoal.email,
        telefone: infoPessoal.telefone,
        cpf: infoPessoal.cpf,
        cidadeId: infoPessoal.municipio.id,
        cidade: infoPessoal.municipio.nome,
        // TODO: Objeto vazio vs String vazia
        // Verificar o padrão, pois na edição usamos String Vazia ''
        // Na criação a API exige pelo menos um objeto {}
        categoriaProfissional: infoProfissional.categoriaProfissional || {},
        especialidades: infoProfissional.especialidades || [],
        unidadeServico: infoProfissional.unidadeServico || [],
        senha: dataForm.password,
        repetirsenha: dataForm.confirmPassword,
        termos: true,
      };

      await cadastrarUsuario(newUserData);

      await signIn(newUserData.email, newUserData.senha);

      // TODO: rever essa parte
      // analyticsData(labelsAnalytics.FINALIZAR_MEU_CADASTRO, 'Click', 'Perfil');
      // analyticsCategoria(newUserData.categoriaProfissional, Date, 'Cadastro');

      analyticsUnidadeServico(
        newUserData.unidadeServico,
        Date.now(),
        'Cadastro',
      );

      navigation.navigate(rotas.TELA_SUCESSO, {
        textoApresentacao:
          'Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS.',
        telaDeRedirecionamento: rotas.HOME,
        telaDeBackground: CORES.AZUL,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
          <ArrowLeftIcon size={28} color={CORES.AZUL} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: CORES.AZUL,
    },
  };

  return (
    <Container>
      <BarraDeStatus barStyle="dark-content" backgroundColor={CORES.BRANCO} />
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
      <Botao
        cor={CORES.AZUL}
        disabled={isLoading}
        labelStyle={{ color: CORES.BRANCO }}
        mode="contained"
        onPress={handleSubmit(handleOnPressNextButton)}
        loading={isLoading}>
        Finalizar
      </Botao>
    </Container>
  );
}
