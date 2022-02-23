import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import jpgEsmaltec from '~/assets/icons/logo/logo-esmaltec.jpg';
import jpgESP from '~/assets/icons/logo/logo-esp.jpg';
import jpgFIEC from '~/assets/icons/logo/logo-fiec.jpg';
import jpgFUNCAP from '~/assets/icons/logo/logo-funcap.jpg';
import jpgGovCe from '~/assets/icons/logo/logo-gov-ce.jpg';
import jpgISGH from '~/assets/icons/logo/logo-isgh.jpg';
import jpgSENAI from '~/assets/icons/logo/logo-senai.jpg';
import jpgUFC from '~/assets/icons/logo/logo-ufc.jpg';
import jpgUNIFOR from '~/assets/icons/logo/logo-unifor.jpg';
import ImageElmo from '~/assets/images/fig-elmo.jpg';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons';
import {
  ConteudoLogo,
  Imagem,
  LinhaHorizontal,
  ScrollView,
  Texto,
  TextoCentralizado,
  Titulo,
  ViewLogo,
} from '../styles';

export default function SobreElmo() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.INDIGO_DYE,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: 'Elmo',
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginHorizontal: 19,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon size={28} color={CORES.BRANCO} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <BarraDeStatus
        backgroundColor={CORES.INDIGO_DYE}
        barStyle="light-content"
      />
      <Titulo color={CORES.PRETO54}> Sobre o Elmo </Titulo>
      <Imagem source={ImageElmo} />

      {/* FIXME: esse código está muito feio. */}
      <View style={{ marginHorizontal: 16, marginTop: 18 }}>
        <Texto>
          {
            'O Elmo é um capacete de respiração assistida genuinamente cearense, não-invasivo e mais seguro para profissionais de saúde e pacientes.'
          }
          {'\n\n'}
          {
            'Criado em abril de 2020 em uma força-tarefa que envolve uma parceria público-privada, o equipamento inovador surgiu como um novo passo para o tratamento de pacientes com insuficiência respiratória aguda hipoxêmica por Covid-19.'
          }
          {'\n\n'}
          <Texto fontWeight="bold">{'Como funciona\n'}</Texto>
          {
            'O Elmo envolve toda a cabeça do paciente. Ele é fixado no pescoço com uma base que veda a passagem do ar.\n'
          }
          {
            'Aplica-se um fluxo de gases medicinais com oxigênio (O2) e ar comprimido capaz de gerar uma pressão positiva (acima da pressão atmosférica). Essa pressão ajuda em situações em que o pulmão está com dificuldade de oxigenação.'
          }
        </Texto>
        <TextoCentralizado color={CORES.PRETO54} marginTop="35px">
          Realização
        </TextoCentralizado>
        <LinhaHorizontal />
        <ViewLogo marginBottom="0" marginTop="10px">
          <ConteudoLogo marginTop="25px">
            <Imagem width="148.3px" source={jpgGovCe} />
            <Imagem width="140.4px" source={jpgESP} />
          </ConteudoLogo>
          <ConteudoLogo marginTop="25px">
            <Imagem width="167.18px" source={jpgUFC} />
            <Imagem width="137.52px" source={jpgUNIFOR} />
          </ConteudoLogo>
          <ConteudoLogo marginTop="25px">
            <Imagem width="135.81px" source={jpgFIEC} />
            <Imagem width="145.95px" source={jpgSENAI} />
          </ConteudoLogo>
          <ConteudoLogo marginTop="25px" centralizado>
            <Imagem width="67.32px" source={jpgFUNCAP} />
          </ConteudoLogo>
        </ViewLogo>
        <TextoCentralizado color={CORES.PRETO54} marginTop="45px">
          Apoio
        </TextoCentralizado>
        <LinhaHorizontal />
        <ViewLogo>
          <ConteudoLogo>
            <Imagem width="111px" source={jpgISGH} />
            <Imagem width="133px" source={jpgEsmaltec} />
          </ConteudoLogo>
        </ViewLogo>
      </View>
    </ScrollView>
  );
}
