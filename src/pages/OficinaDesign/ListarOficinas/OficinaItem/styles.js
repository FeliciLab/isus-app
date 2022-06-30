import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';

export const Container = styled.View``;

export const OfertaItemRow = styled.TouchableOpacity`
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${props => (props.disabled ? CORES.CINZA : CORES.PRETO)};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: ${props => (props.disabled ? CORES.CINZA : CORES.PRETO87)};
`;

export const Dates = styled.Text`
  color: ${props => (props.disabled ? CORES.CINZA : CORES.PRETO)};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.15px;
`;
