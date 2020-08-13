import React, { useContext } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  DefaultTheme, List, Checkbox, Button
} from 'react-native-paper';
import { Controller } from 'react-hook-form';
import DropDown from '../../components/dropdown';
import setores from './json/setores.json';
import FormContext from '../../context/FormContext';
import { salvarDados, pegarDados } from '../../services/armazenamento';

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
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgba(0, 0, 0, 0.6);',
      accent: '#f1c40f',
    },
  };

  return (
    <>
    <View style={{ marginTop: 24 }}>
      <Text style={estilos.tituloDestaque}>Informações profissionais</Text>
      <Controller
        name="categoria"
        control={control}
        defaultValue={categoriaProfissional[0].value}
        render={({ onChange, value }) => (
        <DropDown
          label="Categoria profissional"
          dados={categoriaProfissional}
          valorInicial={value}
          aoMudarValor={categoria => onChange(categoria)}
        />
        )}
      />

      <Text style={estilos.tituloDestaque}>Quais serviços em que atua?</Text>
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Selecione as opções</Text>}>
      <View>
        {setores.map(setor => (
          <Controller
            name={`checkbox-${setor.nome}`}
            control={control}
            defaultValue={false}
            render={({ onChange, value }) => (
              <Checkbox.Item
                status={value ? 'checked' : 'unchecked'}
                labelStyle={{ maxWidth: '70%' }}
                theme={theme}
                color="#304FFE"
                label={setor.valor}
                onPress={() => onChange(!value)}
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
        await salvarDados('@cadastro-profissional', values);
        const response = await pegarDados('@cadastro-profissional');
        console.log('dados do storage', response);
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
