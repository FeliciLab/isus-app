/* eslint-disable react/jsx-pascal-case */
import React, { useState, useLayoutEffect } from 'react';
import {
  Text, ScrollView, View, StyleSheet
} from 'react-native';
import CartaoDeEstagio from './cartaodeEstagio';
import ExamesLaboratoriais from './examesLaboratoriais';
import BotaoBaixarPDF from './botaoBaixarPDF';
import CasosSuspeitos from './casosSuspeitos';
import ParamentacaoEPI from './paramentacaoEPI';
import pegarItensDoCartao from './itensDoCartao';
import header from './header';

export default function ClinicalManagement({ navigation }) {
  const [cartaoEstagio1Aberto, alternarAberturaCartaoEstagio1] = useState(false);
  const [cartaoEstagio2Aberto, alternarAberturaCartaoEstagio2] = useState(false);
  const [cartaoEstagio3Aberto, alternarAberturaCartaoEstagio3] = useState(false);
  const [cartaoEstagio4Aberto, alternarAberturaCartaoEstagio4] = useState(false);
  // const navigator = useNavigation();

  const itensDoCartao = pegarItensDoCartao({
    cartaoEstagio1Aberto,
    alternarAberturaCartaoEstagio1,
    cartaoEstagio2Aberto,
    alternarAberturaCartaoEstagio2,
    cartaoEstagio3Aberto,
    alternarAberturaCartaoEstagio3,
    cartaoEstagio4Aberto,
    alternarAberturaCartaoEstagio4,
  });

  useLayoutEffect(() => header(navigation));

  return (
    <ScrollView style={estilos.background}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Manejo clínico dos pacientes com Covid-19</Text>
        { BotaoBaixarPDF() }
        <ParamentacaoEPI />
        <View style={estilos.margemVertical}>
          {
            itensDoCartao.map(item => CartaoDeEstagio(item, navigation))
          }
        </View>
        <ExamesLaboratoriais />
        { CasosSuspeitos(navigation) }
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  background: { paddingHorizontal: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 26, color: '#4054B2' },
  margemVertical: { marginVertical: 16 },
  conteudo: { marginTop: 26, flex: 1 }
});
