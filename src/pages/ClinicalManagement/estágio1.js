import React from 'react';
import {
  Text, View, StyleSheet, Linking
} from 'react-native';
import {
  Paragraph
} from 'react-native-paper';

import orientaçãoInicial from './text-content/orientacoes-iniciais.json';
import ClinicalButton from './ClinicalButton';

const corDoTextoPadrão = 'rgba(0,0,0,0.6)';

const Estágio1 = ({ navigation }) => {
  const {
    hiddenCardTitle, hiddenCardText, containerDoAviso, negrito, containerDeTextoDoAviso,
    itemDeTopico, tituloDeTopico,
    containerDaObservação, containerDoBotão,
    largura30, largura60, CorDoTexto
  } = styles;

  const mostrarSintomas = sintomas => (
    sintomas.map(sintoma => mostrarTituloEConteudo(sintoma))
  );

  const mostrarTituloEConteudo = topico => (
    <View key={topico.título}>
      <Text style={tituloDeTopico}>
        {topico.título}
      </Text>
      <View style={{ marginTop: 8 }}>
        {topico.itens.map(item => (
          <Paragraph style={itemDeTopico}>{item}</Paragraph>
        ))}
      </View>
    </View>
  );

  return (
    <>
  <Text style={hiddenCardTitle}>{orientaçãoInicial.título}</Text>
  <Text style={hiddenCardText}>{orientaçãoInicial.descrição}</Text>

  { mostrarSintomas(orientaçãoInicial.seções.sintomas) }

  <View style={containerDoAviso}>
    <Text style={containerDeTextoDoAviso}>
      <Text style={negrito}>{`${orientaçãoInicial.seções.atenção.título} `}</Text>
      <Text style={CorDoTexto}>{orientaçãoInicial.seções.atenção.texto1}</Text>
    </Text>
    <Text style={CorDoTexto}>{orientaçãoInicial.seções.atenção.texto2}</Text>
  </View>

 { mostrarTituloEConteudo(orientaçãoInicial.seções.grupoDeRisco) }

  <View style={containerDaObservação}>
    <Text style={CorDoTexto}>
      <Text style={negrito}>{`${orientaçãoInicial.seções.observação.título}`}</Text>
      <Text style={CorDoTexto}>{orientaçãoInicial.seções.observação.texto}</Text>
    </Text>
  </View>

  { mostrarTituloEConteudo(orientaçãoInicial.seções.alertas) }

  { mostrarTituloEConteudo(orientaçãoInicial.seções.sinaisDeGravidade) }

  <View style={containerDoBotão}>
    <View style={largura30}>
      <ClinicalButton onPress={() => Linking.openURL('tel: 08002751475')} label="TELE-UTI" />
    </View>
    <View style={largura60}>
      <ClinicalButton onPress={() => navigation.navigate('webview', { título: 'Plantão Corona Vírus', url: 'https://coronavirus.ceara.gov.br/' })} label="PLANTÃO CORONAVÍRUS" />
    </View>
  </View>
    </>
  );
};

const styles = StyleSheet.create({
  tituloDeTopico: {
    fontSize: 18,
    marginTop: 16,
    color: corDoTextoPadrão
  },
  containerDoItem: {
    marginTop: 8
  },
  itemDeTopico: {
    color: corDoTextoPadrão,
    fontSize: 14
  },
  containerDeTextoDoAviso: {
    marginTop: 2,
    marginBottom: 3,
    marginHorizontal: 7,
    color: corDoTextoPadrão
  },
  containerDoAviso: {
    flex: 1,
    marginTop: 16,
    backgroundColor: 'rgba(242, 69, 61, 0.12)',
    alignItems: 'center',
    borderRadius: 2
  },
  containerDaObservação: {
    flex: 1,
    marginVertical: 8,
    alignItems: 'center',
    borderRadius: 2
  },
  containerDoBotão: {
    marginVertical: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  Link: {
    color: '#87BA25'
  },
  CorDoTexto: {
    color: corDoTextoPadrão
  },
  negrito: {
    fontWeight: 'bold'
  },
  TítuloDoCard: {
    marginVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: corDoTextoPadrão
  },
  largura30: { width: '30%' },
  largura60: { width: '60%' }
});

export default Estágio1;
