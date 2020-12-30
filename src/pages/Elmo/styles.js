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
  margin-top: 80px;
  margin-bottom: 70px;
`;

const Titulo = styled.Text`
  /* styleName: H6; */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  text-align: left;

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
  justify-content: flex-start;
  align-items: flex-start;
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
