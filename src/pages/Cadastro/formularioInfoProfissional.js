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
import { salvarDadosDeCadastro, pegarListaDeServicos } from '../../services/autenticacao';
// eslint-disable-next-line import/no-cycle
import WizardContext from '../../context/WizardContext';
import FormularioSenha from './formularioSenha';

const categoriaProfissional = [
  { value: 'Medicina' },
  { value: 'Fisioterapia' },
  { value: 'Enfermagem' },
  { value: 'Terapia Ocupacional' },
  { value: 'Farmácia' },
  { value: 'Coordenação Clínica' },
  { value: 'Coordenação de Enfermagem' },
  { value: 'Outra' }
];

function FormularioInfoProfissional() {
  const { getValues, control } = useContext(FormContext);
  const [listaDeServicos, alterarListaDeServicos] = useState([]);
  const [valoresDosCheckBoxes, alterarValoresDosCheckBoxes] = useState({});
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
    const lista = await pegarListaDeServicos();
    console.log('list', lista);
    alterarListaDeServicos(lista);
  };

  useEffect(aoIniciar, []);

  const pegarValorPadrãoDoCheckbox = (setor) => {
    if (valoresDosCheckBoxes[`checkbox-${setor.nome}`]) {
      return valoresDosCheckBoxes[`checkbox-${setor.nome}`];
    }
    return false;
  };

  const mudarValor = (onChange, value, setor) => {
    onChange(!value);
    const check = { ...valoresDosCheckBoxes };
    check[`checkbox-${setor.nome}`] = !value;
    alterarValoresDosCheckBoxes(check);
  };

  return (
    <>
    <View style={{ marginTop: 24 }}>
      <Text style={estilos.tituloDestaque}>Informações profissionais</Text>
      <Controller
        name="categoria"
        control={control}
        defaultValue=""
        render={({ onChange }) => (
          <DropDown
            label="Categoria profissional"
            dados={categoriaProfissional}
            aoMudarValor={categoria => onChange(categoria)}
          />
        )}
      />


      <Text style={estilos.tituloDestaque}>Quais serviços em que atua?</Text>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Selecione as opções</Text>}>
      <View>
        {listaDeServicos.length !== 0 && listaDeServicos.map(servico => (
          <Controller
            name={`checkbox-${servico.id}`}
            control={control}
            defaultValue={() => pegarValorPadrãoDoCheckbox(servico)}
            render={({ onChange, value }) => (
              <Checkbox.Item
                status={value ? 'checked' : 'unchecked'}
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
      onPress={async () => {
        const values = getValues();
        console.log('values', values);
        salvarDadosDeCadastro(values);
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
