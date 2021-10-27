import { useNavigation } from '@react-navigation/native';
import { uniqueId } from 'lodash';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Checkbox, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { alteraDadosDoUsuario } from '../../../apis/apiCadastro';
import {
  pegarListaDeCategoriasProfissionais,
  pegarListaDeEspecialidades,
  pegarListaDeServicos
} from '../../../apis/apiKeycloak';
import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';
import DropDown from '../../../components/dropdown';
import FormContext from '../../../context/FormContext';
import { pegarDados } from '../../../services/armazenamento';
import {
  analyticsCategoria,
  analyticsUnidadeServico
} from '../../../utils/funcoesAnalytics';
import { vazio } from '../../../utils/objectUtils';
import {
  Acordeon,
  BotaoSalvar,
  ConteudoFormulario,
  Destaque,
  SafeArea,
  Scroll,
  Titulo,
  TituloPrincipal
} from './styles';

function EdicaoInfoProfissional({ route }) {
  const { getValues, setValue, register, unregister } = useContext(FormContext);

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = React.useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = React.useState('');

  const [carregando, setCarregando] = useState(false);

  const [perfildoUsuario, setPerfilDoUsuario] = useState({});

  const [listaDeServicos, ListaDeServicos] = useState([]);

  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);

  const [
    tratarCategoriaProfissional,
    setTratarCategoriaProfissional
  ] = useState(0);

  const [unidadesServico, alterarUnidadesServico] = useState({});

  const [listaDeEspecialidades, alterarListaDeEspecialidades] = useState([]);

  const [unidadesEspecialidades, alterarUnidadesEspecialidades] = useState({});

  const [categoriaAnalitycs, setCategoriaAnalitycs] = useState('');

  const navigation = useNavigation();

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6)',
      accent: '#FF9800'
    }
  };

  const EstaEditavel = route.params.modo === 'edicao';

  const now = Date.now();

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
      ListaDeServicos(servicos);

      const categorias = await pegarListaDeCategoriasProfissionais();
      alterarListaDeCategorias(categorias);

      const especialidades = await pegarListaDeEspecialidades(
        tratarCategoriaProfissional
      );
      alterarListaDeEspecialidades(especialidades);
      especialidades.map(pegarValorPadrãoDoCheckboxEspecilidades);

      const perfil = await pegarDados('perfil');
      setPerfilDoUsuario(perfil);
      alterarCamposPreenchidos(perfil.profissional);
    };
    aoIniciar();
  }, []);

  const alterarCamposPreenchidos = dadosProfissionais => {
    if (dadosProfissionais.categoria_profissional) {
      setTratarCategoriaProfissional(
        dadosProfissionais.categoria_profissional.id
      );
      registrarCategoriaProfissional(
        JSON.stringify(dadosProfissionais.categoria_profissional)
      );
      verificarCategoriaEspecialidades();
      unregister('especialidades');
    }

    if (
      dadosProfissionais.especialidades &&
      (dadosProfissionais.categoria_profissional.id === 1 ||
        dadosProfissionais.categoria_profissional.id === 3)
    ) {
      mudarValoresEspecialidades(dadosProfissionais.especialidades);
      registrarEspecialidadesPreenchidas(dadosProfissionais.especialidades);
    }

    if (dadosProfissionais.unidades_servicos) {
      mudarValoresUnidadesServicos(dadosProfissionais.unidades_servicos);
      registrarUnidadesServicosPreenchidas(
        dadosProfissionais.unidades_servicos
      );
    }
  };

  const registrarEspecialidadesPreenchidas = especialidades => {
    unregister('especialidades');
    if (especialidades.length !== 0) {
      register({ name: 'especialidades' });
      setValue('especialidades', JSON.stringify(especialidades));
    }
  };

  const registrarUnidadesServicosPreenchidas = unidadesServicos => {
    unregister('unidadeServico');
    if (unidadesServicos.length !== 0) {
      register({ name: 'unidadeServico' });
      setValue('unidadeServico', JSON.stringify(unidadesServicos));
    }
  };

  const verificarCategoriaEspecialidades = () => {
    const { categoriaProfissional } = getValues();
    JSON.parse(categoriaProfissional, (key, value) => {
      if (key === 'id') {
        setTratarCategoriaProfissional(value);
        const aoEspecialidades = async () => {
          const especialidades = await pegarListaDeEspecialidades(value);
          alterarListaDeEspecialidades(especialidades);
          especialidades.map(pegarValorPadrãoDoCheckboxEspecilidades);
        };
        aoEspecialidades();
      }
    });
  };

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  const tratarUnidadesDeServico = unidadesDeServico => {
    const ServicosMarcados = Object.values(unidadesDeServico).filter(
      servico => servico.foiMarcado
    );
    return ServicosMarcados.map(servico => ({
      id: servico.id,
      nome: servico.nome
    }));
  };

  const registrarUnidadesDeServico = unidadesDeServico => {
    listaDeServicos.map(servico => unregister(servico.nome));
    unregister('unidadeServico');
    const servicosTratados = tratarUnidadesDeServico(unidadesDeServico);
    if (servicosTratados.length !== 0) {
      register({ name: 'unidadeServico' });
      setValue('unidadeServico', JSON.stringify(servicosTratados));
    }
  };

  const mudarValor = servico => {
    const check = { ...unidadesServico };
    check[`${servico.nome}`] = {
      id: servico.id,
      nome: servico.nome,
      foiMarcado: check[`${servico.nome}`]
        ? !check[`${servico.nome}`].foiMarcado
        : true
    };
    alterarUnidadesServico(check);
    registrarUnidadesDeServico(check);
  };

  const mudarValoresUnidadesServicos = servicos => {
    const unidadesServicoCheckBoxes = { ...unidadesServico };
    servicos.forEach(servico => {
      unidadesServicoCheckBoxes[`${servico.nome}`] = {
        id: servico.id,
        nome: servico.nome,
        foiMarcado: unidadesServicoCheckBoxes[`${servico.nome}`]
          ? !unidadesServicoCheckBoxes[`${servico.nome}`].foiMarcado
          : true
      };
    });
    alterarUnidadesServico(unidadesServicoCheckBoxes);
  };

  const mudarValoresEspecialidades = especialidades => {
    const especialidadesCheckBoxes = { ...unidadesEspecialidades };
    especialidades.forEach(especialidade => {
      especialidadesCheckBoxes[`${especialidade.nome}`] = {
        id: especialidade.id,
        nome: especialidade.nome,
        foiMarcado: especialidadesCheckBoxes[`${especialidade.nome}`]
          ? !especialidadesCheckBoxes[`${especialidade.nome}`].foiMarcado
          : true
      };
    });
    alterarUnidadesEspecialidades(especialidadesCheckBoxes);
  };

  const registrarCategoriaProfissional = categoria => {
    unregister('categoriaProfissional');
    register({ name: 'categoriaProfissional' });
    setValue('categoriaProfissional', categoria);
  };

  const pegarValorPadrãoDoCheckboxEspecilidades = especialidade => {
    if (unidadesEspecialidades[`${especialidade.nome}`]) {
      return unidadesServico[`${especialidade.nome}`];
    }
    return {
      id: especialidade.id,
      nome: especialidade.nome,
      foiMarcado: false
    };
  };

  const mudarValorEspecialidades = especialidade => {
    const check = { ...unidadesEspecialidades };
    check[`${especialidade.nome}`] = {
      id: especialidade.id,
      nome: especialidade.nome,
      foiMarcado: check[`${especialidade.nome}`]
        ? !check[`${especialidade.nome}`].foiMarcado
        : true
    };
    alterarUnidadesEspecialidades(check);
    registrarUnidadesDeEspecialidades(check);
  };

  const tratarUnidadesDeEspecialidades = unidadesDeEspecialidades => {
    const EspecialidadesMarcados = Object.values(
      unidadesDeEspecialidades
    ).filter(especialidade => especialidade.foiMarcado);
    return EspecialidadesMarcados.map(especialidade => ({
      id: especialidade.id
    }));
  };

  const registrarUnidadesDeEspecialidades = unidadesDeEspecialidades => {
    listaDeEspecialidades.map(especialidade => unregister(especialidade.nome));
    unregister('especialidades');
    const especialidadesTratados = tratarUnidadesDeEspecialidades(
      unidadesDeEspecialidades
    );
    if (especialidadesTratados.length !== 0) {
      register({ name: 'especialidades' });
      setValue('especialidades', JSON.stringify(especialidadesTratados));
    }
  };

  const tratarCamposDeUsuario = campos => {
    const {
      email,
      name,
      telefone,
      cpf,
      municipio,
      categoriaProfissional,
      especialidades,
      unidadeServico
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
      especialidades: especialidades || '[]',
      unidadeServico: unidadeServico || '[]'
    };
  };

  const salvarInformaçõesProfissionais = async () => {
    setCarregando(true);
    const {
      categoriaProfissional,
      especialidades,
      unidadeServico
    } = getValues();

    const usuarioTratado = tratarCamposDeUsuario({
      ...perfildoUsuario,
      categoriaProfissional,
      especialidades,
      unidadeServico
    });
    setPerfilDoUsuario({
      ...perfildoUsuario,
      categoria_profissional: categoriaProfissional,
      // eslint-disable-next-line object-shorthand
      especialidades: especialidades,
      unidade_servico: unidadeServico
    });
    const uniServ = JSON.parse(usuarioTratado.unidadeServico);
    try {
      console.log('cate ana teste', categoriaAnalitycs);
      const resposta = await alteraDadosDoUsuario(usuarioTratado);
      navigation.navigate('TelaDeSucesso', {
        textoApresentacao:
          'Parabéns! Você atualizou suas informações profissionais. Você será redirecionado para sua página de Perfil.',
        telaDeRedirecionamento: 'PERFIL',
        telaDeBackground: '#4CAF50'
      });
      console.log(resposta.data);
      setCarregando(false);
      analyticsCategoria(categoriaAnalitycs, now, 'Atualização Cadastro');
      analyticsUnidadeServico(uniServ, now, 'Atualização Cadastro');
    } catch (err) {
      console.log(err);
      mostrarAlerta('Ocorreu um erro. Tente novamente mais tarde.');
      setCarregando(false);
    }
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
            {EstaEditavel
              ? 'Selecione as informações profissionais que você deseja alterar:'
              : 'Vamos agora adicionar suas informações profissionais, para isso, selecione as opções abaixo:'}
          </TituloPrincipal>
          <ConteudoFormulario>
            <Destaque>Categoria Profissional:</Destaque>
            <DropDown
              label="Categoria profissional"
              dados={listaDeCategorias}
              valor={
                !vazio(perfildoUsuario) &&
                JSON.stringify(
                  perfildoUsuario.profissional.categoria_profissional
                )
              }
              definirValor={item => JSON.stringify(item)}
              definirRotulo={item => item.nome}
              aoMudarValor={categoria => {
                registrarCategoriaProfissional(categoria);
                verificarCategoriaEspecialidades();
                setCategoriaAnalitycs(categoria);
              }}
            />
          </ConteudoFormulario>
          {tratarCategoriaProfissional === 1 ||
          tratarCategoriaProfissional === 3 ? (
              <>
                <Destaque>Qual é sua especialidade?</Destaque>
                <Acordeon
                  titleStyle={{ color: 'black' }}
                  title={<Titulo>Especialidades</Titulo>}
                >
                  <View>
                    {unidadesEspecialidades &&
                    listaDeEspecialidades.length !== 0 &&
                    listaDeEspecialidades.map(especialidade => (
                      <Selecao
                        key={uniqueId('especialidade')}
                        status={
                          unidadesEspecialidades[especialidade.nome] &&
                          unidadesEspecialidades[especialidade.nome].foiMarcado
                            ? 'checked'
                            : 'unchecked'
                        }
                        label={especialidade.nome}
                        onPress={() => {
                          mudarValorEspecialidades(especialidade);
                        }}
                      />
                    ))}
                  </View>
                </Acordeon>
              </>
            ) : (
              <></>
            )}
          <ConteudoFormulario>
            <Destaque>Em que setor você está atuando?</Destaque>
            <Acordeon
              titleStyle={{ color: 'black' }}
              title={<Titulo>Setor de Atuação</Titulo>}
            >
              <View>
                {listaDeServicos.length !== 0 &&
                  listaDeServicos.map(servico => (
                    <Selecao
                      key={uniqueId('servico')}
                      status={
                        unidadesServico[`${servico.nome}`] &&
                        unidadesServico[`${servico.nome}`].foiMarcado
                          ? 'checked'
                          : 'unchecked'
                      }
                      label={servico.nome}
                      onPress={() => {
                        mudarValor(servico);
                      }}
                    />
                  ))}
              </View>
            </Acordeon>
          </ConteudoFormulario>
        </ConteudoFormulario>
        <Alerta
          visivel={exibicaoDoAlerta}
          textoDoAlerta={mensagemDoAlerta}
          duration={4000}
          onDismiss={() => setExibicaoDoAlerta(false)}
        />
        <BotaoSalvar
          labelStyle={{ color: '#fff' }}
          testID="salvar-edicao-info-profissional"
          loading={carregando}
          onPress={() => {
            salvarInformaçõesProfissionais();
          }}
          mode="contained"
        >
          Salvar
        </BotaoSalvar>
      </Scroll>
    </SafeArea>
  );
}

export default EdicaoInfoProfissional;
