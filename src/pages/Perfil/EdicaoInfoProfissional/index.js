import React, {
  useContext, useState, useEffect, useLayoutEffect
} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {
  DefaultTheme, List, Checkbox, Button
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import DropDown from '../../../components/dropdown';
import FormContext from '../../../context/FormContext';
import { pegarListaDeServicos, pegarListaDeCategoriasProfissionais } from '../../../apis/apiKeycloak';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import { pegarDados } from '../../../services/armazenamento';
import { alteraDadosDoUsuario } from '../../../apis/apiCadastro';

function EdicaoInfoProfissional() {
  const {
    getValues, setValue, register, unregister
  } = useContext(FormContext);

  const [temCategoria, alterarTemCategoria] = useState(false);
  const [temSetores, alterarTemSetores] = useState(false);
  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = React.useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = React.useState('');
  const [carregando, alterarCarregando] = useState(false);
  const [perfildoUsuario, alterarPerfilDoUsuario] = useState({});
  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [unidadesServico, alterarUnidadesServico] = useState({});
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerTitle: 'Informações Profissionais',
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
      const servicos = await pegarListaDeServicos();
      alterarListaDeServicos(servicos);

      const categorias = await pegarListaDeCategoriasProfissionais();
      alterarListaDeCategorias(categorias);

      const perfil = await pegarDados('perfil');
      alterarPerfilDoUsuario(perfil);
    };
    aoIniciar();
  }, []);

  const mostrarAlerta = (mensagem) => {
    alterarExibicaoDoAlerta(true);
    alterarMensagemDoAlerta(mensagem);
    setTimeout(() => alterarExibicaoDoAlerta(false), 4000);
  };

  const tratarUnidadesDeServico = (unidadesDeServico) => {
    const ServicosMarcados = Object.values(unidadesDeServico).filter(servico => servico.foiMarcado);
    return ServicosMarcados.map(servico => ({ id: servico.id, nome: servico.nome }));
  };

  const registrarUnidadesDeServico = (unidadesDeServico) => {
    listaDeServicos.map(servico => unregister(servico.nome));
    unregister('unidadeServico');
    const servicosTratados = tratarUnidadesDeServico(unidadesDeServico);
    if (servicosTratados.length !== 0) {
      register({ name: 'unidadeServico' });
      setValue('unidadeServico', JSON.stringify(servicosTratados));
    }
  };

  const mudarValor = (servico) => {
    const check = { ...unidadesServico };
    check[`${servico.nome}`] = { id: servico.id, nome: servico.nome, foiMarcado: check[`${servico.nome}`] ? !check[`${servico.nome}`].foiMarcado : true };
    alterarUnidadesServico(check);
    registrarUnidadesDeServico(check);
  };

  const registrarCategoriaProfissional = (categoria) => {
    unregister('categoriaProfissional');
    register({ name: 'categoriaProfissional' });
    setValue('categoriaProfissional', categoria);
  };

  const tratarCamposDeUsuario = (campos) => {
    const {
      email, name, telefone, cpf, municipio, categoriaProfissional, unidadeServico
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
      unidadeServico
    };
  };

  const salvarInformaçõesProfissionais = async () => {
    alterarCarregando(true);
    const { categoriaProfissional, unidadeServico } = getValues();
    const usuarioTratado = tratarCamposDeUsuario(
      { ...perfildoUsuario, categoriaProfissional, unidadeServico }
    );
    alterarPerfilDoUsuario(
      {
        ...perfildoUsuario,
        categoria_profissional: categoriaProfissional,
        unidade_servico: unidadeServico
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

  const verificarSetores = () => {
    const { unidadeServico } = getValues();
    return unidadeServico && JSON.parse(unidadeServico).length !== 0;
  };

  const verificarCategoria = () => {
    const { categoriaProfissional } = getValues();
    return categoriaProfissional && JSON.parse(categoriaProfissional).length !== 0;
  };

  return (
    <SafeAreaView style={estilos.safeArea}>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView style={estilos.scroll}>
        <View style={estilos.conteudoFormulario}>
          <Text style={estilos.tituloPrincipal}>
            Vamos agora adicionar suas informações profissionais, para isso,
            selecione as opções abaixo:
          </Text>
          <View style={estilos.conteudoFormulario}>
            <Text style={estilos.tituloDestaque}>Categoria Profissional:</Text>
            <DropDown
              label="Categoria profissional"
              dados={listaDeCategorias}
              definirValor={item => JSON.stringify(item)}
              definirRotulo={item => item.nome}
              aoMudarValor={(categoria) => {
                registrarCategoriaProfissional(categoria);
                alterarTemCategoria(verificarCategoria());
              }}
            />
          </View>
          <View style={estilos.conteudoFormulario}>
            <Text style={estilos.tituloDestaque}>Em que setor Você está atuando?</Text>
            <List.Accordion style={estilos.acordeon} titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Setor de Atuação</Text>}>
              <View>
                {listaDeServicos.length !== 0 && listaDeServicos.map(servico => (
                  <Checkbox.Item
                    status={unidadesServico[`${servico.nome}`] && unidadesServico[`${servico.nome}`].foiMarcado ? 'checked' : 'unchecked'}
                    labelStyle={{ maxWidth: '70%' }}
                    theme={theme}
                    color="#FF9800"
                    label={servico.nome}
                    onPress={() => {
                      mudarValor(servico);
                      alterarTemSetores(verificarSetores());
                    }
                    }
                  />
                ))}
              </View>
            </List.Accordion>
          </View>
        </View>
        <Alerta visivel={exibicaoDoAlerta} textoDoAlerta={mensagemDoAlerta} />
      </ScrollView>
      <Button
        style={[
          { ...estilos.botao },
          temCategoria && temSetores
            ? { ...estilos.botaoHabilitado }
            : { ...estilos.botaoDesabilitado }
        ]}
        disabled={!(temCategoria && temSetores)}
        labelStyle={{ color: '#fff' }}
        loading={carregando}
        onPress={() => {
          salvarInformaçõesProfissionais();
        }}
        mode="contained"
      >
        Salvar
      </Button>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  safeArea: {
    height: '100%',
    backgroundColor: '#ffffff'
  },
  scroll: {
    paddingHorizontal: 16
  },
  conteudoFormulario: {
    marginTop: 24
  },
  tituloPrincipal: {
    fontSize: 24,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: 24
  },
  acordeon: {
    borderColor: 'rgba(25, 25, 25, 0.32)',
    borderWidth: 2,
    marginTop: 16
  },
  titulo: {
    fontSize: 18,
    color: 'rgba(25, 25, 25, 0.32)',
  },
  tituloDestaque: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    margin: 30,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center'
  },
  botaoHabilitado: {
    backgroundColor: '#FF9800'
  },
  botaoDesabilitado: {
    backgroundColor: '#BDBDBD'
  },
  exibir: {
    display: 'flex'
  },
  oculto: {
    display: 'none'
  }
});

export default EdicaoInfoProfissional;
