import React, { useState } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, Linking
} from 'react-native';
import { Button, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
// import BarraDeStatus from '../../components/barraDeStatus';
import iconFarolDenunciar from '../../assets/icons/forcaTarefa/farolDenuncia.png';

export default function Denunciar() {
  const navigation = useNavigation();
  const mandeEmail = useState('Mande um e-mail:');
  const faleLigacao = useState('Fale por ligação: ');

  function emailLigacao(text, linkTo) {
    return (
      <Text style={{ marginHorizontal: 20, textDecorationLine: 'underline' }} onPress={() => Linking.openURL(linkTo)}>
      {text}
      </Text>
    );
  }
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: '#4CAF50',
      accent: '#f1c40f',
      text: '#FFF',
      background: '#fff',
      placeholder: '#000000'
    },
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#000000',
      headerTitleAlign: 'center',
      headerTitle: 'Denunciar',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )
    });
  });
  return (
    <>
    {/** <BarraDeStatus barStyle="dark" backgroundColor="#c3c3c3" /> */}
    <ScrollView>
    <View style={estilos.container}>
      <Image
        style={estilos.farol}
        source={iconFarolDenunciar}
      />
      <Text style={estilos.titulo} testID="texto1">
      O coronavírus continua circulando em nosso estado.
      Você pode ajudar a combater denunciando aglomerações e/ou não uso de máscaras.
      </Text>
      <Text style={estilos.textoEmail}>
      <Text style={estilos.mandeEmail}>{ mandeEmail }</Text>
      {' '}
      Você irá enviar um e-mail para a Ouvidoria do SUS:
      {' '}
      { emailLigacao('ouvidoriasesa@saude.ce.gov.br', 'mailto:ouvidoriasesa@saude.ce.gov.br?subject=Quero fazer uma denúncia') }
      . É uma forma silenciosa e segura de denunciar.
      </Text>
      <Text style={estilos.textoEmail}>
      <Text style={estilos.mandeEmail}>{ faleLigacao }</Text>
      Diante da necessidade de conter eventos, ligue para
      a Polícia, pelo
      {' '}
      { emailLigacao('190', 'tel:190') }
      .
      {' '}
      Nos demais casos, ligue para a Ouvidoria do SUS,
      pelo
      {' '}
      { emailLigacao('136', 'tel:136') }
      {' '}
      ou
      {' '}
      { emailLigacao('08002751520', 'tel:08002751520') }
      .
      </Text>
      <View style={estilos.recipienteBotaoEmail}>
        <Button
          testID="botao-mandar-email"
          mode="contained"
          theme={theme}
          dark={false}
          style={estilos.botaoEmail}
          onPress={() => {
            Linking.openURL('mailto:ouvidoriasesa@saude.ce.gov.br?subject=Quero fazer uma denúncia');
          }}
        >
          <Text style={{ color: '#fff' }}>Mandar e-mail</Text>
        </Button>
        <Button
          testID="botao-ligar-sus"
          mode="text"
          style={estilos.botaoLigarSus}
          onPress={() => {
            Linking.openURL('mailto:ouvidoriasesa@saude.ce.gov.br?subject=Quero fazer uma denúncia');
          }}
        >
          <Text style={{ color: '#4CAF50' }}>lIGAR PARA OUVIDORIA DO SUS</Text>
        </Button>
        <Text style={estilos.termos}>
          Ao continuar, você concorda com nossos
          <Text
            testID="termo-de-uso"
            onPress={() => {
              navigation.navigate('TERMOS_DE_USO');
            }}
            style={estilos.termosLink}
          >
          {' '}
          Termos e Uso
          {''}
          .
          </Text>
        </Text>
      </View>
    </View>
    </ScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  farol: {
    height: 191,
    marginTop: 32
  },
  titulo: {
    marginTop: 28,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.15,
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center'
  },
  textoEmail: {
    marginTop: 32,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginLeft: 16,
    marginRight: 16,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  mandeEmail: {
    fontWeight: 'bold'
  },
  faleLigacao: {
    fontWeight: 'bold'
  },
  recipienteBotaoEmail: {
    width: '100%',
    justifyContent: 'center',
  },
  botaoEmail: {
    borderRadius: 50,
    marginLeft: 16,
    marginRight: 17,
    height: 44,
    justifyContent: 'center',
    marginTop: 32,
    borderColor: '#fff'
  },
  botaoLigarSus: {
    marginLeft: 16,
    marginRight: 17,
    height: 44,
    justifyContent: 'center',
    marginTop: 16
  },
  termos: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
    height: 32,
    marginTop: 16,
    marginBottom: 16
  },
  termosLink: {
    textDecorationLine: 'underline'
  }
});
