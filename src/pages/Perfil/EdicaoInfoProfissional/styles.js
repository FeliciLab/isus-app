import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  height: 100%;
  background-color: #ffffff;
  padding-left: 16px;
  padding-right: 16px;
`;

export const TituloPrincipal = styled.Text`
  font-size: 20px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.87);
  max-width: 359px;
`;

export const BotaoSalvar = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  align-self: flex-end;
  justify-content: center;
  background-color: #ff9800;
`;
