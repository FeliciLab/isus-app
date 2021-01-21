import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { CORES } from '../../../constantes/estiloBase';

const ConteudoDoTexto = styled.View`
  margin: 0 16px;
  margin-bottom: 50px;
`;

const Texto = styled.Text`
  color: ${CORES.BRANCO};
  font-size: 20px;
`;

const Botao = styled(Button)`
  border-radius: 200;
  margin: 10px 16px;
  background-color: ${props => (props.mode === 'text' ? CORES.AZUL : CORES.BRANCO)}`;

export {
  ConteudoDoTexto,
  Texto,
  Botao
};
