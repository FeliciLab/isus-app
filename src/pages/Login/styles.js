import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { CORES } from '../../constantes/estiloBase';

export const Container = styled.View`
  flex: 1;
  background-color: ${CORES.AZUL};
`;

export const ChildrenView = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ConteudoImagem = styled.View`
  margin: 50px 0;
  flex-direction: row;
  justify-content: center;
`;

export const Botao = styled(Button)`
  border-radius: 200px;
  margin: 10px 16px;
  background-color: ${props =>
    props.mode === 'text' ? CORES.AZUL : CORES.BRANCO};
`;
