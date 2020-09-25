/* eslint-disable import/no-cycle */
import React, {
  useContext, useState, useEffect, useLayoutEffect
} from 'react';
import {
  View, TouchableOpacity
} from 'react-native';
import {
  DefaultTheme, Checkbox
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Scroll, ConteudoDropdown, TituloDoFormulario, Acordeon, Botao, Titulo, PlaceholderAcordeon
} from './styles';
import DropDown from '../../components/dropdown';
import FormContext from '../../context/FormContext';
import { pegarListaDeServicos, pegarListaDeCategoriasProfissionais } from '../../apis/apiKeycloak';
import BarraDeStatus from '../../components/barraDeStatus';


function FormularioInfoProfissional({ navigation }) {
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
    <Scroll>
      <BarraDeStatus barStyle="dark-content" backgroundColor="#FFF" />
      <ConteudoDropdown>
        <Titulo>
          Vamos realizar seu cadastro, precisamos aprenas de suas informações profissionais:
        </Titulo>
        <TituloDoFormulario>Informações profissionais</TituloDoFormulario>
        <DropDown
          label="Categoria profissional"
          dados={listaDeCategorias}
          definirValor={item => JSON.stringify(item)}
          definirRotulo={item => item.nome}
          aoMudarValor={(categoria) => {
            registarCategoriaProfissional(categoria);
          }}
        />

        <TituloDoFormulario>Quais serviços em que atua?</TituloDoFormulario>
        <Acordeon
          titleStyle={{ color: 'black' }}
          title={<PlaceholderAcordeon>Selecione as opções</PlaceholderAcordeon>}
        >
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
        </Acordeon>
      </ConteudoDropdown>
      <Botao
        disabled={false}
        labelStyle={{ color: '#fff' }}
        onPress={() => {
          registrarUnidadesDeServico();
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
