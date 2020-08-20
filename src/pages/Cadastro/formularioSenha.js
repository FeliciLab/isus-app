import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DefaultTheme, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FormContext from '../../context/FormContext';
import { cadastrarUsuario } from '../../apis/apiCadastro';
import { removeMascaraNumerica } from '../../utils/mascaras';
import Alerta from '../../components/alerta';

export default function FormularioSenha() {
  const navigator = useNavigation();
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const mensagemDeSucesso = 'Parabéns! Você finalizou seu cadastro do ID Saúde. Conheça seu perfil no iSUS.';
  const [cadastroRealizado, alterarCadastroRealizado] = React.useState(false);

  const mostrarAlerta = () => {
    alterarCadastroRealizado(true);
    setTimeout(() => alterarCadastroRealizado(false), 2000);
  };

  const {
    register, setValue, trigger, errors, getValues
  } = useContext(FormContext);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
      accent: '#f1c40f',
    },
  };

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    alteraBotaoAtivo(Object.entries(errors).length === 0);
    console.log('errors', errors);
  };

  const tratarDadosCadastro = (dadosCadastro) => {
    const { cidade, cpf, telefone } = dadosCadastro;
    return {
      ...dadosCadastro,
      cidadeId: cidade.id,
      cidade: cidade.nome,
      cpf: removeMascaraNumerica(cpf),
      telefone: removeMascaraNumerica(telefone),
      termos: true
    };
  };

  const realizarCadastroDoUsuario = async () => {
    try {
      const dados = tratarDadosCadastro(getValues());
      console.log('DADOS TRATADOS', dados);
      await cadastrarUsuario(dados);
      mostrarAlerta();
    } catch (err) {
      alterarCadastroRealizado(false);
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('valor no inicio', getValues());
    register('senha', { required: true, minLength: { value: 8, message: 'A sua senha deve ter pelo menos 8 caracteres.' } });
    register('repetirsenha', { required: true, validate: repetirsenha => repetirsenha === getValues('senha') || 'Não confere com a senha.' });
  }, [register]);

  return (
    <>
      <View style={{ marginTop: 24 }}>
        <Text style={estilos.tituloDestaque}>Defina uma senha</Text>
        <View style={estilos.containerCampoDeTexto}>
          <TextInput
            label="Senha"
            name="senha"
            secureTextEntry
            value={getValues('senha')}
            underlineColor="#BDBDBD"
            onChangeText={text => alteraValor('senha', text)}
            style={estilos.campoDeTexto}
            mode="outlined"
            theme={theme}
          />
          { errors.senha && (
<Text style={{ color: '#000000' }}>
{' '}
{ errors.senha.message }
{' '}
</Text>
          ) }
        </View>
        <View>
          <TextInput
            label="Confirmação de senha"
            name="repetirsenha"
            secureTextEntry
            value={getValues('repetirsenha')}
            underlineColor="#BDBDBD"
            onChangeText={text => alteraValor('repetirsenha', text)}
            style={estilos.campoDeTexto}
            mode="outlined"
            theme={theme}
          />
          { errors.repetirsenha && (
  <Text style={{ color: '#000000' }}>
  {' '}
  {errors.repetirsenha.message}
  {' '}
  </Text>
          ) }
        </View>
      </View>
      <Button
        disabled={!botaoAtivo}
        style={botaoAtivo ? estilos.botaoHabilitado : estilos.botao}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        onPress={() => {
          realizarCadastroDoUsuario();
          setTimeout(() => navigator.navigate('LOGIN', { screen: 'LOGIN' }), 2000);
          console.log(getValues());
        }}
      >
        Finalizar
      </Button>
      <Alerta visivel={cadastroRealizado} textoDoAlerta={mensagemDeSucesso} />
    </>
  );
}

const estilos = StyleSheet.create({
  tituloDestaque: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  containerCampoDeTexto: {
    paddingBottom: 15
  },
  campoDeTexto: {
    backgroundColor: '#FFF'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD'
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#304FFE'
  }
});
