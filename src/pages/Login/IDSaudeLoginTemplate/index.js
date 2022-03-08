import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import IDSaudeBranco from '~/assets/icons/idsaude-branco.svg';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';
import Termos from '../Termos';
import { ChildrenView, Container, ConteudoImagem } from './styles';

function IDSaudeLoginTemplate({ children }) {
  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: CORES.AZUL,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: CORES.BRANCO,
      headerTitleAlign: 'center',
      headerTitle: '',
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
  });

  return (
    <TouchableWithoutFeedback touchSoundDisabled onPress={Keyboard.dismiss}>
      <Container>
        <BarraDeStatus barStyle="light-content" backgroundColor={CORES.AZUL} />
        <ConteudoImagem>
          <IDSaudeBranco height={windowWidth * 0.4} width={windowWidth * 0.4} />
        </ConteudoImagem>
        <ChildrenView>
          {children}
          <Termos />
        </ChildrenView>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default IDSaudeLoginTemplate;
