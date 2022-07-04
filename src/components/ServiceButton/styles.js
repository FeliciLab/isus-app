import styled from 'styled-components/native';
import { Card, Paragraph } from 'react-native-paper';

export const Container = styled(Card)`
  margin: 10px;
`;

export const CardTitle = styled(Paragraph)`
  font-size: 12px;
  letter-spacing: 0.25px;
  line-height: 16px;
  margin-top: 10px;
  max-width: 112px;
`;

export const IconeWrapper = styled.View`
  overflow: hidden;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
