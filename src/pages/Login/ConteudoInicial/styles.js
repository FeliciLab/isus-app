import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const ConteudoDoTexto = styled.View`
  margin: 0 16px;
  margin-bottom: 50px;
`;

export const Texto = styled.Text`
  color: ${CORES.BRANCO};
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  line-height: 23.44px;
`;

export const Botao = styled(Button)`
  border-radius: 200px;
  margin: 10px 16px;
  background-color: ${props =>
    props.mode === 'text' ? CORES.AZUL : CORES.BRANCO};
`;
