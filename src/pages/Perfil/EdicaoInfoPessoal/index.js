/* eslint-disable no-unused-vars */
import React, {
  useContext, useState, useEffect, useLayoutEffect, useRef
} from 'react';
import {
  View, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import { Dropdown } from 'react-native-material-dropdown-v2';
import {
  DefaultTheme, Checkbox
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import FormContext from '../../../context/FormContext';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import { pegarDados, salvarDados } from '../../../services/armazenamento';
import { alteraDadosDoUsuario, getMunicipiosCeara } from '../../../apis/apiCadastro';
import {
  SafeArea, Scroll, ConteudoFormulario, TituloPrincipal, Acordeon,
  Titulo, BotaoSalvar, IconeDropdown, ConteudoDropdown, CampoDeTexto
} from './styles';
import { nomeValido, emailValido, emailNaoCadastrado } from '../../../utils/validadores';
import constantes from '../../../constantes/textos';


function EdicaoInfoPessoal() {
  const {
    getValues, setValue, register, unregister, errors
  } = useContext(FormContext);
  const [botaoAtivo, alteraBotaoAtivo] = useState(false);
  const [temNome, alterarTemNome] = useState(true);
  const [temEmail, alterarTemEmail] = useState(true);
  const [temTelefone, alterarTemTelefone] = useState(true);
  const [temMunicipio, alterarTemMunicipio] = useState(true);
  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = useState('');
  const [carregando, alterarCarregando] = useState(false);
  const [perfildoUsuario, alterarPerfilDoUsuario] = useState({});
  const [nomeUsuario, alterarNomeUsuario] = useState('');
  const [emailUsuario, alterarEmailUsuario] = useState(0);
  const [telefoneUsuario, alterarTelefoneUsuario] = useState('');
  const [nomeCidades, alterarNomeCidades] = useState(() => []);
  const [idCidades, alterarIdCidades] = useState(() => []);
  const [cidades, pegaCidades] = useState([]);
  const dropdown = useRef();
  const campoNome = useRef();
  const navigation = useNavigation();

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6)',
      accent: '#FF9800',
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
        constantes.PERFIL.EDICAO_INFO_PESSOAIS.CABEÇALHO,
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });

  useEffect(() => {
    const aoIniciar = async () => {
      const perfil = await pegarDados('perfil');
      if (perfil === undefined) return;
      alterarPerfilDoUsuario(perfil);

      register('nomeCompleto', {
        required: true,
        validate: nomeCompleto => nomeValido(nomeCompleto)
          || 'O nome deve conter apenas letras.'
      });
      register('email', {
        required: true,
        validate: {
          emailValido: email => emailValido(email)
                          || constantes.PERFIL.EDICAO_INFO_PESSOAIS.MSG_EMAIL,
          emailCadastrado: async email => await emailNaoCadastrado(email)
                            || constantes.PERFIL.EDICAO_INFO_PESSOAIS.MSG_EMAIL_EXISTE
        }
      });
      register('telefone', {
        required: true,
        minLength: {
          value: 11,
          message: constantes.PERFIL.EDICAO_INFO_PESSOAIS.MSG_TELEFONE
        },
        maxLength: 14
      });
      // register('nomeCompleto', perfil.name);
      // register('email', perfil.email.toLowerCase());
      // register('telefone', perfil.telefone);
      alterarNomeUsuario(perfil.name);
      alterarEmailUsuario(perfil.email.toLowerCase());
      alterarTelefoneUsuario(perfil.telefone);
      pegarCidades();
    };
    aoIniciar();
    console.log(`useEffect: ${emailUsuario}`);
    console.log(`useEffect: ${!botaoAtivo}`);
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

  // const pegarId = (municipio) => {
  //   let teste = null;
  //   cidades.forEach((element) => {
  //     if (element.nome === municipio) {
  //       teste = element.id;
  //     }
  //   });
  //   return teste;
  // };

  const mudarNome = (nome) => {
    unregister(nome);
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto => nomeValido(nomeCompleto)
        || 'O nome deve conter apenas letras.'
    });
    alterarNomeUsuario(nome);
  };

  const mostrarAlerta = (mensagem) => {
    alterarExibicaoDoAlerta(true);
    alterarMensagemDoAlerta(mensagem);
    setTimeout(() => alterarExibicaoDoAlerta(false), 4000);
  };

  const tratarCamposDeUsuario = (campos) => {
    const {
      email, name, telefone, cpf, municipio, categoriaProfissional, especialidades, unidadeServico
    } = campos;
    return {
      email,
      nomeCompleto: name,
      telefone,
      cpf,
      cidadeId: municipio.id,
      cidade: municipio.nome,
      termos: true,
      categoriaProfissional,
      especialidades,
      unidadeServico
    };
  };

  const salvarInformacoesPessoais = async () => {
    alterarCarregando(true);
    const { name, telefone, email } = getValues();
    const usuarioTratado = tratarCamposDeUsuario(
      {
        ...name, telefone, email
      }
    );
    try {
      console.log('perfil atualizado', usuarioTratado);
      const resposta = await alteraDadosDoUsuario(usuarioTratado);
      navigation.navigate('TelaDeSucesso', { textoApresentacao: 'Parabéns! Você cadastrou suas informações profissionais. Você será redirecionado para sua página de Perfil.', telaDeRedirecionamento: 'PERFIL', telaDeBackground: '#4CAF50' });
      console.log(resposta.data);
      alterarCarregando(false);
    } catch (err) {
      console.log(err);
      mostrarAlerta('Ocorreu um erro. Tente novamente mais tarde.');
      alterarCarregando(false);
    }
  };

  const verificarNome = () => {
    const { nomeCompleto } = getValues();
    return nomeCompleto && JSON.parse(nomeCompleto).length !== 0;
  };

  const verificarEmail = () => {
    const { email } = getValues();
    return email && JSON.parse(email).length !== 0;
  };

  const verificarTelefone = () => {
    const { telefone } = getValues();
    return telefone && JSON.parse(telefone).length !== 0;
  };

  return (
    <SafeArea>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <Scroll>
        <ConteudoFormulario>
          <TituloPrincipal>
            Edite as informações pessoais que você deseja atualizar:
          </TituloPrincipal>
          <CampoDeTexto
            label="Nome Completo"
            name="nomeCompleto"
            underlineColor="#BDBDBD"
            defaultValue=""
            textContentType="name"
            value={nomeUsuario}
            onChangeText={(text) => {
              setValue('nomeCompleto', text);
              alterarNomeUsuario(text);
            }}
            mode="outlined"
            theme={(getValues().nomeCompleto === undefined) || (getValues().nomeCompleto === ''
              ? theme : errors.nomeCompleto) ? themeError : theme}
          />
          <CampoDeTexto
            label="E-mail"
            name="email"
            underlineColor="#BDBDBD"
            defaultValue=""
            autoCapitalize="none"
            textContentType="emailAddress"
            value={emailUsuario}
            onChangeText={(text) => {
              setValue('email', text);
              alterarEmailUsuario(text);
            }}
            mode="outlined"
            theme={(getValues().email === undefined) || (getValues().email === ''
              ? theme : errors.email) ? themeError : theme}
          />
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
          <View>
            <ConteudoDropdown>
              <Dropdown
                ref={dropdown}
                label="Município de Residência"
                data={nomeCidades}
                labelExtractor={cidade => cidade}
                valueExtractor={cidade => cidade}
                onChangeText={(cidade) => {
                  setValue('cidade', { id: idCidades, nome: nomeCidades });
                }}
              />
              <IconeDropdown
                name="arrow-drop-down"
                onPress={() => dropdown.current.focus()}
              />
            </ConteudoDropdown>
          </View>
        </ConteudoFormulario>
        <Alerta visivel={exibicaoDoAlerta} textoDoAlerta={mensagemDoAlerta} />
        <BotaoSalvar
          disabled={!botaoAtivo}
          labelStyle={{ color: '#fff' }}
          loading={carregando}
          onPress={() => {
            salvarInformacoesPessoais();
          }}
          mode="contained"
        >
          Salvar
        </BotaoSalvar>
      </Scroll>
    </SafeArea>
  );
}

export default EdicaoInfoPessoal;
