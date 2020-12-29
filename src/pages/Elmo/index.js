import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import elmoPatternBG from '../../assets/backgrounds/elmo-pattern.png';
import SvgElmoLogo from '../../assets/images/logo/logo-elmo-h1.svg';
import BarraDeStatus from '../../components/barraDeStatus';
import {
  ScrollView, Texto, SvgView, BackgroundImage, Botao
} from './styles';
import { CORES } from '../../constantes/estiloBase';

export default function Elmo() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.INDIGO_DYE,
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: '#FFF',
      headerTitleAlign: 'center',
      headerTitle: '',
      headerLeft: () => (
            <TouchableOpacity
              style={{
                marginHorizontal: 19
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={28} color={CORES.BRANCO} />
            </TouchableOpacity>
      )
    });
  });

  return (
    <>
      <BarraDeStatus backgroundColor={CORES.INDIGO_DYE} barStyle="white-content" />
      <ScrollView style={{ flex: 1 }}>
        <BackgroundImage source={elmoPatternBG}>
          <SvgView>
            <SvgElmoLogo />
          </SvgView>
        </BackgroundImage>
        <View style={{ marginHorizontal: 16, marginTop: 18 }}>
          <Texto>
          {'O Elmo é um capacete de respiração assistida genuinamente cearense, não-invasivo e mais seguro para profissionais de saúde e pacientes. Criado em abril de 2020, o equipamento surgiu como um novo passo para o tratamento de pacientes com insuficiência respiratória aguda hipoxêmica, um dos efeitos da Covid-19.'}
          </Texto>
        </View>
        <Botao>
          Saiba Mais
        </Botao>
      </ScrollView>
    </>
  );
}
