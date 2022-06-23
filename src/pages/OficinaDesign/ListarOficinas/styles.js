import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.View`
  flex: 1;
  padding: 24px 20px;
  background-color: ${CORES.BRANCO};
`;

export const Title = styled.Text`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.15px;
`;

export const SubTitle = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: ${CORES.PRETO87};
  margin-top: 24px;
`;

export const ActivityIndicatorWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
