import { Paragraph } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.View`
  height: 100%;
  background-color: #ffffff;
`;

export const Scroll = styled.ScrollView`
  padding: 0 16px 0 16px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
  margin: 18px 0;
  max-width: 359px;
`;

export const SubTitle = styled(Paragraph)`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
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
  margin: 8px 0;
`;

export const RowButton = styled.View`
  align-self: flex-end;
  margin-bottom: 20px;
`;
