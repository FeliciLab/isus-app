import React, {
  useLayoutEffect,
  useContext,
  useCallback,
  useEffect
} from 'react';
import {
  TouchableOpacity, StyleSheet, View, Text
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, DefaultTheme, Button } from 'react-native-paper';
import Autocomplete from 'react-native-autocomplete-input';
import { aplicaMascaraNumerica } from '../../utils/mascaras';
import FormContext from '../../context/FormContext';
import Regex from '../../utils/regex';
import { getMunicipiosCeara } from '../../apis/apiCadastro';
import { salvarDados, pegarDados } from '../../services/armazenamento';
// eslint-disable-next-line import/no-cycle
import WizardContext from '../../context/WizardContext';
// eslint-disable-next-line import/no-cycle
import FormularioInfoProfissional from './formularioInfoProfissional';

export default function FormularioInfoPessoal() {
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const [listaCidades, esconderListaCidades] = React.useState(false);
  const [dataFiltrada, alteraDataFiltrada] = React.useState([]);
  const [data, alteraData] = React.useState(() => []);
  const [query, alteraQuery] = React.useState('');
  const navigator = useNavigation();
  const { alterarTelaAtual } = useContext(WizardContext);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };

  const {
    register, setValue, trigger, errors, getValues
  } = useContext(
    FormContext
  );
  useEffect(() => {
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto => nomeValido(nomeCompleto)
        || 'O nome deve conter apenas letras.'
    });
    register('email', {
      required: true,
      validate: email => emailValido(email) || 'O email deve ser no formato exemplo@exemplo.com'
    });
    register('telefone', {
      required: true,
      minLength: {
        value: 13,
        message: 'O seu telefone deve ter pelo menos 10 números.'
      }
    });
    register('cpf', {
      required: true,
      minLength: {
        value: 13,
        message: 'O seu CPF deve ter pelo menos 11 números.'
      }
    });
    register('cidade', {
      required: true,
      validate: async cidade => await cidadeValida(cidade) || 'Escolha uma cidade válida da lista.'
    });
  }, [register]);

  const cidadeValida = async (cidade) => {
    const cidades = await pegarDados('municipios');
    return cidades.includes(cidade);
  };
  const emailValido = email => Regex.EMAIL.test(email.toLowerCase());
  const nomeValido = nomeCompleto => Regex.NOME.test(nomeCompleto.toLowerCase());
  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    alteraBotaoAtivo(Object.entries(errors).length === 0);
  };

  useFocusEffect(
    useCallback(() => {
      async function pegarCidades() {
        const response = await getMunicipiosCeara();
        alteraData(response.data.map(item => item.nome));
      }
      pegarCidades();
    }, [])
  );

  useEffect(() => {
    async function guardarCidades() {
      await salvarDados('municipios', data);
    }
    guardarCidades();
  }, [data]);

  useEffect(() => {
    alteraDataFiltrada(data.filter(item => query && item.startsWith(query)));
  }, [query]);

  useLayoutEffect(() => {
    navigator.setOptions({
      headerStyle: {
        backgroundColor: '#304FFE'
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Cadastro',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      )
    });
  });

  return (
    <>
      <Text style={estilos.informacoesPessoais}>Informações Pessoais</Text>
      <View style={{ marginHorizontal: 16 }}>
        <TextInput
          label="Nome Completo"
          name="nomeCompleto"
          value={getValues('nomeCompleto')}
          underlineColor="#BDBDBD"
          onChangeText={text => alteraValor('nomeCompleto', text)}
          style={estilos.campoDeTexto}
          mode="outlined"
          theme={theme}
        />
        {errors.nomeCompleto && (
          <Text style={{ color: '#000000' }}>
            {' '}
            {errors.nomeCompleto.message}
{' '}
          </Text>
        )}
        <TextInput
          label="E-mail"
          name="email"
          keyboardType="email-address"
          style={estilos.campoDeTexto}
          onChangeText={text => alteraValor('email', text)}
          mode="outlined"
          theme={theme}
        />
        {errors.email && (
          <Text style={{ color: '#000000' }}>
{' '}
{errors.email.message}
{' '}
          </Text>
        )}
        <TextInput
          label="Telefone"
          name="telefone"
          value={aplicaMascaraNumerica(getValues('telefone'), '(##)####-#####')}
          keyboardType="number-pad"
          style={estilos.campoDeTexto}
          onChangeText={text => alteraValor('telefone', text)}
          mode="outlined"
          theme={theme}
          maxLength={14}
        />
        {errors.telefone && (
          <Text style={{ color: '#000000' }}>
{' '}
{errors.telefone.message}
{' '}
          </Text>
        )}
        <TextInput
          label="CPF"
          name="cpf"
          value={aplicaMascaraNumerica(getValues('cpf'), '###.###.###-##')}
          keyboardType="number-pad"
          style={estilos.campoDeTexto}
          onChangeText={text => alteraValor('cpf', text)}
          mode="outlined"
          theme={theme}
          maxLength={14}
        />
        {errors.cpf && (
          <Text style={{ color: '#000000' }}>
{' '}
{errors.cpf.message}
{' '}
          </Text>
        )}
          <View style={{ marginTop: 32 }}>
        <Text style={{ marginBottom: 4 }}>Município de Residência</Text>
        <Autocomplete
          label="Cidade"
          name="cidade"
          placeholder="Município de Residência"
          inputContainerStyle={estilos.campoDeTextoAutocomplete}
          listStyle={estilos.listaAutocomplete}
          listContainerStyle={{ height: dataFiltrada.length * 25 }}
          data={dataFiltrada}
          defaultValue={query}
          hideResults={listaCidades}
          onChangeText={(text) => {
            alteraQuery(text);
            esconderListaCidades(false);
            alteraValor('cidade', text);
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                alteraQuery(item);
                esconderListaCidades(true);
                alteraValor('cidade', item);
              }}
            >
              <Text style={{ padding: 4 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        {errors.cidade && (
          <Text style={estilos.mensagemDeErro}>
{' '}
{errors.cidade.message}
{' '}
          </Text>
        )}
          </View>
      </View>

      <Button
        disabled={!botaoAtivo}
        label="Próximo"
        style={botaoAtivo ? estilos.botaoHabilitado : estilos.botao}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        onPress={() => alterarTelaAtual({ indice: 1, tela: <FormularioInfoProfissional /> })
        }
      >
        Próximo
      </Button>
    </>
  );
}

const estilos = StyleSheet.create({
  apresentacao: {
    fontSize: 24,
    marginTop: 40,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  informacoesPessoais: {
    fontWeight: '500',
    marginTop: 24,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.15
  },
  campoDeTexto: {
    paddingTop: 28,
    backgroundColor: '#FFF'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#BDBDBD',
  },
  botaoHabilitado: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#304FFE'
  },
  campoDeTextoAutocomplete: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: 'gray',
    height: 56,
  },
  listaAutocomplete: {
    padding: 10,
    borderColor: 'gray',
  },
});
