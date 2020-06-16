import React from 'react';
import {
  Text, View, StyleSheet, Linking
} from 'react-native';
import {
  Paragraph
} from 'react-native-paper';

import orientaçãoInicial from './text-content/orientacoes-iniciais.json';
import ClinicalButton from './ClinicalButton';

const defaultTextColor = 'rgba(0,0,0,0.6)';

const Estágio1 = ({ navigation }) => {
  const {
    hiddenCardTitle, hiddenCardText, containerDoAviso, negrito,
    textColor, containerDeTextoDoAviso, itemDeTopico, tituloDeTopico
  } = styles;

  const mostrarSintomas = sintomas => (
    sintomas.map(sintoma => mostrarTituloEConteudo(sintoma))
  );

  const mostrarTituloEConteudo = topico => (
    <View key={topico.title}>
      <Text style={tituloDeTopico}>
        {topico.title}
      </Text>
      {topico.items.map(item => (
        <Paragraph style={itemDeTopico}>{item}</Paragraph>
      ))}
    </View>
  );

  return (
    <>
  <Text style={hiddenCardTitle}>{orientaçãoInicial.title}</Text>
  <Text style={hiddenCardText}>{orientaçãoInicial.description}</Text>

  { mostrarSintomas(orientaçãoInicial.sections.symptoms) }

  <View style={containerDoAviso}>
    <Text style={containerDeTextoDoAviso}>
      <Text style={negrito}>{`${orientaçãoInicial.sections.warningLabel.title} `}</Text>
      <Text>{orientaçãoInicial.sections.warningLabel.texto1}</Text>
    </Text>
    <Text style={textColor}>{orientaçãoInicial.sections.warningLabel.texto2}</Text>
  </View>

 { mostrarTituloEConteudo(orientaçãoInicial.sections.riskGroup) }

  <View style={{
    flex: 1,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 2
  }}
  >
    <Text style={{ color: textColor }}>
      <Text style={{ fontWeight: 'bold' }}>{`${orientaçãoInicial.sections.observation.title} `}</Text>
      <Text>{orientaçãoInicial.sections.observation.text}</Text>
    </Text>
  </View>

  { mostrarTituloEConteudo(orientaçãoInicial.sections.alerts) }

  { mostrarTituloEConteudo(orientaçãoInicial.sections.sinaisDeGravidade) }

  <View style={{
    marginVertical: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'
  }}
  >
    <View style={{ width: '30%' }}>
      <ClinicalButton onPress={() => Linking.openURL('tel: 08002751475')} label="TELE-UTI" />
    </View>
    <View style={{ width: '60%' }}>
      <ClinicalButton onPress={() => navigation.navigate('webview', { title: 'Plantão Corona Vírus', url: 'https://coronavirus.ceara.gov.br/' })} label="PLANTÃO CORONAVÍRUS" />
    </View>
  </View>
    </>
  );
};

const styles = StyleSheet.create({
  tituloDeTopico: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16
  },
  itemDeTopico: {
    fontSize: 14
  },
  containerDeTextoDoAviso: {
    marginTop: 2,
    marginBottom: 3,
    marginHorizontal: 7,
    color: defaultTextColor
  },
  containerDoAviso: {
    flex: 1,
    marginTop: 16,
    backgroundColor: 'rgba(242, 69, 61, 0.12)',
    alignItems: 'center',
    borderRadius: 2
  },
  Link: {
    color: '#87BA25'
  },
  textColor: {
    color: 'rgba(0, 0, 0, 0.6)'
  },
  negrito: {
    fontWeight: 'bold'
  },
  TítuloDoCard: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.6)'
  },
});

export default Estágio1;
