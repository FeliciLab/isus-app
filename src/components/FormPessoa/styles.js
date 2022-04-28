import styled from 'styled-components/native';
import { Paragraph } from 'react-native-paper';
import { CORES } from '../../constantes/estiloBase';

// TODO: possivel remoção
export const Title = styled(Paragraph)`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ContainerBody = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${CORES.BRANCO};
`;

export const ContainerForm = styled.View`
  margin-top: 15px;
`;

export const RowInput = styled.View`
  margin-top: 14px;
  margin-bottom: 14px;
`;

export const RowButton = styled.View`
  align-self: flex-end;
  margin-bottom: 20px;
`;
