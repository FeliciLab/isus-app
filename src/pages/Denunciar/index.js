import React, { useState } from 'react';
import {
  TouchableOpacity, Text, Linking
} from 'react-native';
import { DefaultTheme } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import BarraDeStatus from '../../components/barraDeStatus';
import {
  ScrollView, Titulo, Container,
  TextoEmailLigacao, ImagemFarol, TextoEmail,
  MandeEmail, RecipienteBotaoEmail, BotaoEmail,
  BotaoLigarSus, Termos, TermosLink
} from './styles';
import rotas from '../../constantes/rotas';

import SetaEsquerda from '../../assets/icons/seta_esquerda.svg';

export default function Denunciar() {
  const navigation = useNavigation();
  const mandeEmail = useState('Mande um e-mail:');
  const faleLigacao = useState('Fale por ligação: ');

  function emailLigacao(text, linkTo) {
    return (
      <TextoEmailLigacao onPress={() => Linking.openURL(linkTo)}>
        {text}
      </TextoEmailLigacao>
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
          <SetaEsquerda />
          {/* <Icon name="arrow-left" size={28} color="#4CAF50" /> */}
        </TouchableOpacity>
      )
    });
  });
  return (
    <>
      <BarraDeStatus backgroundColor="#ffffff" barStyle="dark-content" />
      <ScrollView>
        <Container>
          <ImagemFarol />
          <Titulo testID="texto1">
            O coronavírus continua circulando em nosso estado.
            Você pode ajudar a combater denunciando aglomerações e/ou não uso de máscaras.
          </Titulo>
          <TextoEmail>
            <MandeEmail>{mandeEmail}</MandeEmail>
            {' '}
              Você irá enviar um e-mail para a Ouvidoria do SUS:
            {' '}
            {emailLigacao('ouvidoriasesa@saude.ce.gov.br', 'mailto:ouvidoriasesa@saude.ce.gov.br?subject=Quero fazer uma denúncia')}
            . É uma forma silenciosa e segura de denunciar.
          </TextoEmail>
          <TextoEmail>
            <MandeEmail>{faleLigacao}</MandeEmail>
              Diante da necessidade de conter eventos, ligue para
              a Polícia, pelo
            {' '}
            {emailLigacao('190', 'tel:190')}
              .
            {' '}
              Nos demais casos, ligue para a Ouvidoria do SUS,
              pelo
            {' '}
            {emailLigacao('136', 'tel:136')}
            {' '}
              ou
            {' '}
            {emailLigacao('08002751520', 'tel:08002751520')}
              .
          </TextoEmail>
          <RecipienteBotaoEmail>
            <BotaoEmail
              testID="botao-mandar-email"
              mode="contained"
              theme={theme}
              dark={false}
              onPress={() => {
                Linking.openURL('mailto:ouvidoriasesa@saude.ce.gov.br?subject=Quero fazer uma denúncia');
              }}
            >
              <Text style={{ color: '#fff' }}>Mandar e-mail</Text>
            </BotaoEmail>
            <BotaoLigarSus
              testID="botao-ligar-sus"
              mode="text"
              onPress={() => {
                Linking.openURL('tel:136');
              }}
            >
              <Text style={{ color: '#4CAF50' }}>lIGAR PARA OUVIDORIA DO SUS</Text>
            </BotaoLigarSus>
            <Termos>
              Ao continuar, você concorda com nossos
              {' '}
              <TermosLink
                testID="termo-de-uso"
                onPress={() => {
                  navigation.navigate(rotas.TERMOS_DE_USO);
                }}
              >
                Termos e Uso
              </TermosLink>
            </Termos>
          </RecipienteBotaoEmail>
        </Container>
      </ScrollView>
    </>
  );
}
