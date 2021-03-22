import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { CORES } from '../../constantes/estiloBase';


export const Title = styled(Paragraph)`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ContainerBody = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${CORES.BRANCO};
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 10px;
  min-height: ${Dimensions.get('window').height * 0.80}px;
`;

export const ContainerForm = styled.View`
  margin-top: 15px;
`;

export const RowInput = styled.View`
  margin-top: 14px;
  margin-bottom: 14px;
`;

export const RowButton = styled.View`
  align-items: flex-end;
  padding-right: 12px;
`;

export default Title;
