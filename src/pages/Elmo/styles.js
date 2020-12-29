import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';

const Container = styled.View`
  background-color: #fff;
`;

const ScrollView = styled.ScrollView`
  background-color: #fff;
`;

const SvgView = styled.View`
  margin-top: 24px;
  margin-bottom: 70px;
`;

const Titulo = styled.Text`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);  
`;

const Texto = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1; 
  align-items: center;
`;

const Botao = styled(Button)`
  color: #FF9800;
`;

export {
  BackgroundImage,
  Container,
  ScrollView,
  SvgView,
  Titulo,
  Texto,
  Botao
};
