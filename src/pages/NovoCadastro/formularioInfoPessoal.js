/* eslint-disable no-nested-ternary */
import React, {
  useContext,
  useEffect,
  useLayoutEffect
} from 'react';
import { DefaultTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emailValido, cpfValido, nomeValido } from '../../utils/validadores';
import FormContext from '../../context/FormContext';
import { getMunicipiosCeara } from '../../apis/apiCadastro';
import { salvarDados } from '../../services/armazenamento';
import {
  Titulo, Scroll,
  TituloDoFormulario, CampoDeTexto,
  TextoDeErro, Botao,
  ConteudoDropdown, IconeDropdown
} from './styles';
import BarraDeStatus from '../../components/barraDeStatus';
import featuresAtivas from '../../featureAtivas';
import textos from './cadastro.json';

export default function FormularioInfoPessoal({ navigation }) {
  const dropdown = React.createRef();
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const [nomeCidades, alteraNomeCidades] = React.useState(() => []);
  const [cidades, pegaCidades] = React.useState([]);

  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#304FFE'
    }
  };

  const themeError = {
    ...DefaultTheme,
    colors: {
      primary: 'red'
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
      validate: email => emailValido(email) || textos.formularioPessoal.mensagemEmail
    });
    register('telefone', {
      required: true,
      minLength: {
        value: 11,
        message: textos.formularioPessoal.mensagemTelefone
      },
      maxLength: 14
    });
    if (featuresAtivas.includes('312')) {
      register('cpf', {
        required: true,
        minLength: {
          value: 11,
          message: textos.formularioPessoal.mensagemCPF
        },
        validate: cpf => cpfValido(cpf) || textos.formularioPessoal.mensagemCPFValidacao,
        maxLength: 14
      });
    } else {
      register('cpf', {
        required: true,
        minLength: {
          value: 11,
          message: textos.formularioPessoal.mensagemCPF
        },
        maxLength: 14
      });
    }
    register('cidade', {
      required: true
    });
  }, [register]);

  const pegarId = (municipio) => {
    let teste = null;
    cidades.forEach((element) => {
      if (element.nome === municipio) {
        teste = element.id;
      }
    });
    return teste;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#304FFE" />
        </TouchableOpacity>
      )
    });
  });

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
    alteraBotaoAtivo(Object.entries(errors).length === 0);
  };

  useEffect(() => {
    async function pegarCidades() {
      const response = await getMunicipiosCeara();
      alteraNomeCidades(response.data.map(item => item.nome));
      pegaCidades(response.data.map(item => item));
    }
    pegarCidades();
  }, []);

  useEffect(() => {
    async function guardarCidades() {
      await salvarDados('municipios', nomeCidades);
      await salvarDados('objeto', cidades);
    }
    guardarCidades();
  }, [nomeCidades]);

  return (
    <>
      <Scroll>
        <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
        <Titulo>{ textos.formularioPessoal.introducao }</Titulo>
        <TituloDoFormulario>{ textos.formularioPessoal.titulo }</TituloDoFormulario>
        <CampoDeTexto
          label="Nome Completo"
          name="nomeCompleto"
          underlineColor="#BDBDBD"
          defaultValue=""
          onChangeText={(text) => {
            alteraValor('nomeCompleto', text);
          }}
          mode="outlined"
          theme={getValues().nomeCompleto === undefined || getValues().nomeCompleto === ''
            ? theme : (nomeValido(getValues().nomeCompleto)
              ? theme : themeError)}
        />
        {errors.nomeCompleto && (
          <TextoDeErro>
            {errors.nomeCompleto.message}
          </TextoDeErro>
        )}
        <CampoDeTexto
          label="E-mail"
          name="email"
          keyboardType="email-address"
          onChangeText={(text) => {
            alteraValor('email', text);
          }}
          mode="outlined"
          theme={getValues().email === undefined || getValues().email === ''
            ? theme : (emailValido(getValues().email)
              ? theme : themeError)}
        />
        {errors.email && (
          <TextoDeErro>
            {errors.email.message}
          </TextoDeErro>
        )}
        <CampoDeTexto
          label="Telefone"
          name="telefone"
          keyboardType="number-pad"
          onChangeText={text => text}
          mode="outlined"
          theme={getValues().telefone === undefined || getValues().telefone === ''
            ? theme : (getValues().telefone.length === 11
              ? theme : themeError)}
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
          <TextoDeErro>
            {errors.telefone.message}
          </TextoDeErro>
        )}
        <CampoDeTexto
          label="CPF"
          name="cpf"
          keyboardType="number-pad"
          onChangeText={text => text}
          mode="outlined"
          theme={getValues().cpf === undefined || getValues().cpf === ''
            ? theme : (cpfValido(getValues().cpf)
              ? theme : themeError)}
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
          <TextoDeErro>
            {errors.cpf.message}
          </TextoDeErro>
        )}
        <ConteudoDropdown>
          <Dropdown
            ref={dropdown}
            label="Município de Residência"
            data={nomeCidades}
            labelExtractor={cidade => cidade}
            valueExtractor={cidade => cidade}
            onChangeText={(cidade) => {
              alteraValor('cidade', { id: pegarId(cidade), nome: cidade });
            }}
          />
          <IconeDropdown
            name="arrow-drop-down"
            onPress={() => dropdown.current.focus()}
          />
        </ConteudoDropdown>
        <Botao
          disabled={!botaoAtivo}
          label="Próximo"
          labelStyle={{ color: '#fff' }}
          mode="contained"
          onPress={() => navigation.navigate('FormularioInfoProfissional')}
        >
          Próximo
        </Botao>
      </Scroll>
    </>
  );
}
