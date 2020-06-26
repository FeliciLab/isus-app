import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

import Fisiopatologia from '../../assets/icons/estagiosManejo/fisiopatologia.svg';
import ColetarExames from '../../assets/icons/estagiosManejo/coletarexames.svg';

function ExamesLaboratoriais() {
  return (
    <View style={estilos.centralizar}>
        <Divider style={estilos.divisoria} />
            <Fisiopatologia />
            <ColetarExames style={estilos.margem15} />
            <Text style={estilos.corDoTexto}>
            Hemograma, PCR, TAP, TPTA, D-dímero,
            Desidrogenase lática (LDH), Enzimas hepáticas (AST/TGO e ALT/TGP),
            Creatinina e Ureia, CPK e troponina,
            pro-calcitonina, ferritina, conforme
            julgamento clínico e disponibilidade.
            </Text>
        <Divider style={estilos.divisoria} />
    </View>
  );
}

const estilos = StyleSheet.create({
  divisoria: {
    marginVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.32)'
  },
  corDoTexto: {
    color: '#4054B2'
  },
  centralizar: {
    justifyContent: 'center'
  },
  margem15: {
    marginVertical: 15
  }
});
export default ExamesLaboratoriais;
