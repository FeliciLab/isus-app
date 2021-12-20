import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { DefaultTheme } from 'react-native-paper';
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import TextInputMask from 'react-native-text-input-mask';
import NetInfo from '@react-native-community/netinfo';
import {
  emailValido,
  cpfValido,
  nomeValido,
  emailNaoCadastrado,
  cpfNaoCadastrado
} from '../../utils/validadores';
import { getMunicipiosCeara } from '../../apis/apiCadastro';
import { salvarDados } from '../../services/armazenamento';
import {
  Titulo,
  Scroll,
  TituloDoFormulario,
  CampoDeTexto,
  TextoDeErro,
  Botao,
  ConteudoDropdown,
  IconeDropdown
} from './styles';
import BarraDeStatus from '../../components/barraDeStatus';
import {
  cabecalhoSemBotao,
  cabecalhoVoltar
} from '../../components/layoutEffect/cabecalhoLayout';
import textos from './textos.json';

import FormContext from '../../context/FormContext';
import { AppTrackTransparencyContext } from '../../context/AppTrackTransparencyContext';

export default function FormularioInfoPessoal({ navigation }) {
  const {
    rastreioTransparenteHabilitado,
    verificarRastreio
  } = React.useContext(AppTrackTransparencyContext);
  React.useEffect(() => {
    verificarRastreio().then(() => {
      console.log('rastreio', rastreioTransparenteHabilitado);
    });
  }, [rastreioTransparenteHabilitado]);

  const dropdown = React.createRef();
  const [botaoAtivo, alteraBotaoAtivo] = React.useState(false);
  const [nomeCidades, alteraNomeCidades] = React.useState(() => []);
  const [cidades, pegaCidades] = React.useState([]);

  let estaConectado = false;

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

  const { register, setValue, trigger, errors, getValues } = useContext(
    FormContext
  );
  useEffect(() => {
    // eslint-disable-next-line no-undef
    NetInfo.addEventListener(state => {
      estaConectado = state.isConnected;
    });
    if (!estaConectado) {
      Alert.alert(
        'Sem conexão com a internet',
        'Verifique se o wi-fi ou os dados móveis estão ativos e tente novamente.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('LOGIN');
            }
          }
        ]
      );
    }
  });

  useEffect(() => {
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto =>
        nomeValido(nomeCompleto) || 'O nome deve conter apenas letras.'
    });
    register('email', {
      required: true,
      validate: {
        emailValido: email =>
          emailValido(email) || textos.formularioPessoal.mensagemEmail,
        emailCadastrado: async email =>
          (await emailNaoCadastrado(email)) ||
          textos.formularioPessoal.mensagemEmailExistente
      }
    });
    register('telefone', {
      required: true,
      minLength: {
        value: 11,
        message: textos.formularioPessoal.mensagemTelefone
      },
      maxLength: 14
    });
    register('cpf', {
      required: true,
      minLength: {
        value: 11,
        message: textos.formularioPessoal.mensagemCPF
      },
      validate: {
        cpfValido: cpf =>
          cpfValido(cpf) || textos.formularioPessoal.mensagemCPFValidacao,
        cpfCadastrado: async cpf =>
          (await cpfNaoCadastrado(cpf)) ||
          textos.formularioPessoal.mensagemCPFExistente
      },
      maxLength: 14
    });
    register('cidade', {
      required: true
    });
  }, [register]);

  const layout = {
    titulo: 'Cadastro',
    navegador: navigation,
    cor: 'branco'
  };

  useLayoutEffect(
    () => (layout ? cabecalhoVoltar(layout) : cabecalhoSemBotao(layout)),
    []
  );

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
        <Titulo>{textos.formularioPessoal.introducao}</Titulo>
        <TituloDoFormulario>
          {textos.formularioPessoal.titulo}
        </TituloDoFormulario>
        <CampoDeTexto
          label="Nome Completo"
          name="nomeCompleto"
          underlineColor="#BDBDBD"
          defaultValue=""
          onChangeText={text => {
            alteraValor('nomeCompleto', text);
          }}
          mode="outlined"
          theme={
            getValues().nomeCompleto === undefined ||
            (getValues().nomeCompleto === '' ? theme : errors.nomeCompleto)
              ? themeError
              : theme
          }
        />
        {errors.nomeCompleto && (
          <TextoDeErro>{errors.nomeCompleto.message}</TextoDeErro>
        )}
        <CampoDeTexto
          label="E-mail"
          name="email"
          keyboardType="email-address"
          onChangeText={text => {
            alteraValor('email', text.trim());
          }}
          mode="outlined"
          theme={
            getValues().email === undefined ||
            (getValues().email === '' ? theme : errors.email)
              ? themeError
              : theme
          }
        />
        {errors.email && <TextoDeErro>{errors.email.message}</TextoDeErro>}
        <CampoDeTexto
          label="Telefone"
          name="telefone"
          keyboardType="number-pad"
          onChangeText={text => text}
          mode="outlined"
          theme={
            getValues().telefone === undefined ||
            (getValues().telefone === '' ? theme : errors.telefone)
              ? themeError
              : theme
          }
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
          <TextoDeErro>{errors.telefone.message}</TextoDeErro>
        )}
        <CampoDeTexto
          label="CPF"
          name="cpf"
          keyboardType="number-pad"
          onChangeText={text => text}
          mode="outlined"
          theme={
            getValues().cpf === undefined ||
            (getValues().cpf === '' ? theme : errors.cpf)
              ? themeError
              : theme
          }
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
        {errors.cpf && <TextoDeErro>{errors.cpf.message}</TextoDeErro>}
        <ConteudoDropdown>
          <Dropdown
            ref={dropdown}
            label="Município de Residência"
            data={nomeCidades}
            labelExtractor={cidade => cidade}
            valueExtractor={cidade => cidade}
            onChangeText={cidade => {
              alteraValor('cidade', {
                id: cidades.find(e => e.nome === cidade)?.id,
                nome: cidade
              });
            }}
          />
          <IconeDropdown
            name="arrow-drop-down"
            onPress={() => dropdown.current.focus()}
          />
        </ConteudoDropdown>
        <Botao
          cor="#304FFE"
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
