import React, {
  useContext, useState, useEffect, useLayoutEffect, useRef
} from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import FormContext from '../../../context/FormContext';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import { pegarDados, salvarDados }
  from '../../../services/armazenamento';
import { alteraDadosDoUsuario, getMunicipiosCeara }
  from '../../../apis/apiCadastro';
import {
  SafeArea, Scroll, ConteudoFormulario, TituloPrincipal,
  BotaoSalvar, IconeDropdown, ConteudoDropdown, CampoDeTexto,
  TextoDeErro
} from './styles';
import { nomeValido, emailValido, emailNaoCadastrado }
  from '../../../utils/validadores';
import CONST_TEXT from '../../../constantes/textos';
import ROTAS from '../../../constantes/rotas';
import { CORES } from '../../../constantes/estiloBase';
import { vazio } from '../../../utils/objectUtils';
import useConexao from '../../../hooks/conexao';

function EdicaoInfoPessoal() {
  const {
    getValues, setValue, trigger, register, errors
  } = useContext(FormContext);
  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = useState('');
  const [carregando, alterarCarregando] = useState(false);
  const [nomeUsuario, alterarNomeUsuario] = useState('');
  const [emailUsuario, alterarEmailUsuario] = useState('');
  const [telefoneUsuario, alterarTelefoneUsuario] = useState('');
  const [nomeCidade, alterarNomeCidade] = useState('');
  const [nomeCidades, alterarNomeCidades] = useState([]);
  const [cidades, pegaCidades] = useState([]);
  const dropdown = useRef();
  const refNomeCompleto = useRef();
  const refEmail = useRef();
  const navigation = useNavigation();
  const conexao = useConexao();
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FF9800',
    },
  };

  const themeError = {
    ...DefaultTheme,
    colors: {
      primary: 'red'
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle:
        CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.CABEÇALHO,
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.navigate(ROTAS.PERFIL);
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });

  useEffect(() => {
    const aoIniciar = async () => {
      conexao.escutar(() => {
        navigation.navigate(ROTAS.PERFIL);
      });
      const perfil = await pegarDados('perfil');
      if (perfil === undefined) return;
      await pegarCidades();
      registrarCampos(perfil);
      alterarCampos(perfil);
      refNomeCompleto.current.focus();
    };
    aoIniciar();
    console.log(`useEffect: ${emailUsuario}`);
  }, []);

  const pegarCidades = async () => {
    const response = await getMunicipiosCeara();
    alterarNomeCidades(response.data.map(item => item.nome));
    pegaCidades(response.data.map(item => item));
  };

  useEffect(() => {
    async function guardarCidades() {
      await salvarDados('municipios', nomeCidades);
      await salvarDados('objeto', cidades);
    }
    guardarCidades();
  }, [nomeCidades]);

  const registrarCampos = (perfil) => {
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto => nomeValido(nomeCompleto)
        || 'O nome deve conter apenas letras.'
    });

    register('email', {
      required: true,
      validate: {
        emailValido: email => emailValido(email)
          || CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_EMAIL,
        emailCadastrado: async (email) => {
          if (await emailNaoCadastrado(email)
            || email.toLowerCase() === perfil.email.toLowerCase()) {
            return true;
          }
          return CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_EMAIL_EXISTE;
        },
      }
    });

    register('telefone', {
      required: true,
      minLength: {
        value: 11,
        message: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_TELEFONE
      },
      maxLength: 14
    });

    register('cidade', {
      required: true
    });

    register('cpf', {
      required: true
    });
  };

  const alterarCampos = (perfil) => {
    const {
      name, email, telefone, municipio, cpf
    } = perfil;
    console.log('perfil', perfil);
    setValue('nomeCompleto', name, { shouldValidate: true });
    setValue('email', email, { shouldValidate: true });
    setValue('telefone', telefone, { shouldValidate: true });
    setValue('cpf', cpf);
    setValue('cidade', { id: municipio.id, nome: municipio.nome });

    alterarNomeUsuario(name);
    alterarEmailUsuario(email.toLowerCase());
    alterarTelefoneUsuario(telefone);
    alterarNomeCidade(municipio.nome);
  };

  const pegarId = (municipio) => {
    let teste = null;
    cidades.forEach((element) => {
      if (element.nome === municipio) {
        teste = element.id;
      }
    });
    return teste;
  };

  const alteraValor = async (campo, valor) => {
    setValue(campo, valor);
    await trigger();
  };

  const mostrarAlerta = (mensagem) => {
    alterarExibicaoDoAlerta(true);
    alterarMensagemDoAlerta(mensagem);
    setTimeout(() => alterarExibicaoDoAlerta(false), 4000);
  };

  const tratarCamposDeUsuario = (campos) => {
    const {
      nomeCompleto, telefone, email, cidade, cpf
    } = campos;
    console.log('cidade', cidade);
    return {
      cpf,
      email,
      nomeCompleto,
      telefone,
      cidadeId: cidade.id,
      cidade: cidade.nome,
      termos: true,
    };
  };

  const salvarInformacoesPessoais = async () => {
    alterarCarregando(true);
    if (vazio(errors)) {
      const {
        nomeCompleto, telefone, email, cidade, cpf
      } = getValues();
      const usuarioTratado = tratarCamposDeUsuario(
        {
          nomeCompleto, telefone, email, cidade, cpf
        }
      );
      try {
        console.log('perfil atualizado', usuarioTratado);
        const resposta = await alteraDadosDoUsuario(usuarioTratado);
        navigation.navigate('TelaDeSucesso',
          {
            textoApresentacao: CONST_TEXT.PERFIL.EDICAO_INFO_PESSOAIS.MSG_SUCESSO,
            telaDeRedirecionamento: ROTAS.PERFIL,
            telaDeBackground: CORES.VERDE
          });
        console.log(resposta.data);
        alterarCarregando(false);
      } catch (err) {
        console.log(err);
        mostrarAlerta('Ocorreu um erro. Tente novamente mais tarde.');
        alterarCarregando(false);
      }
      return;
    }
    mostrarAlerta('Encontramos erros no formulário. Verifique antes de prosseguir');
    alterarCarregando(false);
  };


  // const verificarNome = () => {
  //   const { nomeCompleto } = getValues();
  //   return nomeCompleto && JSON.parse(nomeCompleto).length !== 0;
  // };

  // const verificarEmail = () => {
  //   const { email } = getValues();
  //   return email && JSON.parse(email).length !== 0;
  // };

  // const verificarTelefone = () => {
  //   const { telefone } = getValues();
  //   return telefone && JSON.parse(telefone).length !== 0;
  // };

  return (
    <SafeArea>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <Scroll>
        <ConteudoFormulario>
          <TituloPrincipal>
            Edite as informações pessoais que você deseja atualizar:
          </TituloPrincipal>
          <CampoDeTexto
            ref={refNomeCompleto}
            label="Nome Completo"
            name="nomeCompleto"
            underlineColor="#BDBDBD"
            defaultValue=""
            textContentType="name"
            value={nomeUsuario}
            onChangeText={(text) => {
              alteraValor('nomeCompleto', text);
              alterarNomeUsuario(text);
            }}
            mode="outlined"
            theme={(getValues().nomeCompleto === undefined) || (getValues().nomeCompleto === ''
              ? theme : errors.nomeCompleto) ? themeError : theme}
          />
          {errors.nomeCompleto && (
            <TextoDeErro>
              {errors.nomeCompleto.message}
            </TextoDeErro>
          )}
          <CampoDeTexto
            ref={refEmail}
            label="E-mail"
            name="email"
            underlineColor="#BDBDBD"
            defaultValue=""
            autoCapitalize="none"
            textContentType="emailAddress"
            value={emailUsuario}
            onChangeText={(text) => {
              alteraValor('email', text);
              alterarEmailUsuario(text);
            }}
            mode="outlined"
            theme={(getValues().email === undefined) || (getValues().email === ''
              ? theme : errors.email) ? themeError : theme}
          />
          {errors.email && (
            <TextoDeErro>
              {errors.email.message}
            </TextoDeErro>
          )}
          <CampoDeTexto
            label="Telefone"
            name="telefone"
            underlineColor="#BDBDBD"
            defaultValue=""
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            value={telefoneUsuario}
            onChangeText={text => text}
            mode="outlined"
            theme={(getValues().telefone === undefined) || (getValues().telefone === ''
              ? theme : errors.telefone) ? themeError : theme}
            maxLength={15}
            render={props => (
              <TextInputMask
                {...props}
                onChangeText={(formatted, extracted) => {
                  props.onChangeText(formatted);
                  setValue('telefone', extracted);
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
          <View>
            <ConteudoDropdown>
              <Dropdown
                ref={dropdown}
                label="Município de Residência"
                data={nomeCidades}
                value={nomeCidade}
                labelExtractor={cidade => cidade}
                valueExtractor={cidade => cidade}
                onChangeText={(cidade) => {
                  setValue('cidade', { id: pegarId(cidade), nome: cidade });
                  alterarNomeCidade(cidade);
                }}
              />
              <IconeDropdown
                name="arrow-drop-down"
                onPress={() => dropdown.current.focus()}
              />
            </ConteudoDropdown>
          </View>
        </ConteudoFormulario>
        <BotaoSalvar
          labelStyle={{ color: '#fff' }}
          loading={carregando}
          onPress={() => {
            salvarInformacoesPessoais();
          }}
          mode="contained"
        >
          Salvar
        </BotaoSalvar>
        <Alerta visivel={exibicaoDoAlerta} textoDoAlerta={mensagemDoAlerta} />
      </Scroll>
    </SafeArea>
  );
}

export default EdicaoInfoPessoal;
