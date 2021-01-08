import styled from 'styled-components/native';
import {
  ImageBackground, TouchableOpacity, Dimensions, Image
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CORES } from '../../constantes/estiloBase';
import ImagemDePostagem from '../Content/ImagemDePostagem';

const Container = styled.View`
  background-color: #fff;
  margin: 0 16px;
  margin-top: 18px;
`;

const ScrollView = styled.ScrollView`
  background-color: #fff;
`;

const LinhaHorizontal = styled.View`
  border-bottom-color: ${CORES.CINZA};
  border-bottom-width: 1px;
  margin-top: 2px;
`;

const CentralizarItensView = styled.View`
  justify-content: center;
  width: 100%;
`;

const SvgView = styled.View`
  margin-top: 80px;
  margin-bottom: 70px;
`;

const Lista = styled.View`
  margin-top: 24px;
`;

const CardSemConteudo = styled(Card)`
  margin: 16px;
  padding: 16px;
`;


const Hyperlink = styled.Text`
   font-weight: bold;
   text-decoration-line: underline;
`;

const TituloH6 = styled.Text`
  /* styleName: H6; */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  text-align: left;
  margin-top: 28px;
  margin-left: 8px;
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

const TextoCentralizado = styled.Text`
  text-align: center;
  align-items: center;
  width: 100%;
  color: ${props => (props.color ? props.color : 'black')};
`;

const Texto = styled.Text`
  /* styleName: Body 2; */
  font-family: Roboto;
  font-size: 14px;
  font-style: ${props => (props.fontStyle ? props.fontStyle : 'normal')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 400)};
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  color: rgba(0, 0, 0, 0.6);
`;

const Imagem = styled(Image)`
  margin-top: 18px;
`;

const ImagemPost = styled(ImagemDePostagem)`
  height: 110px; 
  width: ${Dimensions.get('window').width / 2.2}px;
`;

const Conteudo = styled(TouchableOpacity)`
  height: 200px;
  width: ${Dimensions.get('window').width / 2.2}px;
  align-items: center;
  margin: 5px;
`;

const BackgroundImage = styled(ImageBackground)`
  flex: 1; 
  align-items: center;
`;

const Botao = styled(Button)`
  justify-content: flex-start;
  align-items: ${props => (props ? props.alignItems : CORES.INDIGO_DYE)};
  margin: 0 16px;
  margin-top: 40px;
  background-color: ${props => (props ? props.backgroundColor : CORES.INDIGO_DYE)};
 `;

const BotaoLink = styled(Button)`
  justify-content: flex-start;
  align-items: flex-start;
 `;

export {
  BackgroundImage,
  Container,
  ScrollView,
  LinhaHorizontal,
  CentralizarItensView,
  SvgView,
  Titulo,
  TituloH6,
  TextoCentralizado,
  Texto,
  Botao,
  BotaoLink,
  Lista,
  CardSemConteudo,
  Conteudo,
  Hyperlink,
  ImagemPost,
  Imagem
};
