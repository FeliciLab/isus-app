import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Checkbox, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  pegarListaDeCategoriasProfissionais,
  pegarListaDeEspecialidades,
  pegarListaDeServicos
} from '../../apis/apiKeycloak';
import BarraDeStatus from '../../components/barraDeStatus';
import DropDown from '../../components/dropdown';
import FormContext from '../../context/FormContext';
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
import { uniqueId } from 'lodash';

function FormularioInfoProfissional({ navigation }) {
  const { setValue, register, unregister, getValues } = useContext(FormContext);

  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [categoriaSelecionada, alterarCategoriaSelecionada] = useState('');
  const [unidadesServico, alterarUnidadesServico] = useState({});
  const [
    tratarCategoriaProfissional,
    alterarTratarCategoriaProfissional
  ] = React.useState(0);
  const [listaDeEspecialidades, alterarListaDeEspecialidades] = useState([]);
  const [unidadesEspecialidades, alterarUnidadesEspecialidades] = useState({});

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
    alterarCategoriaSelecionada(valores.categoriaProfissional);
    verificarCategoria();
  };

  useEffect(() => {
    const aoIniciar = async () => {
      const servicos = await pegarListaDeServicos();
      alterarListaDeServicos(servicos);
      pegarValoresUnidadesServicos();

      const categorias = await pegarListaDeCategoriasProfissionais();
      alterarListaDeCategorias(categorias);
      pegarValoresCategoriaProfissional();

      const especialidades = await pegarListaDeEspecialidades(
        tratarCategoriaProfissional
      );
      alterarListaDeEspecialidades(especialidades);
    };
    aoIniciar();
  }, []);

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

  const verificarCategoria = () => {
    const { categoriaProfissional } = getValues();
    if (categoriaProfissional) {
      JSON.parse(categoriaProfissional, (key, value) => {
        if (key === 'id') {
          alterarTratarCategoriaProfissional(value);

          if (value === 1 || value === 3) {
            const aoEspecialidades = async () => {
              const especialidades = await pegarListaDeEspecialidades(value);
              alterarListaDeEspecialidades(especialidades);
              pegarValoresEspecialidades(especialidades);
            };
            aoEspecialidades();
          }
        }
      });
    }
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

  const mudarValorEspecilidades = especialidade => {
    const check = { ...unidadesEspecialidades };
    check[`${especialidade.nome}`] = {
      id: especialidade.id,
      nome: especialidade.nome,
      foiMarcado: check[`${especialidade.nome}`]
        ? !check[`${especialidade.nome}`].foiMarcado
        : true
    };
    alterarUnidadesEspecialidades(check);
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
    alterarUnidadesEspecialidades(especialidadesCheckBoxes);
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

  return (
    <Scroll>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
      <ConteudoDropdown>
        <Titulo>{textos.formularioProfissional.introducao}</Titulo>
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
                      color="#304FFE"
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
                  key={uniqueId('servco')}
                  status={
                    unidadesServico[servico.nome] &&
                    unidadesServico[servico.nome].foiMarcado
                      ? 'checked'
                      : 'unchecked'
                  }
                  labelStyle={{ maxWidth: '70%' }}
                  theme={theme}
                  color="#304FFE"
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
        disabled={false}
        labelStyle={{ color: '#fff' }}
        onPress={() => {
          registrarUnidadesDeServico();
          registrarUnidadesDeEspecialidades();
          navigation.navigate('FormularioSenha');
        }}
        mode="contained"
      >
        Próximo
      </Botao>
    </Scroll>
  );
}

export default FormularioInfoProfissional;
