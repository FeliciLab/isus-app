import { styled } from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import { CORES } from '../../constantes/estiloBase';


const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${CORES.AZUL};
`;

const Scroll = styled(ScrollView)`
  flex: 1;
`;

const ConteudoImagem = styled.View`
  margin: 50px 0;
  flex-direction: row;
  justify-content: center;
`;

export {
  SafeArea,
  Scroll,
  ConteudoImagem
};
