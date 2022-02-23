import styled from 'styled-components/native';
import { FAB } from 'react-native-paper';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 24px 20px;
`;

export const Title = styled.Text`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.6);
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;

export const AlunoInfo = styled.Text`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;

export const MarcarPresencaButton = styled(FAB)`
  align-self: center;
  background: #ff9800;
  margin: 16px 0;
`;

export const Warning = styled.Text`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.87);
`;

export const WrapperSelect = styled.View`
  margin: 4px 0;
`;
