/* eslint-disable import/no-cycle */
import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  DefaultTheme, List, Checkbox, Button
} from 'react-native-paper';
import { Controller } from 'react-hook-form';
import DropDown from '../../components/dropdown';
import FormContext from '../../context/FormContext';
import { pegarListaDeServicos, pegarListaDeCategoriasProfissionais } from '../../apis/apiKeycloak';
import WizardContext from '../../context/WizardContext';
import FormularioSenha from './formularioSenha';

function FormularioInfoProfissional() {
  const {
    control, setValue, register, unregister
  } = useContext(FormContext);
  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [listaDeCategorias, alterarListaDeCategorias] = useState([]);
  const [unidadesServico, alterarUnidadesServico] = useState({});
  const { alterarTelaAtual } = useContext(WizardContext);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
      accent: '#f1c40f',
    },
  };

  const aoIniciar = async () => {
    const servicos = await pegarListaDeServicos();
    alterarListaDeServicos(servicos);

    const categorias = await pegarListaDeCategoriasProfissionais();
    alterarListaDeCategorias(categorias);
  };

  useEffect(aoIniciar, []);

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

  const registrarValores = () => {
    listaDeServicos.map(servico => unregister(servico.nome));
    register({ name: 'unidadeServico' });
    const servicosTratados = tratarUnidadesDeServico();
    setValue('unidadeServico', servicosTratados);
  };

  return (
    <>
    <View style={{ marginTop: 24 }}>
      <Text style={estilos.tituloDestaque}>Informações profissionais</Text>
      <Controller
        name="categoriaProfissional"
        control={control}
        defaultValue=""
        render={({ onChange }) => (
          <DropDown
            label="Categoria profissional"
            dados={listaDeCategorias}
            definirValor={item => JSON.stringify(item)}
            definirRotulo={item => item.nome}
            aoMudarValor={categoria => onChange(categoria)}
          />
        )}
      />


      <Text style={estilos.tituloDestaque}>Quais serviços em que atua?</Text>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Selecione as opções</Text>}>
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
      onPress={() => {
        registrarValores();
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
