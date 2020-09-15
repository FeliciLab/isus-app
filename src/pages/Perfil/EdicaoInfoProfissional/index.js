/* eslint-disable import/no-cycle */
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
import { Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import DropDown from '../../../components/dropdown';
import FormContext from '../../../context/FormContext';
import { pegarListaDeServicos, pegarListaDeCategoriasProfissionais } from '../../../apis/apiKeycloak';
// import Alerta from '../../../components/alerta';
import BarraDeStatus from '../../../components/barraDeStatus';

function EdicaoInfoProfissional() {
  const {
    control, setValue, register, unregister
  } = useContext(FormContext);
  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [unidadesServico, alterarUnidadesServico] = useState({});
  const navigation = useNavigation();

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
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
    };
    aoIniciar();
  }, []);

  const pegarValorPadrãoDoCheckbox = (servico) => {
    if (unidadesServico[`${servico.nome}`]) {
      return unidadesServico[`${servico.nome}`];
    }
    return { id: servico.id, nome: servico.nome, foiMarcado: false };
  };

  const mudarValor = (onChange, value, servico) => {
    onChange({ ...value, foiMarcado: !value.foiMarcado });
    const check = { ...unidadesServico };
    check[`${servico.nome}`] = { id: servico.id, nome: servico.nome, foiMarcado: !value.foiMarcado };
    alterarUnidadesServico(check);
  };

  const tratarUnidadesDeServico = () => {
    const ServicosMarcados = Object.values(unidadesServico).filter(servico => servico.foiMarcado);
    return JSON.stringify(
      ServicosMarcados.map(servico => ({ id: servico.id, nome: servico.nome }))
    );
  };

  const registrarUnidadesDeServico = () => {
    listaDeServicos.map(servico => unregister(servico.nome));
    register({ name: 'unidadeServico' });
    const servicosTratados = tratarUnidadesDeServico();
    setValue('unidadeServico', servicosTratados);
  };

  const registrarCategoriaProfissional = (categoria) => {
    register({ name: 'categoriaProfissional' });
    setValue('categoriaProfissional', categoria);
  };

  const salvarInformaçõesProfissionais = () => {

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
            }}
          />
        </View>
        <View style={estilos.conteudoFormulario}>
          <Text style={estilos.tituloDestaque}>Em que setor Você está atuando?</Text>
          <List.Accordion style={estilos.acordeon} titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Setor de Atuação</Text>}>
            <View>
              {listaDeServicos.length !== 0 && listaDeServicos.map(servico => (
                <Controller
                  name={`${servico.nome}`}
                  control={control}
                  defaultValue={() => pegarValorPadrãoDoCheckbox(servico)}
                  render={({ onChange, value }) => (
                    <Checkbox.Item
                      status={value.foiMarcado ? 'checked' : 'unchecked'}
                      labelStyle={{ maxWidth: '70%' }}
                      theme={theme}
                      color="#FF9800"
                      label={servico.nome}
                      onPress={() => {
                        mudarValor(onChange, value, servico);
                      }
                      }
                    />
                  )}
                />
              ))}
            </View>
          </List.Accordion>
        </View>
      </View>
      </ScrollView>
      <Button
        style={estilos.botao}
        labelStyle={{ color: '#fff' }}
        onPress={() => {
          registrarUnidadesDeServico();
          salvarInformaçõesProfissionais();
        }}
        mode="contained"
      >
        Salvar
      </Button>
      {/* <Alerta visivel={cadastroRealizado} textoDoAlerta={mensagemDoAlerta} /> */}
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
    justifyContent: 'center',
    backgroundColor: '#FF9800'
  },
});

export default EdicaoInfoProfissional;
