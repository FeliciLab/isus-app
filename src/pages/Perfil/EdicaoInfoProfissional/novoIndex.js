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
import { vazio } from '../../../utils/objectUtils';
import DropDown from '../../../components/dropdown';
import FormContext from '../../../context/FormContext';
import { pegarListaDeServicos, pegarListaDeCategoriasProfissionais, pegarListaDeEspecialidades } from '../../../apis/apiKeycloak';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import { pegarDados } from '../../../services/armazenamento';
import { alteraDadosDoUsuario } from '../../../apis/apiCadastro';
import {
  SafeArea, Scroll, ConteudoFormulario, TituloPrincipal, Acordeon, Destaque,
  Titulo, BotaoSalvar
} from './styles';

function EdicaoInfoProfissional({ route }) {
  const {
    getValues, setValue, register, unregister
  } = useContext(FormContext);

  const [temCategoria, alterarTemCategoria] = useState(false);
  const [temSetores, alterarTemSetores] = useState(false);
  const [temEspecialidades, alterarTemEspecialidades] = useState(false);
  const [exibicaoDoAlerta, alterarExibicaoDoAlerta] = React.useState(false);
  const [mensagemDoAlerta, alterarMensagemDoAlerta] = React.useState('');
  const [carregando, alterarCarregando] = useState(false);
  const [perfildoUsuario, alterarPerfilDoUsuario] = useState({});
  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [tratarCategoriaProfissional, alterarTratarCategoriaProfissional] = React.useState(0);
  const [unidadesServico, alterarUnidadesServico] = useState({});
  const [listaDeEspecialidades, alterarListaDeEspecialidades] = useState([]);
  const [unidadesEspecialidades, alterarUnidadesEspecialidades] = useState({});
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

  const EstaEditavel = route.params.modo === 'edicao';

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

      const especialidades = await pegarListaDeEspecialidades(tratarCategoriaProfissional);
      alterarListaDeEspecialidades(especialidades);
      especialidades.map(pegarValorPadrãoDoCheckboxEspecilidades);

      const perfil = await pegarDados('perfil');
      alterarPerfilDoUsuario(perfil);
      alterarCamposPreenchidos(perfil.profissional);
    };
    aoIniciar();
  }, []);

  const alterarCamposPreenchidos = (dadosProfissionais) => {
    alterarTratarCategoriaProfissional(dadosProfissionais.categoria_profissional.id);
    registrarCategoriaProfissional(JSON.stringify(dadosProfissionais.categoria_profissional));
    alterarTemCategoria(verificarCategoria());
    verificarCategoriaEspecialidades();
    mudarValoresEspecialidades(dadosProfissionais.especialidades);
    mudarValoresUnidadesServicos(dadosProfissionais.unidades_servicos);

    dadosProfissionais.unidade_servico.forEach((unidade) => {
      mudarValor(unidade);
    });
  };

  const verificarCategoriaEspecialidades = () => {
    const { categoriaProfissional } = getValues();
    JSON.parse(categoriaProfissional, (key, value) => {
      if (key === 'id') {
        alterarTratarCategoriaProfissional(value);

        if (value === 1 || value === 3) {
          const aoEspecialidades = async () => {
            const especialidades = await pegarListaDeEspecialidades(value);
            // console.log('especialidades', especialidades);
            alterarListaDeEspecialidades(especialidades);
            especialidades.map(pegarValorPadrãoDoCheckboxEspecilidades);
            alterarTemEspecialidades(false);
          };
          aoEspecialidades();
        } else {
          alterarTemEspecialidades(true);
        }
      }
    });
  };

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

  const mudarValoresUnidadesServicos = (servicos) => {
    const unidadesServicoCheckBoxes = { ...unidadesServico };
    servicos.forEach((servico) => {
      unidadesServicoCheckBoxes[`${servico.nome}`] = { id: servico.id, nome: servico.nome, foiMarcado: unidadesServicoCheckBoxes[`${servico.nome}`] ? !unidadesServicoCheckBoxes[`${servico.nome}`].foiMarcado : true };
    });
    alterarUnidadesServico(unidadesServicoCheckBoxes);
  };

  const mudarValoresEspecialidades = (especialidades) => {
    const especialidadesCheckBoxes = { ...unidadesEspecialidades };
    especialidades.forEach((especialidade) => {
      especialidadesCheckBoxes[`${especialidade.nome}`] = { id: especialidade.id, nome: especialidade.nome, foiMarcado: especialidadesCheckBoxes[`${especialidade.nome}`] ? !especialidadesCheckBoxes[`${especialidade.nome}`].foiMarcado : true };
    });
    alterarUnidadesEspecialidades(especialidadesCheckBoxes);
  };

  const registrarCategoriaProfissional = (categoria) => {
    unregister('categoriaProfissional');
    register({ name: 'categoriaProfissional' });
    setValue('categoriaProfissional', categoria);
  };

  const pegarValorPadrãoDoCheckboxEspecilidades = (especialidade) => {
    if (unidadesEspecialidades[`${especialidade.nome}`]) {
      return unidadesServico[`${especialidade.nome}`];
    }
    return { id: especialidade.id, nome: especialidade.nome, foiMarcado: false };
  };

  const mudarValorEspecialidades = (especialidade) => {
    const check = { ...unidadesEspecialidades };
    check[`${especialidade.nome}`] = { id: especialidade.id, nome: especialidade.nome, foiMarcado: check[`${especialidade.nome}`] ? !check[`${especialidade.nome}`].foiMarcado : true };
    alterarUnidadesEspecialidades(check);
    registrarUnidadesDeEspecialidades(check);
  };

  const tratarUnidadesDeEspecialidades = (unidadesDeEspecialidades) => {
    const EspecialidadesMarcados = Object.values(unidadesDeEspecialidades).filter(
      especialidade => especialidade.foiMarcado
    );
    return EspecialidadesMarcados.map(especialidade => ({ id: especialidade.id }));
  };

  const registrarUnidadesDeEspecialidades = (unidadesDeEspecialidades) => {
    listaDeEspecialidades.map(especialidade => unregister(especialidade.nome));
    unregister('especialidades');
    const especialidadesTratados = tratarUnidadesDeEspecialidades(unidadesDeEspecialidades);
    if (especialidadesTratados.length !== 0) {
      register({ name: 'especialidades' });
      setValue('especialidades', JSON.stringify(especialidadesTratados));
    }
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

  const salvarInformaçõesProfissionais = async () => {
    alterarCarregando(true);
    const { categoriaProfissional, especialidades, unidadeServico } = getValues();
    const usuarioTratado = tratarCamposDeUsuario(
      {
        ...perfildoUsuario, categoriaProfissional, especialidades, unidadeServico
      }
    );
    alterarPerfilDoUsuario(
      {
        ...perfildoUsuario,
        categoria_profissional: categoriaProfissional,
        // eslint-disable-next-line object-shorthand
        especialidades: especialidades,
        unidade_servico: unidadeServico
      }
    );
    try {
      console.log('perfil atualizado', usuarioTratado);
      const resposta = await alteraDadosDoUsuario(usuarioTratado);
      navigation.navigate('TelaDeSucesso', { textoApresentacao: EstaEditavel ? 'Parabéns! Você atualizou suas informações profissionais.' : 'Parabéns! Você cadastrou suas informações profissionais. Você será redirecionado para sua página de Perfil.', telaDeRedirecionamento: 'PERFIL', telaDeBackground: '#4CAF50' });
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

  const verificarEspecialidades = () => {
    const { especialidades } = getValues();
    return especialidades && JSON.parse(especialidades).length !== 0;
  };

  const Selecao = selecaoProps => (
    <Checkbox.Item
      labelStyle={{ maxWidth: '70%' }}
      theme={theme}
      color="#FF9800"
      {...selecaoProps}
    />
  );

  return (
    <SafeArea>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <Scroll>
        <ConteudoFormulario>
          <TituloPrincipal>
            {
              EstaEditavel ? 'Selecione as informações profissionais que você deseja alterar:'
                : 'Vamos agora adicionar suas informações profissionais,para isso, selecione as opções abaixo:'}
          </TituloPrincipal>
          <ConteudoFormulario>
            <Destaque>Categoria Profissional:</Destaque>
            <DropDown
              label="Categoria profissional"
              dados={listaDeCategorias}
              valor={
                !vazio(perfildoUsuario)
                && JSON.stringify(perfildoUsuario.profissional.categoria_profissional)
              }
              definirValor={item => JSON.stringify(item)}
              definirRotulo={item => item.nome}
              aoMudarValor={(categoria) => {
                registrarCategoriaProfissional(categoria);
                alterarTemCategoria(verificarCategoria());
                verificarCategoriaEspecialidades();
              }}
            />
          </ConteudoFormulario>
          {
            tratarCategoriaProfissional === 1 || tratarCategoriaProfissional === 3 ? (
              <>
                <Destaque>Qual é sua especialidade?</Destaque>
                <Acordeon titleStyle={{ color: 'black' }} title={<Titulo>Selecione as opções</Titulo>}>
                  <View>
                    {unidadesEspecialidades && listaDeEspecialidades.length !== 0
                      && listaDeEspecialidades.map(especialidade => (
                        <Selecao
                          status={unidadesEspecialidades[especialidade.nome] && unidadesEspecialidades[especialidade.nome].foiMarcado ? 'checked' : 'unchecked'}
                          label={especialidade.nome}
                          onPress={() => {
                            mudarValorEspecialidades(especialidade);
                            alterarTemEspecialidades(verificarEspecialidades());
                          }
                          }
                        />
                      ))}
                  </View>
                </Acordeon>
              </>
            ) : (<></>)
          }
          <ConteudoFormulario>
            <Destaque>Em que setor você está atuando?</Destaque>
            <Acordeon titleStyle={{ color: 'black' }} title={<Titulo>Setor de Atuação</Titulo>}>
              <View>
                {listaDeServicos.length !== 0 && listaDeServicos.map(servico => (
                  <Selecao
                    status={unidadesServico[`${servico.nome}`] && unidadesServico[`${servico.nome}`].foiMarcado ? 'checked' : 'unchecked'}
                    label={servico.nome}
                    onPress={() => {
                      mudarValor(servico);
                      alterarTemSetores(verificarSetores());
                    }
                    }
                  />
                ))}
              </View>
            </Acordeon>
          </ConteudoFormulario>
        </ConteudoFormulario>
        <Alerta visivel={exibicaoDoAlerta} textoDoAlerta={mensagemDoAlerta} />
      </Scroll>
      <BotaoSalvar
        disabled={!(temCategoria && temEspecialidades && temSetores)}
        labelStyle={{ color: '#fff' }}
        loading={carregando}
        onPress={() => {
          salvarInformaçõesProfissionais();
        }}
        mode="contained"
      >
        Salvar
      </BotaoSalvar>
    </SafeArea>
  );
}

export default EdicaoInfoProfissional;
