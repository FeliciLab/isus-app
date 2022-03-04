import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Botao = styled(Button)`
  border-radius: 200px;
  margin: 10px 16px;
  background-color: ${props =>
    props.mode === 'text' ? CORES.AZUL : CORES.BRANCO};
`;
