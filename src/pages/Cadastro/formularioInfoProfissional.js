import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import { List } from 'react-native-paper';

const categoriaProfissional = [
  { value: 'Medicina' },
  { value: 'Fisioterapia' },
  { value: 'Enfermagem' },
  { value: 'Terapia Ocupacional' },
  { value: 'Farmácia' },
  { value: 'Coordenação Clínica' }
];

function FormularioInfoProfissional() {
  return (
    <>
    <View>
      <Dropdown
        label="Categoria profissional"
        data={categoriaProfissional}
        dropdownPosition={0}
        itemCount="6"
        dropdownOffset={{ top: 80, left: 0 }}
        containerStyle={{ marginBottom: 2 }}
      />
      <List.Accordion titleStyle={{ color: 'black' }} title={<Text style={estilos.titulo}>Quais serviços em que atua?</Text>}>
      </List.Accordion>
    </View>
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 18
  }
});

export default FormularioInfoProfissional;
