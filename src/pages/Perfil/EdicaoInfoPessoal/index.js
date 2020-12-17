/* eslint-disable no-unused-vars */
import React, {
  useContext, useState, useEffect, useLayoutEffect
} from 'react';
import {
  View, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {
  DefaultTheme, Checkbox
} from 'react-native-paper';
import FormContext from '../../../context/FormContext';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import { pegarDados } from '../../../services/armazenamento';
import { alteraDadosDoUsuario } from '../../../apis/apiCadastro';
import {
  SafeArea, Scroll, ConteudoFormulario, TituloPrincipal, Acordeon,
  Titulo, BotaoSalvar, IconeDropdown, ConteudoDropdown, CampoDeTexto
} from './styles';
import { nomeValido } from '../../../utils/validadores';
import constantes from '../../../constantes/textos';

function EdicaoInfoPessoal() {
  const {
    getValues, setValue, register, unregister, errors
  } = useContext(FormContext);

  const [temNome, alterarTemNome] = useState(false);
  const [temEmail, alterarTemEmail] = useState(false);
  const [temTelefone, alterarTemTelefone] = useState(false);
  const [temMunicipio, alterarTemMunicipio] = useState(false);
  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = React.useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = React.useState('');
  const [carregando, alterarCarregando] = useState(false);
  const [perfildoUsuario, alterarPerfilDoUsuario] = useState({});
  const [nomeUsuario, alterarNomeUsuario] = useState('');
  const [emailUsuario, alterarEmailUsuario] = useState(0);
  const [telefoneUsuario, alterarTelefoneUsuario] = useState('');
  const [nomeCidades, alterarNomeCidades] = React.useState(() => []);
  const [idCidades, alterarIdCidades] = React.useState(() => []);
  const dropdown = React.createRef();
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
      alterarPerfilDoUsuario(perfil);

      alterarNomeUsuario(perfil.name);
      alterarEmailUsuario(perfil.email);
      alterarTelefoneUsuario(perfil.telefone);
    };
    aoIniciar();
  }, []);

  const mudarNome = (nome) => {
    unregister(nome);
    register('nomeCompleto', {
      required: true,
      validate: nomeCompleto => nomeValido(nomeCompleto)
        || 'O nome deve conter apenas letras.'
    });
    alterarNomeUsuario(nome);
  };

  // const pegarId = (municipio) => {
  //   let teste = null;
  //   cidades.forEach((element) => {
  //     if (element.nome === municipio) {
  //       teste = element.id;
  //     }
  //   });
  //   return teste;
  // };

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

  const Selecao = props => (
    <Checkbox.Item
      labelStyle={{ maxWidth: '70%' }}
      theme={theme}
      color="#FF9800"
      {...props}
    />
  );

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
            onChangeText={(text) => {
              setValue('nomeCompleto', text);
            }}
            mode="outlined"
            theme={(getValues().nomeCompleto === undefined) || (getValues().nomeCompleto === ''
              ? theme : errors.nomeCompleto) ? themeError : theme}
          />
            <Acordeon titleStyle={{ color: 'black' }} title={<Titulo>Setor de Atuação</Titulo>}>
              <View>
                <ConteudoDropdown>
                  {/* <Dropdown
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
                  /> */}
                </ConteudoDropdown>
              </View>
            </Acordeon>
        </ConteudoFormulario>
        <Alerta visivel={exibicaoDoAlerta} textoDoAlerta={mensagemDoAlerta} />
        <BotaoSalvar
          disabled={temNome && temTelefone && temEmail && temMunicipio}
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
