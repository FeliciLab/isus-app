import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${CORES.AZUL};
`;

export const ChildrenView = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ConteudoImagem = styled.View`
  margin: 40px 0;
  flex-direction: row;
  justify-content: center;
`;
