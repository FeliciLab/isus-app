import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import IDSaudeBranco from '~/assets/icons/idsaude-branco.svg';
import BarraDeStatus from '~/components/barraDeStatus';
import { CORES } from '~/constantes/estiloBase';
import { ArrowLeftIcon } from '~/icons/index';
import Termos from '../Termos';
import { ChildrenView, Container, ConteudoImagem } from './styles';

function IDSaudeLoginTemplate({ children }) {
  const navigation = useNavigation();

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
          <IDSaudeBranco />
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
