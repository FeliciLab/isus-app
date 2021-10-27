import { uniqueId } from 'lodash';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Checkbox, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { alteraDadosDoUsuario } from '../../apis/apiCadastro';
import {
  pegarListaDeCategoriasProfissionais,
  pegarListaDeEspecialidades,
  pegarListaDeServicos
} from '../../apis/apiKeycloak';
import Alerta from '../../components/alerta';
import BarraDeStatus from '../../components/barraDeStatus';
import DropDown from '../../components/dropdown';
import rotas from '../../constantes/rotas';
import FormContext from '../../context/FormContext';
import { pegarDados } from '../../services/armazenamento';
import {
  Acordeon,
  Botao,
  ConteudoDropdown,
  PlaceholderAcordeon,
  Scroll,
  Titulo,
  TituloDoFormulario
} from './styles';
import textos from './textos.json';

function FormularioInfoProfissional({ navigation, route }) {
  const { setValue, register, unregister, getValues } = useContext(FormContext);

  const [listaDeServicos, setListaDeServicos] = useState([]);

  const [listaDeCategorias, setListaDeCategorias] = useState([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const [unidadesServico, setUnidadesServico] = useState({});

  const [
    tratarCategoriaProfissional,
    setTratarCategoriaProfissional
  ] = useState(0);

  const [listaDeEspecialidades, setListaDeEspecialidades] = useState([]);

  const [unidadesEspecialidades, setUnidadesEspecialidades] = useState({});

  const [carregando, setCarregando] = useState(false);

  const [perfildoUsuario, setPerfilDoUsuario] = useState({});

  const [exibicaoDoAlerta, setExibicaoDoAlerta] = useState(false);

  const [mensagemDoAlerta, setMensagemDoAlerta] = useState('');

  const veioDoPerfil = route.params.tela_anterior === rotas.PERFIL;

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
      accent: '#f1c40f'
    }
  };

  const pegarValoresUnidadesServicos = () => {
    const valores = getValues();
    if (valores.unidadeServico) {
      const unidadesServicos = JSON.parse(valores.unidadeServico);
      mudarValoresUnidadesServicos(unidadesServicos);
    }
  };

  const pegarValoresEspecialidades = async especialidadesLista => {
    const { especialidades } = getValues();
    const especialidadesSalva = JSON.parse(especialidades);

    if (especialidadesSalva) {
      const especialidadesFiltrada = filtrarEspecialidades(
        especialidadesSalva,
        especialidadesLista
      );
      if (especialidadesFiltrada && especialidadesFiltrada.length > 0) {
        mudarValoresEspecialidades(especialidadesFiltrada);
      }
    }
  };

  const filtrarEspecialidades = (especialidadesSalva, especialidadesLista) =>
    especialidadesSalva.map(especialidade => {
      const especialidadeFiltrada = especialidadesLista.filter(
        esp => especialidade.id === esp.id
      );
      return especialidadeFiltrada[0];
    });

  const pegarValoresCategoriaProfissional = () => {
    const valores = getValues();
    setCategoriaSelecionada(valores.categoriaProfissional);
    verificarCategoria();
  };

  useEffect(() => {
    const aoIniciar = async () => {
      const servicos = await pegarListaDeServicos();
      setListaDeServicos(servicos);
      pegarValoresUnidadesServicos();

      const categorias = await pegarListaDeCategoriasProfissionais();
      setListaDeCategorias(categorias);
      pegarValoresCategoriaProfissional();

      const especialidades = await pegarListaDeEspecialidades(
        tratarCategoriaProfissional
      );
      setListaDeEspecialidades(especialidades);

      if (veioDoPerfil) {
        const perfil = await pegarDados('perfil');
        setPerfilDoUsuario(perfil);
      }
    };
    aoIniciar();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: veioDoPerfil ? 'Informações profissionais' : 'Cadastro',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon
            name="arrow-left"
            size={28}
            color={veioDoPerfil ? '#4CAF50' : '#304FFE'}
          />
        </TouchableOpacity>
      )
    });
  }, []);

  const verificarCategoria = () => {
    const { categoriaProfissional } = getValues();
    if (categoriaProfissional) {
      JSON.parse(categoriaProfissional, (key, value) => {
        if (key === 'id') {
          setTratarCategoriaProfissional(value);

          if (value === 1 || value === 3) {
            const aoEspecialidades = async () => {
              const especialidades = await pegarListaDeEspecialidades(value);
              setListaDeEspecialidades(especialidades);
              pegarValoresEspecialidades(especialidades);
            };
            aoEspecialidades();
          }
        }
      });
    }
  };

  const definirCorDosElementos = () => (veioDoPerfil ? '#FF9800' : '#304FFE');

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
    setUnidadesServico(unidadesServicoCheckBoxes);
  };

  const mudarValorEspecilidades = especialidade => {
    const check = { ...unidadesEspecialidades };
    check[`${especialidade.nome}`] = {
      id: especialidade.id,
      nome: especialidade.nome,
      foiMarcado: check[`${especialidade.nome}`]
        ? !check[`${especialidade.nome}`].foiMarcado
        : true
    };
    setUnidadesEspecialidades(check);
  };

  const mudarValoresEspecialidades = especialidades => {
    const especialidadesCheckBoxes = { ...unidadesServico };
    especialidades.forEach(servico => {
      especialidadesCheckBoxes[`${servico.nome}`] = {
        id: servico.id,
        nome: servico.nome,
        foiMarcado: especialidadesCheckBoxes[`${servico.nome}`]
          ? !especialidadesCheckBoxes[`${servico.nome}`].foiMarcado
          : true
      };
    });
    setUnidadesEspecialidades(especialidadesCheckBoxes);
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
    setUnidadesServico(check);
  };

  const tratarUnidadesDeServico = () => {
    const ServicosMarcados = Object.values(unidadesServico).filter(
      servico => servico.foiMarcado
    );
    return JSON.stringify(
      ServicosMarcados.map(servico => ({ id: servico.id, nome: servico.nome }))
    );
  };

  const registrarUnidadesDeServico = () => {
    listaDeServicos.map(servico => unregister(servico.nome));
    unregister('unidadeServico');
    register({ name: 'unidadeServico' });
    const servicosTratados = tratarUnidadesDeServico();
    setValue('unidadeServico', servicosTratados);
  };

  const registarCategoriaProfissional = categoria => {
    register({ name: 'categoriaProfissional' });
    setValue('categoriaProfissional', categoria);
  };

  const tratarUnidadesDeEspecialidades = () => {
    const EspecialidadesMarcados = Object.values(unidadesEspecialidades).filter(
      especialidade => especialidade.foiMarcado
    );
    return JSON.stringify(
      EspecialidadesMarcados.map(especialidade => ({
        id: especialidade.id
      }))
    );
  };

  const registrarUnidadesDeEspecialidades = () => {
    listaDeEspecialidades.map(especialidade => unregister(especialidade.nome));
    unregister('especialidades');
    register({ name: 'especialidades' });

    const especialidadesTratados = tratarUnidadesDeEspecialidades();
    setValue('especialidades', especialidadesTratados);
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
      especialidades,
      unidadeServico
    };
  };

  // Cadastro
  const alterarTelaDoCadastro = () => {
    navigation.navigate('FormularioSenha');
  };

  const mostrarAlerta = mensagem => {
    setExibicaoDoAlerta(true);
    setMensagemDoAlerta(mensagem);
  };

  // Adicionar Informações profissionais
  const adicionarInformaçõesProfissionais = async () => {
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
    try {
      console.log('perfil atualizado', usuarioTratado);
      const resposta = await alteraDadosDoUsuario(usuarioTratado);
      navigation.navigate('TelaDeSucesso', {
        textoApresentacao:
          'Parabéns! Você cadastrou suas informações profissionais. Você será redirecionado para sua página de Perfil.',
        telaDeRedirecionamento: 'PERFIL',
        telaDeBackground: '#4CAF50'
      });
      console.log(resposta.data);
      setCarregando(false);
    } catch (err) {
      console.log(err);
      mostrarAlerta('Ocorreu um erro. Tente novamente mais tarde.');
      setCarregando(false);
    }
  };

  return (
    <Scroll>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
      <ConteudoDropdown>
        <Titulo>
          {veioDoPerfil
            ? textos.formularioProfissional.introducaoAdicaoPerfil
            : textos.formularioProfissional.introducao}
        </Titulo>
        <TituloDoFormulario>
          {textos.formularioProfissional.titulo}
        </TituloDoFormulario>
        <DropDown
          label="Categoria profissional"
          dados={listaDeCategorias}
          valor={categoriaSelecionada}
          definirValor={item => JSON.stringify(item)}
          definirRotulo={item => item.nome}
          aoMudarValor={categoria => {
            registarCategoriaProfissional(categoria);
            verificarCategoria();
          }}
        />
        {tratarCategoriaProfissional === 1 ||
        tratarCategoriaProfissional === 3 ? (
            <>
              <TituloDoFormulario>
                {textos.formularioProfissional.especialidade}
              </TituloDoFormulario>
              <Acordeon
                titleStyle={{ color: 'black' }}
                title={
                  <PlaceholderAcordeon>Selecione as opções</PlaceholderAcordeon>
                }
              >
                <View>
                  {unidadesEspecialidades &&
                  listaDeEspecialidades.length !== 0 &&
                  listaDeEspecialidades.map(especialidade => (
                    <Checkbox.Item
                      key={uniqueId('especialidade')}
                      status={
                        unidadesEspecialidades[especialidade.nome] &&
                        unidadesEspecialidades[especialidade.nome].foiMarcado
                          ? 'checked'
                          : 'unchecked'
                      }
                      labelStyle={{ maxWidth: '70%' }}
                      theme={theme}
                      color={definirCorDosElementos()}
                      label={especialidade.nome}
                      onPress={() => {
                        mudarValorEspecilidades(especialidade);
                      }}
                    />
                  ))}
                </View>
              </Acordeon>
            </>
          ) : (
            <></>
          )}
        <TituloDoFormulario>
          {textos.formularioProfissional.servicos}
        </TituloDoFormulario>
        <Acordeon
          titleStyle={{ color: 'black' }}
          title={<PlaceholderAcordeon>Selecione as opções</PlaceholderAcordeon>}
        >
          <View>
            {unidadesServico &&
              listaDeServicos.length !== 0 &&
              listaDeServicos.map(servico => (
                <Checkbox.Item
                  key={uniqueId('servico')}
                  status={
                    unidadesServico[servico.nome] &&
                    unidadesServico[servico.nome].foiMarcado
                      ? 'checked'
                      : 'unchecked'
                  }
                  labelStyle={{ maxWidth: '70%' }}
                  theme={theme}
                  color={definirCorDosElementos()}
                  label={servico.nome}
                  onPress={() => {
                    mudarValor(servico);
                  }}
                />
              ))}
          </View>
        </Acordeon>
      </ConteudoDropdown>
      <Botao
        cor={definirCorDosElementos()}
        disabled={false}
        loading={carregando}
        labelStyle={{ color: '#fff' }}
        onPress={() => {
          registrarUnidadesDeServico();
          registrarUnidadesDeEspecialidades();
          if (veioDoPerfil) {
            return adicionarInformaçõesProfissionais();
          }
          return alterarTelaDoCadastro();
        }}
        mode="contained"
      >
        {veioDoPerfil ? 'salvar' : 'Próximo'}
      </Botao>
      <Alerta
        visivel={exibicaoDoAlerta}
        textoDoAlerta={mensagemDoAlerta}
        duration={4000}
        onDismiss={() => setExibicaoDoAlerta(false)}
      />
    </Scroll>
  );
}

export default FormularioInfoProfissional;
