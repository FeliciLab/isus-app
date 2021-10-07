import { Feature } from '@paralleldrive/react-feature-toggles';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Checkbox, DefaultTheme, List } from 'react-native-paper';
import {
  pegarListaDeCategoriasProfissionais,
  pegarListaDeEspecialidades,
  pegarListaDeServicos
} from '../../apis/apiKeycloak';
import DropDown from '../../components/dropdown';
import FormContext from '../../context/FormContext';
import WizardContext from '../../context/WizardContext';
import FormularioSenha from './formularioSenha';

function FormularioInfoProfissional() {
  const { getValues, setValue, register, unregister } = useContext(FormContext);

  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [
    tratarCategoriaProfissional,
    alterarTratarCategoriaProfissional
  ] = React.useState(0);
  const [unidadesServico, alterarUnidadesServico] = useState({});
  const [listaDeEspecialidades, alterarListaDeEspecialidades] = useState([]);
  const [unidadesEspecialidades, alterarUnidadesEspecialidades] = useState({});
  const { alterarTelaAtual } = useContext(WizardContext);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
      accent: '#f1c40f'
    }
  };

  useEffect(() => {
    const aoIniciar = async () => {
      const servicos = await pegarListaDeServicos();
      alterarListaDeServicos(servicos);
      servicos.map(pegarValorPadrãoDoCheckbox);

      const categorias = await pegarListaDeCategoriasProfissionais();
      alterarListaDeCategorias(categorias);

      const especialidades = await pegarListaDeEspecialidades(
        tratarCategoriaProfissional
      );
      alterarListaDeEspecialidades(especialidades);
      especialidades.map(pegarValorPadrãoDoCheckboxEspecilidades);
    };
    aoIniciar();
  }, []);

  const verificarCategoria = () => {
    const { categoriaProfissional } = getValues();
    JSON.parse(categoriaProfissional, (key, value) => {
      if (key === 'id') {
        alterarTratarCategoriaProfissional(value);

        if (value === 1 || value === 3) {
          const aoEspecialidades = async () => {
            const especialidades = await pegarListaDeEspecialidades(value);
            alterarListaDeEspecialidades(especialidades);
            especialidades.map(pegarValorPadrãoDoCheckboxEspecilidades);
          };
          aoEspecialidades();
        }
      }
    });
  };

  const pegarValorPadrãoDoCheckbox = servico => {
    if (unidadesServico[`${servico.nome}`]) {
      return unidadesServico[`${servico.nome}`];
    }
    return { id: servico.id, nome: servico.nome, foiMarcado: false };
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

  const CampoEspecialidades = () =>
    tratarCategoriaProfissional === 1 || tratarCategoriaProfissional === 3 ? (
      <>
        <Text style={estilos.tituloDestaque}>Qual é sua especialidade?</Text>
        <List.Accordion
          titleStyle={{ color: 'black' }}
          title={<Text style={estilos.titulo}>Selecione as opções</Text>}
        >
          <View>
            {unidadesEspecialidades &&
              listaDeEspecialidades.length !== 0 &&
              listaDeEspecialidades.map((especialidade, index) => (
                <Checkbox.Item
                  key={index}
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
        </List.Accordion>
      </>
    ) : (
      <></>
    );

  return (
    <>
      <View style={{ marginTop: 24 }}>
        <Text style={estilos.tituloDestaque}>Categoria Profissional:</Text>
        <DropDown
          label="Categoria profissional:"
          dados={listaDeCategorias}
          definirValor={item => JSON.stringify(item)}
          definirRotulo={item => item.nome}
          aoMudarValor={categoria => {
            registarCategoriaProfissional(categoria);
            verificarCategoria();
          }}
        />
        <Feature name="309" activeComponent={() => <CampoEspecialidades />} />
        <Text style={estilos.tituloDestaque}>
          Em que setor você está atuando?
        </Text>
        <List.Accordion
          titleStyle={{ color: 'black' }}
          title={<Text style={estilos.titulo}>Selecione as opções</Text>}
        >
          <View>
            {unidadesServico &&
              listaDeServicos.length !== 0 &&
              listaDeServicos.map((servico, index) => (
                <Checkbox.Item
                  key={index}
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
        </List.Accordion>
      </View>
      <Button
        style={estilos.botao}
        labelStyle={{ color: '#fff' }}
        onPress={() => {
          registrarUnidadesDeServico();
          registrarUnidadesDeEspecialidades();
          alterarTelaAtual({ indice: 2, tela: <FormularioSenha /> });
        }}
        mode="contained"
      >
        Próximo
      </Button>
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  tituloDestaque: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  botao: {
    borderRadius: 50,
    width: 150,
    height: 45,
    alignSelf: 'flex-end',
    margin: 20,
    justifyContent: 'center',
    backgroundColor: '#304FFE'
  }
});

export default FormularioInfoProfissional;
