/* eslint-disable import/no-cycle */
import React, {
  useContext, useState, useEffect, useLayoutEffect
} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import {
  List, Checkbox, Button
} from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import DropDown from '../../components/dropdown';
import FormContext from '../../context/FormContext';
import { pegarListaDeServicos, pegarListaDeCategoriasProfissionais } from '../../apis/apiKeycloak';

function EdicaoInfoProfissional() {
  const {
    control, setValue, register
  } = useContext(FormContext);
  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [unidadesServico, alterarUnidadesServico] = useState({});
  const navigation = useNavigation();

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

  // const tratarUnidadesDeServico = () => {
  //   const ServicosMarcados = O
  // bject.values(unidadesServico).filter(servico => servico.foiMarcado);
  //   return JSON.stringify(
  //     ServicosMarcados.map(servico => ({ id: servico.id, nome: servico.nome }))
  //   );
  // };

  // const registrarUnidadesDeServico = () => {
  //   listaDeServicos.map(servico => unregister(servico.nome));
  //   register({ name: 'unidadeServico' });
  //   const servicosTratados = tratarUnidadesDeServico();
  //   setValue('unidadeServico', servicosTratados);
  // };

  const registarCategoriaProfissional = (categoria) => {
    register({ name: 'categoriaProfissional' });
    setValue('categoriaProfissional', categoria);
  };

  return (
    <ScrollView style={{ backgroundColor: '#ffffff', paddingHorizontal: 16 }}>
    <View style={{ marginTop: 24 }}>
      <Text style={{
        fontSize: 24, lineHeight: 28, color: 'rgba(0, 0, 0, 0.87)', marginBottom: 24
      }}
      >
        Vamos agora adicionar suas informações profissionais, para isso, selecione as opções abaixo:
      </Text>

      <Text style={estilos.tituloDestaque}>Categoria Profissional:</Text>
          <DropDown
            label="Categoria profissional"
            dados={listaDeCategorias}
            definirValor={item => JSON.stringify(item)}
            definirRotulo={item => item.nome}
            aoMudarValor={(categoria) => {
              registarCategoriaProfissional(categoria);
            }}
          />


      <Text style={estilos.tituloDestaque}>Em que setor Você está atuando?</Text>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Setor de Atuação</Text>}>
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
                color="#304FFE"
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
    <Button
      style={estilos.botao}
      labelStyle={{ color: '#fff' }}
      mode="contained"
    >
      Salvar
    </Button>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  tituloDestaque: {
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
    backgroundColor: '#FF9800'
  },
});

export default EdicaoInfoProfissional;
