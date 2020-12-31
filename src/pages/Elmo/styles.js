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

const Subtitulo = styled.Text`
  /* styleName: H6; */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  text-align: left;
`;
const Titulo = styled.Text`
  /* styleName: H5; */
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  margin-left: 8px;
  margin-top: 24px;
`;

const Texto = styled.Text`
  color: rgba(0, 0, 0, 0.6);
  /* styleName: Body 2; */
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
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
  Subtitulo,
  Texto,
  Botao
};
