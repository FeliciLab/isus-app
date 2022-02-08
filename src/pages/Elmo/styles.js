import {
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { CORES } from '~/constantes/estiloBase';
import ImagemDePostagem from '../Content/ImagemDePostagem';

export const Container = styled.View`
  background-color: #fff;
  margin: 0 16px;
  margin-top: 18px;
`;

export const ScrollView = styled.ScrollView`
  background-color: #fff;
`;

export const ViewLogo = styled.View`
  flex-direction: column;
  margin-bottom: ${props => (props.maginBottom ? props.marginBottom : '10px')};
  margin-top: ${props => (props.maginTop ? props.marginTop : '0px')};
`;

export const ConteudoLogo = styled.View`
  flex-direction: row;
  margin-top: ${props => (props.marginTop ? props.marginTop : '0px')};
  justify-content: ${props => (props.centralizado ? 'center' : 'space-around')};
`;

export const LinhaHorizontal = styled.View`
  border-bottom-color: ${CORES.CINZA};
  border-bottom-width: 1px;
  margin-top: 2px;
`;

export const CentralizarItensView = styled.View`
  justify-content: center;
  width: 100%;
`;

export const SvgView = styled.View`
  margin-top: 80px;
  margin-bottom: 70px;
`;

export const Lista = styled.View`
  margin-top: 24px;
`;

export const CardSemConteudo = styled(Card)`
  margin: 16px;
  padding: 16px;
`;

export const Hyperlink = styled.Text`
  font-weight: bold;
  text-decoration-line: underline;
`;

export const TituloH6 = styled.Text`
  /* styleName: H6; */
  color: ${props => (props.color ? props.color : 'black')};
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
`;
export const Titulo = styled.Text`
  /* styleName: H5; */
  color: ${props => (props.color ? props.color : 'black')};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  margin-left: 8px;
  margin-top: 24px;
`;

export const TextoCentralizado = styled.Text`
  text-align: center;
  align-items: center;
  margin-top: ${props => (props.marginTop ? props.marginTop : '0px')};
  width: 100%;
  color: ${props => (props.color ? props.color : 'black')};
`;

export const Texto = styled.Text`
  /* styleName: Body 2; */
  font-size: 14px;
  font-style: ${props => (props.fontStyle ? props.fontStyle : 'normal')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 400)};
  line-height: 20px;
  letter-spacing: 0.25px;
  text-align: left;
  color: ${CORES.AZUL_ESCURO_ROYAL};
`;

export const Imagem = styled(Image)`
  margin-top: 18px;
  width: ${props => (props.width ? props.width : '100%')};
`;

export const ImagemPost = styled(ImagemDePostagem)`
  height: 110px;
  width: ${Dimensions.get('window').width / 2.2}px;
`;

export const Conteudo = styled(TouchableOpacity)`
  height: 200px;
  width: ${Dimensions.get('window').width / 2.2}px;
  align-items: center;
  margin: 5px;
`;

export const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  align-items: center;
`;

export const Botao = styled(Button)`
  justify-content: flex-start;
  align-items: ${props => (props.alignItems ? props.alignItems : 'flex-start')};
  margin: 0 16px;
  margin-top: 40px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : CORES.BRANCO};
`;

export const BotaoLink = styled(Button)`
  justify-content: flex-start;
  align-items: flex-start;
  margin: 12px 0 0 12px;
`;

export const NovidadesTitle = styled.View`
  width: 100%;
  padding: 0 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
