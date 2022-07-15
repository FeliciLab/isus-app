import { Paragraph } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-radius: 8px;
  margin: 10px;
  overflow: hidden;
`;

export const CardTitle = styled(Paragraph)`
  font-size: 12px;
  letter-spacing: 0.25px;
  line-height: 16px;
  max-width: 112px;
`;

export const IconeWrapper = styled.View`
  display: flex;
  background-color: ${props => props.iconBackgroundColor};
  align-items: center;
  justify-content: center;
  width: 136px;
  height: 136px;
`;

export const Content = styled.View`
  display: flex;
  padding: 8px;
  background-color: #fff;
  width: 136px;
  height: 52px;
`;
