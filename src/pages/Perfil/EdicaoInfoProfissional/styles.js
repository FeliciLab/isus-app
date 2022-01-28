import { Button, List } from 'react-native-paper';
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  height: 100%;
  background-color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Scroll = styled.ScrollView`
  padding: 0 16px 0 16px;
`;

export const ConteudoFormulario = styled.View`
  margin-top: 24px;
`;

export const TituloPrincipal = styled.Text`
  font-size: 24px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 24px;
  max-width: 359px;
`;

export const Acordeon = styled(List.Accordion)`
  border-color: 'rgba(25, 25, 25, 0.32)';
  border-width: 2px;
  margin-top: 16px;
`;

export const Titulo = styled.Text`
  font-size: 18px;
  color: rgba(25, 25, 25, 0.32);
`;

export const Destaque = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const BotaoSalvar = styled(Button)`
  border-radius: 50px;
  width: 150px;
  height: 45px;
  margin: 30px;
  align-self: flex-end;
  justify-content: center;
  background-color: #ff9800;
`;
