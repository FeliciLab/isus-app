import { FAB } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  text-align: center;
  max-width: 190px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
  margin: 8px 0;
`;

export const FABButton = styled(FAB)`
  margin-top: 20px;
  background: #ff9800;
`;