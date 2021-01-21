import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
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

const Botao = styled(Button)`
  border-radius: 200;
  margin: 10px 16px;
  background-color: ${props => (props.mode === 'text' ? CORES.AZUL : CORES.BRANCO)};
`;

export {
  SafeArea,
  Scroll,
  ConteudoImagem,
  Botao
};
