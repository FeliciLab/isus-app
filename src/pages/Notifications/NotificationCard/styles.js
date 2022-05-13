import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled(Card)`
  // height: 100px;
  margin: 4px 16px;
  overflow: hidden;
`;

export const Content = styled.View`
  width: 70%;
  justify-content: space-between;
`;

export const Cover = styled.Image`
  width: 30%;
  height: 100px;
`;
