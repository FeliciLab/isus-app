import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { Button, DefaultTheme, TextInput } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getMunicipiosCeara } from '~/apis/apiCadastro';
import FormContext from '~/context/FormContext';
import WizardContext from '~/context/WizardContext';
import { ArrowDropDownIcon } from '~/icons';
import { salvarDados } from '~/services/armazenamento';
import Regex from '~/utils/regex';
import FormularioInfoProfissional from './formularioInfoProfissional';

export default function FormularioInfoPessoal() {
  const dropdown = createRef();

  const [botaoAtivo, setBotaoAtivo] = useState(false);

  const [nomeCidades, setNomeCidades] = useState(() => []);

  const [cidades, setCidades] = useState([]);

  const navigator = useNavigation();

  const { alterarTelaAtual } = useContext(WizardContext);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE',
    },
  };

  const { register, setValue, trigger, errors } = useContext(FormContext);

  useEffect(() => {
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto =>
        nomeValido(nomeCompleto) || 'O nome deve conter apenas letras.',
    });
    register('email', {
      required: true,
      validate: email =>
        emailValido(email) || 'O email deve ser no formato exemplo@exemplo.com',
    });
    register('telefone', {
      required: true,
      minLength: {
        value: 11,
        message: 'O seu telefone deve ter pelo menos 11 números.',
      },
      maxLength: 14,
    });
    register('cpf', {
      required: true,
      minLength: {
        value: 11,
        message: 'O seu CPF deve ter pelo menos 11 números.',
      },
      maxLength: 14,
    });
    register('cidade', {
      required: true,
    });
  }, [register]);

  const pegarId = municipio => {
    let teste = null;
    cidades.forEach(element => {
      if (element.nome === municipio) {
        teste = element.id;
      }
    });
    return teste;
  };

  const emailValido = email => Regex.EMAIL.test(email.toLowerCase());
  const nomeValido = nomeCompleto =>
    Regex.NOME.test(nomeCompleto.toLowerCase());
  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    setBotaoAtivo(Object.entries(errors).length === 0);
  };

  useFocusEffect(
    useCallback(() => {
      async function pegarCidades() {
        const response = await getMunicipiosCeara();
        setNomeCidades(response.data.map(item => item.nome));
        setCidades(response.data.map(item => item));
      }
      pegarCidades();
    }, []),
  );

  useEffect(() => {
    async function guardarCidades() {
      await salvarDados('municipios', nomeCidades);
      await salvarDados('objeto', cidades);
    }
    guardarCidades();
  }, [nomeCidades]);

  useLayoutEffect(() => {
    navigator.setOptions({
      headerStyle: {
        backgroundColor: '#304FFE',
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: 'Cadastro',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigator.goBack();
          }}>
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <Text style={estilos.informacoesPessoais}>Informações Pessoais</Text>
      <TextInput
        label="Nome Completo"
        name="nomeCompleto"
        underlineColor="#BDBDBD"
        onChangeText={text => alteraValor('nomeCompleto', text)}
        style={estilos.campoDeTexto}
        mode="outlined"
        theme={theme}
      />
      {errors.nomeCompleto && (
        <Text style={{ color: '#000000' }}>
          {' '}
          {errors.nomeCompleto.message}{' '}
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
        <Text style={{ color: '#000000' }}> {errors.email.message} </Text>
      )}
      <TextInput
        label="Telefone"
        name="telefone"
        keyboardType="number-pad"
        style={estilos.campoDeTexto}
        onChangeText={text => text}
        mode="outlined"
        theme={theme}
        maxLength={15}
        render={props => (
          <TextInputMask
            {...props}
            onChangeText={(formatted, extracted) => {
              props.onChangeText(formatted);
              alteraValor('telefone', extracted);
            }}
            mask="([00]) [00000]-[0000]"
          />
        )}
      />
      {errors.telefone && (
        <Text style={{ color: '#000000' }}> {errors.telefone.message} </Text>
      )}
      <TextInput
        label="CPF"
        name="cpf"
        keyboardType="number-pad"
        style={estilos.campoDeTexto}
        onChangeText={text => text}
        mode="outlined"
        theme={theme}
        maxLength={14}
        render={props => (
          <TextInputMask
            {...props}
            onChangeText={(formatted, extracted) => {
              props.onChangeText(formatted);
              alteraValor('cpf', extracted);
            }}
            mask="[000].[000].[000]-[00]"
          />
        )}
      />
      {errors.cpf && (
        <Text style={{ color: '#000000' }}> {errors.cpf.message} </Text>
      )}
      <View style={{ marginTop: 14 }}>
        <Dropdown
          ref={dropdown}
          label="Município de Residência"
          data={nomeCidades}
          labelExtractor={cidade => cidade}
          valueExtractor={cidade => cidade}
          onChangeText={cidade => {
            alteraValor('cidade', { id: pegarId(cidade), nome: cidade });
          }}
        />
        <ArrowDropDownIcon
          style={{
            position: 'absolute',
            right: 8,
            top: 30,
            fontSize: 25,
          }}
          onPress={() => dropdown.current.focus()}
        />
      </View>
      <Button
        disabled={!botaoAtivo}
        label="Próximo"
        style={botaoAtivo ? estilos.botaoHabilitado : estilos.botao}
        labelStyle={{ color: '#fff' }}
        mode="contained"
        onPress={() =>
          alterarTelaAtual({ indice: 1, tela: <FormularioInfoProfissional /> })
        }>
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
    color: 'rgba(0, 0, 0, 0.87)',
  },
  informacoesPessoais: {
    fontWeight: '500',
    marginTop: 24,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.15,
  },
  campoDeTexto: {
    paddingTop: 28,
    backgroundColor: '#FFF',
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
    backgroundColor: '#304FFE',
  },
});
