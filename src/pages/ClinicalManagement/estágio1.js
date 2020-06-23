import React from 'react';
import {
  Text, View, StyleSheet, Linking
} from 'react-native';
import {
  Paragraph
} from 'react-native-paper';

import orientaçãoInicial from './json/estágio1.json';
import ClinicalButton from './ClinicalButton';

const corDoTextoPadrão = 'rgba(0,0,0,0.6)';

const Estágio1 = ({ navigation }) => {
  const {
    containerDoAviso, negrito, containerDeTextoDoAviso,
    itemDeTopico, tituloDeTopico,
    containerDaObservação, containerDoBotão,
    largura30, largura60, CorDoTexto
  } = styles;

  const {
    título, descrição, seções, botãoTeleUTI, botãoPlantãoCoronavirus
  } = orientaçãoInicial;

  const mostrarSintomas = sintomas => (
    sintomas.map(sintoma => mostrarTituloEConteudo(sintoma))
  );

  const mostrarTituloEConteudo = topico => (
    <View key={topico.título}>
      <Text style={tituloDeTopico}>
        {topico.título}
      </Text>
      <View style={styles.margin8}>
        {topico.itens.map(item => (
          <Paragraph key={item} style={itemDeTopico}>{item}</Paragraph>
        ))}
      </View>
    </View>
  );

  return (
    <>
  <Text style={tituloDeTopico}>{título}</Text>
  <Text style={itemDeTopico}>{descrição}</Text>

  { mostrarSintomas(seções.sintomas) }

  <View style={containerDoAviso}>
    <Text style={containerDeTextoDoAviso}>
      <Text style={negrito}>{`${seções.atenção.título} `}</Text>
      <Text style={CorDoTexto}>{seções.atenção.texto1}</Text>
    </Text>
    <Text style={CorDoTexto}>{seções.atenção.texto2}</Text>
  </View>

 { mostrarTituloEConteudo(seções.grupoDeRisco) }

  <View style={containerDaObservação}>
    <Text style={CorDoTexto}>
      <Text style={negrito}>{`${seções.observação.título}`}</Text>
      <Text style={CorDoTexto}>{seções.observação.texto}</Text>
    </Text>
  </View>

  { mostrarTituloEConteudo(seções.alertas) }

  { mostrarTituloEConteudo(seções.sinaisDeGravidade) }

  <View style={containerDoBotão}>
    <View style={largura30}>
     <ClinicalButton
       onPress={() => Linking.openURL(botãoTeleUTI.telefone)}
       label={botãoTeleUTI.título}
     />
    </View>
    <View style={largura60}>
      <ClinicalButton onPress={() => navigation.navigate('webview', { título: botãoPlantãoCoronavirus.títuloWebview, url: botãoPlantãoCoronavirus.url })} label={botãoPlantãoCoronavirus.título} />
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
  margin8: {
    marginTop: 8
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
