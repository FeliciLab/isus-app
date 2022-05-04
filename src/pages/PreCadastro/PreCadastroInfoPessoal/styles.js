import { Paragraph } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.View`
  flex: 1;
  background-color: ${CORES.BRANCO};
  padding: 0 16px 16px;
`;

export const Title = styled(Paragraph)`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
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
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default Title;
