/* eslint-disable import/no-cycle */
import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  DefaultTheme, List, Checkbox, Button
} from 'react-native-paper';
import DropDown from '../../components/dropdown';
import FormContext from '../../context/FormContext';
import { pegarListaDeServicos, pegarListaDeCategoriasProfissionais } from '../../apis/apiKeycloak';

function FormularioInfoProfissional() {
  const {
    setValue, register, unregister
  } = useContext(FormContext);

  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [unidadesServico, alterarUnidadesServico] = useState({});


  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
      accent: '#f1c40f',
    },
  };

  useEffect(() => {
    const aoIniciar = async () => {
      const servicos = await pegarListaDeServicos();
      alterarListaDeServicos(servicos);
      servicos.map(pegarValorPadrãoDoCheckbox);

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

  const mudarValor = (servico) => {
    const check = { ...unidadesServico };
    check[`${servico.nome}`] = { id: servico.id, nome: servico.nome, foiMarcado: check[`${servico.nome}`] ? !check[`${servico.nome}`].foiMarcado : true };
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
    unregister('unidadeServico');
    register({ name: 'unidadeServico' });
    const servicosTratados = tratarUnidadesDeServico();
    setValue('unidadeServico', servicosTratados);
  };

  const registarCategoriaProfissional = (categoria) => {
    register({ name: 'categoriaProfissional' });
    setValue('categoriaProfissional', categoria);
  };

  return (
    <>
      <View style={{ marginTop: 24 }}>
        <Text style={estilos.tituloDestaque}>Informações profissionais</Text>
        <DropDown
          label="Categoria profissional"
          dados={listaDeCategorias}
          definirValor={item => JSON.stringify(item)}
          definirRotulo={item => item.nome}
          aoMudarValor={(categoria) => {
            registarCategoriaProfissional(categoria);
          }}
        />

        <Text style={estilos.tituloDestaque}>Quais serviços em que atua?</Text>
        <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Selecione as opções</Text>}>
          <View>
            {unidadesServico && listaDeServicos.length !== 0 && listaDeServicos.map(servico => (
              <Checkbox.Item
                status={unidadesServico[servico.nome] && unidadesServico[servico.nome].foiMarcado ? 'checked' : 'unchecked'}
                labelStyle={{ maxWidth: '70%' }}
                theme={theme}
                color="#304FFE"
                label={servico.nome}
                onPress={() => {
                  mudarValor(servico);
                }
                }
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
    backgroundColor: '#304FFE'
  },
});

export default FormularioInfoProfissional;
